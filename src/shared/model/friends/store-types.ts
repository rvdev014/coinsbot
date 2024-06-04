import {IUserData} from "../user/store-types.ts";

export interface IFriendsStore {
    loading: boolean;
    total_count: number;
    total_coins: number;
    list: IList[];

    init(userId: number | string): Promise<void>;
    reset(): void;
}

export interface IList {
    level: number
    percent: number
    count: number
    coins: number
    users: IUserData[]
}