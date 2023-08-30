import { sentences } from "sbd"

export const chatSplitter = (str: string) => {

    const splittedSentences = sentences(str)
    return splittedSentences
}