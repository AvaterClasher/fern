import { Logger } from "@fern-api/logger";
import { Constants } from "@fern-fern/ir-sdk/api";
import {
    CoreUtilities,
    CoreUtilitiesManager,
    createExternalDependencies,
    DependencyManager,
    ExportsManager,
    ExternalDependencies,
    ImportsManager
} from "@fern-typescript/commons";
import {
    HonoContext,
    HonoErrorSchemaContext,
    HonoRegisterContext,
    GenericAPIHonoErrorContext,
    JsonContext
} from "@fern-typescript/contexts";
import { HonoEndpointTypeSchemasGenerator } from "@fern-typescript/hono-endpoint-type-schemas-generator";
import { HonoErrorGenerator } from "@fern-typescript/hono-error-generator";
import { HonoErrorSchemaGenerator } from "@fern-typescript/hono-error-schema-generator";
import { HonoInlinedRequestBodyGenerator } from "@fern-typescript/hono-inlined-request-body-generator";
import { HonoInlinedRequestBodySchemaGenerator } from "@fern-typescript/hono-inlined-request-body-schema-generator";
import { HonoRegisterGenerator } from "@fern-typescript/hono-register-generator";
import { HonoServiceGenerator } from "@fern-typescript/hono-service-generator";
import { GenericAPIHonoErrorGenerator } from "@fern-typescript/generic-hono-error-generators";
import { ErrorResolver, PackageResolver, TypeResolver } from "@fern-typescript/resolvers";
import { TypeGenerator } from "@fern-typescript/type-generator";
import { TypeReferenceExampleGenerator } from "@fern-typescript/type-reference-example-generator";
import { TypeSchemaGenerator } from "@fern-typescript/type-schema-generator";
import { SourceFile } from "ts-morph";

import { EndpointDeclarationReferencer } from "../declaration-referencers/EndpointDeclarationReferencer";
import { HonoErrorDeclarationReferencer } from "../declaration-referencers/HonoErrorDeclarationReferencer";
import { HonoInlinedRequestBodyDeclarationReferencer } from "../declaration-referencers/HonoInlinedRequestBodyDeclarationReferencer";
import { HonoServiceDeclarationReferencer } from "../declaration-referencers/HonoServiceDeclarationReferencer";
import { GenericAPIHonoErrorDeclarationReferencer } from "../declaration-referencers/GenericAPIHonoErrorDeclarationReferencer";
import { JsonDeclarationReferencer } from "../declaration-referencers/JsonDeclarationReferencer";
import { TypeDeclarationReferencer } from "../declaration-referencers/TypeDeclarationReferencer";
import { HonoEndpointTypeSchemasContextImpl } from "./hono-endpoint-type-schemas/HonoEndpointTypeSchemasContextImpl";
import { HonoErrorContextImpl } from "./hono-error/HonoErrorContextImpl";
import { HonoErrorSchemaContextImpl } from "./hono-error-schema/HonoErrorSchemaContextImpl";
import { HonoInlinedRequestBodyContextImpl } from "./hono-inlined-request-body/HonoInlinedRequestBodyContextImpl";
import { HonoInlinedRequestBodySchemaContextImpl } from "./hono-inlined-request-body-schema/HonoInlinedRequestBodySchemaContextImpl";
import { HonoRegisterContextImpl } from "./hono-register/HonoRegisterContextImpl";
import { HonoServiceContextImpl } from "./hono-service/HonoServiceContextImpl";
import { GenericAPIHonoErrorContextImpl } from "./generic-api-hono-error/GenericAPIHonoErrorContextImpl";
import { JsonContextImpl } from "./json/JsonContextImpl";
import { TypeContextImpl } from "./type/TypeContextImpl";
import { TypeSchemaContextImpl } from "./type-schema/TypeSchemaContextImpl";

export declare namespace HonoContextImpl {
    export interface Init {
        logger: Logger;
        sourceFile: SourceFile;
        importsManager: ImportsManager;
        exportsManager: ExportsManager;
        dependencyManager: DependencyManager;
        coreUtilitiesManager: CoreUtilitiesManager;
        fernConstants: Constants;

