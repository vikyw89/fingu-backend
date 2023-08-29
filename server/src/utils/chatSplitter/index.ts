import { sentences } from "sbd"

export const chatSplitter = (str: string) => {

    const splittedSentences = sentences(str)
    console.log("🚀 ~ file: index.ts:7 ~ chatSplitter ~ splittedSentences:", splittedSentences)
    return splittedSentences
}