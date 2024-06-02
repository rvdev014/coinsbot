import {ILevel, IUserData} from "../../../shared/model/user/store-types.ts";

export interface ILevelStore extends ILevelData {
    init(userId: string | number, step: string | number): Promise<void>;
    setStatisticData(data: ILevelData): void;
    reset(): void;
}

export interface ILevelData {
    rank: number,
    level: ILevel
    next_level: ILevel
    prev_level: ILevel
    users: IUserData[],
    loading: boolean,
}