import { HonoRegisterContext, GeneratedExpressRegister } from "@fern-typescript/contexts";
import { HonoRegisterGenerator } from "@fern-typescript/hono-register-generator";

export declare namespace HonoRegisterContextImpl {
    export interface Init {
        honoRegisterGenerator: HonoRegisterGenerator;
    }
}

export class HonoRegisterContextImpl implements HonoRegisterContext {
    private honoRegisterGenerator: HonoRegisterGenerator;

    constructor({ honoRegisterGenerator }: HonoRegisterContextImpl.Init) {
        this.honoRegisterGenerator = honoRegisterGenerator;
    }

    public getGeneratedExpressRegister(): GeneratedExpressRegister | undefined {
        return this.honoRegisterGenerator.generateRegisterFunction();
    }
}
