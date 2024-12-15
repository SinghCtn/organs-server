"use strict";
// import { DataTypes, Sequelize } from "sequelize";
// import { sequelizeConfig } from "../config/dbConfig2"; // Import your configured sequelize instance
// const User = new Sequelize(sequelizeConfig).define(
//   "User",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     name: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//     },
//     dob: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     gender: {
//       type: DataTypes.ENUM("MALE", "FEMALE", "OTHER"),
//       allowNull: false,
//     },
//     phone: {
//       type: DataTypes.STRING(15),
//       allowNull: false,
//     },
//     email: {
//       type: DataTypes.STRING(255),
//       unique: true,
//       allowNull: false,
//     },
//     bloodGroup: {
//       type: DataTypes.ENUM(
//         "A_POSITIVE",
//         "A_NEGATIVE",
//         "B_POSITIVE",
//         "B_NEGATIVE",
//         "AB_POSITIVE",
//         "AB_NEGATIVE",
//         "O_POSITIVE",
//         "O_NEGATIVE"
//       ),
//       allowNull: false,
//     },
//     userType: {
//       type: DataTypes.ENUM("DONOR", "RECIPIENT"),
//       allowNull: false,
//     },
//   },
//   {
//     tableName: "Users", // Match table name
//     timestamps: false, // Disable automatic timestamps if your table does not include them
//   }
// );
// module.exports = User;
