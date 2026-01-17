import { AbstractErrorClassGenerator } from "@fern-typescript/abstract-error-class-generator";
import { getTextOfTsNode } from "@fern-typescript/commons";
import { GeneratedGenericAPIHonoError, HonoContext } from "@fern-typescript/contexts";
import {
    ClassDeclaration,
    MethodDeclarationStructure,
    OptionalKind,
    ParameterDeclarationStructure,
    PropertyDeclarationStructure,
    Scope,
    ts
} from "ts-morph";

export class GeneratedGenericAPIHonoErrorImpl
    extends AbstractErrorClassGenerator<HonoContext>
    implements GeneratedGenericAPIHonoError
{
    private static TO_RESPONSE_METHOD_NAME = "toResponse";
    private static CONTEXT_PARAMETER_NAME = "c";
    private static ERROR_NAME_PROPERTY_NAME = "errorName";

    public writeToFile(context: HonoContext): void {
        super.writeToSourceFile(context);
    }

    protected getClassProperties(): OptionalKind<PropertyDeclarationStructure>[] {
        return [];
    }

    protected getConstructorParameters(): OptionalKind<ParameterDeclarationStructure>[] {
        return [
            {
                name: GeneratedGenericAPIHonoErrorImpl.ERROR_NAME_PROPERTY_NAME,
                type: "string",
                hasQuestionToken: true,
                isReadonly: true,
                scope: Scope.Public
            }
        ];
    }

    protected getSuperArguments(): ts.Expression[] {
        return [];
    }

    protected getConstructorStatements(): ts.Statement[] {
        return [];
    }

    protected addToClass(class_: ClassDeclaration, context: HonoContext): void {
        class_.addMethod(this.getToResponseMethod(context));
    }

    private getToResponseMethod(context: HonoContext): OptionalKind<MethodDeclarationStructure> {
        return {
            name: GeneratedGenericAPIHonoErrorImpl.TO_RESPONSE_METHOD_NAME,
            scope: Scope.Public,
            isAbstract: true,
            parameters: [
                {
                    name: GeneratedGenericAPIHonoErrorImpl.CONTEXT_PARAMETER_NAME,
                    type: getTextOfTsNode(context.externalDependencies.hono.Context._getReferenceToType())
                }
            ],
            returnType: "Response"
        };
    }

    protected isAbstract(): boolean {
        return true;
    }

    public implementToResponse(
        context: HonoContext,
        generateBody: ({ honoContext }: { honoContext: ts.Expression }) => ts.Statement[]
    ): OptionalKind<MethodDeclarationStructure> {
        return {
            ...this.getToResponseMethod(context),
            isAbstract: false,
            statements: generateBody({
                honoContext: ts.factory.createIdentifier(GeneratedGenericAPIHonoErrorImpl.CONTEXT_PARAMETER_NAME)
            }).map(getTextOfTsNode)
        };
    }

    public toResponse({ error, honoContext }: { error: ts.Expression; honoContext: ts.Expression }): ts.Expression {
        return ts.factory.createCallExpression(
            ts.factory.createPropertyAccessExpression(error, GeneratedGenericAPIHonoErrorImpl.TO_RESPONSE_METHOD_NAME),
            undefined,
            [honoContext]
        );
    }

    public getConstructorArguments({ errorName }: { errorName: string }): ts.Expression[] {
        return [ts.factory.createStringLiteral(errorName)];
    }

    public getErrorClassName({ referenceToError }: { referenceToError: ts.Expression }): ts.Expression {
        return ts.factory.createPropertyAccessExpression(
            referenceToError,
            GeneratedGenericAPIHonoErrorImpl.ERROR_NAME_PROPERTY_NAME
        );
    }
}
