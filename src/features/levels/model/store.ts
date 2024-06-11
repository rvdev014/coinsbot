import {create} from "zustand";
import {ILevelData, ILevelStore} from "./store-types.ts";
import {CoinsApi} from "../../../shared/api/coins-api.ts";
import {useUserStore} from "../../../shared/model/user/store.ts";
import {preloadImages, showError} from "../../../shared/utils/other.ts";
import {ILevel} from "../../../shared/model/user/store-types.ts";
import {levelsImgData} from "./utils.ts";

const initialStore = {
    isLoading: false,
    isStatsLoading: false,
    levelsData: [] as ILevel[],
    levelsCache: [] as ILevelData[],
} as ILevelStore;

export const useLevelStore = create<ILevelStore>((set, get) => {
    return {
        ...initialStore,

        init: async () => {
            set({isLoading: true});
            try {
                const userId = useUserStore.getState().user_id;
                const currentLevel = useUserStore.getState().level;

                set({currentLevel});

                const promises = [
                    preloadImages(Object.values(levelsImgData)),
                    CoinsApi.getLevels().then(levelsData => set({levelsData})),
                    get().fetchStats(userId, currentLevel.step),
                ];

                await Promise.allSettled(promises);
            } catch (e) {
                showError()
            } finally {
                set({isLoading: false});
            }
        },

        fetchStats(userId, step) {
            set({isStatsLoading: true})
            return CoinsApi.getLevelsStats(userId, step)
                .then(data => set({
                    ...data,
                    levelsCache: [...get().levelsCache, data]
                }))
                .finally(() => set({isStatsLoading: false}));
        },

        onSlide: async (type) => {
            set({isStatsLoading: true});
            try {
                const userState = useUserStore.getState();
                const currentLevel = get().levelsData.find(level => {
                    return level.step === (type === 'next' ? get().next_level.step : get().prev_level.step)
                });

                if (currentLevel) {
                    set({currentLevel});

                    const cacheExists = get().levelsCache.find(level => level.level.step === currentLevel.step);
                    if (cacheExists) {
                        return set({...cacheExists});
                    }

                    await get().fetchStats(userState.user_id, currentLevel.step);
                }
            } catch (e) {
                console.log(e)
                showError()
            } finally {
                set({isStatsLoading: false});
            }
        },

    }
})