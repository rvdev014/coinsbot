export interface IEarnStore {
    tasks: ITask[];
    bonuses: IBonus[];
    selectedTask: ITask | null;
    active_day_bonus: IBonus | null;

    totalBonusCoins: number;
    isLoading: boolean;
    isTasksLoading: boolean;
    isBonusesLoading: boolean;
    isClaimLoading: boolean;
    isCheckingTaskLoading: boolean;
    isOpenDaily: boolean;

    initEarn(): void;
    fetchTasks(): Promise<void>;
    fetchBonuses(withoutLoading: boolean | null): Promise<void>;
    onClaimClick(): void;
    onTaskClick(task: ITask): void;
    onCompleteTask(task: ITask): void;
    onDailyClick(): void;
    onTaskClose(): void;
    reset(): void;
}


export interface ITask {
    id: number
    title_ru: string
    title_en: string
    img: string
    url: string
    channel_id: string
    coins: number
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