import {IBonus} from "../earn/store-types.ts";
import {BoostType, IBoostInfo} from "../../../features/boost/model/store-types.ts";

export interface IUserStore extends IUserData {
    isCollectedPopup: boolean;
    energyTimeout: number | null;
    coinsTimeout: number | null;

    setInitialStore(store: IUserData, withEnergy?: boolean): Promise<void>;
    init(userId: number, params?: IPerHourPayload): Promise<void>;
    changeLang(params?: IPerHourPayload): Promise<void>;
    initInterval(): void;
    updateLevel(): Promise<void>;
    reset(): void;
}

export interface IPerHourPayload {
    user_id?: number;
    username?: string;
    first_name?: string;
    last_name?: string;
    language_code?: string;
    logo?: string;
    is_premium?: boolean;
    referral?: string;
}

export interface IUserData {
    id: number,
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
    collected_coins: number,
    energy: number,
    profit: number,
    energy_limit: number,
    coins_per_hour: number,
    coins_per_second: number,
    coins_per_tap: number,
    energy_per_second: number,
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
    boost: {
        [key in BoostType]: IBoostInfo
    }
    tasks_active: boolean
}

export interface ILevel {
    id: number
    title: string
    title_ru: string
    title_en: string
    img: string
    step: number
    color: string
    coins: number
    coins_per_hour: number
    energy_limit: number
    coins_per_tap: number
    created_at: string
    updated_at: string
}