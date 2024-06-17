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

                const cacheExists = get().levelsCache.find(level => level.level.step === currentLevel.step);
                if (cacheExists) {
                    return set({...cacheExists});
                }

                set({levelsData: [
                        {
                            "id": 1,
                            "title_ru": "Щенок",
                            "title_en": "Puppy",
                            "title": "Puppy",
                            "img": "https://api.clydetap.site/storage/levels/Puppy.png",
                            "color": "#767676",
                            "step": 1,
                            "coins": 0,
                            "coins_per_hour": 500,
                            "energy_limit": 1000,
                            "coins_per_tap": 1,
                            "created_at": "2024-06-11 20:40:16Z",
                            "updated_at": "2024-06-11 20:40:16Z"
                        },
                        {
                            "id": 2,
                            "title_ru": "Юный Пес",
                            "title_en": "Junior Dog",
                            "title": "Junior Dog",
                            "img": "https://api.clydetap.site/storage/levels/Junior Dog.png",
                            "color": "#1E90B4",
                            "step": 2,
                            "coins": 10000,
                            "coins_per_hour": 500,
                            "energy_limit": 500,
                            "coins_per_tap": 2,
                            "created_at": "2024-06-11 20:40:16Z",
                            "updated_at": "2024-06-11 20:40:16Z"
                        },
                        {
                            "id": 3,
                            "title_ru": "Хороший Мальчик",
                            "title_en": "Good Boy",
                            "title": "Good Boy",
                            "img": "https://api.clydetap.site/storage/levels/Good Boy.png",
                            "color": "#1E51B4",
                            "step": 3,
                            "coins": 25000,
                            "coins_per_hour": 500,
                            "energy_limit": 500,
                            "coins_per_tap": 3,
                            "created_at": "2024-06-11 20:40:16Z",
                            "updated_at": "2024-06-11 20:40:16Z"
                        },
                        {
                            "id": 4,
                            "title_ru": "Песик",
                            "title_en": "Doggo",
                            "title": "Doggo",
                            "img": "https://api.clydetap.site/storage/levels/Doggo.png",
                            "color": "#1E90B4",
                            "step": 4,
                            "coins": 50000,
                            "coins_per_hour": 500,
                            "energy_limit": 500,
                            "coins_per_tap": 4,
                            "created_at": "2024-06-11 20:40:16Z",
                            "updated_at": "2024-06-11 20:40:16Z"
                        },
                        {
                            "id": 5,
                            "title_ru": "Хвостик",
                            "title_en": "Tail Wagger",
                            "title": "Tail Wagger",
                            "img": "https://api.clydetap.site/storage/levels/Tail Wagger.png",
                            "color": "#1EB490",
                            "step": 5,
                            "coins": 100000,
                            "coins_per_hour": 500,
                            "energy_limit": 500,
                            "coins_per_tap": 4,
                            "created_at": "2024-06-11 20:40:16Z",
                            "updated_at": "2024-06-11 20:40:16Z"
                        },
                        {
                            "id": 6,
                            "title_ru": "Мастер Аппортировки",
                            "title_en": "Fetch Master",
                            "title": "Fetch Master",
                            "img": "https://api.clydetap.site/storage/levels/Fetch Master.png",
                            "color": "#FAFF10",
                            "step": 6,
                            "coins": 250000,
                            "coins_per_hour": 500,
                            "energy_limit": 500,
                            "coins_per_tap": 5,
                            "created_at": "2024-06-11 20:40:16Z",
                            "updated_at": "2024-06-11 20:40:16Z"
                        },
                        {
                            "id": 7,
                            "title_ru": "Чемпион Лая",
                            "title_en": "Bark Champion",
                            "title": "Bark Champion",
                            "img": "https://api.clydetap.site/storage/levels/Bark Champion.png",
                            "color": "#10FF44",
                            "step": 7,
                            "coins": 500000,
                            "coins_per_hour": 2000,
                            "energy_limit": 2000,
                            "coins_per_tap": 5,
                            "created_at": "2024-06-11 20:40:16Z",
                            "updated_at": "2024-06-11 20:40:16Z"
                        },
                        {
                            "id": 8,
                            "title_ru": "Принц Лап",
                            "title_en": "Paw Prince",
                            "title": "Paw Prince",
                            "img": "https://api.clydetap.site/storage/levels/Paw Prince.png",
                            "color": "#EBEBEB",
                            "step": 8,
                            "coins": 1000000,
                            "coins_per_hour": 2500,
                            "energy_limit": 2500,
                            "coins_per_tap": 10,
                            "created_at": "2024-06-11 20:40:16Z",
                            "updated_at": "2024-06-11 20:40:16Z"
                        },
                        {
                            "id": 9,
                            "title_ru": "Страж Псов",
                            "title_en": "Guardian Hound",
                            "title": "Guardian Hound",
                            "img": "https://api.clydetap.site/storage/levels/Guardian Hound.png",
                            "color": "#FB7146",
                            "step": 9,
                            "coins": 10000000,
                            "coins_per_hour": 5000,
                            "energy_limit": 5000,
                            "coins_per_tap": 25,
                            "created_at": "2024-06-11 20:40:16Z",
                            "updated_at": "2024-06-11 20:40:16Z"
                        },
                        {
                            "id": 10,
                            "title_ru": "Альфа Пес",
                            "title_en": "Alpha Dog",
                            "title": "Alpha Dog",
                            "img": "https://api.clydetap.site/storage/levels/Alpha Dog.png",
                            "color": "#9B410F",
                            "step": 10,
                            "coins": 50000000,
                            "coins_per_hour": 5000,
                            "energy_limit": 5000,
                            "coins_per_tap": 50,
                            "created_at": "2024-06-11 20:40:16Z",
                            "updated_at": "2024-06-11 20:40:16Z"
                        },
                        {
                            "id": 11,
                            "title_ru": "Завоеватель Псов",
                            "title_en": "Canine Conqueror",
                            "title": "Canine Conqueror",
                            "img": "https://api.clydetap.site/storage/levels/Canine Conqueror.png",
                            "color": "#10955C",
                            "step": 11,
                            "coins": 75000000,
                            "coins_per_hour": 15000,
                            "energy_limit": 15000,
                            "coins_per_tap": 150,
                            "created_at": "2024-06-11 20:40:16Z",
                            "updated_at": "2024-06-11 20:40:16Z"
                        },
                        {
                            "id": 12,
                            "title_ru": "Волшебник Лая",
                            "title_en": "Woof Wizard",
                            "title": "Woof Wizard",
                            "img": "https://api.clydetap.site/storage/levels/Woof Wizard.png",
                            "color": "#17D686",
                            "step": 12,
                            "coins": 100000000,
                            "coins_per_hour": 25000,
                            "energy_limit": 25000,
                            "coins_per_tap": 250,
                            "created_at": "2024-06-11 20:40:16Z",
                            "updated_at": "2024-06-11 20:40:16Z"
                        },
                        {
                            "id": 13,
                            "title_ru": "Король Псов",
                            "title_en": "Dog King",
                            "title": "Dog King",
                            "img": "https://api.clydetap.site/storage/levels/Dog King.png",
                            "color": "#FBBD46",
                            "step": 13,
                            "coins": 250000000,
                            "coins_per_hour": 50000,
                            "energy_limit": 50000,
                            "coins_per_tap": 500,
                            "created_at": "2024-06-11 20:40:16Z",
                            "updated_at": "2024-06-11 20:40:16Z"
                        },
                        {
                            "id": 14,
                            "title_ru": "Император Псов",
                            "title_en": "Dog Emperor",
                            "title": "Dog Emperor",
                            "img": "https://api.clydetap.site/storage/levels/Dog Emperor.png",
                            "color": "#FFA800",
                            "step": 14,
                            "coins": 500000000,
                            "coins_per_hour": 75000,
                            "energy_limit": 75000,
                            "coins_per_tap": 750,
                            "created_at": "2024-06-11 20:40:16Z",
                            "updated_at": "2024-06-11 20:40:16Z"
                        },
                        {
                            "id": 15,
                            "title_ru": "Легенда Псов",
                            "title_en": "Canine Legend",
                            "title": "Canine Legend",
                            "img": "https://api.clydetap.site/storage/levels/Canine Legend.png",
                            "color": "#FF3333",
                            "step": 15,
                            "coins": 1000000000,
                            "coins_per_hour": 100000,
                            "energy_limit": 100000,
                            "coins_per_tap": 1000,
                            "created_at": "2024-06-11 20:40:16Z",
                            "updated_at": "2024-06-11 20:40:16Z"
                        }
                    ] as ILevel[]});

                const promises = [
                    preloadImages(Object.values(levelsImgData)),
                    // CoinsApi.getLevels().then(levelsData => set({levelsData})),
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