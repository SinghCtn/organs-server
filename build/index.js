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
Object.defineProperty(exports, "__esModule", { value: true });
const serverConfig_1 = require("./config/serverConfig");
const graphql_1 = require("./graphql");
const server = () => __awaiter(void 0, void 0, void 0, function* () {
    const PORT = Number(process.env.PORT || 8000);
    const app = yield (0, serverConfig_1.ServerConfig)();
    if (app) {
        (0, graphql_1.graphqlServerSetup)(app);
        app.listen(PORT, () => console.log(`Server is Up 🚀 and Running on port: ${PORT}`));
    }
});
server();
