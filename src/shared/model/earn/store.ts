import {create} from "zustand";
import {IBonus, IEarnStore, ITask} from "./store-types.ts";
import {MainApi} from "../../api/main-api.ts";
import {useUserStore} from "../user/store.ts";
import {CoinsApi} from "../../api/coins-api.ts";
import {showError, success} from "../../utils/other.ts";
import {getDayDiffFromNow} from "../../utils/date.ts";

const initialStore = {
    tasks: [] as ITask[],
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
            set({isTasksLoading: true});
            return MainApi.getTasks()
                .then((tasks) => {
                    set({tasks});
                })
                .finally(() => {
                    set({isTasksLoading: false});
                });
        },

        fetchBonuses(withoutLoading: boolean | null) {

            if (!withoutLoading) {
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

                });
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