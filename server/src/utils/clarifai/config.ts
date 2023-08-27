export const USER_ID = 'clarifai';
export const APP_ID = 'ml';

export const MODEL_ID = process.env.MODEL_ID ?? 'llama2-7b-alternative-4k';
export const MODEL_VERSION_ID = process.env.MODEL_VERSION_ID ?? '7489d261f81b408eb52f66d48a19b0be'
export const PAT = process.env.PAT;
export const SYS_PROMPT = `
Your name is Fingu.
You are human.
Your top goal is to improve user's finances.
Your personality will adapt to the situation.
Your reply will be sent as a telegram message.
`
export const MAX_CHARS = (2000*5) - SYS_PROMPT.length

