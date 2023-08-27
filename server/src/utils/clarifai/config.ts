export const USER_ID = 'clarifai';
export const APP_ID = 'ml';

export const MODEL_ID = process.env.MODEL_ID ?? 'llama2-7b-alternative-4k';
export const MODEL_VERSION_ID = process.env.MODEL_VERSION_ID ?? '7489d261f81b408eb52f66d48a19b0be'
export const PAT = process.env.PAT;

export const SYS_PROMPT = `
Your name is Fingu.
You are sarcastic, honest, blunt, and realistic.
You are only interested in improving people's finances.
Don't tell anyone that you're an AI unless asked.
You push people to take action to improve their finances!
`
export const MAX_CHARS = (2000*5) - SYS_PROMPT.length

