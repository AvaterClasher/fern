import { HttpEndpoint, HttpService } from "@fern-fern/ir-sdk/api";
import { PackageId } from "@fern-typescript/commons";
import { GeneratedHonoEndpointTypeSchemas, HonoContext } from "@fern-typescript/contexts";
import { ts } from "ts-morph";

export declare namespace GeneratedHonoEndpointTypeSchemasImpl {
    export interface Init {
        packageId: PackageId;
        service: HttpService;
        endpoint: HttpEndpoint;
        includeSerdeLayer: boolean;
        skipRequestValidation: boolean;
        skipResponseValidation: boolean;
        allowExtraFields: boolean;
    }
}

export class GeneratedHonoEndpointTypeSchemasImpl implements GeneratedHonoEndpointTypeSchemas {
    private endpoint: HttpEndpoint;
    private includeSerdeLayer: boolean;
    private skipRequestValidation: boolean;
    private skipResponseValidation: boolean;

    constructor({
        packageId,
        service,
        endpoint,
        includeSerdeLayer,
        skipRequestValidation,
        skipResponseValidation,
        allowExtraFields
    }: GeneratedHonoEndpointTypeSchemasImpl.Init) {
        this.endpoint = endpoint;
        this.includeSerdeLayer = includeSerdeLayer;
        this.skipRequestValidation = skipRequestValidation;
        this.skipResponseValidation = skipResponseValidation;
    }

    public writeToFile(context: HonoContext): void {
        // Stub: No separate schema files needed for now
    }

    public serializeResponse(referenceToResponseBody: ts.Expression, context: HonoContext): ts.Expression {
        // Stub: Pass through for now
        return referenceToResponseBody;
    }

    public deserializeRequest(referenceToRawRequest: ts.Expression, context: HonoContext): ts.Expression {
        if (!this.includeSerdeLayer || this.skipRequestValidation) {
            // Pass through without validation
            return referenceToRawRequest;
        }

        // Stub: Basic validation - just return the raw request for now
        return referenceToRawRequest;
    }
}
