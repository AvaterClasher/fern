import { HttpEndpoint } from "@fern-fern/ir-sdk/api";
import { PackageId } from "@fern-typescript/commons";
import { GeneratedHonoInlinedRequestBody, HonoContext } from "@fern-typescript/contexts";

export declare namespace GeneratedHonoInlinedRequestBodyImpl {
    export interface Init {
        packageId: PackageId;
        endpoint: HttpEndpoint;
    }
}

export class GeneratedHonoInlinedRequestBodyImpl implements GeneratedHonoInlinedRequestBody {
    constructor(private readonly init: GeneratedHonoInlinedRequestBodyImpl.Init) {}

    public writeToFile(context: HonoContext): void {
        // Stub: Inlined request body types will be generated inline for now
    }
}