        typeResolver: TypeResolver;
        typeGenerator: TypeGenerator;
        typeSchemaDeclarationReferencer: TypeDeclarationReferencer;
        typeSchemaGenerator: TypeSchemaGenerator;
        typeDeclarationReferencer: TypeDeclarationReferencer;
        typeReferenceExampleGenerator: TypeReferenceExampleGenerator;
        packageResolver: PackageResolver;
        honoInlinedRequestBodyDeclarationReferencer: HonoInlinedRequestBodyDeclarationReferencer;
        honoInlinedRequestBodyGenerator: HonoInlinedRequestBodyGenerator;
        honoInlinedRequestBodySchemaGenerator: HonoInlinedRequestBodySchemaGenerator;
        honoInlinedRequestBodySchemaDeclarationReferencer: HonoInlinedRequestBodyDeclarationReferencer;
        honoEndpointSchemaDeclarationReferencer: EndpointDeclarationReferencer;
        honoEndpointTypeSchemasGenerator: HonoEndpointTypeSchemasGenerator;
        honoServiceGenerator: HonoServiceGenerator;
        honoServiceDeclarationReferencer: HonoServiceDeclarationReferencer;
        errorDeclarationReferencer: HonoErrorDeclarationReferencer;
        jsonDeclarationReferencer: JsonDeclarationReferencer;
        honoErrorGenerator: HonoErrorGenerator;
        errorResolver: ErrorResolver;
        genericAPIHonoErrorDeclarationReferencer: GenericAPIHonoErrorDeclarationReferencer;
        genericAPIHonoErrorGenerator: GenericAPIHonoErrorGenerator;
        treatUnknownAsAny: boolean;
        honoRegisterGenerator: HonoRegisterGenerator;
        honoErrorSchemaDeclarationReferencer: HonoErrorDeclarationReferencer;
        honoErrorSchemaGenerator: HonoErrorSchemaGenerator;
        includeSerdeLayer: boolean;
        retainOriginalCasing: boolean;
        useBigInt: boolean;
        enableInlineTypes: boolean;
        allowExtraFields: boolean;
        omitUndefined: boolean;
        relativePackagePath: string;
        relativeTestPath: string;
        generateReadWriteOnlyTypes: boolean;
    }
}

export class HonoContextImpl implements HonoContext {
    public readonly logger: Logger;
    public readonly sourceFile: SourceFile;
    public readonly externalDependencies: ExternalDependencies;
    public readonly coreUtilities: CoreUtilities;
    public readonly fernConstants: Constants;
    public readonly includeSerdeLayer: boolean;
    public readonly importsManager: ImportsManager;

    public readonly type: TypeContextImpl;
    public readonly typeSchema: TypeSchemaContextImpl;

    public readonly honoInlinedRequestBody: HonoInlinedRequestBodyContextImpl;
    public readonly honoInlinedRequestBodySchema: HonoInlinedRequestBodySchemaContextImpl;
    public readonly honoEndpointTypeSchemas: HonoEndpointTypeSchemasContextImpl;
    public readonly honoService: HonoServiceContextImpl;
    public readonly honoError: HonoErrorContextImpl;
    public readonly genericAPIHonoError: GenericAPIHonoErrorContext;
    public readonly honoRegister: HonoRegisterContext;
    public readonly honoErrorSchema: HonoErrorSchemaContext;
    public readonly jsonContext: JsonContext;

