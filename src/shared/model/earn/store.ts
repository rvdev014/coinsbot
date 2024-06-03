import {create} from "zustand";
import {IBonus, IEarnStore, ITask} from "./store-types.ts";
import {MainApi} from "../../api/main-api.ts";
import {useUserStore} from "../user/store.ts";
import {parseStr2Date} from "../../utils/date.ts";
import {CoinsApi} from "../../api/coins-api.ts";

const initialStore = {
    tasks: [] as ITask[],
    bonuses: [] as IBonus[],
    selectedTask: null,
    activeDayBonus: null,

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
            const activeDayBonus = get().activeDayBonus;
            if (!activeDayBonus) return;

            set({isClaimLoading: true});
            try {
                const user = await CoinsApi.updateBonus(useUserStore.getState().user_id, activeDayBonus.id);
                if (user) {
                    useUserStore.setState({...user});
                    await get().fetchBonuses();
                }
            } catch (e) {
                console.error(e);
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

        fetchBonuses() {
            set({isBonusesLoading: true});
            return MainApi.getBonuses()
                .then((bonuses) => {
                    const userDayBonus = useUserStore.getState().dayBonus;
                    const userBonusDate = useUserStore.getState().bonus_date;

                    let activeDayBonus: IBonus | null | undefined;

                    if (userDayBonus && userBonusDate) {
                        const currentDate = new Date();
                        const bonusDate = parseStr2Date(userBonusDate);
                        console.log('bonusDate', bonusDate)
                        const isSameDay = currentDate.getDate() === bonusDate.getDate();

                        if (!isSameDay) {
                            activeDayBonus = bonuses.find(bonus => bonus.day > userDayBonus.day);
                        } else {
                            activeDayBonus = null;
                        }
                    } else {
                        activeDayBonus = bonuses.find(bonus => bonus.day === 1);
                    }

                    set({bonuses, activeDayBonus});
                })
                .finally(() => {
                    set({isBonusesLoading: false});
                });
        },

        async initEarn() {
            try {
                set({isLoading: true});

                const promises = [
                    get().fetchTasks(),
                    get().fetchBonuses(),
                ];

                await Promise.allSettled(promises);
            } catch (e) {
                console.error(e);
            } finally {
                set({isLoading: false});
            }
        },

        onDailyClick() {
            set({isOpenDaily: true})
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