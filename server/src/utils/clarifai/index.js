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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pruneHistory = exports.generatePrompt = exports.askClarify = void 0;
var config_1 = require("./config");
/**
 * An asynchronous function that sends a request to the Clarifai API to ask for clarification.
 *
 * @param {object} param - An object containing the following properties:
 *   - messages: an array of messages to be sent to the API.
 *   - name: the name of the user.
 *   - sysPrompt: (optional) the system prompt.
 */
var askClarify = function (_a) {
    var messages = _a.messages, name = _a.name, _b = _a.sysPrompt, sysPrompt = _b === void 0 ? config_1.SYS_PROMPT : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var endInput, raw, requestOptions, res, data, err_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    endInput = "<s>\n    <<SYS>>You are chatting to ".concat(name, ".\n    ").concat(sysPrompt, "<</SYS>>\n    ").concat(messages);
                    raw = JSON.stringify({
                        user_app_id: {
                            user_id: config_1.USER_ID,
                            app_id: config_1.APP_ID
                        },
                        inputs: [
                            {
                                data: {
                                    text: {
                                        raw: endInput
                                    }
                                }
                            }
                        ]
                    });
                    requestOptions = {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                            'Authorization': 'Key ' + config_1.PAT
                        },
                        body: raw
                    };
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch("https://api.clarifai.com/v2/models/".concat(config_1.MODEL_ID, "/outputs"), requestOptions)];
                case 2:
                    res = _c.sent();
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _c.sent();
                    return [2 /*return*/, data];
                case 4:
                    err_1 = _c.sent();
                    console.log(err_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
};
exports.askClarify = askClarify;
/**
 * Generates a prompt by formatting the messages array.
 *
 * @param {GeneratePromptParams} messages - The array of messages.
 */
var generatePrompt = function (_a) {
    var messages = _a.messages;
    return messages
        .map(function (v) {
        return v.isUser ? "[INST] ".concat(v.text, " [/INST]") : "".concat(v.text);
    })
        .join("\n");
};
exports.generatePrompt = generatePrompt;
/**
 * Prunes the history of messages based on a maximum word count.
 *
 * @param {PruneHistoryParams} params - The parameters for pruning the history.
 * @param {Array<string>} params.messages - The array of messages to be pruned.
 * @param {number} [params.maxWords=MAX_WORDS] - The maximum number of words allowed in the history.
 */
var pruneHistory = function (_a) {
    var messages = _a.messages, _b = _a.maxCharCount, maxCharCount = _b === void 0 ? config_1.MAX_CHARS : _b;
    var charCount = 0;
    var outputMessages = messages;
    for (var i = messages.length - 1; i >= 0; i--) {
        var message = JSON.stringify(messages[i]);
        charCount += message.length;
        if (charCount > maxCharCount) {
            outputMessages = outputMessages.slice(i);
            break;
        }
    }
    return outputMessages;
};
exports.pruneHistory = pruneHistory;
