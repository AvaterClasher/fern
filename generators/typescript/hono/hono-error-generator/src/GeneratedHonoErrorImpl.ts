import { ErrorDeclaration } from "@fern-fern/ir-sdk/api";
import { AbstractErrorClassGenerator } from "@fern-typescript/abstract-error-class-generator";
import { getTextOfTsNode } from "@fern-typescript/commons";
import { GeneratedHonoError, HonoContext } from "@fern-typescript/contexts";
import {
    ClassDeclaration,
    OptionalKind,
    ParameterDeclarationStructure,
    PropertyDeclarationStructure,
    Scope,
    ts
} from "ts-morph";

export declare namespace GeneratedHonoErrorImpl {
    export interface Init {
        errorClassName: string;
        errorDeclaration: ErrorDeclaration;
    }
}

export class GeneratedHonoErrorImpl
    extends AbstractErrorClassGenerator<HonoContext>
    implements GeneratedHonoError
{
    public readonly type = "class";

    private static BODY_CONSTRUCTOR_PARAMETER_NAME = "body";

    private errorDeclaration: ErrorDeclaration;

    constructor({ errorClassName, errorDeclaration }: GeneratedHonoErrorImpl.Init) {
        super({ errorClassName });
        this.errorClassName = errorClassName;
        this.errorDeclaration = errorDeclaration;
    }

    public writeToFile(context: HonoContext): void {
        super.writeToSourceFile(context);
    }

    protected addToClass(class_: ClassDeclaration, context: HonoContext): void {
        class_.addMethod(
            context.genericAPIHonoError
                .getGeneratedGenericAPIHonoError()
                .implementToResponse(context, ({ honoContext }) => {
                    if (this.errorDeclaration.type == null) {
                        return [
                            ts.factory.createReturnStatement(
                                ts.factory.createCallExpression(
                                    ts.factory.createPropertyAccessExpression(honoContext, "text"),
                                    undefined,
                                    [ts.factory.createStringLiteral(""), ts.factory.createNumericLiteral(this.errorDeclaration.statusCode)]
                                )
                            )
                        ];
                    }

                    const errorSchema = context.honoErrorSchema.getGeneratedHonoErrorSchema(
                        this.errorDeclaration.name
                    );
                    if (errorSchema == null) {
                        throw new Error("Error schema was not generated.");
                    }

                    return [
                        ts.factory.createReturnStatement(
                            ts.factory.createCallExpression(
                                ts.factory.createPropertyAccessExpression(honoContext, "json"),
                                undefined,
                                [
                                    errorSchema.serializeBody(context, {
                                        referenceToBody: ts.factory.createPropertyAccessExpression(
                                            ts.factory.createThis(),
                                            GeneratedHonoErrorImpl.BODY_CONSTRUCTOR_PARAMETER_NAME
                                        )
                                    }),
                                    ts.factory.createNumericLiteral(this.errorDeclaration.statusCode)
                                ]
                            )
                        )
                    ];
                })
        );
    }

    protected getClassProperties(): OptionalKind<PropertyDeclarationStructure>[] {
        return [];
    }

    protected getConstructorParameters(context: HonoContext): OptionalKind<ParameterDeclarationStructure>[] {
        if (this.errorDeclaration.type == null) {
            return [];
        }
        const referenceToType = context.type.getReferenceToType(this.errorDeclaration.type);
        return [
            {
                name: GeneratedHonoErrorImpl.BODY_CONSTRUCTOR_PARAMETER_NAME,
                hasQuestionToken: referenceToType.isOptional,
                type: getTextOfTsNode(referenceToType.typeNodeWithoutUndefined),
                scope: Scope.Private,
                isReadonly: true
            }
        ];
    }

    protected getSuperArguments(context: HonoContext): ts.Expression[] {
        return context.genericAPIHonoError.getGeneratedGenericAPIHonoError().getConstructorArguments({
            errorName: this.errorClassName
        });
    }

    protected getConstructorStatements(): ts.Statement[] {
        return [];
    }

    protected isAbstract(): boolean {
        return false;
    }

    protected override getBaseClass(context: HonoContext): ts.TypeNode {
        return context.genericAPIHonoError.getReferenceToGenericAPIHonoError().getTypeNode();
    }
}
