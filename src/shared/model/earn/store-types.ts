export interface IEarnStore {
    tasks: ITask[];
    tasksOwner: ITask[];
    tasksCoupon: ITask[];
    tasksInvite: ITask[];
    tasksPartner: ITask[];
    bonuses: IBonus[];
    selectedTask: ITask | null;
    active_day_bonus: IBonus | null;

    tasksOpenedUrl: number[];

    totalBonusCoins: number;
    isLoading: boolean;
    isTasksLoading: boolean;
    isBonusesLoading: boolean;
    isSubmitLoading: boolean;
    isCheckingTaskLoading: boolean;
    isOpenDaily: boolean;

    init: () => Promise<void>;
    fetchTasks: () => Promise<void>;
    fetchBonuses: () => Promise<void>;
    setTasks: (tasks: ITask[]) => void;
    changeTasks: () => void;
    onClaimClick: () => void;
    onTaskClick: (task: ITask | undefined) => void;
    onCompleteTask: (task: ITask, coupon: string | null | undefined | void) => void;
    onDailyClick: () => void;
    onTaskClose: () => void;
    reset: () => void;
}


export interface ITask {
    id: number
    title: string
    title_ru: string
    title_en: string
    desc: string
    desc_ru: string
    desc_en: string
    img: string | null
    url: string
    countries: string
    channel_id: string | null
    type: 'owner' | 'partner' | 'other' | 'coupon'
    coins: number
    count: number
    hours: number | null
    active?: boolean
    is_external: boolean
    created_at: string
    updated_at: string
}

export interface IBonus {
    id: number
    coins: number
    title_ru: string
    title_en: string
    img: string
    day: number
    created_at: string
    updated_at: string
}
