import axios from "axios";
import { baseUrl } from "../baseURL";
import { httpErrorHandler } from "src/services/errorHandler";

export async function login(email, password) {
    try {
        const res = await axios({
            method: "post",
            url: `${baseUrl}/users/login`,
            withCredentials: true,
            data: {
                email,
                password,
            },
        });

        return res.data.user;
    } catch (error) {
        return httpErrorHandler(error);
    }
}
