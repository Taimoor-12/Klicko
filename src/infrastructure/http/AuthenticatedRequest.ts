import type { Request } from "express";
import type { TokenPayload } from "../../application/interfaces/ITokenService.js";

export interface AuthenticatedRequest extends Request {
  user: TokenPayload
}
