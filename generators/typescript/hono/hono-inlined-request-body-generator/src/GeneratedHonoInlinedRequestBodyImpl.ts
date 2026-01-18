import { InlinedRequestBody } from "@fern-fern/ir-sdk/api";
import { GeneratedHonoInlinedRequestBody, HonoContext } from "@fern-typescript/contexts";

export declare namespace GeneratedHonoInlinedRequestBodyImpl {
    export interface Init {
        requestBody: InlinedRequestBody;
        typeName: string;
        retainOriginalCasing: boolean;
        includeSerdeLayer: boolean;
    }
}

export class GeneratedHonoInlinedRequestBodyImpl implements GeneratedHonoInlinedRequestBody {
    constructor(private readonly init: GeneratedHonoInlinedRequestBodyImpl.Init) {}

    public writeToFile(context: HonoContext): void {
        // Stub: Inlined request body types will be generated inline for now
    }
}
