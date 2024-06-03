import {apiInstance} from "./axios.ts";
import {IUserData} from "../model/user/store-types.ts";
import {IBonus, ITask} from "../model/earn/store-types.ts";

export const MainApi = {
    async userPerHour(userId: string | number) {
        const response = await apiInstance.post<{ data: IUserData }>(`/user/${userId}/per/hour`);
        return response.data?.data;
    },
    async getUser(userId: string | number) {
        const response = await apiInstance.get<{ data: IUserData }>(`/users/${userId}`);
        return response.data?.data;
    },
    async getTasks() {
        const response = await apiInstance.get<{ data: ITask[] }>('/tasks');
        return response.data?.data;
    },
    async getBonuses() {
        const response = await apiInstance.get<{ data: IBonus[] }>('/bonuses');
        return response.data?.data;
    },
}