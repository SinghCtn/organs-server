"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    development: {
        username: process.env.DB_USERNAME || "defaultUser",
        password: process.env.DB_PASSWORD || "defaultPassword",
        database: process.env.DB_NAME || "Invmgmt",
        host: "localhost",
        // host: "(localdb)\\MSSQLLocalDB",
        // host: process.env.DB_SERVER || "(localdb)\\mssqllocaldb",
        dialect: "mssql",
        dialectOptions: {
            options: {
                trustedConnection: true, // Use Windows Authentication
                enableArithAbort: true, // Enable ArithAbort for some SQL Server versions
                trustServerCertificate: true, // Trust the server certificate (important for localdb)
            },
        },
        logging: false, // Disable Sequelize logging
    },
};
