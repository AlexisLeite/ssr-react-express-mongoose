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
const chalk_1 = __importDefault(require("chalk"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const process_1 = require("process");
const connectDb_1 = __importDefault(require("./connectDb"));
const routes_1 = __importDefault(require("./routes"));
function createApp() {
    return __awaiter(this, void 0, void 0, function* () {
        dotenv_1.default.config();
        const app = (0, express_1.default)();
        const port = process.env.PORT;
        const connectionResult = yield (0, connectDb_1.default)();
        if (!connectionResult) {
            console.log(chalk_1.default.red('Could not connect the database. Application terminated.'));
            (0, process_1.exit)();
        }
        console.log(chalk_1.default.green('Database started successfully.'));
        console.log('Creating application routes.');
        app.get('/', (req, res) => {
            res.send('Hello world');
        });
        app.use('/api', routes_1.default);
        app.listen(port, () => {
            console.log(chalk_1.default.green('Everythink is ok, app is running.'));
        });
    });
}
exports.default = createApp;
