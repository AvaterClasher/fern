import { Logger } from "@fern-api/logger";
import { FernGeneratorExec } from "@fern-fern/generator-exec-sdk";
import { IntermediateRepresentation } from "@fern-fern/ir-sdk/api";
import { AbstractGeneratorCli } from "@fern-typescript/abstract-generator-cli";
import { NpmPackage, PersistedTypescriptProject } from "@fern-typescript/commons";
import { GeneratorContext } from "@fern-typescript/contexts";
import { HonoGenerator } from "@fern-typescript/hono-generator";
import { camelCase, upperFirst } from "lodash-es";
import { HonoCustomConfig } from "./custom-config/HonoCustomConfig";
import { HonoCustomConfigSchema } from "./custom-config/schema/HonoCustomConfigSchema";

export class HonoGeneratorCli extends AbstractGeneratorCli<HonoCustomConfig> {
    protected parseCustomConfig(customConfig: unknown, logger: Logger): HonoCustomConfig {
        const parsed = customConfig != null ? HonoCustomConfigSchema.parse(customConfig) : undefined;
        const noSerdeLayer = parsed?.noSerdeLayer ?? false;
        const enableInlineTypes = false; // hardcode, not supported in Hono
        const config = {
            useBrandedStringAliases: parsed?.useBrandedStringAliases ?? false,
            areImplementationsOptional: parsed?.optionalImplementations ?? false,
            doNotHandleUnrecognizedErrors: parsed?.doNotHandleUnrecognizedErrors ?? false,
            includeUtilsOnUnionMembers: !noSerdeLayer && (parsed?.includeUtilsOnUnionMembers ?? false),
            includeOtherInUnionTypes: parsed?.includeOtherInUnionTypes ?? false,
            treatUnknownAsAny: parsed?.treatUnknownAsAny ?? false,
            noSerdeLayer,
            requestValidationStatusCode: parsed?.requestValidationStatusCode ?? 422,
            outputEsm: parsed?.outputEsm ?? false,
            outputSourceFiles: parsed?.outputSourceFiles ?? true,
            retainOriginalCasing: parsed?.retainOriginalCasing ?? false,
            allowExtraFields: parsed?.allowExtraFields ?? false,
            skipRequestValidation: parsed?.skipRequestValidation ?? false,
            skipResponseValidation: parsed?.skipResponseValidation ?? false,
            useBigInt: parsed?.useBigInt ?? false,
            noOptionalProperties: parsed?.noOptionalProperties ?? false,
            enableInlineTypes,
            packagePath: parsed?.packagePath ?? undefined,
            packageManager: parsed?.packageManager ?? "pnpm",
            linter: parsed?.linter ?? "biome",
            formatter: parsed?.formatter ?? "biome",
            enableForwardCompatibleEnums: parsed?.enableForwardCompatibleEnums ?? false,

            // Hono-specific
            runtime: parsed?.runtime ?? "auto",
            useHonoValidator: parsed?.useHonoValidator ?? false,
            useFactoryPattern: parsed?.useFactoryPattern ?? false,
            includeRPCTypes: parsed?.includeRPCTypes ?? false,
            optimizeForEdge: parsed?.optimizeForEdge ?? false
        };

        if (config.linter === "oxlint") {
            logger.warn(
                "Warning: oxlint is currently in beta. Use with caution. Type-aware linting is supported via the --type-aware flag."
            );
        }

        return config;
    }

    protected async generateTypescriptProject({
        config,
        customConfig,
        npmPackage,
        generatorContext,
        intermediateRepresentation
    }: {
        config: FernGeneratorExec.GeneratorConfig;
        customConfig: HonoCustomConfig;
        npmPackage: NpmPackage;
        generatorContext: GeneratorContext;
        intermediateRepresentation: IntermediateRepresentation;
    }): Promise<PersistedTypescriptProject> {
        const honoGenerator = new HonoGenerator({
            namespaceExport: `${upperFirst(camelCase(config.organization))}${upperFirst(
                camelCase(config.workspaceName)
            )}`,
            intermediateRepresentation,
            context: generatorContext,
            npmPackage,
            config: {
                shouldUseBrandedStringAliases: customConfig.useBrandedStringAliases,
                areImplementationsOptional: customConfig.areImplementationsOptional,
                doNotHandleUnrecognizedErrors: customConfig.doNotHandleUnrecognizedErrors,
                includeUtilsOnUnionMembers: customConfig.includeUtilsOnUnionMembers,
                includeOtherInUnionTypes: customConfig.includeOtherInUnionTypes,
                treatUnknownAsAny: customConfig.treatUnknownAsAny,
                includeSerdeLayer: !customConfig.noSerdeLayer,
                outputEsm: customConfig.outputEsm,
                retainOriginalCasing: customConfig.retainOriginalCasing,
                allowExtraFields: customConfig.allowExtraFields,
                skipRequestValidation: customConfig.skipRequestValidation,
                skipResponseValidation: customConfig.skipResponseValidation,
                requestValidationStatusCode: customConfig.requestValidationStatusCode,
                useBigInt: customConfig.useBigInt,
                noOptionalProperties: customConfig.noOptionalProperties,
                packagePath: customConfig.packagePath,
                packageManager: customConfig.packageManager,
                formatter: customConfig.formatter,
                linter: customConfig.linter,
                enableForwardCompatibleEnums: customConfig.enableForwardCompatibleEnums,

                // Hono-specific
                runtime: customConfig.runtime,
                useHonoValidator: customConfig.useHonoValidator,
                useFactoryPattern: customConfig.useFactoryPattern,
                includeRPCTypes: customConfig.includeRPCTypes,
                optimizeForEdge: customConfig.optimizeForEdge
            }
        });

        const typescriptProject = await honoGenerator.generate();
        const persistedTypescriptProject = await typescriptProject.persist();
        await honoGenerator.copyCoreUtilities({
            pathToSrc: persistedTypescriptProject.getSrcDirectory(),
            pathToRoot: persistedTypescriptProject.getRootDirectory()
        });

        return persistedTypescriptProject;
    }

    protected isPackagePrivate(): boolean {
        return false;
    }

    protected outputSourceFiles(customConfig: HonoCustomConfig): boolean {
        return customConfig.outputSourceFiles;
    }

    protected shouldTolerateRepublish(_customConfig: HonoCustomConfig): boolean {
        return false;
    }

    protected shouldSkipNpmPkgFix(_customConfig: HonoCustomConfig): boolean {
        return false;
    }

    protected publishToJsr(_customConfig: HonoCustomConfig): boolean {
        return false;
    }

    protected getPackageManager(customConfig: HonoCustomConfig): "pnpm" | "yarn" {
        return customConfig.packageManager;
    }
}
