import { ExportsManager, ImportsManager, PackageId, Reference } from "@fern-typescript/commons";
import { HonoServiceContext, GeneratedHonoService } from "@fern-typescript/contexts";
import { HonoServiceGenerator } from "@fern-typescript/hono-service-generator";
import { PackageResolver } from "@fern-typescript/resolvers";
import { SourceFile } from "ts-morph";

import { HonoServiceDeclarationReferencer } from "../../declaration-referencers/HonoServiceDeclarationReferencer";

export declare namespace HonoServiceContextImpl {
    export interface Init {
        honoServiceGenerator: HonoServiceGenerator;
        honoServiceDeclarationReferencer: HonoServiceDeclarationReferencer;
        packageResolver: PackageResolver;
        importsManager: ImportsManager;
        exportsManager: ExportsManager;
        sourceFile: SourceFile;
    }
}

export class HonoServiceContextImpl implements HonoServiceContext {
    private honoServiceGenerator: HonoServiceGenerator;
    private honoServiceDeclarationReferencer: HonoServiceDeclarationReferencer;
    private packageResolver: PackageResolver;
    private importsManager: ImportsManager;
    private exportsManager: ExportsManager;
    private sourceFile: SourceFile;

    constructor({
        honoServiceGenerator,
        honoServiceDeclarationReferencer,
        packageResolver,
        importsManager,
        exportsManager,
        sourceFile
    }: HonoServiceContextImpl.Init) {
        this.honoServiceGenerator = honoServiceGenerator;
        this.honoServiceDeclarationReferencer = honoServiceDeclarationReferencer;
        this.packageResolver = packageResolver;
        this.importsManager = importsManager;
        this.exportsManager = exportsManager;
        this.sourceFile = sourceFile;
    }

    public getGeneratedHonoService(packageId: PackageId): GeneratedHonoService {
        const serviceDeclaration = this.packageResolver.getServiceDeclarationOrThrow(packageId);
        return this.honoServiceGenerator.generateService({
            packageId,
            service: serviceDeclaration,
            serviceClassName: this.honoServiceDeclarationReferencer.getExportedNameOfService(packageId)
        });
    }

    public getReferenceToHonoService(packageId: PackageId, { importAlias }: { importAlias: string }): Reference {
        return this.honoServiceDeclarationReferencer.getReferenceToService({
            name: packageId,
            importsManager: this.importsManager,
            exportsManager: this.exportsManager,
            importStrategy: { type: "direct", alias: importAlias },
            referencedIn: this.sourceFile
        });
    }
}
