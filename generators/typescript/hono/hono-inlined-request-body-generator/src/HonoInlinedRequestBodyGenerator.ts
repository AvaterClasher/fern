import { HttpEndpoint } from "@fern-fern/ir-sdk/api";
import { PackageId } from "@fern-typescript/commons";
import { GeneratedHonoInlinedRequestBody } from "@fern-typescript/contexts";

import { GeneratedHonoInlinedRequestBodyImpl } from "./GeneratedHonoInlinedRequestBodyImpl";

export declare namespace HonoInlinedRequestBodyGenerator {
    export interface Init {}

    export namespace generateInlinedRequestBody {
        export interface Args {
            packageId: PackageId;
            endpoint: HttpEndpoint;
        }
    }
}

export class HonoInlinedRequestBodyGenerator {
    constructor(init: HonoInlinedRequestBodyGenerator.Init) {}

    public generateInlinedRequestBody({
        packageId,
        endpoint
    }: HonoInlinedRequestBodyGenerator.generateInlinedRequestBody.Args): GeneratedHonoInlinedRequestBody {
        return new GeneratedHonoInlinedRequestBodyImpl({
            packageId,
            endpoint
        });
    }
}
