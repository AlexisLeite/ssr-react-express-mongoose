"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const chalk_1 = __importDefault(require("chalk"));
function connectDb() {
    return new Promise((resolve) => {
        const mongoString = process.env.DB_URL;
        if (!mongoString)
            throw new Error('There is no DB url');
        const connection = mongoose_1.default.connect(mongoString);
        connection.then(() => {
            resolve(true);
        }).catch((error) => {
            console.error(error);
            resolve(false);
        });
        const database = mongoose_1.default.connection;
        database.on('error', (e) => {
            console.error(chalk_1.default.red('Database error: '), e);
        });
    });
}
exports.default = connectDb;
