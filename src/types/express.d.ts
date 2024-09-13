// types/express.d.ts
import { User } from './User';

declare global {
    namespace Express {
        interface Request {
            User?: User;
        }
    }
}