    constructor({
        logger,
        typeResolver,
        typeGenerator,
        typeDeclarationReferencer,
        typeSchemaDeclarationReferencer,
        typeSchemaGenerator,
        typeReferenceExampleGenerator,
        honoInlinedRequestBodyDeclarationReferencer,
        honoInlinedRequestBodyGenerator,
        honoEndpointSchemaDeclarationReferencer,
        honoEndpointTypeSchemasGenerator,
        honoInlinedRequestBodySchemaDeclarationReferencer,
        honoInlinedRequestBodySchemaGenerator,
        packageResolver,
        honoServiceGenerator,
        honoServiceDeclarationReferencer,
        errorDeclarationReferencer,
        errorResolver,
        honoErrorGenerator,
        genericAPIHonoErrorDeclarationReferencer,
        genericAPIHonoErrorGenerator,
        treatUnknownAsAny,
        sourceFile,
        importsManager,
        exportsManager,
        dependencyManager,
        coreUtilitiesManager,
        fernConstants,
        honoRegisterGenerator,
        honoErrorSchemaDeclarationReferencer,
        jsonDeclarationReferencer,
        honoErrorSchemaGenerator,
        includeSerdeLayer,
        retainOriginalCasing,
        enableInlineTypes,
        allowExtraFields,
        omitUndefined,
        useBigInt,
        relativePackagePath,
        relativeTestPath,
        generateReadWriteOnlyTypes
    }: HonoContextImpl.Init) {
        this.logger = logger;
        this.includeSerdeLayer = includeSerdeLayer;
        this.sourceFile = sourceFile;
        this.importsManager = importsManager;
        this.externalDependencies = createExternalDependencies({
            dependencyManager,
            importsManager
        });
        this.coreUtilities = coreUtilitiesManager.getCoreUtilities({
            sourceFile,
            importsManager,
            exportsManager,
            relativePackagePath,
            relativeTestPath
        });
        this.fernConstants = fernConstants;

        this.type = new TypeContextImpl({
            sourceFile,
            importsManager,
            exportsManager,
            typeResolver,
            typeDeclarationReferencer,
            typeGenerator,
            typeReferenceExampleGenerator,
            treatUnknownAsAny,
            includeSerdeLayer,
            retainOriginalCasing,
            useBigInt,
            enableInlineTypes,
            allowExtraFields,
            omitUndefined,
            context: this,
            generateReadWriteOnlyTypes
        });
        this.typeSchema = new TypeSchemaContextImpl({
            sourceFile,
            coreUtilities: this.coreUtilities,
            importsManager,
            exportsManager,
            context: this,
            typeSchemaDeclarationReferencer,
            typeDeclarationReferencer,
            typeGenerator,
            typeSchemaGenerator,
            treatUnknownAsAny,
            includeSerdeLayer,
            retainOriginalCasing,
            useBigInt,
            enableInlineTypes,
            allowExtraFields,
            omitUndefined,
            generateReadWriteOnlyTypes
        });
        this.jsonContext = new JsonContextImpl({
            importsManager,
            exportsManager,
            jsonDeclarationReferencer,
            sourceFile
        });
        this.honoInlinedRequestBody = new HonoInlinedRequestBodyContextImpl({
            honoInlinedRequestBodyDeclarationReferencer,
            honoInlinedRequestBodyGenerator,
            packageResolver,
            sourceFile: this.sourceFile,
            importsManager,
            exportsManager,
            retainOriginalCasing,
            includeSerdeLayer
        });
        this.honoInlinedRequestBodySchema = new HonoInlinedRequestBodySchemaContextImpl({
            packageResolver,
            importsManager,
            exportsManager,
            sourceFile,
            honoInlinedRequestBodySchemaGenerator,
            honoInlinedRequestBodySchemaDeclarationReferencer
        });
        this.honoEndpointTypeSchemas = new HonoEndpointTypeSchemasContextImpl({
            packageResolver,
            honoEndpointTypeSchemasGenerator,
            honoEndpointSchemaDeclarationReferencer,
            importsManager,
            exportsManager,
            sourceFile
        });
        this.honoService = new HonoServiceContextImpl({
            packageResolver,
            honoServiceGenerator,
            honoServiceDeclarationReferencer,
            importsManager,
            exportsManager,
            sourceFile
        });
        this.honoError = new HonoErrorContextImpl({
            sourceFile,
            importsManager,
            errorDeclarationReferencer,
            honoErrorGenerator,
            errorResolver,
            exportsManager
        });
        this.honoErrorSchema = new HonoErrorSchemaContextImpl({
            sourceFile,
            importsManager,
            honoErrorSchemaGenerator,
            honoErrorSchemaDeclarationReferencer,
            errorResolver,
            coreUtilities: this.coreUtilities,
            exportsManager
        });
        this.genericAPIHonoError = new GenericAPIHonoErrorContextImpl({
            genericAPIHonoErrorDeclarationReferencer,
            genericAPIHonoErrorGenerator,
            importsManager,
            exportsManager,
            sourceFile: this.sourceFile
        });
        this.honoRegister = new HonoRegisterContextImpl({
            honoRegisterGenerator
        });
    }
}
