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
import { GeneratorContext } from "@fern-typescript/contexts";
import { SourceFile } from "ts-morph";

export declare namespace HonoContextImpl {
    export interface Init {
        logger: Logger;
        sourceFile: SourceFile;
        importsManager: ImportsManager;
        exportsManager: ExportsManager;
        dependencyManager: DependencyManager;
        coreUtilitiesManager: CoreUtilitiesManager;
        fernConstants: Constants;
    }
}

export class HonoContextImpl implements GeneratorContext {
    public readonly logger: Logger;
    public readonly version: string | undefined;
    public readonly sourceFile: SourceFile;
    public readonly externalDependencies: ExternalDependencies;
    public readonly coreUtilities: CoreUtilities;
    public readonly fernConstants: Constants;
    public readonly exportsManager: ExportsManager;

    constructor({
        logger,
        sourceFile,
        importsManager,
        exportsManager,
        dependencyManager,
        coreUtilitiesManager,
        fernConstants
    }: HonoContextImpl.Init) {
        this.logger = logger;
        this.version = undefined;
        this.sourceFile = sourceFile;
        this.exportsManager = exportsManager;
        this.fernConstants = fernConstants;

        this.externalDependencies = createExternalDependencies({
            importsManager,
            dependencyManager
        });

        this.coreUtilities = coreUtilitiesManager.getCoreUtilities({
            sourceFile,
            importsManager,
            exportsManager,
            relativePackagePath: "",
            relativeTestPath: ""
        });
    }

    public fail(): void {
        process.exit(1);
    }
}
