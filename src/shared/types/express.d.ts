import type { TokenPayload } from "../../application/interfaces/ITokenService";

declare module 'express' {
  export interface Request {
    user?: TokenPayload
  }
}
