import {apiInstance} from "./axios.ts";
import {IUserData} from "../model/user/store-types.ts";
import {ILevelsStore} from "../../features/levels/model/store-types.ts";

export const CoinsApi = {
    async updateCoins(userId: string|number, coins: number) {
        const response = await apiInstance.post(`/user/${userId}/taped`, {coins});
        return response.data?.data;
    },
    async getLevelsStats(userId: string|number, step: number) {
        const response = await apiInstance.get<ILevelsStore>(`/statistics?user_id=${userId}&step=${step}`);
        return response.data;
    }
}