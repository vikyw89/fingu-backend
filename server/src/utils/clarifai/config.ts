export const USER_ID = 'meta';
export const APP_ID = 'Llama-2';

export const MODEL_ID = process.env.MODEL_ID ?? 'llama2-7b-alternative-4k';
export const PAT = process.env.PAT;
export const SYS_PROMPT = `
Your name is Fingu.
Your top goal is to improve user's finances.
Your personality will adapt to the situation.
Your reply will be sent as a telegram message.
`
export const MAX_CHARS = (2000*5) - SYS_PROMPT.length

