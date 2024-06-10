import {create} from "zustand";
import {IExchangeStore} from "./store-types.ts";
import {useUserStore} from "../user/store.ts";
import {debounce} from "../../utils/debounce.ts";
import {CoinsApi} from "../../api/coins-api.ts";
import {showError} from "../../utils/other.ts";
import {dateGreaterThan} from "../../utils/date.ts";

const initialStore = {
    tappedCoins: 0,
} as IExchangeStore;

export const useExchangeStore = create<IExchangeStore>((set, get) => {
    return {
        ...initialStore,

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
                const userStore = useUserStore.getState();
                const tappedCoins = get().tappedCoins;
                set({tappedCoins: 0});
                if (tappedCoins > 0) {
                    await CoinsApi.updateCoins(userStore.user_id, tappedCoins, userStore.energy);
                }
            } catch (e) {
                showError()
            }
        }, 300),

        reset: () => set(initialStore),
    }
});