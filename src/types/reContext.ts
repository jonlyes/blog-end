import { Context} from "koa";
import { IncomingMessage } from "http";

interface ReContext<F = any, B = any> extends Context {
  req: IncomingMessage & {
    file?: F;
    body?: B;
  };
}

export default ReContext;
