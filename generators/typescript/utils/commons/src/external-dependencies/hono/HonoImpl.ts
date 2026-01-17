import { ts } from "ts-morph";

import { ExternalDependency } from "../ExternalDependency";
import { Hono as HonoInterface, HonoHttpVerb } from "./Hono";

export class HonoImpl extends ExternalDependency implements HonoInterface {
    protected override PACKAGE = { name: "hono", version: "^4.11.4" };
    protected override TYPES_PACKAGE = undefined;

    public readonly Hono = {
        _instantiate: this.withNamedImport("Hono", (withImport, HonoClass) =>
            withImport(() => {
                return ts.factory.createNewExpression(ts.factory.createIdentifier(HonoClass), undefined, []);
            })
        ),

        _getReferenceToType: this.withNamedImport("Hono", (withImport, HonoClass) =>
            withImport(() => {
                return ts.factory.createTypeReferenceNode(ts.factory.createIdentifier(HonoClass), []);
            })
        ),

        route: ({
            referenceToApp,
            path,
            service
        }: {
            referenceToApp: ts.Expression;
            path: ts.Expression;
            service: ts.Expression;
        }): ts.Expression => {
            return ts.factory.createCallExpression(
                ts.factory.createPropertyAccessExpression(referenceToApp, ts.factory.createIdentifier("route")),
                undefined,
                [path, service]
            );
        },

        use: ({
            referenceToApp,
            path,
            middleware
        }: {
            referenceToApp: ts.Expression;
            path: ts.Expression;
            middleware: ts.Expression;
        }): ts.Expression => {
            return ts.factory.createCallExpression(
                ts.factory.createPropertyAccessExpression(referenceToApp, ts.factory.createIdentifier("use")),
                undefined,
                [path, middleware]
            );
        },

        _addRoute: ({
            referenceToHono,
            method,
            path,
            buildHandler
        }: {
            referenceToHono: ts.Expression;
            method: HonoHttpVerb;
            path: string;
            buildHandler: (args: { context: ts.Expression }) => ts.ConciseBody;
        }): ts.Statement => {
            const CONTEXT_PARAMETER_NAME = "c";

            return ts.factory.createExpressionStatement(
                ts.factory.createCallExpression(
                    ts.factory.createPropertyAccessExpression(referenceToHono, method),
                    undefined,
                    [
                        ts.factory.createStringLiteral(path),
                        ts.factory.createArrowFunction(
                            [ts.factory.createToken(ts.SyntaxKind.AsyncKeyword)],
                            undefined,
                            [ts.factory.createParameterDeclaration(undefined, undefined, CONTEXT_PARAMETER_NAME)],
                            undefined,
                            undefined,
                            buildHandler({
                                context: ts.factory.createIdentifier(CONTEXT_PARAMETER_NAME)
                            })
                        )
                    ]
                )
            );
        }
    };

    public readonly Context = {
        json: ({
            referenceToContext,
            valueToSend,
            status
        }: {
            referenceToContext: ts.Expression;
            valueToSend: ts.Expression;
            status?: number;
        }): ts.Expression => {
            const args: ts.Expression[] = [valueToSend];
            if (status != null) {
                args.push(ts.factory.createNumericLiteral(status));
            }
            return ts.factory.createCallExpression(
                ts.factory.createPropertyAccessExpression(referenceToContext, "json"),
                undefined,
                args
            );
        },

        text: ({
            referenceToContext,
            text,
            status
        }: {
            referenceToContext: ts.Expression;
            text: ts.Expression;
            status?: number;
        }): ts.Expression => {
            const args: ts.Expression[] = [text];
            if (status != null) {
                args.push(ts.factory.createNumericLiteral(status));
            }
            return ts.factory.createCallExpression(
                ts.factory.createPropertyAccessExpression(referenceToContext, "text"),
                undefined,
                args
            );
        },

        req: {
            param: ({
                referenceToContext,
                paramName
            }: {
                referenceToContext: ts.Expression;
                paramName?: string;
            }): ts.Expression => {
                const reqAccess = ts.factory.createPropertyAccessExpression(referenceToContext, "req");
                const paramAccess = ts.factory.createPropertyAccessExpression(reqAccess, "param");

                if (paramName != null) {
                    return ts.factory.createCallExpression(paramAccess, undefined, [
                        ts.factory.createStringLiteral(paramName)
                    ]);
                }
                return ts.factory.createCallExpression(paramAccess, undefined, []);
            },

            query: ({
                referenceToContext,
                queryName
            }: {
                referenceToContext: ts.Expression;
                queryName?: string;
            }): ts.Expression => {
                const reqAccess = ts.factory.createPropertyAccessExpression(referenceToContext, "req");
                const queryAccess = ts.factory.createPropertyAccessExpression(reqAccess, "query");

                if (queryName != null) {
                    return ts.factory.createCallExpression(queryAccess, undefined, [
                        ts.factory.createStringLiteral(queryName)
                    ]);
                }
                return ts.factory.createCallExpression(queryAccess, undefined, []);
            },

            header: ({
                referenceToContext,
                headerName
            }: {
                referenceToContext: ts.Expression;
                headerName: string;
            }): ts.Expression => {
                const reqAccess = ts.factory.createPropertyAccessExpression(referenceToContext, "req");
                return ts.factory.createCallExpression(
                    ts.factory.createPropertyAccessExpression(reqAccess, "header"),
                    undefined,
                    [ts.factory.createStringLiteral(headerName)]
                );
            },

            json: ({ referenceToContext }: { referenceToContext: ts.Expression }): ts.Expression => {
                const reqAccess = ts.factory.createPropertyAccessExpression(referenceToContext, "req");
                return ts.factory.createCallExpression(
                    ts.factory.createPropertyAccessExpression(reqAccess, "json"),
                    undefined,
                    []
                );
            }
        },

        _getReferenceToType: this.withNamedImport("Context", (withImport, ContextClass) =>
            withImport(() => {
                return ts.factory.createTypeReferenceNode(ts.factory.createIdentifier(ContextClass), []);
            })
        )
    };
}
