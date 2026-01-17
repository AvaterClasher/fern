import { HttpEndpoint, HttpService } from "@fern-fern/ir-sdk/api";
import { PackageId } from "@fern-typescript/commons";
import { GeneratedHonoEndpointTypeSchemas } from "@fern-typescript/contexts";

import { GeneratedHonoEndpointTypeSchemasImpl } from "./GeneratedHonoEndpointTypeSchemasImpl";

export declare namespace HonoEndpointTypeSchemasGenerator {
    export interface Init {
        includeSerdeLayer: boolean;
        skipRequestValidation: boolean;
        skipResponseValidation: boolean;
        allowExtraFields: boolean;
    }

    export namespace generateEndpointTypeSchemas {
        export interface Args {
            packageId: PackageId;
            service: HttpService;
            endpoint: HttpEndpoint;
        }
    }
}

export class HonoEndpointTypeSchemasGenerator {
    private includeSerdeLayer: boolean;
    private skipRequestValidation: boolean;
    private skipResponseValidation: boolean;
    private allowExtraFields: boolean;

    constructor({
        includeSerdeLayer,
        skipRequestValidation,
        skipResponseValidation,
        allowExtraFields
    }: HonoEndpointTypeSchemasGenerator.Init) {
        this.includeSerdeLayer = includeSerdeLayer;
        this.skipRequestValidation = skipRequestValidation;
        this.skipResponseValidation = skipResponseValidation;
        this.allowExtraFields = allowExtraFields;
    }

    public generateEndpointTypeSchemas({
        packageId,
        service,
        endpoint
    }: HonoEndpointTypeSchemasGenerator.generateEndpointTypeSchemas.Args): GeneratedHonoEndpointTypeSchemas {
        return new GeneratedHonoEndpointTypeSchemasImpl({
            packageId,
            service,
            endpoint,
            includeSerdeLayer: this.includeSerdeLayer,
            skipRequestValidation: this.skipRequestValidation,
            skipResponseValidation: this.skipResponseValidation,
            allowExtraFields: this.allowExtraFields
        });
    }
}
