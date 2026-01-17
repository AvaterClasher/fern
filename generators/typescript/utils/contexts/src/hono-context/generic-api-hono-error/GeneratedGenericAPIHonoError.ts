import { ts } from "ts-morph";

export interface GeneratedGenericAPIHonoError {
    writeToFile: (context: any) => void;
    toResponse: (args: { error: ts.Expression; honoContext: ts.Expression }) => ts.Expression;
    getErrorClassName: (args: { referenceToError: ts.Expression }) => ts.Expression;
}
