import { DeclaredErrorName, ErrorDeclaration } from "@fern-fern/ir-sdk/api";
import { ExportsManager, ImportsManager, Reference } from "@fern-typescript/commons";
import { HonoErrorContext, GeneratedExpressError } from "@fern-typescript/contexts";
import { HonoErrorGenerator } from "@fern-typescript/hono-error-generator";
import { ErrorResolver } from "@fern-typescript/resolvers";
import { SourceFile } from "ts-morph";

import { HonoErrorDeclarationReferencer } from "../../declaration-referencers/HonoErrorDeclarationReferencer";

export declare namespace HonoErrorContextImpl {
    export interface Init {
        sourceFile: SourceFile;
        importsManager: ImportsManager;
        exportsManager: ExportsManager;
        errorDeclarationReferencer: HonoErrorDeclarationReferencer;
        honoErrorGenerator: HonoErrorGenerator;
        errorResolver: ErrorResolver;
    }
}

export class HonoErrorContextImpl implements HonoErrorContext {
    private sourceFile: SourceFile;
    private importsManager: ImportsManager;
    private exportsManager: ExportsManager;
    private errorDeclarationReferencer: HonoErrorDeclarationReferencer;
    private honoErrorGenerator: HonoErrorGenerator;
    private errorResolver: ErrorResolver;

    constructor({
        sourceFile,
        importsManager,
        exportsManager,
        errorDeclarationReferencer,
        honoErrorGenerator,
        errorResolver
    }: HonoErrorContextImpl.Init) {
        this.sourceFile = sourceFile;
        this.importsManager = importsManager;
        this.exportsManager = exportsManager;
        this.errorDeclarationReferencer = errorDeclarationReferencer;
        this.honoErrorGenerator = honoErrorGenerator;
        this.errorResolver = errorResolver;
    }

    public getReferenceToError(errorName: DeclaredErrorName): Reference {
        return this.errorDeclarationReferencer.getReferenceToError({
            name: errorName,
            importStrategy: { type: "fromRoot", namespaceImport: this.errorDeclarationReferencer.namespaceExport },
            referencedIn: this.sourceFile,
            importsManager: this.importsManager,
            exportsManager: this.exportsManager
        });
    }

    public getGeneratedExpressError(errorName: DeclaredErrorName): GeneratedExpressError {
        return this.honoErrorGenerator.generateError({
            errorName: this.getErrorClassName(errorName),
            errorDeclaration: this.getErrorDeclaration(errorName)
        });
    }

    public getErrorDeclaration(errorName: DeclaredErrorName): ErrorDeclaration {
        return this.errorResolver.getErrorDeclarationFromName(errorName);
    }

    public getErrorClassName(errorName: DeclaredErrorName): string {
        return this.errorDeclarationReferencer.getExportedName(errorName);
    }
}
