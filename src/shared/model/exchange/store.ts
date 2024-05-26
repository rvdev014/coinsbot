import {create} from "zustand";
import {IExchangeStore} from "./store-types.ts";
import {useUserStore} from "../user/store.ts";
import {debounce} from "../../utils/debounce.ts";
import {CoinsApi} from "../../api/coins-api.ts";

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
                        let energy = userState.energy + userState.level.coins_per_tap;
                        if (energy > userState.level.energy_limit) {
                            energy = userState.level.energy_limit;
                        }
                        useUserStore.setState({energy});
                    }, 1000)
                });
            }
        },

        onTap: () => {

            const userState = useUserStore.getState();
            const coinsPerTap = userState.level.coins_per_tap;

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
                console.log('e', e)
            }
        }, 500),

        reset: () => set(initialStore),
    }
});