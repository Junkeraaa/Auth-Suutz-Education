"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const config_1 = require("../config/config");
class AuthService {
    register(email, password, role) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            const userId = yield UserRepository_1.default.createUser({ email, password: hashedPassword, role });
            return this.generateToken({ id: userId, email, role });
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserRepository_1.default.findByEmail(email);
            if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
                throw new Error('Invalid email or password');
            }
            return this.generateToken({ id: user.id, email: user.email, role: user.role });
        });
    }
    generateToken(user) {
        return jsonwebtoken_1.default.sign(user, config_1.jwtSecret, { expiresIn: config_1.jwtExpiresIn });
    }
}
exports.default = new AuthService();
