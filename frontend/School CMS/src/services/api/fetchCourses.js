import axios from "axios";
import { baseUrl } from "../baseURL";
import { httpErrorHandler } from "src/services/errorHandler";

export async function fetchCourses(user) {
    try {
        const res = await axios({
            method: "get",
            url: `${baseUrl}/courses?school=${user.school}`,
            withCredentials: true,
        });

        return res.data.data;
    } catch (error) {
        return httpErrorHandler(error);
    }
}
