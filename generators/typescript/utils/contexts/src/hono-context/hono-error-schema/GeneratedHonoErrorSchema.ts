import { ts } from "ts-morph";

export interface GeneratedHonoErrorSchema {
    writeToFile: (context: any) => void;
    serializeBody: (context: any, args: { referenceToBody: ts.Expression }) => ts.Expression;
}
