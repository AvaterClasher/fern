import { ErrorDiscriminationStrategy } from "@fern-fern/ir-sdk/api";
import { GeneratedGenericAPIHonoError, HonoContext } from "@fern-typescript/contexts";
import { ts } from "ts-morph";

export declare namespace GeneratedGenericAPIHonoErrorImpl {
    export interface Init {
        errorDiscriminationStrategy: ErrorDiscriminationStrategy;
        errorClassName: string;
    }
}

export class GeneratedGenericAPIHonoErrorImpl implements GeneratedGenericAPIHonoError {
    private errorClassName: string;

    constructor({ errorClassName }: GeneratedGenericAPIHonoErrorImpl.Init) {
        this.errorClassName = errorClassName;
    }

    public writeToFile(context: HonoContext): void {
        // Stub: Generate basic error class
        context.sourceFile.addClass({
            name: this.errorClassName,
            isExported: true,
            extends: "Error",
            ctors: [
                {
                    parameters: [
                        {
                            name: "message",
                            type: "string"
                        }
                    ],
                    statements: ["super(message);"]
                }
            ]
        });
    }

    public toResponse({
        error,
        honoContext
    }: {
        error: ts.Expression;
        honoContext: ts.Expression;
    }): ts.Expression {
        return ts.factory.createCallExpression(
            ts.factory.createPropertyAccessExpression(honoContext, "json"),
            undefined,
            [
                ts.factory.createObjectLiteralExpression(
                    [
                        ts.factory.createPropertyAssignment(
                            "message",
                            ts.factory.createPropertyAccessExpression(error, "message")
                        )
                    ],
                    false
                ),
                ts.factory.createNumericLiteral(500)
            ]
        );
    }

    public getErrorClassName({ referenceToError }: { referenceToError: ts.Expression }): ts.Expression {
        return ts.factory.createPropertyAccessExpression(
            ts.factory.createPropertyAccessExpression(referenceToError, "constructor"),
            "name"
        );
    }
}
