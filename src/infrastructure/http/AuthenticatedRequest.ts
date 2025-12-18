import type { Request } from "express";
import type { TokenPayload } from "../../application/interfaces/ITokenService";

export interface AuthenticatedRequest extends Request {
  user: TokenPayload
}
