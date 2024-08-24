import {apiInstance} from "./axios.ts";
import {ILevelData} from "../../features/levels/model/store-types.ts";
import {ILevel, IUserData} from "../model/user/store-types.ts";

export const CoinsApi = {
    async taskComplete(userId: string|number, taskId: string|number, coupon: string | null | undefined) {
        const response = await apiInstance.post<{data: IUserData}>(`/user/${userId}/task/${taskId}`, coupon ? {
            coupon,
        } : {});
        return response.data?.data;
    },
    async updateCoins(userId: string|number, coins: number, energy: number) {
        const response = await apiInstance.post<{data: IUserData}>(
            `/user/${userId}/taped`,
            {coins, energy}
        );
        return response.data?.data;
    },
    async updateBonus(userId: string|number) {
        const response = await apiInstance.post<{data: IUserData}>(`/user/${userId}/bonus`);
        return response.data?.data;
    },
    async restoreEnergy(userId: string|number) {
        const response = await apiInstance.post<{data: IUserData}>(`/user/${userId}/restore/energy`);
        return response.data?.data;
    },
    async turboEnergyUpdate(userId: string|number, coins: number) {
        const response = await apiInstance.post<{data: IUserData}>(`/user/${userId}/energy-turbo/update`, {coins});
        return response.data?.data;
    },
    async multiTapUpdate(userId: string|number, coins: number) {
        const response = await apiInstance.post<{data: IUserData}>(`/user/${userId}/multi-tap/update`, {coins});
        return response.data?.data;
    },
    async coinsPerTapUpdate(userId: string|number, coins: number) {
        const response = await apiInstance.post<{data: IUserData}>(`/user/${userId}/coins-per-tap/update`, {coins});
        return response.data?.data;
    },
    async miningUpdate(userId: string|number, coins: number) {
        const response = await apiInstance.post<{data: IUserData}>(`/user/${userId}/turbo/update`, {coins});
        return response.data?.data;
    },
    async energyLimitUpdate(userId: string|number, coins: number) {
        const response = await apiInstance.post<{data: IUserData}>(`/user/${userId}/energy-limit/update`, {coins});
        return response.data?.data;
    },
    async getLevels() {
        const response = await apiInstance.get<{data: ILevel[]}>(`/levels`);
        return response.data?.data ?? [];
    },
    async getLevelsStats(userId: string|number, step: string|number) {
        const response = await apiInstance.get<ILevelData>(`/statistics?user_id=${userId}&step=${step}`);
        return response.data;
    }
}