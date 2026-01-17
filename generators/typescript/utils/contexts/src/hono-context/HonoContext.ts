import { ImportsManager } from "@fern-typescript/commons";

import { BaseContext } from "../base-context";
import { GenericAPIHonoErrorContext } from "./generic-api-hono-error";
import { HonoEndpointTypeSchemasContext } from "./hono-endpoint-type-schemas";
import { HonoErrorContext } from "./hono-error";
import { HonoErrorSchemaContext } from "./hono-error-schema";
import { HonoInlinedRequestBodyContext } from "./hono-inlined-request-body";
import { HonoInlinedRequestBodySchemaContext } from "./hono-inlined-request-body-schema";
import { HonoRegisterContext } from "./hono-register";
import { HonoServiceContext } from "./hono-service";

export interface HonoContext extends BaseContext {
    importsManager: ImportsManager;
    honoEndpointTypeSchemas: HonoEndpointTypeSchemasContext;
    honoError: HonoErrorContext;
    honoErrorSchema: HonoErrorSchemaContext;
    honoInlinedRequestBody: HonoInlinedRequestBodyContext;
    honoInlinedRequestBodySchema: HonoInlinedRequestBodySchemaContext;
    honoRegister: HonoRegisterContext;
    honoService: HonoServiceContext;
    genericAPIHonoError: GenericAPIHonoErrorContext;
}
