import { HttpEndpoint, InlinedRequestBody } from "@fern-fern/ir-sdk/api";
import { PackageId } from "@fern-typescript/commons";
import { GeneratedHonoInlinedRequestBodySchema } from "@fern-typescript/contexts";

import { GeneratedHonoInlinedRequestBodySchemaImpl } from "./GeneratedHonoInlinedRequestBodySchemaImpl";

export declare namespace HonoInlinedRequestBodySchemaGenerator {
    export interface Init {
        includeSerdeLayer: boolean;
        skipRequestValidation: boolean;
        allowExtraFields: boolean;
    }

    export namespace generateInlinedRequestBodySchema {
        export interface Args {
            packageId: PackageId;
            endpoint: HttpEndpoint;
            inlinedRequestBody: InlinedRequestBody;
        }
    }
}

export class HonoInlinedRequestBodySchemaGenerator {
    private includeSerdeLayer: boolean;
    private skipRequestValidation: boolean;
    private allowExtraFields: boolean;

    constructor({
        includeSerdeLayer,
        skipRequestValidation,
        allowExtraFields
    }: HonoInlinedRequestBodySchemaGenerator.Init) {
        this.includeSerdeLayer = includeSerdeLayer;
        this.skipRequestValidation = skipRequestValidation;
        this.allowExtraFields = allowExtraFields;
    }

    public generateInlinedRequestBodySchema({
        packageId,
        endpoint,
        inlinedRequestBody
    }: HonoInlinedRequestBodySchemaGenerator.generateInlinedRequestBodySchema.Args): GeneratedHonoInlinedRequestBodySchema {
        return new GeneratedHonoInlinedRequestBodySchemaImpl({
            packageId,
            endpoint,
            inlinedRequestBody,
            includeSerdeLayer: this.includeSerdeLayer,
            skipRequestValidation: this.skipRequestValidation,
            allowExtraFields: this.allowExtraFields
        });
    }
}
