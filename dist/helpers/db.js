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
const typeorm_1 = require("typeorm");
const ormconfig_1 = __importDefault(require("../ormconfig"));
exports.DBConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    let connection;
    try {
        connection = typeorm_1.getConnection();
    }
    catch (e) { }
    try {
        if (connection) {
            if (!connection.isConnected) {
                yield connection.connect();
            }
        }
        else {
            yield typeorm_1.createConnection(ormconfig_1.default);
        }
        console.log('🌴 Database connection was successful!');
    }
    catch (e) {
        console.error('ERROR: Database connection failed!!', e);
        throw e;
    }
});
exports.TryDBConnect = (onError, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.DBConnect();
        if (next) {
            next();
        }
    }
    catch (e) {
        onError();
    }
});
//# sourceMappingURL=db.js.map