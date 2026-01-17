import { ts } from "ts-morph";

export interface GeneratedHonoInlinedRequestBodySchema {
    writeToFile: (context: any) => void;
    deserializeRequest: (referenceToRawRequest: ts.Expression, context: any) => ts.Expression;
}
