import { Name } from "@fern-fern/ir-sdk/api";
import { ExportsManager, ImportsManager, PackageId, Reference } from "@fern-typescript/commons";
import { HonoEndpointTypeSchemasContext, GeneratedHonoEndpointTypeSchemas } from "@fern-typescript/contexts";
import { HonoEndpointTypeSchemasGenerator } from "@fern-typescript/hono-endpoint-type-schemas-generator";
import { PackageResolver } from "@fern-typescript/resolvers";
import { SourceFile } from "ts-morph";

import { EndpointDeclarationReferencer } from "../../declaration-referencers/EndpointDeclarationReferencer";
import { getSchemaImportStrategy } from "../getSchemaImportStrategy";

export declare namespace HonoEndpointTypeSchemasContextImpl {
    export interface Init {
        honoEndpointTypeSchemasGenerator: HonoEndpointTypeSchemasGenerator;
        honoEndpointSchemaDeclarationReferencer: EndpointDeclarationReferencer;
        packageResolver: PackageResolver;
        sourceFile: SourceFile;
        importsManager: ImportsManager;
        exportsManager: ExportsManager;
    }
}

export class HonoEndpointTypeSchemasContextImpl implements HonoEndpointTypeSchemasContext {
    private honoEndpointTypeSchemasGenerator: HonoEndpointTypeSchemasGenerator;
    private packageResolver: PackageResolver;
    private honoEndpointSchemaDeclarationReferencer: EndpointDeclarationReferencer;
    private sourceFile: SourceFile;
    private importsManager: ImportsManager;
    private exportsManager: ExportsManager;

    constructor({
        sourceFile,
        importsManager,
        exportsManager,
        honoEndpointTypeSchemasGenerator,
        honoEndpointSchemaDeclarationReferencer,
        packageResolver
    }: HonoEndpointTypeSchemasContextImpl.Init) {
        this.sourceFile = sourceFile;
        this.importsManager = importsManager;
        this.exportsManager = exportsManager;
        this.packageResolver = packageResolver;
        this.honoEndpointTypeSchemasGenerator = honoEndpointTypeSchemasGenerator;
        this.honoEndpointSchemaDeclarationReferencer = honoEndpointSchemaDeclarationReferencer;
    }

    public getGeneratedEndpointTypeSchemas(
        packageId: PackageId,
        endpointName: Name
    ): GeneratedHonoEndpointTypeSchemas {
        const serviceDeclaration = this.packageResolver.getServiceDeclarationOrThrow(packageId);
        const endpoint = serviceDeclaration.endpoints.find(
            (endpoint) => endpoint.name.originalName === endpointName.originalName
        );
        if (endpoint == null) {
            throw new Error(`Endpoint ${endpointName.originalName} does not exist`);
        }
        return this.honoEndpointTypeSchemasGenerator.generateEndpointTypeSchemas({
            packageId,
            service: serviceDeclaration,
            endpoint
        });
    }

    public getReferenceToEndpointTypeSchemaExport(
        packageId: PackageId,
        endpointName: Name,
        export_: string | string[]
    ): Reference {
        const serviceDeclaration = this.packageResolver.getServiceDeclarationOrThrow(packageId);
        const endpoint = serviceDeclaration.endpoints.find(
            (endpoint) => endpoint.name.originalName === endpointName.originalName
        );
        if (endpoint == null) {
            throw new Error(`Endpoint ${endpointName.originalName} does not exist`);
        }
        return this.honoEndpointSchemaDeclarationReferencer.getReferenceToEndpointExport({
            name: { packageId, endpoint },
            referencedIn: this.sourceFile,
            importsManager: this.importsManager,
            exportsManager: this.exportsManager,
            importStrategy: getSchemaImportStrategy({ useDynamicImport: false }),
            subImport: typeof export_ === "string" ? [export_] : export_
        });
    }
}
