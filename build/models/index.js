"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const { Sequelize } = require("sequelize");
exports.sequelize = new Sequelize("Invmgmt", "sa", "ariel@123", {
    host: "localhost",
    port: 1434, // Your new port number
    dialect: "mssql",
    dialectModule: require("tedious"),
    dialectOptions: {
        options: {
            encrypt: true,
            trustServerCertificate: true,
        },
    },
});
