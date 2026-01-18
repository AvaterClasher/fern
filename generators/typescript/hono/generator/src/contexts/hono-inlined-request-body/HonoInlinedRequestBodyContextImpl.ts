import { Name } from "@fern-fern/ir-sdk/api";
import { ExportsManager, ImportsManager, PackageId, Reference } from "@fern-typescript/commons";
import { HonoInlinedRequestBodyContext, GeneratedHonoInlinedRequestBody } from "@fern-typescript/contexts";
import { HonoInlinedRequestBodyGenerator } from "@fern-typescript/hono-inlined-request-body-generator";
import { PackageResolver } from "@fern-typescript/resolvers";
import { SourceFile } from "ts-morph";

import { HonoInlinedRequestBodyDeclarationReferencer } from "../../declaration-referencers/HonoInlinedRequestBodyDeclarationReferencer";

export declare namespace HonoInlinedRequestBodyContextImpl {
    export interface Init {
        honoInlinedRequestBodyGenerator: HonoInlinedRequestBodyGenerator;
        honoInlinedRequestBodyDeclarationReferencer: HonoInlinedRequestBodyDeclarationReferencer;
        packageResolver: PackageResolver;
        importsManager: ImportsManager;
        exportsManager: ExportsManager;
        sourceFile: SourceFile;
        retainOriginalCasing: boolean;
        includeSerdeLayer: boolean;
    }
}

export class HonoInlinedRequestBodyContextImpl implements HonoInlinedRequestBodyContext {
    private honoInlinedRequestBodyGenerator: HonoInlinedRequestBodyGenerator;
    private honoInlinedRequestBodyDeclarationReferencer: HonoInlinedRequestBodyDeclarationReferencer;
    private packageResolver: PackageResolver;
    private importsManager: ImportsManager;
    private exportsManager: ExportsManager;
    private sourceFile: SourceFile;
    private retainOriginalCasing: boolean;
    private includeSerdeLayer: boolean;

    constructor({
        honoInlinedRequestBodyGenerator,
        honoInlinedRequestBodyDeclarationReferencer,
        packageResolver,
        importsManager,
        exportsManager,
        sourceFile,
        retainOriginalCasing,
        includeSerdeLayer
    }: HonoInlinedRequestBodyContextImpl.Init) {
        this.honoInlinedRequestBodyGenerator = honoInlinedRequestBodyGenerator;
        this.honoInlinedRequestBodyDeclarationReferencer = honoInlinedRequestBodyDeclarationReferencer;
        this.packageResolver = packageResolver;
        this.importsManager = importsManager;
        this.exportsManager = exportsManager;
        this.sourceFile = sourceFile;
        this.retainOriginalCasing = retainOriginalCasing;
        this.includeSerdeLayer = includeSerdeLayer;
    }

    public getGeneratedInlinedRequestBody(
        packageId: PackageId,
        endpointName: Name
    ): GeneratedHonoInlinedRequestBody {
        const serviceDeclaration = this.packageResolver.getServiceDeclarationOrThrow(packageId);
        const endpoint = serviceDeclaration.endpoints.find(
            (endpoint) => endpoint.name.originalName === endpointName.originalName
        );
        if (endpoint == null) {
            throw new Error(`Endpoint ${endpointName.originalName} does not exist`);
        }
        if (endpoint.requestBody?.type !== "inlinedRequestBody") {
            throw new Error("Request is not inlined");
        }
        return this.honoInlinedRequestBodyGenerator.generateInlinedRequestBody({
            requestBody: endpoint.requestBody,
            typeName: this.honoInlinedRequestBodyDeclarationReferencer.getExportedName({
                packageId,
                endpoint
            }),
            retainOriginalCasing: this.retainOriginalCasing,
            includeSerdeLayer: this.includeSerdeLayer
        });
    }

    public getReferenceToInlinedRequestBodyType(packageId: PackageId, endpointName: Name): Reference {
        const serviceDeclaration = this.packageResolver.getServiceDeclarationOrThrow(packageId);
        const endpoint = serviceDeclaration.endpoints.find(
            (endpoint) => endpoint.name.originalName === endpointName.originalName
        );
        if (endpoint == null) {
            throw new Error(`Endpoint ${endpointName.originalName} does not exist`);
        }
        return this.honoInlinedRequestBodyDeclarationReferencer.getReferenceToInlinedRequestBody({
            name: { packageId, endpoint },
            importsManager: this.importsManager,
            exportsManager: this.exportsManager,
            importStrategy: {
                type: "fromRoot",
                namespaceImport: this.honoInlinedRequestBodyDeclarationReferencer.namespaceExport
            },
            referencedIn: this.sourceFile
        });
    }
}
