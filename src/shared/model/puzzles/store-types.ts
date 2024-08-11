export interface IPuzzlesStore {
    isLoading: boolean;
    isInfoPopup: boolean;
    setInfoPopup: (value: boolean) => void;
    loadingLevelId: number;
    init: (force?: boolean) => void;
    currentPuzzle: IPuzzle | null;
    userPuzzleLevels: IPuzzleLevel[];
    claimedPuzzleLevel: IPuzzleLevel | null;
    setClaimedPuzzleLevel: (puzzleLevel: IPuzzleLevel | null) => void;
    onClaimPuzzle: (puzzleLevel: IPuzzleLevel) => Promise<void>;
    reset: () => void;
}

export interface IPuzzle {
    id: number
    title_ru: string
    title_en: string
    title: string
    img: string
    g_coins_per_hour: number
    active: boolean
    is_complete: boolean
    created_at: string
    updated_at: string
    puzzle_Levels: IPuzzleLevel[]
}

export interface IPuzzleLevel {
    id: number
    puzzle_id: number
    title_ru: string
    title_en: string
    title: string
    condition_type: string
    condition: string
    img: string
    level: number
    reward: string
    created_at: string
    updated_at: string

    frens_count: number
}
