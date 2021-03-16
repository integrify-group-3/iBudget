"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//auth validators
exports.nameValidator = /[A-Za-z]{3,16}$/gi;
exports.emailValidator = /^[a-z0-9.-_]+@[a-z0-9.-_]+\.[a-z]{2,}$/gi;
exports.passwordValidator = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})';
//book validators
exports.isbnValidator = /[0-9]*[-| ][0-9]*[-| ][0-9]*[-| ][0-9]*[-| ][0-9]*/;
//# sourceMappingURL=regex.js.map