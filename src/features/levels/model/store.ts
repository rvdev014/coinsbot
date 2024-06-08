import {create} from "zustand";
import {ILevelData, ILevelStore} from "./store-types.ts";
import {CoinsApi} from "../../../shared/api/coins-api.ts";
import {useUserStore} from "../../../shared/model/user/store.ts";
import {showError} from "../../../shared/utils/other.ts";

const initialStore = {
    levelsCache: [] as ILevelData[],
    loading: false,
} as ILevelStore;

export const useLevelStore = create<ILevelStore>((set, get) => {
    return {
        ...initialStore,
        init: async (userId, step) => {
            set({loading: true});
            try {
                const cacheExists = get().levelsCache.find((item) => item.level.step === step);
                if (cacheExists) {
                    set({...cacheExists});
                    return;
                }
                const statistics = await CoinsApi.getLevelsStats(userId, step);
                if (statistics) {
                    set({
                        ...statistics,
                        levelsCache: [...get().levelsCache, statistics]
                    });
                }
            } catch (e) {
                console.log(e);
                showError()
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
                showError()
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
                showError()
            } finally {
                set({loading: false});
            }
        },
    }
})