import {ILevel, IUserData} from "../../../shared/model/user/store-types.ts";

export interface ILevelStore extends ILevelData {
    isLoading: boolean;
    isStatsLoading: boolean;
    levelsData: ILevel[];
    levelsCache: ILevelData[];
    currentLevel: ILevel;

    init: () => Promise<void>;
    fetchStats: (userId: number, step: number) => Promise<void>;
    setLevelsData: (levelsData: ILevel[]) => void;
    changeLevelsData: () => void;
    onSlide: (type: 'prev' | 'next') => void;
    reset: () => void;
}

export interface ILevelData {
    rank: number;
    level: ILevel;
    next_level: ILevel;
    prev_level: ILevel;
    users: IUserData[];
}
