"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pruneHistoryParamsSchema = exports.generatePromptParamsSchema = exports.askClarifyParamsSchema = exports.messagesSchema = exports.messageSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.messageSchema = zod_1.default.object({
    text: zod_1.default.string(),
    isUser: zod_1.default.boolean()
});
exports.messagesSchema = zod_1.default.array(exports.messageSchema);
exports.askClarifyParamsSchema = zod_1.default.object({
    messages: zod_1.default.string(),
    name: zod_1.default.string(),
    sysPrompt: zod_1.default.string().optional()
});
exports.generatePromptParamsSchema = zod_1.default.object({
    messages: exports.messagesSchema
});
exports.pruneHistoryParamsSchema = zod_1.default.object({
    messages: exports.messagesSchema,
    maxCharCount: zod_1.default.number().optional()
});
