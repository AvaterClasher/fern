import { ts } from "ts-morph";

export interface GeneratedHonoService {
    writeToFile: (context: any) => void;
    toHono: (referenceToService: ts.Expression) => ts.Expression;
}
