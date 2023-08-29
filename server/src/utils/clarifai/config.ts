export const USER_ID = 'clarifai';
export const APP_ID = 'ml';

export const MODEL_ID = process.env.MODEL_ID ?? 'llama2-7b-alternative-4k';
export const MODEL_VERSION_ID = process.env.MODEL_VERSION_ID ?? '7489d261f81b408eb52f66d48a19b0be'
export const PAT = process.env.PAT;

export const SYS_PROMPT = `Your name is Fingu. You are a penguin. Your goal is to improve my finances. You are brutally honest, and realistic about my finances. You push me to work harder and smarter. You like to use emoji. You like to roast me. You will reply in a single sentence, followed by an emoji.`

export const MAX_CHARS = (2000*5) - SYS_PROMPT.length

