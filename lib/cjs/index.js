"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyliseN = exports.AddS = exports.REApp = exports.REOutput = exports.REValue = void 0;
const REValue_1 = require("./REValue");
Object.defineProperty(exports, "REValue", { enumerable: true, get: function () { return REValue_1.REValue; } });
const REOutput_1 = require("./REOutput");
Object.defineProperty(exports, "REOutput", { enumerable: true, get: function () { return REOutput_1.REOutput; } });
const REApp_1 = require("./REApp");
Object.defineProperty(exports, "REApp", { enumerable: true, get: function () { return REApp_1.REApp; } });
function AddS(stringToAdd, val) {
    return val == 1 ? stringToAdd : stringToAdd + "s";
}
exports.AddS = AddS;
function StyliseN(number) {
    return number.toLocaleString();
}
exports.StyliseN = StyliseN;
