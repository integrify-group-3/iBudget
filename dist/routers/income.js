"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorized_1 = require("../middlewares/authorized");
const income_1 = require("../controllers/income");
const router = express_1.default.Router();
router.get('/', authorized_1.isAuthorized, income_1.getIncome);
router.post('/', authorized_1.isAuthorized, income_1.addIncome);
router.put('/:id', authorized_1.isAuthorized, income_1.updateIncome);
router.delete('/:id', authorized_1.isAuthorized, income_1.deleteIncome);
exports.default = router;
//# sourceMappingURL=income.js.map