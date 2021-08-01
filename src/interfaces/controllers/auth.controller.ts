import { ExtendableContext } from "koa";

interface IAuthController {
  login: (ctx: ExtendableContext) => Promise<void>,
  register: (ctx: ExtendableContext) => Promise<void>
}

export default IAuthController;
