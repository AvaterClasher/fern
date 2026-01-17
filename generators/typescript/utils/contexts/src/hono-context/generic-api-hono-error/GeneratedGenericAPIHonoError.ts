import { MethodDeclarationStructure, OptionalKind, ts } from "ts-morph";

export interface GeneratedGenericAPIHonoError {
    writeToFile: (context: any) => void;
    toResponse: (args: { error: ts.Expression; honoContext: ts.Expression }) => ts.Expression;
    getErrorClassName: (args: { referenceToError: ts.Expression }) => ts.Expression;
    implementToResponse: (
        context: any,
        generateBody: ({ honoContext }: { honoContext: ts.Expression }) => ts.Statement[]
    ) => OptionalKind<MethodDeclarationStructure>;
    getConstructorArguments: (args: { errorName: string }) => ts.Expression[];
}
