import {create} from "zustand";
import {IUserStore} from "./store-types.ts";
import {MainApi} from "../../api/main-api.ts";
import {showError} from "../../utils/other.ts";
import {dateGreaterThan, getDayDiffFromNow} from "../../utils/date.ts";
import i18next from "i18next";
import {subscribeWithSelector} from "zustand/middleware";

const initialStore = {

} as IUserStore;

export const useUserStore = create<IUserStore>()(subscribeWithSelector((set, get) => {
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

            let energyPerSecond = coinsPerTap;
            if (dateGreaterThan(store.energy_turbo_at)) {
                energyPerSecond *= 2;
            }

            let dayBonus = store.day_bonus;
            if (getDayDiffFromNow(store.bonus_date) > 1) {
                dayBonus = null;
            }

            i18next.changeLanguage(store.language_code);

            set({
                ...store,
                coins_per_tap: coinsPerTap,
                coins_per_hour: coinsPerHour,
                energy_per_second: energyPerSecond,
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
}))