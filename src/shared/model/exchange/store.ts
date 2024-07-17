import {create} from "zustand";
import {IExchangeStore} from "./store-types.ts";
import {useUserStore} from "../user/store.ts";
import {debounce} from "../../utils/debounce.ts";
import {CoinsApi} from "../../api/coins-api.ts";
import {showError} from "../../utils/other.ts";
import {dateGreaterThan} from "../../utils/date.ts";

const initialStore = {
    tapped: 0,
} as IExchangeStore;

export const useExchangeStore = create<IExchangeStore>((set, get) => {
    return {
        ...initialStore,

        onTap: async () => {

            const userState = useUserStore.getState();
            const coinsPerTap = userState.coins_per_tap;

            let coins = userState.coins + coinsPerTap;
            let energy = userState.energy - coinsPerTap;
            if (energy < 0) {
                energy = 0;
                coins = userState.coins;
            }

            if (coins >= userState.next_level?.coins) {
                coins = userState.next_level?.coins;
            }

            useUserStore.setState({coins, energy});
            set({tapped: get().tapped + 1});

            get().onTapEnd();
        },

        onTapEnd: debounce(async () => {
            try {
                const userStore = useUserStore.getState();
                const tapped = get().tapped;

                set({tapped: 0});

                const user = await CoinsApi.updateCoins(
                    userStore.user_id,
                    tapped * userStore.coins_per_tap,
                    userStore.energy
                );

                if (user) {
                    await useUserStore.getState().setInitialStore({...user});
                }
            } catch (e) {
                showError()
            }
        }, 500),

        reset: () => set(initialStore),
    }
});
