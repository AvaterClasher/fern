import { ErrorDeclaration } from "@fern-fern/ir-sdk/api";
import { GeneratedHonoErrorSchema, HonoContext } from "@fern-typescript/contexts";

export declare namespace GeneratedHonoErrorSchemaImpl {
    export interface Init {
        errorDeclaration: ErrorDeclaration;
    }
}

export class GeneratedHonoErrorSchemaImpl implements GeneratedHonoErrorSchema {
    constructor(private readonly init: GeneratedHonoErrorSchemaImpl.Init) {}

    public writeToFile(context: HonoContext): void {
        // Stub: Schema generation not yet implemented
    }
}
