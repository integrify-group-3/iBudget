"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const logger_1 = __importDefault(require("./logger"));
if (fs_1.default.existsSync('.env')) {
    logger_1.default.debug('Using .env file to supply config environment variables');
    dotenv_1.default.config({ path: '.env' });
}
else {
    logger_1.default.debug('Using .env.example file to supply config environment variables');
    dotenv_1.default.config({ path: '.env.example' }); // you can delete this after you create your own .env file!
}
exports.ENVIRONMENT = process.env.NODE_ENV;
const prod = exports.ENVIRONMENT === 'production'; // Anything else is treated as 'dev'
exports.SESSION_SECRET = process.env['SESSION_SECRET'];
exports.JWT_SECRET = process.env['SESSION_SECRET'];
exports.GOOGLE_API_KEY = process.env['GOOGLE_API_KEY'];
exports.RESET_PASSWORD_KEY = process.env['RESET_PASSWORD_KEY'];
exports.CLIENT_URL = process.env['CLIENT_URL'];
exports.MAILGUN_API_KEY = process.env['MAILGUN_API_KEY'];
exports.SENDGRID_API_KEY = process.env['SENDGRID_API_KEY'];
exports.MONGODB_URI = process.env['MONGODB_URI'];
if (!exports.SESSION_SECRET || !exports.JWT_SECRET) {
    logger_1.default.error('No client secret. Set SESSION_SECRET or JWT_SECRET environment variable.');
    process.exit(1);
}
if (!exports.MONGODB_URI) {
    if (prod) {
        logger_1.default.error('No mongo connection string. Set MONGODB_URI environment variable.');
    }
    else {
        logger_1.default.error('No mongo connection string. Set MONGODB_URI_LOCAL environment variable.');
    }
    process.exit(1);
}
//# sourceMappingURL=secrets.js.map