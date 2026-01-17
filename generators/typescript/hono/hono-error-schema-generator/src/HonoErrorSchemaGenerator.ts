import { ErrorDeclaration, TypeReference } from "@fern-fern/ir-sdk/api";
import { GeneratedHonoErrorSchema } from "@fern-typescript/contexts";

import { GeneratedHonoErrorSchemaImpl } from "./GeneratedHonoErrorSchemaImpl";

export declare namespace HonoErrorSchemaGenerator {
    export interface Init {
        includeSerdeLayer: boolean;
        allowExtraFields: boolean;
    }

    export namespace generateErrorSchema {
        export interface Args {
            errorName: string;
            errorDeclaration: ErrorDeclaration;
            type: TypeReference;
        }
    }
}

export class HonoErrorSchemaGenerator {
    private includeSerdeLayer: boolean;
    private allowExtraFields: boolean;

    constructor({ includeSerdeLayer, allowExtraFields }: HonoErrorSchemaGenerator.Init) {
        this.includeSerdeLayer = includeSerdeLayer;
        this.allowExtraFields = allowExtraFields;
    }

    public generateErrorSchema({
        errorName,
        errorDeclaration,
        type
    }: HonoErrorSchemaGenerator.generateErrorSchema.Args): GeneratedHonoErrorSchema {
        return new GeneratedHonoErrorSchemaImpl({
            errorName,
            errorDeclaration,
            type,
            includeSerdeLayer: this.includeSerdeLayer,
            allowExtraFields: this.allowExtraFields
        });
    }
}
