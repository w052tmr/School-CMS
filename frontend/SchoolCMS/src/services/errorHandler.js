import axios from "axios";

export function httpErrorHandler(error) {
    if (error === null) {
        const message = "Unidentified error";
        console.error(message);
        throw new Error(message);
    }

    if (axios.isAxiosError(error)) {
        //here we have a type guard check, error inside this will be treated as AxiosError
        const response = error?.response;

        if (error.code === "ERR_NETWORK") {
            const message = "Could not make request. Check your connection.";
            console.error(message);
            throw new Error(message);
        } else if (error.code === "ERR_CANCELED") {
            const message = "Connection was canceled. Could not make request.";
            console.error(message);
            throw new Error(message);
        }
        if (response) {
            //The request was made and the server responded with a status code that falls out of the range of 2xx the http status code mentioned above
            if (response.status === 500 || response.data.status === 500) {
                console.error("Internal Server Error");
                throw new Error(
                    "An internal server error occurred. You may continue your request attempts, but if the problem persists, you will need to come back later."
                );
            } else {
                console.error(response.data.message);
                throw new Error(response.data.message);
            }
        }
    }
    //Something happened in setting up the request and triggered an Error
    console.error(error.message);
    throw new Error(error.message);
}
