"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const calendarSchema = new mongoose_1.default.Schema({
    id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'user',
    },
    years: {
        type: Array,
        required: true,
        year: {
            type: Number,
            required: true,
            months: [
                {
                    type: Array,
                    required: true,
                    month: {
                        type: Object,
                        required: true,
                        name: {
                            type: String,
                            required: true
                        },
                        income: [
                            {
                                type: mongoose_1.default.Schema.Types.ObjectId,
                                ref: 'income',
                            }
                        ],
                        days: [
                            {
                                type: Array,
                                required: true,
                                day: {
                                    type: Object,
                                    required: true,
                                    expenses: [
                                        {
                                            type: mongoose_1.default.Schema.Types.ObjectId,
                                            ref: 'expense',
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                },
            ]
        }
    }
});
exports.default = mongoose_1.default.model('calendar', calendarSchema);
//# sourceMappingURL=Calendar.js.map