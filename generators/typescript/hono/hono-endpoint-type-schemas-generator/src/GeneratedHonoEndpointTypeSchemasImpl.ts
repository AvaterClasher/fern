import { assertNever } from "@fern-api/core-utils";
import { HttpEndpoint, HttpService } from "@fern-fern/ir-sdk/api";
import { getSchemaOptions, PackageId } from "@fern-typescript/commons";
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
    private allowExtraFields: boolean;

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
        this.allowExtraFields = allowExtraFields;
    }

    public writeToFile(context: HonoContext): void {
        // No separate schema files needed - schemas are generated inline
    }

    public serializeResponse(referenceToResponseBody: ts.Expression, context: HonoContext): ts.Expression {
        if (this.endpoint.response?.body == null) {
            throw new Error("Cannot serialize response because it's not defined");
        }

        if (this.endpoint.response.body?.type === "fileDownload") {
            throw new Error("Cannot serialize file");
        }
        if (this.endpoint.response.body?.type === "streaming") {
            throw new Error("Streaming response is not supported");
        }
        if (this.endpoint.response.body?.type === "streamParameter") {
            throw new Error("Streaming response is not supported");
        }
        if (this.endpoint.response.body?.type === "text") {
            throw new Error("Text response is not supported");
        }
        if (this.endpoint.response.body?.type === "bytes") {
            throw new Error("Bytes response is not supported");
        }

        if (!this.includeSerdeLayer) {
            return referenceToResponseBody;
        }

        switch (this.endpoint.response.body.value.responseBodyType.type) {
            case "unknown":
                return referenceToResponseBody;
            case "named":
                return context.typeSchema
                    .getSchemaOfNamedType(this.endpoint.response.body.value.responseBodyType, {
                        isGeneratingSchema: false
                    })
                    .jsonOrThrow(referenceToResponseBody, {
                        ...getSchemaOptions({
                            allowExtraFields: this.allowExtraFields,
                            skipValidation: this.skipResponseValidation,
                            omitUndefined: false
                        })
                    });
            case "primitive":
            case "container":
                // For primitive/container types, pass through for now
                // Full implementation would generate schemas like Express does
                return referenceToResponseBody;
            default:
                assertNever(this.endpoint.response.body?.value.responseBodyType);
        }
    }

    public deserializeRequest(referenceToRawRequest: ts.Expression, context: HonoContext): ts.Expression {
        if (this.endpoint.requestBody?.type !== "reference") {
            throw new Error("Cannot serialize request because it's not a reference");
        }

        if (!this.includeSerdeLayer) {
            return referenceToRawRequest;
        }

        switch (this.endpoint.requestBody.requestBodyType.type) {
            case "unknown":
                return referenceToRawRequest;
            case "named": {
                if (this.skipRequestValidation) {
                    return context.typeSchema
                        .getSchemaOfNamedType(this.endpoint.requestBody.requestBodyType, { isGeneratingSchema: false })
                        .parse(referenceToRawRequest, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedEnumValues: true,
                            allowUnrecognizedUnionMembers: true,
                            skipValidation: true,
                            breadcrumbsPrefix: [],
                            omitUndefined: false
                        });
                }
                return context.typeSchema
                    .getSchemaOfNamedType(this.endpoint.requestBody.requestBodyType, { isGeneratingSchema: false })
                    .parse(referenceToRawRequest, {
                        unrecognizedObjectKeys: this.allowExtraFields ? "passthrough" : "fail",
                        allowUnrecognizedEnumValues: false,
                        allowUnrecognizedUnionMembers: false,
                        skipValidation: false,
                        breadcrumbsPrefix: [],
                        omitUndefined: false
                    });
            }
            case "primitive":
            case "container":
                // For primitive/container types, pass through for now
                // Full implementation would generate and use schemas
                return referenceToRawRequest;
            default:
                assertNever(this.endpoint.requestBody.requestBodyType);
        }
    }
}
