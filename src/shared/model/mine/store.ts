import {create} from "zustand";
import {IMineStore} from "./store-types.ts";
import {useUserStore} from "../user/store.ts";
import {increaseByPercent, showError, success} from "../../utils/other.ts";
import {PuzzlesApi} from "../../api/puzzles-api";
import {usePuzzlesStore} from "../puzzles/store";

const initialStore = {
    isLoading: false,
    isLoadingPuzzles: false,
    isLoadingClaim: false,
    loadingLevelId: 0,

    categories: [],
    userCards: [],

    selectedCard: null,
    tabCategory: null,
    onTabCategory: () => {
    },
};

export const useMineStore = create<IMineStore>((set, get) => {
    return {
        ...initialStore,

        init: async (force) => {
            if (!force && (get().categories.length || get().userCards.length)) return;

            set({isLoading: true});
            try {
                const cardsData = await PuzzlesApi.fetchCards(useUserStore.getState().user_id);
                if (cardsData?.categories?.length && cardsData?.users) {

                    const categories = cardsData.categories?.map(category => {
                        return {
                            ...category,
                            cards: category.cards.map(card => {
                                const userCard = cardsData.users.find(userCard => userCard.card_id === card.id);
                                return {
                                    ...card,
                                    refs_count: userCard?.refs_count ?? 0,
                                    level: userCard?.level ?? 0,
                                    next_price: userCard?.next_price ?? card.price,
                                    next_profit: userCard?.next_profit ?? card.profit,
                                }
                            })
                        }
                    });

                    set({
                        categories,
                        userCards: cardsData.users,
                        tabCategory: categories[0]
                    });
                } else {
                    showError()
                }
            } catch (e) {
                showError()
            } finally {
                set({isLoading: false});
            }
        },

        initPuzzles: async (force) => {
            if (!force && (usePuzzlesStore.getState().puzzles.length && usePuzzlesStore.getState().userPuzzles.length)) return;

            set({isLoadingPuzzles: true});
            try {
                await Promise.allSettled([
                    usePuzzlesStore.getState().fetchPuzzles(),
                    usePuzzlesStore.getState().fetchMyPuzzles()
                ]);
            } catch (e) {
                showError()
            } finally {
                set({isLoadingPuzzles: false});
            }
        },

        setSelectedCard: (card) => {
            set({selectedCard: card});
        },

        onCardBuy: async (card) => {
            try {
                set({isLoadingClaim: true});

                const user = await PuzzlesApi.cardBuy(
                    useUserStore.getState().user_id,
                    card.id
                );
                await useUserStore.getState().setInitialStore({...user})

                set({selectedCard: null});

                const newCardData = {
                    level: card.level ? card.level + 1 : 1,
                    next_price: increaseByPercent(card.next_price ?? card.price, card.percent),
                    next_profit: increaseByPercent(card.next_profit ?? card.profit, card.profit_percent),
                };

                set({
                    userCards: get().userCards.map(userCard => {
                        if (userCard.card_id === card.id) {
                            return {...userCard, ...newCardData};
                        }
                        return userCard;
                    })
                })

                get().setCategories(
                    get().categories.map(category => {
                        if (category.id === card.category_id) {
                            return {
                                ...category,
                                cards: category.cards.map(c => {
                                    if (c.id === card.id) {
                                        return {...card, ...newCardData};
                                    }
                                    return c;
                                })
                            }
                        }
                        return category;
                    })
                );

                success('Card successfully claimed');
            } catch (e) {
                showError()
            } finally {
                set({isLoadingClaim: false});
            }
        },

        setCategories: (categories) => {
            set({
                categories,
                tabCategory: categories.find(category => category.id === get().tabCategory?.id) || categories[0]
            })
        },

        onCardClick: (card) => {
            set({selectedCard: card});
        },

        onTabCategory: (tabCategory) => {
            set({tabCategory});
        },

        reset: () => set(initialStore),
    }
});
