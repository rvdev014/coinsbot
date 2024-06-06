import {create} from "zustand";
import {IExchangeStore} from "./store-types.ts";
import {useUserStore} from "../user/store.ts";
import {debounce} from "../../utils/debounce.ts";
import {CoinsApi} from "../../api/coins-api.ts";
import {showError} from "../../utils/other.ts";
import {dateGreaterThan} from "../../utils/date.ts";

const initialStore = {
    tappedCoins: 0,
    energyTimeout: null,
} as IExchangeStore;

export const useExchangeStore = create<IExchangeStore>((set, get) => {
    return {
        ...initialStore,

        initExchange() {
            if (!get().energyTimeout) {
                set({
                    energyTimeout: setInterval(() => {
                        const userState = useUserStore.getState();

                        let updateEnergy = userState.coins_per_tap;
                        if (dateGreaterThan(userState.multi_tap)) {
                            updateEnergy *= 2;
                        }

                        let energy = userState.energy + updateEnergy;
                        if (energy > userState.energy_limit) {
                            energy = userState.energy_limit;
                        }
                        useUserStore.setState({energy});
                    }, 1000)
                });
            }

            if (!get().coinsTimeout) {
                set({
                    coinsTimeout: setInterval(async () => {
                        const userState = useUserStore.getState();
                        const coinsPerSecond = userState.coins_per_hour / 5400;
                        let coins = Math.ceil(userState.coins + coinsPerSecond);
                        useUserStore.setState({coins});

                        if (coins >= userState.next_level?.coins) {
                            useUserStore.getState().updateLevel();
                        }
                    }, 1000)
                });
            }
        },

        onTap: () => {

            const userState = useUserStore.getState();
            const coinsPerTap = userState.coins_per_tap;

            let coins = userState.coins + coinsPerTap;
            let energy = userState.energy - coinsPerTap;
            if (energy < 0) {
                energy = 0;
                coins = userState.coins;
            }

            useUserStore.setState({coins, energy});
            set({tappedCoins: get().tappedCoins + coinsPerTap});

            get().onTapEnd();
        },

        onTapEnd: debounce(async () => {
            try {
                const tappedCoins = get().tappedCoins;
                set({tappedCoins: 0});
                if (tappedCoins > 0) {
                    await CoinsApi.updateCoins(useUserStore.getState().user_id, tappedCoins);
                }
            } catch (e) {
                showError()
            }
        }, 500),

        reset: () => set(initialStore),
    }
});