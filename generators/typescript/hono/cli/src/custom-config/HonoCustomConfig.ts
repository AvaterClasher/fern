// this is the parsed config shape. to view the allowed options for generators.yml,
// see HonoCustomConfigSchema.ts
export interface HonoCustomConfig {
    useBrandedStringAliases: boolean;
    areImplementationsOptional: boolean;
    doNotHandleUnrecognizedErrors: boolean;
    includeUtilsOnUnionMembers: boolean;
    includeOtherInUnionTypes: boolean;
    treatUnknownAsAny: boolean;
    noSerdeLayer: boolean;
    skipRequestValidation: boolean;
    skipResponseValidation: boolean;
    requestValidationStatusCode: number;
    outputEsm: boolean;
    outputSourceFiles: boolean;
    retainOriginalCasing: boolean;
    allowExtraFields: boolean;
    useBigInt: boolean;
    noOptionalProperties: boolean;
    enableInlineTypes: boolean;
    packagePath: string | undefined;
    packageManager: "pnpm" | "yarn";
    linter: "biome" | "oxlint" | "none";
    formatter: "prettier" | "biome" | "oxfmt" | "none";
    enableForwardCompatibleEnums: boolean;

    // Hono-specific
    runtime: "node" | "bun" | "deno" | "cloudflare-workers" | "edge" | "auto";
    useHonoValidator: boolean;
    useFactoryPattern: boolean;
    includeRPCTypes: boolean;
    optimizeForEdge: boolean;
}
