import {apiInstance} from "./axios.ts";
import {ILevelStore} from "../../features/levels/model/store-types.ts";
import {IUserData} from "../model/user/store-types.ts";

export const CoinsApi = {
    async taskComplete(userId: string|number, taskId: string|number) {
        const response = await apiInstance.post<{data: IUserData}>(`/user/${userId}/task/${taskId}`);
        return response.data?.data;
    },
    async updateCoins(userId: string|number, coins: number) {
        const response = await apiInstance.post<{data: IUserData}>(`/user/${userId}/taped`, {coins});
        return response.data?.data;
    },
    async updateBonus(userId: string|number, dayBonusId: string|number) {
        const response = await apiInstance.post<{data: IUserData}>(`/user/${userId}/bonus/${dayBonusId}`);
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
    async miningUpdate(userId: string|number, coins: number) {
        const response = await apiInstance.post<{data: IUserData}>(`/user/${userId}/turbo/update`, {coins});
        return response.data?.data;
    },
    async energyLimitUpdate(userId: string|number, coins: number) {
        const response = await apiInstance.post<{data: IUserData}>(`/user/${userId}/energy-limit/update`, {coins});
        return response.data?.data;
    },
    async getLevelsStats(userId: string|number, step: string|number) {
        const response = await apiInstance.get<ILevelStore>(`/statistics?user_id=${userId}&step=${step}`);
        return response.data;
    }
}