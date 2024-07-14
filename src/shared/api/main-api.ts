import {apiInstance} from "./axios.ts";
import {IPerHourPayload, IUserData} from "../model/user/store-types.ts";
import {IBonus, ITask} from "../model/earn/store-types.ts";
import {IList} from "../model/friends/store-types.ts";

export const MainApi = {
    async updateLevel(userId: string | number, levelId: number) {
        const response = await apiInstance.post<{ data: IUserData }>(`/user/${userId}/level/${levelId}`);
        return response.data?.data;
    },
    async userPerHour(userId: string | number, bodyParams?: IPerHourPayload) {
        const response = await apiInstance.post<{ data: IUserData }>(`/user/${userId}/per/hour`, bodyParams ?? {});
        return response.data?.data;
    },
    async getUser(userId: string | number) {
        const response = await apiInstance.get<{ data: IUserData }>(`/users/${userId}`);
        return response.data?.data;
    },
    async getTasks() {
        const response = await apiInstance.get<{ data: ITask[] }>('/tasks?bosya=1');
        return response.data?.data;
    },
    async getReferrals(userId: string | number) {
        const response = await apiInstance.post<{data: IList[]}>(`user/${userId}/referral/list`);
        return response.data?.data;
    },
    async getBonuses() {
        const response = await apiInstance.get<{ data: IBonus[] }>('/bonuses');
        return response.data?.data;
    },
}