import {JwtPayload} from "jsonwebtoken"
declare global {
    namespace Epress {
        interface Request {
            user?: JwtPayload
        }
    }
}