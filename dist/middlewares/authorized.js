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
/* eslint-disable @typescript-eslint/ban-ts-ignore */
require('dotenv').config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secrets_1 = require("../util/secrets");
exports.isAuthorized = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('x-auth-token');
    console.log('this is the token from middleware auth', token);
    if (!token)
        return res.status(401).json({ msg: 'no token, authorization denied' });
    try {
        //verify token
        // console.log(token, req.header)
        const decoded = jsonwebtoken_1.default.verify(token, secrets_1.JWT_SECRET);
        //Add user from payload
        req.user = decoded;
        // console.log('this is req.user from middleware', req.user)
        next();
    }
    catch (e) {
        res.status(400).json({ msg: 'token is not valid' });
    }
});
//# sourceMappingURL=authorized.js.map