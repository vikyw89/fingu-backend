"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pruneHistory = exports.generatePrompt = exports.askClarify = void 0;
const config_1 = require("./config");
/**
 * An asynchronous function that sends a request to the Clarifai API to ask for clarification.
 *
 * @param {object} param - An object containing the following properties:
 *   - messages: an array of messages to be sent to the API.
 *   - name: the name of the user.
 *   - sysPrompt: (optional) the system prompt.
 */
const askClarify = async ({ messages, name, sysPrompt = config_1.SYS_PROMPT }) => {
    const endInput = `<s>
    <<SYS>>You are chatting to ${name}.
    ${sysPrompt}<</SYS>>
    ${messages}`;
    const raw = JSON.stringify({
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
    const requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Key ' + config_1.PAT
        },
        body: raw
    };
    try {
        const res = await fetch(`https://api.clarifai.com/v2/models/${config_1.MODEL_ID}/outputs`, requestOptions);
        const data = await res.json();
        return data;
    }
    catch (err) {
        console.log(err);
    }
};
exports.askClarify = askClarify;
/**
 * Generates a prompt by formatting the messages array.
 *
 * @param {GeneratePromptParams} messages - The array of messages.
 */
const generatePrompt = ({ messages }) => {
    return messages
        .map((v) => v.isUser ? `[INST] ${v.text} [/INST]` : `${v.text}`)
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
const pruneHistory = ({ messages, maxCharCount = config_1.MAX_CHARS }) => {
    let charCount = 0;
    let outputMessages = messages;
    for (let i = messages.length - 1; i >= 0; i--) {
        const message = JSON.stringify(messages[i]);
        charCount += message.length;
        if (charCount > maxCharCount) {
            outputMessages = outputMessages.slice(i);
            break;
        }
    }
    return outputMessages;
};
exports.pruneHistory = pruneHistory;
