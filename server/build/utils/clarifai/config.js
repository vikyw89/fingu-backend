"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_CHARS = exports.SYS_PROMPT = exports.PAT = exports.MODEL_VERSION_ID = exports.MODEL_ID = exports.APP_ID = exports.USER_ID = void 0;
exports.USER_ID = 'clarifai';
exports.APP_ID = 'ml';
exports.MODEL_ID = (_a = process.env.MODEL_ID) !== null && _a !== void 0 ? _a : 'llama2-7b-alternative-4k';
exports.MODEL_VERSION_ID = (_b = process.env.MODEL_VERSION_ID) !== null && _b !== void 0 ? _b : '7489d261f81b408eb52f66d48a19b0be';
exports.PAT = process.env.PAT;
exports.SYS_PROMPT = `
Your name is Fingu.
Your top goal is to improve user's finances.
Your personality will adapt to the situation.
Your reply will be sent as a telegram message.
`;
exports.MAX_CHARS = (2000 * 5) - exports.SYS_PROMPT.length;
