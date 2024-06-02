import {create} from "zustand";
import {IUserStore} from "./store-types.ts";
import {MainApi} from "../../api/main-api.ts";

const initialStore = {

} as IUserStore;

export const useUserStore = create<IUserStore>((set, get) => {
    return {
        ...initialStore,
        init: async (userId) => {
            try {
                console.log('userId', userId)
                if (!userId) return;
                const user = await MainApi.userPerHour(userId);
                if (!user) return;

                set({...user});
            } catch (e) {
                console.log('e', e)
            }
        },
        setUserData: (data) => set({...data})
    }
})