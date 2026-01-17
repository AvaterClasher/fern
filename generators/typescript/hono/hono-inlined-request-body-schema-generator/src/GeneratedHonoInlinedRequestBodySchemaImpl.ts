import { HttpEndpoint, InlinedRequestBody } from "@fern-fern/ir-sdk/api";
import { PackageId } from "@fern-typescript/commons";
import { GeneratedHonoInlinedRequestBodySchema, HonoContext } from "@fern-typescript/contexts";
import { ts } from "ts-morph";

export declare namespace GeneratedHonoInlinedRequestBodySchemaImpl {
    export interface Init {
        packageId: PackageId;
        endpoint: HttpEndpoint;
        inlinedRequestBody: InlinedRequestBody;
        includeSerdeLayer: boolean;
        skipRequestValidation: boolean;
        allowExtraFields: boolean;
    }
}

export class GeneratedHonoInlinedRequestBodySchemaImpl implements GeneratedHonoInlinedRequestBodySchema {
    private packageId: PackageId;
    private endpoint: HttpEndpoint;
    private inlinedRequestBody: InlinedRequestBody;
    private includeSerdeLayer: boolean;
    private skipRequestValidation: boolean;
    private allowExtraFields: boolean;

    constructor({
        packageId,
        endpoint,
        inlinedRequestBody,
        includeSerdeLayer,
        skipRequestValidation,
        allowExtraFields
    }: GeneratedHonoInlinedRequestBodySchemaImpl.Init) {
        this.packageId = packageId;
        this.endpoint = endpoint;
        this.inlinedRequestBody = inlinedRequestBody;
        this.includeSerdeLayer = includeSerdeLayer;
        this.skipRequestValidation = skipRequestValidation;
        this.allowExtraFields = allowExtraFields;
    }

    public writeToFile(context: HonoContext): void {
        // No separate schema files needed - inline validation
    }

    public deserializeRequest(referenceToRawRequest: ts.Expression, context: HonoContext): ts.Expression {
        if (!this.includeSerdeLayer) {
            return referenceToRawRequest;
        }

        // For inlined request bodies, pass through for now
        // Full implementation would generate object schemas with property validation
        return referenceToRawRequest;
    }
}
