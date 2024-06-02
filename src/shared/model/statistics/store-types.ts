import {ILevel, IUserData} from "../user/store-types.ts";

export interface IStatisticStore extends IStatisticData {
    init(step: string | number, userId: string | number): Promise<void>;
    setStatisticData(data: IStatisticData): void;
    reset(): void;
}

export interface IStatisticData {
    rank: number,
    level: ILevel
    next_level: ILevel
    last_level: ILevel
    users: IUserData[]
}
