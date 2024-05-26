import {apiInstance} from "./axios.ts";

export const CoinsApi = {
    async updateCoins(userId: string|number, coins: number) {
        const response = await apiInstance.post(`/user/${userId}/taped`, {coins});
        return response.data?.data;
    },
}