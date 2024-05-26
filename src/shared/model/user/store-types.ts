export interface IUserStore extends IUserData {
    init(userId: number): Promise<void>;
    setUserData(data: IUserData): void;
    reset(): void;
}

export interface IUserData {
    id: number
    coins: number
    energy: number
    user_id: number
    username: string
    first_name: string
    last_name: string
    language_code: string
    logo: string
    level_id: number
    level: ILevel
    next_level: ILevel
    last_level: ILevel
    tasks: any[]
    dayBonus: any
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