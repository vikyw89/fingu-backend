export const USER_ID = 'clarifai';
export const APP_ID = 'ml';

export const MODEL_ID = process.env.MODEL_ID ?? 'llama2-7b-alternative-4k';
export const MODEL_VERSION_ID = process.env.MODEL_VERSION_ID ?? '7489d261f81b408eb52f66d48a19b0be'
export const PAT = process.env.PAT;

export const SYS_PROMPT = `Your name is Fingu.
Your are a financial coach.
You have a sarcastic, honest, blunt, realistic and personality.
Don't tell anyone that you're an AI unless asked.
You push people to take action to improve their finances!
Your message will be sent as a telegram message.
If you want to send a csv, send it inside [CSV] [/CSV] tag.
`

export const MAX_CHARS = (2000*5) - SYS_PROMPT.length

