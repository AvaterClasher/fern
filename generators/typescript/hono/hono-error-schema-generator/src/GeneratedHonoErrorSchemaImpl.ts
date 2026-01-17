import { assertNever } from "@fern-api/core-utils";
import { ErrorDeclaration, TypeReference } from "@fern-fern/ir-sdk/api";
import { getSchemaOptions } from "@fern-typescript/commons";
import { GeneratedHonoErrorSchema, HonoContext } from "@fern-typescript/contexts";
import { ts } from "ts-morph";

export declare namespace GeneratedHonoErrorSchemaImpl {
    export interface Init {
        errorName: string;
        errorDeclaration: ErrorDeclaration;
        type: TypeReference;
        includeSerdeLayer: boolean;
        allowExtraFields: boolean;
    }
}

export class GeneratedHonoErrorSchemaImpl implements GeneratedHonoErrorSchema {
    private errorDeclaration: ErrorDeclaration;
    private type: TypeReference;
    private includeSerdeLayer: boolean;
    private allowExtraFields: boolean;

    constructor({
        errorName,
        errorDeclaration,
        type,
        includeSerdeLayer,
        allowExtraFields
    }: GeneratedHonoErrorSchemaImpl.Init) {
        this.errorDeclaration = errorDeclaration;
        this.type = type;
        this.includeSerdeLayer = includeSerdeLayer;
        this.allowExtraFields = allowExtraFields;
    }

    public writeToFile(context: HonoContext): void {
        // No separate schema files needed - schemas used inline
        switch (this.type.type) {
            case "primitive":
            case "container":
                // Full implementation would generate schemas
                break;
            case "named":
            case "unknown":
                break;
            default:
                assertNever(this.type);
        }
    }

    public serializeBody(
        context: HonoContext,
        { referenceToBody }: { referenceToBody: ts.Expression }
    ): ts.Expression {
        if (!this.includeSerdeLayer) {
            return referenceToBody;
        }

        switch (this.type.type) {
            case "named":
                return context.typeSchema
                    .getSchemaOfNamedType(this.type, { isGeneratingSchema: false })
                    .jsonOrThrow(referenceToBody, {
                        ...getSchemaOptions({
                            allowExtraFields: this.allowExtraFields,
                            omitUndefined: false
                        })
                    });
            case "unknown":
                return referenceToBody;
            case "primitive":
            case "container":
                // For primitive/container types, pass through for now
                // Full implementation would use generated schemas
                return referenceToBody;
            default:
                assertNever(this.type);
        }
    }
}
