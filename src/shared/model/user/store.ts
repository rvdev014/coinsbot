import {create} from "zustand";
import {IUserStore} from "./store-types.ts";
import {MainApi} from "../../api/main-api.ts";
import {showError} from "../../utils/other.ts";
import {dateGreaterThan, getDayDiffFromNow} from "../../utils/date.ts";
import i18next from "i18next";

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

            let dayBonus = store.day_bonus;
            console.log('getDayDiffFromNow(store.bonus_date)', getDayDiffFromNow(store.bonus_date))
            if (getDayDiffFromNow(store.bonus_date) > 1) {
                dayBonus = null;
            }

            console.log('store', store)
            i18next.changeLanguage(store.language_code);

            set({
                ...store,
                coins_per_tap: coinsPerTap,
                coins_per_hour: coinsPerHour,
                energy_per_second: store.coins_per_tap,
                day_bonus: dayBonus,
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

        setUserData: (data) => set({...data}),

        updateLevel: async () => {
            try {
                const user = await MainApi.userPerHour(get().user_id);//get().next_level?.step);
                // const user = await MainApi.updateLevel(get().user_id, 3);//get().next_level?.step);
                if (user) {
                    get().setInitialStore({...user});
                }
            } catch (e) {
                showError('Error updating level')
            }
        }
    }
})