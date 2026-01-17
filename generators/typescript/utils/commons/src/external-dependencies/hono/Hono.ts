import { ts } from "ts-morph";

export type HonoHttpVerb = "get" | "post" | "put" | "patch" | "delete" | "head";

export interface Hono {
    Hono: {
        _instantiate: () => ts.Expression;
        _getReferenceToType: () => ts.TypeNode;
        route: (args: { referenceToApp: ts.Expression; path: ts.Expression; service: ts.Expression }) => ts.Expression;
        use: (args: { referenceToApp: ts.Expression; path: ts.Expression; middleware: ts.Expression }) => ts.Expression;
        _addRoute: (args: {
            referenceToHono: ts.Expression;
            method: HonoHttpVerb;
            path: string;
            buildHandler: (args: { context: ts.Expression }) => ts.ConciseBody;
        }) => ts.Statement;
    };
    Context: {
        json: (args: {
            referenceToContext: ts.Expression;
            valueToSend: ts.Expression;
            status?: number;
        }) => ts.Expression;
        text: (args: {
            referenceToContext: ts.Expression;
            text: ts.Expression;
            status?: number;
        }) => ts.Expression;
        req: {
            param: (args: { referenceToContext: ts.Expression; paramName?: string }) => ts.Expression;
            query: (args: { referenceToContext: ts.Expression; queryName?: string }) => ts.Expression;
            header: (args: { referenceToContext: ts.Expression; headerName: string }) => ts.Expression;
            json: (args: { referenceToContext: ts.Expression }) => ts.Expression;
        };
        _getReferenceToType: () => ts.TypeNode;
    };
}
