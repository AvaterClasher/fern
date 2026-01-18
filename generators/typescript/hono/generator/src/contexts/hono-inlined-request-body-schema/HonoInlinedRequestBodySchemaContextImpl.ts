import { Name } from "@fern-fern/ir-sdk/api";
import { ExportsManager, ImportsManager, PackageId, Reference } from "@fern-typescript/commons";
import {
    HonoInlinedRequestBodySchemaContext,
    GeneratedHonoInlinedRequestBodySchema
} from "@fern-typescript/contexts";
import { HonoInlinedRequestBodySchemaGenerator } from "@fern-typescript/hono-inlined-request-body-schema-generator";
import { PackageResolver } from "@fern-typescript/resolvers";
import { SourceFile } from "ts-morph";

import { HonoInlinedRequestBodyDeclarationReferencer } from "../../declaration-referencers/HonoInlinedRequestBodyDeclarationReferencer";
import { getSchemaImportStrategy } from "../getSchemaImportStrategy";

export declare namespace HonoInlinedRequestBodySchemaContextImpl {
    export interface Init {
        honoInlinedRequestBodySchemaGenerator: HonoInlinedRequestBodySchemaGenerator;
        honoInlinedRequestBodySchemaDeclarationReferencer: HonoInlinedRequestBodyDeclarationReferencer;
        packageResolver: PackageResolver;
        sourceFile: SourceFile;
        importsManager: ImportsManager;
        exportsManager: ExportsManager;
    }
}

export class HonoInlinedRequestBodySchemaContextImpl implements HonoInlinedRequestBodySchemaContext {
    private honoInlinedRequestBodySchemaGenerator: HonoInlinedRequestBodySchemaGenerator;
    private honoInlinedRequestBodySchemaDeclarationReferencer: HonoInlinedRequestBodyDeclarationReferencer;
    private packageResolver: PackageResolver;
    private sourceFile: SourceFile;
    private importsManager: ImportsManager;
    private exportsManager: ExportsManager;
    constructor({
        importsManager,
        exportsManager,
        packageResolver,
        sourceFile,
        honoInlinedRequestBodySchemaDeclarationReferencer,
        honoInlinedRequestBodySchemaGenerator
    }: HonoInlinedRequestBodySchemaContextImpl.Init) {
        this.honoInlinedRequestBodySchemaGenerator = honoInlinedRequestBodySchemaGenerator;
        this.honoInlinedRequestBodySchemaDeclarationReferencer =
            honoInlinedRequestBodySchemaDeclarationReferencer;
        this.sourceFile = sourceFile;
        this.importsManager = importsManager;
        this.exportsManager = exportsManager;
        this.packageResolver = packageResolver;
    }

    public getGeneratedInlinedRequestBodySchema(
        packageId: PackageId,
        endpointName: Name
    ): GeneratedHonoInlinedRequestBodySchema {
        const serviceDeclaration = this.packageResolver.getServiceDeclarationOrThrow(packageId);
        const endpoint = serviceDeclaration.endpoints.find(
            (endpoint) => endpoint.name.originalName === endpointName.originalName
        );
        if (endpoint == null) {
            throw new Error(`Endpoint ${endpointName.originalName} does not exist`);
        }
        return this.honoInlinedRequestBodySchemaGenerator.generateInlinedRequestBodySchema({
            packageId,
            endpoint,
            typeName: this.honoInlinedRequestBodySchemaDeclarationReferencer.getExportedName({
                packageId,
                endpoint
            })
        });
    }

    public getReferenceToInlinedRequestBody(packageId: PackageId, endpointName: Name): Reference {
        const serviceDeclaration = this.packageResolver.getServiceDeclarationOrThrow(packageId);
        const endpoint = serviceDeclaration.endpoints.find(
            (endpoint) => endpoint.name.originalName === endpointName.originalName
        );
        if (endpoint == null) {
            throw new Error(`Endpoint ${endpointName.originalName} does not exist`);
        }
        return this.honoInlinedRequestBodySchemaDeclarationReferencer.getReferenceToInlinedRequestBody({
            name: { packageId, endpoint },
            referencedIn: this.sourceFile,
            importsManager: this.importsManager,
            exportsManager: this.exportsManager,
            importStrategy: getSchemaImportStrategy({ useDynamicImport: false })
        });
    }
}
