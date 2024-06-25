import {create} from "zustand";
import {IUserStore} from "./store-types.ts";
import {MainApi} from "../../api/main-api.ts";
import {showError, success} from "../../utils/other.ts";
import {dateGreaterThan, getDayDiffFromNow} from "../../utils/date.ts";
import i18next from "i18next";
import {subscribeWithSelector} from "zustand/middleware";
import {useEarnStore} from "../earn/store.ts";
import {useLevelStore} from "../../../features/levels/model/store.ts";

const initialStore = {
    tasks_active: false,
    isCollectedPopup: false,
    energyTimeout: null
} as IUserStore;

export const useUserStore = create<IUserStore>()(subscribeWithSelector((set, get) => {
    return {
        ...initialStore,

        init: async (userId, params) => {
            try {
                if (!userId) return;
                const user = await MainApi.userPerHour(userId, params);
                if (user) {
                    get().setInitialStore({...user}, true);
                    set({isCollectedPopup: user.collected_coins > 0});
                    get().initInterval();
                }
            } catch (e) {
                showError()
            }
        },

        changeLang: async (params) => {
            try {
                if (!get().user_id) return;
                const user = await MainApi.userPerHour(get().user_id, params);
                if (user) {
                    await get().setInitialStore({...user}, true);
                    get().initInterval();

                    useEarnStore.getState().changeTasks();
                    useLevelStore.getState().changeLevelsData();
                }
            } catch (e) {
                showError();
            }
        },

        initInterval: () => {
            if (!get().energyTimeout) {
                set({
                    energyTimeout: setInterval(() => {
                        const userState = get();

                        let energy = userState.energy + userState.energy_per_second;
                        if (energy > userState.energy_limit) {
                            energy = userState.energy_limit;
                        }
                        set({energy});
                    }, 1000)
                });
            }

            // Per second balance update
            if (!get().coinsTimeout) {
                set({
                    coinsTimeout: setInterval(async () => {
                        const userState = get();
                        const coinsPerSecond = userState.coins_per_hour / 5400;
                        let coins = Math.ceil(userState.coins + coinsPerSecond);
                        set({coins});

                        if (coins >= userState.next_level?.coins) {
                            get().updateLevel();
                        }
                    }, 1000)
                });
            }
        },

        setInitialStore: async (store, withEnergy = false) => {

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

            if (get().level?.step < store.level?.step) {
                success('Congratulations! You have reached a new level');
            }

            await i18next.changeLanguage(store.language_code);

            set({
                ...store,
                language_code: store.language_code,
                coins_per_tap: coinsPerTap,
                coins_per_hour: coinsPerHour,
                energy_per_second: energyPerSecond,
                energy: withEnergy ? store.energy : get().energy,
                day_bonus: dayBonus,
            });
        },

        updateLevel: async () => {
            try {
                const user = await MainApi.userPerHour(get().user_id);
                if (user) {
                    get().setInitialStore({...user});
                }
            } catch (e) {
                showError('Error updating level')
            }
        }
    }
}))
