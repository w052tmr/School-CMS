import axios from "axios";
import { baseUrl } from "../baseURL";
import { httpErrorHandler } from "src/services/errorHandler";

export async function fetchCourse(id) {
    try {
        const res = await axios({
            method: "get",
            url: `${baseUrl}/courses/${id}`,
            withCredentials: true,
        });

        return res.data.data;
    } catch (error) {
        return httpErrorHandler(error);
    }
}
