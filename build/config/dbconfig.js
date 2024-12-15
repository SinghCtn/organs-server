"use strict";
// import sql from "mssql/msnodesqlv8";
// export const sqlConfig = {
//   server: process.env.DB_SERVER || "(localdb)\\mssqllocaldb",
//   // server: process.env.DB_SERVER || "127.0.0.1:1433",
//   // server: "sqlserver://127.0.0.1:1433",
//   database: process.env.DB_NAME || "Invmgmt",
//   driver: "msnodesqlv8",
//   options: {
//     trustedConnection: true,
//   },
// };
// // export const sqlConfig = {
// //   server: process.env.DB_SERVER || "(localdb)\\mssqllocaldb",
// //   database: process.env.DB_NAME || "Invmgmt",
// //   driver: "msnodesqlv8",
// //   options: {
// //     user: process.env.DB_USER || "sa", // Add your username here or use environment variables
// //     password: process.env.DB_PASSWORD || "ariel@123", // Add your password here or use environment variables
// //     trustedConnection: false, // Set to false when using SQL Server Authentication
// //   },
// // };
// let pool: sql.ConnectionPool | null = null;
// export const connectToDb = async () => {
//   try {
//     if (!pool) {
//       console.log("Establishing a connection to DB");
//       pool = await sql.connect(sqlConfig);
//       console.log("Connected to SQL Server⚓");
//     }
//     return pool;
//   } catch (error) {
//     console.error("Database connection error: ", error);
//     throw new Error("Unable to connect DB🚩");
//   }
// };
