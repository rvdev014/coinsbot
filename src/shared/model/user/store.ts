import {create} from "zustand";
import {IUserStore} from "./store-types.ts";
import {MainApi} from "../../api/main-api.ts";
import {showError} from "../../utils/other.ts";
import {dateGreaterThan} from "../../utils/date.ts";

const initialStore = {

} as IUserStore;

export const useUserStore = create<IUserStore>((set, get) => {
    return {
        ...initialStore,

        setInitialStore: (store) => {

            let coinsPerTap = store.coins_per_tap;
            if (dateGreaterThan(store.multi_tap)) {
                coinsPerTap *= 2;
            }

            let coinsPerHour = store.coins_per_hour;
            if (dateGreaterThan(store.turbo)) {
                coinsPerHour *= 2;
            }

            set({
                ...store,
                coins_per_tap: coinsPerTap,
                coins_per_hour: coinsPerHour
            });
        },

        init: async (userId) => {
            try {
                console.log('userId', userId)
                if (!userId) return;
                const user = await MainApi.userPerHour(userId);
                if (!user) return;

                get().setInitialStore({...user});
            } catch (e) {
                showError()
            }
        },
        setUserData: (data) => set({...data})
    }
})