import { ExportsManager, ImportsManager, Reference } from "@fern-typescript/commons";
import { GeneratedGenericAPIHonoError, GenericAPIHonoErrorContext } from "@fern-typescript/contexts";
import { GenericAPIHonoErrorGenerator } from "@fern-typescript/generic-hono-error-generators";
import { SourceFile } from "ts-morph";

import { GenericAPIHonoErrorDeclarationReferencer } from "../../declaration-referencers/GenericAPIHonoErrorDeclarationReferencer";

export declare namespace GenericAPIHonoErrorContextImpl {
    export interface Init {
        genericAPIHonoErrorDeclarationReferencer: GenericAPIHonoErrorDeclarationReferencer;
        genericAPIHonoErrorGenerator: GenericAPIHonoErrorGenerator;
        importsManager: ImportsManager;
        exportsManager: ExportsManager;
        sourceFile: SourceFile;
    }
}

export class GenericAPIHonoErrorContextImpl implements GenericAPIHonoErrorContext {
    private genericAPIHonoErrorDeclarationReferencer: GenericAPIHonoErrorDeclarationReferencer;
    private genericAPIHonoErrorGenerator: GenericAPIHonoErrorGenerator;
    private importsManager: ImportsManager;
    private exportsManager: ExportsManager;
    private sourceFile: SourceFile;

    constructor({
        genericAPIHonoErrorDeclarationReferencer,
        genericAPIHonoErrorGenerator,
        importsManager,
        exportsManager,
        sourceFile
    }: GenericAPIHonoErrorContextImpl.Init) {
        this.importsManager = importsManager;
        this.exportsManager = exportsManager;
        this.sourceFile = sourceFile;
        this.genericAPIHonoErrorDeclarationReferencer = genericAPIHonoErrorDeclarationReferencer;
        this.genericAPIHonoErrorGenerator = genericAPIHonoErrorGenerator;
    }

    public getReferenceToGenericAPIHonoError(): Reference {
        return this.genericAPIHonoErrorDeclarationReferencer.getReferenceToError({
            importsManager: this.importsManager,
            exportsManager: this.exportsManager,
            referencedIn: this.sourceFile
        });
    }

    public getGeneratedGenericAPIHonoError(): GeneratedGenericAPIHonoError {
        return this.genericAPIHonoErrorGenerator.generateGenericAPIHonoError({
            errorClassName: this.genericAPIHonoErrorDeclarationReferencer.getExportedName()
        });
    }
}
