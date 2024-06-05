import {IBonus} from "../earn/store-types.ts";

export interface IUserStore extends IUserData {
    setInitialStore(store: IUserData): void;
    init(userId: number): Promise<void>;
    setUserData(data: IUserData): void;
    reset(): void;
}

export interface IUserData {
    user_id: number,
    day_bonus_id: number,
    level_id: number,
    username: string,
    first_name: string,
    last_name: string,
    full_name: string,
    logo: string,
    language_code: string,
    coins: number,
    energy: number,
    energy_limit: number,
    coins_per_hour: number,
    coins_per_second: number,
    coins_per_tap: number,
    referral_levels: object,
    multi_tap: string,
    bonus_date: string,
    bonus_day_ready: boolean,
    turbo: string,
    tap_at: string,
    energy_turbo_at: string,
    restore_energy_at: string,
    last_coins_per_hour_at: string,
    created_at: string,
    updated_at: string,
    level: ILevel
    next_level: ILevel
    last_level: ILevel
    tasks: any[]
    day_bonus: IBonus | null
    active_day_bonus: IBonus | null
}

export interface ILevel {
    title_ru: string
    title_en: string
    img: string
    step: number
    coins: number
    coins_per_hour: number
    energy_limit: number
    coins_per_tap: number
    created_at: string
    updated_at: string
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