import { AbsoluteFilePath } from "@fern-api/fs-utils";
import { IntermediateRepresentation } from "@fern-fern/ir-sdk/api";
import {
    CoreUtilitiesManager,
    DependencyManager,
    ExportsManager,
    NpmPackage,
    SimpleTypescriptProject,
    TypescriptProject
} from "@fern-typescript/commons";
import { GeneratorContext } from "@fern-typescript/contexts";
import { TypeGenerator } from "@fern-typescript/type-generator";
import { TypeSchemaGenerator } from "@fern-typescript/type-schema-generator";
import { Directory, Project } from "ts-morph";

export declare namespace HonoGenerator {
    export interface Init {
        namespaceExport: string;
        intermediateRepresentation: IntermediateRepresentation;
        context: GeneratorContext;
        npmPackage: NpmPackage;
        config: Config;
    }

    export interface Config {
        shouldUseBrandedStringAliases: boolean;
        areImplementationsOptional: boolean;
        doNotHandleUnrecognizedErrors: boolean;
        includeUtilsOnUnionMembers: boolean;
        includeOtherInUnionTypes: boolean;
        treatUnknownAsAny: boolean;
        includeSerdeLayer: boolean;
        outputEsm: boolean;
        retainOriginalCasing: boolean;
        allowExtraFields: boolean;
        skipRequestValidation: boolean;
        skipResponseValidation: boolean;
        requestValidationStatusCode: number;
        useBigInt: boolean;
        noOptionalProperties: boolean;
        packagePath: string | undefined;
        packageManager: "pnpm" | "yarn";
        formatter: "prettier" | "biome" | "oxfmt" | "none";
        linter: "biome" | "oxlint" | "none";
        enableForwardCompatibleEnums: boolean;

        // Hono-specific
        runtime: "node" | "bun" | "deno" | "cloudflare-workers" | "edge" | "auto";
        useHonoValidator: boolean;
        useFactoryPattern: boolean;
        includeRPCTypes: boolean;
        optimizeForEdge: boolean;
    }
}

export class HonoGenerator {
    private context: GeneratorContext;
    private intermediateRepresentation: IntermediateRepresentation;
    private npmPackage: NpmPackage;
    private config: HonoGenerator.Config;

    private defaultSrcDirectory: string;
    private defaultTestDirectory: string;

    private project: Project;
    private rootDirectory: Directory;
    private exportsManager: ExportsManager;
    private dependencyManager = new DependencyManager();
    private coreUtilitiesManager: CoreUtilitiesManager;

    constructor({ namespaceExport, intermediateRepresentation, context, npmPackage, config }: HonoGenerator.Init) {
        this.context = context;
        this.intermediateRepresentation = intermediateRepresentation;
        this.npmPackage = npmPackage;
        this.config = config;

        this.defaultSrcDirectory = "src";
        this.defaultTestDirectory = "tests";

        this.exportsManager = new ExportsManager({ packagePath: config.packagePath });
        this.coreUtilitiesManager = new CoreUtilitiesManager({
            streamType: "wrapper",
            formDataSupport: "Node16",
            fetchSupport: "node-fetch",
            relativePackagePath: this.getRelativePackagePath(),
            relativeTestPath: this.getRelativeTestPath(),
            generateEndpointMetadata: false,
            customPagerName: "CustomPager"
        });

        this.project = new Project({
            useInMemoryFileSystem: true
        });
        this.rootDirectory = this.project.createDirectory("/");
    }

    public async generate(): Promise<TypescriptProject> {
        // Stub implementation - returns empty project for now
        return new SimpleTypescriptProject({
            runScripts: true,
            npmPackage: this.npmPackage,
            dependencies: this.dependencyManager.getDependencies(),
            tsMorphProject: this.project,
            outputEsm: this.config.outputEsm,
            extraDependencies: {},
            extraDevDependencies: {},
            extraFiles: {},
            extraScripts: {},
            extraPeerDependencies: {},
            extraPeerDependenciesMeta: {},
            resolutions: {},
            extraConfigs: undefined,
            outputJsr: false,
            exportSerde: false,
            useLegacyExports: true,
            packageManager: this.config.packageManager,
            testPath: this.getRelativeTestPath(),
            formatter: this.config.formatter,
            linter: this.config.linter
        });
    }

    public async copyCoreUtilities({
        pathToSrc,
        pathToRoot
    }: {
        pathToSrc: AbsoluteFilePath;
        pathToRoot: AbsoluteFilePath;
    }): Promise<void> {
        await this.coreUtilitiesManager.copyCoreUtilities({ pathToSrc, pathToRoot });
    }

    private getRelativePackagePath(): string {
        return this.config.packagePath ?? "";
    }

    private getRelativeTestPath(): string {
        return "tests";
    }
}
