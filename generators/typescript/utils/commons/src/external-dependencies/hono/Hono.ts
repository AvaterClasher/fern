import { ts } from "ts-morph";

export type HonoHttpVerb = "get" | "post" | "put" | "patch" | "delete" | "head";

export interface Hono {
    Hono: {
        _instantiate: () => ts.Expression;
        _getReferenceToType: () => ts.TypeNode;
        route: (args: { referenceToApp: ts.Expression; path: ts.Expression; service: ts.Expression }) => ts.Expression;
        _addRoute: (args: {
            referenceToApp: ts.Expression;
            method: HonoHttpVerb;
            path: string;
            buildHandler: (args: { honoContext: ts.Expression }) => ts.ConciseBody;
        }) => ts.Statement;
    };
    Context: {
        _getReferenceToType: () => ts.TypeNode;
    };
    MiddlewareHandler: () => ts.TypeNode;
    CookieOptions: {
        _getReferenceToType: () => ts.TypeNode;
    };
}
