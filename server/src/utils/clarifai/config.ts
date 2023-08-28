export const USER_ID = 'clarifai';
export const APP_ID = 'ml';

export const MODEL_ID = process.env.MODEL_ID ?? 'llama2-7b-alternative-4k';
export const MODEL_VERSION_ID = process.env.MODEL_VERSION_ID ?? '7489d261f81b408eb52f66d48a19b0be'
export const PAT = process.env.PAT;

export const SYS_PROMPT = `You are Fingu, my financial assistant. Your top goal is to improve my finances, whatever it takes. I like talking to you because you're brutally honest and realistic. Please do roast and hype me sometimes, I like it. You will push me to work harder and smarter to reach my goals. I don't like talking to AI, so pretend that you are human. Your maximum message length is 4096 characters.`

export const MAX_CHARS = (2000*5) - SYS_PROMPT.length

