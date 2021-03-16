"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata"); // typeorm thing
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const lusca_1 = __importDefault(require("lusca"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const bluebird_1 = __importDefault(require("bluebird"));
const user_1 = __importDefault(require("./routers/user"));
const income_1 = __importDefault(require("./routers/income"));
const expense_1 = __importDefault(require("./routers/expense"));
const movie_1 = __importDefault(require("./routers/movie"));
const apiErrorHandler_1 = __importDefault(require("./middlewares/apiErrorHandler"));
const secrets_1 = require("./util/secrets");
const mongoUrl = secrets_1.MONGODB_URI;
const app = express_1.default();
//use cors
app.use(cors_1.default());
mongoose_1.default.Promise = bluebird_1.default;
mongoose_1.default
    .connect(mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})
    .then(() => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    console.log('MONGO DB connected');
})
    .catch((err) => {
    console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
    process.exit(1);
});
/*
  Calendar.insertMany(dbCalendar)
    .then((calendar) => {
        console.log('Data inserted', calendar)
    }).catch((error) => {
        console.log(error)      // Failure
    })*/
app.set('port', process.env.PORT || 3000);
// Use common 3rd-party middlewares
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(lusca_1.default.xframe('SAMEORIGIN'));
app.use(lusca_1.default.xssProtection(true));
// Use movie router
app.use('/api/v1/movies', movie_1.default);
app.use('/api/v1/user', user_1.default);
app.use('/api/v1/income', income_1.default);
app.use('/api/v1/expense', expense_1.default);
// Custom API error handler
app.use(apiErrorHandler_1.default);
app.use(express_1.default.static('client/build'));
app.get('*', function (req, res) {
    const fullPath = path_1.default.join(__dirname, '../client', 'build', 'index.html');
    res.sendFile(fullPath);
});
exports.default = app;
//# sourceMappingURL=app.js.map