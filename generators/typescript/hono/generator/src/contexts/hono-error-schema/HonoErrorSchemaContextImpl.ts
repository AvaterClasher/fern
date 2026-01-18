import { DeclaredErrorName } from "@fern-fern/ir-sdk/api";
import { CoreUtilities, ExportsManager, ImportsManager, Reference, Zurg } from "@fern-typescript/commons";
import { HonoErrorSchemaContext, GeneratedHonoErrorSchema } from "@fern-typescript/contexts";
import { HonoErrorSchemaGenerator } from "@fern-typescript/hono-error-schema-generator";
import { ErrorResolver } from "@fern-typescript/resolvers";
import { SourceFile } from "ts-morph";

import { HonoErrorDeclarationReferencer } from "../../declaration-referencers/HonoErrorDeclarationReferencer";
import { getSchemaImportStrategy } from "../getSchemaImportStrategy";

export declare namespace HonoErrorSchemaContextImpl {
    export interface Init {
        sourceFile: SourceFile;
        coreUtilities: CoreUtilities;
        importsManager: ImportsManager;
        exportsManager: ExportsManager;
        honoErrorSchemaDeclarationReferencer: HonoErrorDeclarationReferencer;
        honoErrorSchemaGenerator: HonoErrorSchemaGenerator;
        errorResolver: ErrorResolver;
    }
}

export class HonoErrorSchemaContextImpl implements HonoErrorSchemaContext {
    private sourceFile: SourceFile;
    private coreUtilities: CoreUtilities;
    private importsManager: ImportsManager;
    private exportsManager: ExportsManager;
    private honoErrorSchemaDeclarationReferencer: HonoErrorDeclarationReferencer;
    private honoErrorSchemaGenerator: HonoErrorSchemaGenerator;
    private errorResolver: ErrorResolver;

    constructor({
        sourceFile,
        coreUtilities,
        importsManager,
        exportsManager,
        honoErrorSchemaDeclarationReferencer,
        honoErrorSchemaGenerator,
        errorResolver
    }: HonoErrorSchemaContextImpl.Init) {
        this.sourceFile = sourceFile;
        this.coreUtilities = coreUtilities;
        this.importsManager = importsManager;
        this.exportsManager = exportsManager;
        this.honoErrorSchemaDeclarationReferencer = honoErrorSchemaDeclarationReferencer;
        this.honoErrorSchemaGenerator = honoErrorSchemaGenerator;
        this.errorResolver = errorResolver;
    }

    public getSchemaOfError(errorName: DeclaredErrorName): Zurg.Schema {
        const referenceToSchema = this.honoErrorSchemaDeclarationReferencer
            .getReferenceToError({
                name: errorName,
                importStrategy: getSchemaImportStrategy({
                    // use dynamic imports when schemas reference schemas,
                    // to avoid issues with circular imports
                    useDynamicImport: true
                }),
                importsManager: this.importsManager,
                exportsManager: this.exportsManager,
                referencedIn: this.sourceFile
            })
            .getExpression();

        return this.coreUtilities.zurg.lazy(this.coreUtilities.zurg.Schema._fromExpression(referenceToSchema));
    }

    public getGeneratedHonoErrorSchema(errorName: DeclaredErrorName): GeneratedHonoErrorSchema | undefined {
        const errorDeclaration = this.errorResolver.getErrorDeclarationFromName(errorName);
        if (errorDeclaration.type == null) {
            return undefined;
        }
        return this.honoErrorSchemaGenerator.generateErrorSchema({
            errorDeclaration,
            errorName: this.honoErrorSchemaDeclarationReferencer.getExportedName(errorName),
            type: errorDeclaration.type
        });
    }

    public getReferenceToHonoErrorSchema(errorName: DeclaredErrorName): Reference {
        return this.honoErrorSchemaDeclarationReferencer.getReferenceToError({
            name: errorName,
            importStrategy: getSchemaImportStrategy({ useDynamicImport: false }),
            referencedIn: this.sourceFile,
            importsManager: this.importsManager,
            exportsManager: this.exportsManager
        });
    }
}
