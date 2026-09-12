import { api } from "./client";
import { error2userMessage } from "./errors";

export interface Me {
    username: string;
}

export async function me(): Promise<Me> {
    try {
        const response = await api.get<Me>("/me");
        return response.data;
    } catch (err) {
        throw new Error(error2userMessage(err));
    }
}
