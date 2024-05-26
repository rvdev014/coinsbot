export interface IUserStore extends IUserData {
    init(userId: number): void;
    setUserData(data: IUserData): void;
    reset(): void;
}

export interface IUserData {
    id: number;
    user_id: number;
    username: string;
    first_name: string;
    last_name: string;
    language_code: string;
    coins: number;
    multi_tap: number;
    energy: number;
    level_id: number;
    day_bonus_id: number;
    bonus_date?: any;
    full_energy: string;
    turbo?: any;
    remember_token?: any;
    created_at: string;
    updated_at: string;
    limit?: any;
    coins_per_hour: number;
    last_coin_per_hour_at: string;
    level: Level;
    nextLevel: Level;
    tasks: any[];
    day_bonus: DayBonus;
    referrals: any[];
}

export interface DayBonus {
    id: number;
    coins: number;
    title_ru: string;
    title_en: string;
    img: string;
    day: number;
    created_at: string;
    updated_at: string;
}

export interface Level {
    id: number;
    name: string;
    img: string;
    coins: number;
    created_at: string;
    updated_at: string;
}