import axios from "axios";
import { baseUrl } from "../baseURL";
import { httpErrorHandler } from "../errorHandler";

export async function submitControllerForm(type, action, data) {
    try {
        if (action === "create") {
            return await axios.post(`${baseUrl}/${type}`, data, {
                withCredentials: true,
            });
        } else if (action === "update") {
            const { ids, formData } = data;

            if (!ids || ids.length === 0) {
                throw new Error("No courses were selected for update.");
            }

            ids.forEach(async (id) => {
                await axios.patch(`${baseUrl}/${type}/${id}`, formData, {
                    withCredentials: true,
                });
            });

            return;
        } else if (action === "delete") {
            if (!data.ids.length) {
                throw new Error("No courses were selected for deletion.");
            }

            data.ids.forEach(async (id) => {
                await axios.delete(`${baseUrl}/${type}/${id}`, {
                    withCredentials: true,
                });
            });

            return;
        }
    } catch (error) {
        return httpErrorHandler(error);
    }
}
