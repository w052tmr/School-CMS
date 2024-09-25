import { baseUrl } from "../baseURL";
import axios from "axios";
import { httpErrorHandler } from "src/services/errorHandler";

export async function fetchUserData(type, user) {
    if (type === "courses") {
        try {
            if (user.role === "admin") {
                const res = await axios({
                    method: "Get",
                    withCredentials: true,
                    url: `${baseUrl}/courses?school=${user.school}`,
                });

                return res.data;
            } else if (user.role === "teacher") {
                const res = await axios({
                    method: "Get",
                    withCredentials: true,
                    url: `${baseUrl}/users/${user.id}/${type}?school=${user.school}`,
                });

                return res.data;
            } else if (user.role === "student") {
                const res = await axios({
                    method: "Get",
                    withCredentials: true,
                    url: `${baseUrl}/users/${user.id}/${type}?school=${user.school}`,
                });

                return res.data;
            }
        } catch (error) {
            return httpErrorHandler(error);
        }
    }
}
