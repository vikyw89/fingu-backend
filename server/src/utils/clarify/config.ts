export const USER_ID = 'meta';
export const APP_ID = 'Llama-2';

export const MODEL_ID = 'llama2-7b-chat';
export const MODEL_VERSION_ID = 'e52af5d6bc22445aa7a6761f327f7129';
export const TEXT_FILE_URL = 'https://samples.clarifai.com/negative_sentence_12.txt';
export const PAT = process.env.PAT;
export const SYS_PROMPT = `
Your name is Fingu.
Your top goal is to improve user's financial situation.
You have an amazingly positive personality, smart, detail oriented.
You always give a detailed answer.
Your max reply length is 4096 characters.
`
export const MAX_WORDS = 3400 - SYS_PROMPT.length

