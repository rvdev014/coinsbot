import {create} from "zustand";
import {IBonus, IEarnStore, ITask} from "./store-types.ts";
import {MainApi} from "../../api/main-api.ts";
import {useUserStore} from "../user/store.ts";
import {CoinsApi} from "../../api/coins-api.ts";
import {showError, success} from "../../utils/other.ts";

const initialStore = {
    tasks: [] as ITask[],
    bonuses: [] as IBonus[],
    selectedTask: null,
    active_day_bonus: null,

    isLoading: false,
    isTasksLoading: false,
    isBonusesLoading: false,
    isClaimLoading: false,
    isCheckingTaskLoading: false,
    isOpenDaily: false,
} as IEarnStore;

export const useEarnStore = create<IEarnStore>((set, get) => {
    return {
        ...initialStore,

        async onClaimClick() {
            const activeDayBonus = get().active_day_bonus;
            if (!activeDayBonus) return;

            set({isClaimLoading: true});
            try {
                const user = await CoinsApi.updateBonus(useUserStore.getState().user_id, activeDayBonus.id);
                if (user) {
                    useUserStore.getState().setInitialStore({...user});
                    await get().fetchBonuses(true);
                }
            } catch (e) {
                showError()
            } finally {
                set({isClaimLoading: false});
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
                    const activeDayBonus = useUserStore.getState().active_day_bonus;
                    const totalBonusCoins = bonuses.reduce((total, bonus) => {
                        return total + bonus.coins;
                    }, 0);

                    set({bonuses, active_day_bonus: activeDayBonus, totalBonusCoins });
                })
                .finally(() => {

                    if (!withoutLoading) {
                        set({isBonusesLoading: false});
                    }

                });
        },

        async initEarn() {
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

        onDailyClick() {
            set({isOpenDaily: true})
        },

        async onCompleteTask(task: ITask) {
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