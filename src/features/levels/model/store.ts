import {create} from "zustand";
import {ILevelsStore, ILevelsUser} from "./store-types.ts";
import {ILevel} from "../../../shared/model/user/store-types.ts";
import {CoinsApi} from "../../../shared/api/coins-api.ts";
import {useUserStore} from "../../../shared/model/user/store.ts";

const initialStore = {
    level: {} as ILevel,
    users: [] as ILevelsUser[],
    rank: 0,
    loading: false,
} as ILevelsStore;

export const useLevelsStore = create<ILevelsStore>((set, get) => {
    return {
        ...initialStore,
        init: async () => {
            set({loading: true});
            try {
                const userState = useUserStore.getState();
                const data = await CoinsApi.getLevelsStats(userState.user_id, userState.level.step);
                console.log('data', data)
                set({...data});
            } catch (e) {
                console.error(e);
            } finally {
                set({loading: false});
            }
        },

        onNext: async () => {
            set({loading: true});
            try {
                const userState = useUserStore.getState();
                if (get().next_level.step) {
                    const data = await CoinsApi.getLevelsStats(userState.user_id, get().next_level.step);
                    set({...data});
                }
            } catch (e) {
                console.error(e);
            } finally {
                set({loading: false});
            }
        },

        onPrev: async () => {
            set({loading: true});
            try {
                const userState = useUserStore.getState();
                if (get().prev_level.step) {
                    const data = await CoinsApi.getLevelsStats(userState.user_id, get().prev_level.step);
                    set({...data});
                }
            } catch (e) {
                console.error(e);
            } finally {
                set({loading: false});
            }
        },
    }
})