export interface IMineStore {
    isLoading: boolean;
    isLoadingPuzzles: boolean;
    isLoadingClaim: boolean;
    loadingLevelId: number;

    categories: IMineCategory[];
    userCards: IUserCard[];

    init: (force?: boolean) => void;
    initPuzzles: (force?: boolean) => void;

    selectedCard: IMineCard | null;
    setSelectedCard: (card: IMineCard | null) => void;
    setCategories: (categories: IMineCategory[]) => void;
    onCardClick: (card: IMineCard) => void;
    onCardBuy: (card: IMineCard) => void;
    tabCategory: IMineCategory | null;
    onTabCategory: (category: IMineCategory) => void;

    reset: () => void;
}

export interface IMineCategory {
    id: number
    active: boolean
    parent_id: any
    title: string
    title_en: string
    title_ru: string
    created_at: string
    updated_at: string
    cards: IMineCard[]
}

export interface IMineCard extends IUserCard {
    id: number
    active: boolean
    category_id: number
    depend_level: number
    max_level: number
    expired_at: string
    price: number
    percent: number
    profit: number
    profit_percent: number
    type: string
    type_value: string
    title: string
    title_en: string
    title_ru: string
    sub_title_en: any
    sub_title_ru: any
    desc: any
    desc_en: any
    desc_ru: any
    img: any
    created_at: string
    updated_at: string
    puzzle: any
}

export interface IUserCard {
    id: number
    level: number
    profit: number
    next_price: number
    next_profit: number
    user_id: number
    card_id: number
    created_at: string
    updated_at: string

    refs_count: number
}
