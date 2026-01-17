import { ts } from "ts-morph";

import { ExternalDependency } from "../ExternalDependency";
import { Hono, HonoHttpVerb } from "./Hono";

export class HonoImpl extends ExternalDependency implements Hono {
    protected override PACKAGE = { name: "hono", version: "^4.11.4" };
    protected override TYPES_PACKAGE = undefined;

    public readonly Hono = {
        _instantiate: this.withNamedImport("Hono", (withImport, Hono) =>
            withImport(() => {
                return ts.factory.createNewExpression(ts.factory.createIdentifier(Hono), undefined, []);
            })
        ),

        _getReferenceToType: this.withNamedImport("Hono", (withImport, Hono) =>
            withImport(() => {
                return ts.factory.createTypeReferenceNode(ts.factory.createIdentifier(Hono), []);
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

        _addRoute: ({
            referenceToApp,
            method,
            path,
            buildHandler
        }: {
            referenceToApp: ts.Expression;
            method: HonoHttpVerb;
            path: string;
            buildHandler: (args: { honoContext: ts.Expression }) => ts.ConciseBody;
        }): ts.Statement => {
            const CONTEXT_PARAMETER_NAME = "c";

            return ts.factory.createExpressionStatement(
                ts.factory.createCallExpression(
                    ts.factory.createPropertyAccessExpression(referenceToApp, method),
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
                                honoContext: ts.factory.createIdentifier(CONTEXT_PARAMETER_NAME)
                            })
                        )
                    ]
                )
            );
        }
    };

    public readonly Context = {
        _getReferenceToType: this.withNamedImport("Context", (withImport, Context) =>
            withImport(() => {
                return ts.factory.createTypeReferenceNode(ts.factory.createIdentifier(Context), []);
            })
        )
    };

    public readonly MiddlewareHandler = this.withNamedImport("MiddlewareHandler", (withImport, MiddlewareHandler) =>
        withImport(() => {
            return ts.factory.createTypeReferenceNode(ts.factory.createIdentifier(MiddlewareHandler), []);
        })
    );

    public readonly CookieOptions = {
        _getReferenceToType: this.withNamedImport("CookieOptions", (withImport, CookieOptions) =>
            withImport(() => {
                return ts.factory.createTypeReferenceNode(ts.factory.createIdentifier(CookieOptions), []);
            })
        )
    };
}
