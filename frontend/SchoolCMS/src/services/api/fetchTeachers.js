import axios from "axios";
import { baseUrl } from "../baseURL";
import { httpErrorHandler } from "src/services/errorHandler";

export async function fetchTeachers(user) {
    try {
        const res = await axios({
            method: "get",
            url: `${baseUrl}/teachers?school=${user.school}&status=active&sort=lastName,firstName`,
            withCredentials: true,
        });

        return res.data.data;
    } catch (error) {
        return httpErrorHandler(error);
    }
}
