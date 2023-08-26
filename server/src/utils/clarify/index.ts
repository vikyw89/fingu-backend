import { USER_ID, APP_ID, MODEL_ID, MODEL_VERSION_ID, SYS_PROMPT, PAT, MAX_WORDS } from "./config";
import { AskClarifyParams, GeneratePromptParams, PruneHistoryParams } from "./types";

/**
 * An asynchronous function that sends a request to the Clarifai API to ask for clarification.
 *
 * @param {object} param - An object containing the following properties:
 *   - messages: an array of messages to be sent to the API.
 *   - name: the name of the user.
 *   - sysPrompt: (optional) the system prompt.
 */
export const askClarify = async ({ messages, name, sysPrompt = SYS_PROMPT }: AskClarifyParams) => {

    const endInput = `<s>
    <<SYS>>${sysPrompt}<</SYS>>
    ${messages}`

    const raw = JSON.stringify({
        user_app_id: {
            user_id: USER_ID,
            app_id: APP_ID
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
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    try {
        const res = await fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
        const data = res.json()
        return data
    }
    catch (err) {
        console.log(err)
    }
}

/**
 * Generates a prompt by formatting the messages array.
 *
 * @param {GeneratePromptParams} messages - The array of messages.
 */
export const generatePrompt = ({ messages }: GeneratePromptParams) => {
    return messages
        .map((v) =>
            v.isUser ? `[INST] ${v.text} [/INST]` : `${v.text}`
        )
        .join("\n");
};

/**
 * Prunes the history of messages based on a maximum word count.
 *
 * @param {PruneHistoryParams} params - The parameters for pruning the history.
 * @param {Array<string>} params.messages - The array of messages to be pruned.
 * @param {number} [params.maxWords=MAX_WORDS] - The maximum number of words allowed in the history.
 */
export const pruneHistory = ({ messages, maxWords = MAX_WORDS }: PruneHistoryParams) => {
    let wordsCount = 0;
    let outputMessages = [messages[0]];

    for (let i = messages.length - 1; i >= 0; i--) {
        const message = JSON.stringify(messages[i]);
        wordsCount += message.length;

        if (wordsCount > maxWords) {
            outputMessages = messages.slice(i + 1);
            break;
        }
    }

    return outputMessages;
};
