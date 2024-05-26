import {ILevel} from "../../../shared/model/user/store-types.ts";

export interface ILevelsStore {
    level: ILevel
    prev_level: ILevel
    next_level: ILevel
    users: ILevelsUser[]
    rank: number;
    loading: boolean;

    init(): void;
    onPrev(): void;
    onNext(): void;
    reset(): void;
}

export interface ILevelsUser {
    coins: number
    username: string
    first_name: string
    last_name: string
    logo?: string
}
