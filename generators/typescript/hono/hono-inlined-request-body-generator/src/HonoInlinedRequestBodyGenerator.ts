import { InlinedRequestBody } from "@fern-fern/ir-sdk/api";
import { GeneratedHonoInlinedRequestBody } from "@fern-typescript/contexts";

import { GeneratedHonoInlinedRequestBodyImpl } from "./GeneratedHonoInlinedRequestBodyImpl";

export declare namespace HonoInlinedRequestBodyGenerator {
    export namespace generateInlinedRequestBody {
        export interface Args {
            requestBody: InlinedRequestBody;
            typeName: string;
            retainOriginalCasing: boolean;
            includeSerdeLayer: boolean;
        }
    }
}

export class HonoInlinedRequestBodyGenerator {
    public generateInlinedRequestBody({
        requestBody,
        typeName,
        retainOriginalCasing,
        includeSerdeLayer
    }: HonoInlinedRequestBodyGenerator.generateInlinedRequestBody.Args): GeneratedHonoInlinedRequestBody {
        return new GeneratedHonoInlinedRequestBodyImpl({
            requestBody,
            typeName,
            retainOriginalCasing,
            includeSerdeLayer
        });
    }
}
