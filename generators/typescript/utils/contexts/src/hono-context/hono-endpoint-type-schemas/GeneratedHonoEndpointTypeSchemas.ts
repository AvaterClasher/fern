import { ts } from "ts-morph";

export interface GeneratedHonoEndpointTypeSchemas {
    writeToFile: (context: any) => void;
    serializeResponse: (referenceToResponseBody: ts.Expression, context: any) => ts.Expression;
    deserializeRequest: (referenceToRawRequest: ts.Expression, context: any) => ts.Expression;
}
