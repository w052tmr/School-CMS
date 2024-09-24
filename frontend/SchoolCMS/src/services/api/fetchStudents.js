import axios from "axios";
import { baseUrl } from "../baseURL";
import { httpErrorHandler } from "src/services/errorHandler";

export async function fetchStudents(user) {
    try {
        const res = await axios({
            method: "get",
            url: `${baseUrl}/students?school=${user.school}&status=active&sort=grade`,
            withCredentials: true,
        });

        return res.data.data;
    } catch (error) {
        return httpErrorHandler(error);
    }
}
