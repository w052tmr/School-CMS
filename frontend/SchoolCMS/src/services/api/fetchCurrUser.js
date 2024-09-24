import { baseUrl } from "../baseURL";
import axios from "axios";
import { httpErrorHandler } from "src/services/errorHandler";

export async function fetchCurrUser() {
    try {
        const res = await axios({
            method: "get",
            url: `${baseUrl}/users/me`,
            withCredentials: true,
        });

        return res.data.user;
    } catch (error) {
        return httpErrorHandler(error);
    }
}
