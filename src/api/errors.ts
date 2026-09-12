import axios from "axios";

/**
 * Get an actually interesting error message than can be displayed to user
 * @param err The error
 * @returns Human readable string that can be displayed to user
 */
export function error2userMessage(err: unknown): string {
    const genericMessage = "An unexpected error occured";

    // Javascript error (e.g. syntax or logic error)
    if (!axios.isAxiosError(err)) {
        console.error("Non-Axios Error:", err);
        return genericMessage;
    }
    // Non 2xx response
    if (err.response) {
        const errorMessage: string = err.response.data.error as string;
        console.log(err.response.status, errorMessage);
        return errorMessage;
    }
    // Request was made but no response was received (e.g. network error)
    else if (err.request) {
        console.log(err.request);
        return genericMessage;
    }
    // Error setting up request
    else {
        console.log("Error", err.message);
        return genericMessage;
    }
}
