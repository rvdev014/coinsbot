import {apiInstance} from "./axios.ts";
import {IUserData} from "../model/user/store-types.ts";

export const MainApi = {
    async getUser(userId: string | number) {
        const response = await apiInstance.get<{ data: IUserData }>(`/users/${userId}`);
        return response.data?.data;
    },
}