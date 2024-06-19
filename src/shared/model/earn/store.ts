import {create} from "zustand";
import {IBonus, IEarnStore, ITask} from "./store-types.ts";
import {MainApi} from "../../api/main-api.ts";
import {useUserStore} from "../user/store.ts";
import {CoinsApi} from "../../api/coins-api.ts";
import {preloadImages, showError, success} from "../../utils/other.ts";
import {getDayDiffFromNow} from "../../utils/date.ts";
import {earnImgData} from "./utils.ts";

const initialStore = {
    tasks: [] as ITask[],
    tasksOwner: [] as ITask[],
    tasksPartner: [] as ITask[],
    tasksOpenedUrl: [] as number[],
    bonuses: [] as IBonus[],
    selectedTask: null,
    active_day_bonus: null,

    isLoading: false,
    isTasksLoading: false,
    isBonusesLoading: false,
    isSubmitLoading: false,
    isCheckingTaskLoading: false,
    isOpenDaily: false,
} as IEarnStore;

export const useEarnStore = create<IEarnStore>((set, get) => {
    return {
        ...initialStore,

        async initEarn() {
            // for prevent double fetching
            if (get().tasks.length > 0 && get().bonuses.length > 0) return;

            try {
                set({isLoading: true});

                const promises = [
                    preloadImages(Object.values(earnImgData)),
                    get().fetchTasks(),
                    get().fetchBonuses(false),
                ];

                await Promise.allSettled(promises);
            } catch (e) {
                showError()
            } finally {
                set({isLoading: false});
            }
        },

        fetchTasks() {

            // const tasks: ITask[] = [
            //     {
            //         "id": 1,
            //         "title_ru": "Подпишись на канал",
            //         "title_en": "Subscribe to channel",
            //         "title": "Subscribe to channel",
            //         "img": null,
            //         "url": "https://t.me/ClydeTap_Announcment",
            //         "channel_id": "-1002193815738",
            //         "coins": 30000,
            //         "count": 2147000000,
            //         "hours": null,
            //         "is_external": false,
            //         "type": "owner",
            //         "created_at": "2024-06-11 20:40:16Z",
            //         "updated_at": "2024-06-16 13:17:53Z"
            //     },
            //     {
            //         "id": 3,
            //         "title_ru": "Подпишись на twitter",
            //         "title_en": "Subscribe to twitter",
            //         "title": "Subscribe to twitter",
            //         "img": null,
            //         "url": "https://x.com/TapClyde",
            //         "channel_id": null,
            //         "coins": 30000,
            //         "count": 2147000000,
            //         "hours": null,
            //         "is_external": true,
            //         "type": "owner",
            //         "created_at": "2024-06-13 19:19:13Z",
            //         "updated_at": "2024-06-16 13:17:44Z"
            //     },
            //     {
            //         "id": 4,
            //         "title_ru": "Bodypump запусти бота и нажми play ",
            //         "title_en": "Bodypump launch the bot and press play",
            //         "title": "Bodypump launch the bot and press play",
            //         "img": null,
            //         "url": "https://t.me/Bodypump_app_bot?start=3019488d-6d51-4153-b641-4369446e133d",
            //         "channel_id": null,
            //         "coins": 20000,
            //         "count": 2147000000,
            //         "hours": null,
            //         "is_external": false,
            //         "type": "partner",
            //         "created_at": "2024-06-16 14:50:32Z",
            //         "updated_at": "2024-06-16 13:17:44Z"
            //     },
            //     {
            //         "id": 5,
            //         "title_ru": "Подпишись на канал Bodypump ",
            //         "title_en": "Subscribe to Bodypump channel",
            //         "title": "Subscribe to Bodypump channel",
            //         "img": null,
            //         "url": "https://t.me/bodypump_app",
            //         "channel_id": "-1002000103964",
            //         "coins": 20000,
            //         "count": 2147000000,
            //         "hours": null,
            //         "is_external": false,
            //         "type": "partner",
            //         "created_at": "2024-06-16 15:00:47Z",
            //         "updated_at": "2024-06-16 13:17:52Z"
            //     },
            //     {
            //         "id": 6,
            //         "title_ru": "brrrrren запусти бота и нажми play",
            //         "title_en": "brrrrren launch the bot and press play",
            //         "title": "brrrrren launch the bot and press play",
            //         "img": null,
            //         "url": "https://t.me/brrrrrgamebot?start=6672f7c5f71ee7d1c896634c",
            //         "channel_id": null,
            //         "coins": 20000,
            //         "count": 100000,
            //         "hours": null,
            //         "is_external": false,
            //         "type": "partner",
            //         "created_at": "2024-06-16 14:50:32Z",
            //         "updated_at": "2024-06-16 13:17:44Z"
            //     },
            //     {
            //         "id": 7,
            //         "title_ru": "Подпишись на канал brrrrren ",
            //         "title_en": "Subscribe to brrrrren channel",
            //         "title": "Subscribe to brrrrren channel",
            //         "img": null,
            //         "url": "https://t.me/brrrrren",
            //         "channel_id": "-1001990947315",
            //         "coins": 20000,
            //         "count": 100000,
            //         "hours": null,
            //         "is_external": false,
            //         "type": "partner",
            //         "created_at": "2024-06-16 15:00:47Z",
            //         "updated_at": "2024-06-16 13:17:52Z"
            //     }
            // ]
            //
            // const tasksOwner = tasks.filter(task => task.type === 'owner');
            // const tasksPartner = tasks.filter(task => task.type === 'partner');
            //
            // set({tasks, tasksOwner, tasksPartner});
            //
            // return Promise.resolve();

            set({isTasksLoading: true});
            return MainApi.getTasks()
                .then((tasks) => {
                    const tasksOwner = tasks.filter(task => task.type === 'owner');
                    const tasksPartner = tasks.filter(task => task.type === 'partner');

                    set({tasks, tasksOwner, tasksPartner});
                })
                .finally(() => {
                    set({isTasksLoading: false});
                });
        },

        fetchBonuses(withoutLoading: boolean | null) {

            const bonuses = [
                {
                    "id": 1,
                    "coins": 10000,
                    "title_ru": "День 1",
                    "title_en": "Day 1",
                    "title": "Day 1",
                    "img": "🪙",
                    "day": 1,
                    "created_at": "2024-06-11 20:40:16Z",
                    "updated_at": "2024-06-11 20:40:16Z"
                },
                {
                    "id": 2,
                    "coins": 20000,
                    "title_ru": "День 2",
                    "title_en": "Day 2",
                    "title": "Day 2",
                    "img": "🪙",
                    "day": 2,
                    "created_at": "2024-06-11 20:40:16Z",
                    "updated_at": "2024-06-11 20:40:16Z"
                },
                {
                    "id": 3,
                    "coins": 30000,
                    "title_ru": "День 3",
                    "title_en": "Day 3",
                    "title": "Day 3",
                    "img": "🪙",
                    "day": 3,
                    "created_at": "2024-06-11 20:40:16Z",
                    "updated_at": "2024-06-11 20:40:16Z"
                },
                {
                    "id": 4,
                    "coins": 40000,
                    "title_ru": "День 4",
                    "title_en": "Day 4",
                    "title": "Day 4",
                    "img": "🪙",
                    "day": 4,
                    "created_at": "2024-06-11 20:40:16Z",
                    "updated_at": "2024-06-11 20:40:16Z"
                },
                {
                    "id": 5,
                    "coins": 50000,
                    "title_ru": "День 5",
                    "title_en": "Day 5",
                    "title": "Day 5",
                    "img": "🪙",
                    "day": 5,
                    "created_at": "2024-06-11 20:40:16Z",
                    "updated_at": "2024-06-11 20:40:16Z"
                },
                {
                    "id": 6,
                    "coins": 60000,
                    "title_ru": "День 6",
                    "title_en": "Day 6",
                    "title": "Day 6",
                    "img": "🪙",
                    "day": 6,
                    "created_at": "2024-06-11 20:40:16Z",
                    "updated_at": "2024-06-11 20:40:16Z"
                },
                {
                    "id": 7,
                    "coins": 70000,
                    "title_ru": "День 7",
                    "title_en": "Day 7",
                    "title": "Day 7",
                    "img": "🪙",
                    "day": 7,
                    "created_at": "2024-06-11 20:40:16Z",
                    "updated_at": "2024-06-11 20:40:16Z"
                },
                {
                    "id": 8,
                    "coins": 80000,
                    "title_ru": "День 8",
                    "title_en": "Day 8",
                    "title": "Day 8",
                    "img": "🪙",
                    "day": 8,
                    "created_at": "2024-06-11 20:40:16Z",
                    "updated_at": "2024-06-11 20:40:16Z"
                },
                {
                    "id": 9,
                    "coins": 90000,
                    "title_ru": "День 9",
                    "title_en": "Day 9",
                    "title": "Day 9",
                    "img": "🪙",
                    "day": 9,
                    "created_at": "2024-06-11 20:40:16Z",
                    "updated_at": "2024-06-11 20:40:16Z"
                },
                {
                    "id": 10,
                    "coins": 100000,
                    "title_ru": "День 10",
                    "title_en": "Day 10",
                    "title": "Day 10",
                    "img": "🪙",
                    "day": 10,
                    "created_at": "2024-06-11 20:40:16Z",
                    "updated_at": "2024-06-11 20:40:16Z"
                }
            ];

            const totalBonusCoins = bonuses.reduce((total, bonus) => {
                return total + bonus.coins;
            }, 0);

            const userBonusDate = useUserStore.getState().bonus_date;
            const userDayBonus = useUserStore.getState().day_bonus;

            let activeDayBonus: IBonus | undefined = undefined;
            if (userDayBonus) {
                const dayDiff = getDayDiffFromNow(userBonusDate);
                if (dayDiff < 1) {
                    activeDayBonus = undefined;
                } else if (dayDiff === 1) {
                    activeDayBonus = bonuses.find(bonus => bonus.day > userDayBonus?.day);
                    if (!activeDayBonus) {
                        activeDayBonus = bonuses.find(bonus => bonus.day === 1);
                    }
                } else {
                    activeDayBonus = bonuses.find(bonus => bonus.day === 1);
                }
            } else {
                activeDayBonus = bonuses.find(bonus => bonus.day === 1);
            }

            set({
                bonuses,
                active_day_bonus: activeDayBonus,
                totalBonusCoins
            });

            return Promise.resolve();

            /*if (!withoutLoading) {
                set({isBonusesLoading: true});
            }

            return MainApi.getBonuses()
                .then((bonuses) => {
                    const totalBonusCoins = bonuses.reduce((total, bonus) => {
                        return total + bonus.coins;
                    }, 0);

                    const userBonusDate = useUserStore.getState().bonus_date;
                    const userDayBonus = useUserStore.getState().day_bonus;

                    let activeDayBonus: IBonus | undefined = undefined;
                    if (userDayBonus) {
                        const dayDiff = getDayDiffFromNow(userBonusDate);
                        if (dayDiff < 1) {
                            activeDayBonus = undefined;
                        } else if (dayDiff === 1) {
                            activeDayBonus = bonuses.find(bonus => bonus.day > userDayBonus?.day);
                            if (!activeDayBonus) {
                                activeDayBonus = bonuses.find(bonus => bonus.day === 1);
                            }
                        } else {
                            activeDayBonus = bonuses.find(bonus => bonus.day === 1);
                        }
                    } else {
                        activeDayBonus = bonuses.find(bonus => bonus.day === 1);
                    }

                    set({
                        bonuses,
                        active_day_bonus: activeDayBonus,
                        totalBonusCoins
                    });
                })
                .finally(() => {

                    if (!withoutLoading) {
                        set({isBonusesLoading: false});
                    }

                });*/
        },

        onDailyClick() {
            set({isOpenDaily: true})
        },

        async onClaimClick() {
            const activeDayBonus = get().active_day_bonus;
            if (!activeDayBonus) return;

            set({isSubmitLoading: true});
            try {
                const user = await CoinsApi.updateBonus(useUserStore.getState().user_id);
                if (user) {
                    set({isOpenDaily: false});
                    success('Bonus claimed successfully!')
                    useUserStore.getState().setInitialStore({...user});
                    await get().fetchBonuses(true);
                }
            } catch (e) {
                showError()
            } finally {
                set({isSubmitLoading: false});
            }
        },

        async onCompleteTask(task: ITask) {

            set({isSubmitLoading: true});
            try {
                const userId = useUserStore.getState().user_id;
                const user = await CoinsApi.taskComplete(userId, task.id);
                if (user) {
                    useUserStore.getState().setInitialStore({...user});
                    set({selectedTask: null});
                    await get().fetchTasks();
                    success('Task completed successfully!')
                }
            } catch (e) {
                showError('Checking failed! Task is not completed!');
                set({tasksOpenedUrl: get().tasksOpenedUrl.filter(id => id !== task.id)});
            } finally {
                set({isSubmitLoading: false});
            }
        },

        onTaskClick(task: ITask) {
            set({selectedTask: task});
        },

        onTaskClose() {
            set({selectedTask: null});
        },

        reset: () => set(initialStore),
    }
});