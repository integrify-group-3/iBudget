"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authorized_1 = require("../middlewares/authorized");
const user_1 = require("../controllers/user");
router.post('/register', user_1.registerUser);
router.post('/login', user_1.loginUser);
router.post('/login/google-auth', user_1.googleLogin);
router.put('/forgot-password', user_1.forgotPassword);
router.put('/reset-password', user_1.resetPassword);
router.get('/auth', authorized_1.isAuthorized, user_1.findOneUser);
router.put('/:id', authorized_1.isAuthorized, user_1.updateUser);
exports.default = router;
//# sourceMappingURL=user.js.map