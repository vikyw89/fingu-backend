import { USER_ID, APP_ID, MODEL_ID, SYS_PROMPT, PAT, MAX_CHARS } from "./config";
import { AskClarifyParams, GeneratePromptParams, PruneHistoryParams } from "./types";

/**
 * An asynchronous function that sends a request to the Clarifai API to ask for clarification.
 *
 * @param {object} param - An object containing the following properties:
 *   - messages: an array of messages to be sent to the API.
 *   - name: the name of the user.
 *   - sysPrompt: (optional) the system prompt.
 */
export const askClarifai = async ({ messages, name, sysPrompt = SYS_PROMPT }: AskClarifyParams) => {
// put system prompt outside of inst so it doesn't get censsored
    const endInput = `<s><<SYS>>
My name is ${name}. ${sysPrompt}
<</SYS>>
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
            "Content-Type": "application/json",
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    try {
        const res = await fetch(`https://api.clarifai.com/v2/models/${MODEL_ID}/outputs`, requestOptions)
        const data = await res.json()
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
        .join(" ");
};

/**
 * Prunes the history of messages based on a maximum word count.
 *
 * @param {PruneHistoryParams} params - The parameters for pruning the history.
 * @param {Array<string>} params.messages - The array of messages to be pruned.
 * @param {number} [params.maxWords=MAX_WORDS] - The maximum number of words allowed in the history.
 */
export const pruneHistory = ({ messages, maxCharCount = MAX_CHARS }: PruneHistoryParams) => {
    let charCount = 0;
    let outputMessages = messages
    
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
