import { HttpEndpoint } from "@fern-fern/ir-sdk/api";
import { PackageId } from "@fern-typescript/commons";
import { GeneratedHonoInlinedRequestBodySchema, HonoContext } from "@fern-typescript/contexts";
import { ts } from "ts-morph";

export declare namespace GeneratedHonoInlinedRequestBodySchemaImpl {
    export interface Init {
        packageId: PackageId;
        endpoint: HttpEndpoint;
    }
}

export class GeneratedHonoInlinedRequestBodySchemaImpl implements GeneratedHonoInlinedRequestBodySchema {
    constructor(private readonly init: GeneratedHonoInlinedRequestBodySchemaImpl.Init) {}

    public writeToFile(context: HonoContext): void {
        // Stub: Schema generation not yet implemented
    }

    public deserializeRequest(referenceToRawRequest: ts.Expression, context: HonoContext): ts.Expression {
        // Stub: Pass through for now
        return referenceToRawRequest;
    }
}
