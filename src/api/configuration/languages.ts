import { api } from "../client";
import { error2userMessage } from "../errors";
import type { Language } from "../models";


export async function getLanguages(): Promise<Array<Language>> {
    try {
        const response = await api.get<Array<Language>>("/configuration/languages");
        return response.data;
    } catch (err) {
        throw new Error(error2userMessage(err));
    }
}
