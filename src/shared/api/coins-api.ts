import {apiInstance} from "./axios.ts";
import {ILevelStore} from "../../features/levels/model/store-types.ts";

export const CoinsApi = {
    async updateCoins(userId: string|number, coins: number) {
        const response = await apiInstance.post(`/user/${userId}/taped`, {coins});
        return response.data?.data;
    },
    async getLevelsStats(userId: string|number, step: string|number) {
        const response = await apiInstance.get<ILevelStore>(`/statistics?user_id=${userId}&step=${step}`);
        return response.data;
    }
}