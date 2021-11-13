"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const SayHello = ({ name }) => (react_1.default.createElement("div", null,
    "Hey ",
    name,
    ", say hello to TypeScript."));
exports.default = SayHello;
