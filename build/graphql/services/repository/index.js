"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
// fetching
__exportStar(require("./getOrgans"), exports);
__exportStar(require("./getOrganRequests"), exports);
__exportStar(require("./getUsers"), exports);
__exportStar(require("./getAdmins"), exports);
// Creation
__exportStar(require("./createUser"), exports);
__exportStar(require("./createOrgans"), exports);
__exportStar(require("./createOrganRequests"), exports);
__exportStar(require("./createAdmin"), exports);
// updates
__exportStar(require("./updateOrganRequests"), exports);
__exportStar(require("./updateOrgans"), exports);
