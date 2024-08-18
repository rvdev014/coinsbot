import {create} from "zustand";
import {IPuzzlesStore} from "./store-types.ts";
import {useUserStore} from "../user/store.ts";
import {showError} from "../../utils/other.ts";
import {PuzzlesApi} from "../../api/puzzles-api";

const initialStore = {
    isLoading: false,
    isInfoPopup: false,
    puzzles: [],
    userPuzzles: [],
    currentPuzzle: null,
    userPuzzleLevels: [],
    claimedPuzzleLevel: null,
    loadingLevelId: 0
};

export const usePuzzlesStore = create<IPuzzlesStore>((set, get) => {
    return {
        ...initialStore,

        onPuzzleInit: async (currentPuzzle) => {
            set({isLoading: true});
            try {
                set({
                    currentPuzzle,
                    userPuzzleLevels: currentPuzzle.puzzle_Levels
                })

                const userCurrentPuzzle = await PuzzlesApi.fetchMyPuzzleById(
                    useUserStore.getState().user_id,
                    currentPuzzle.id
                );
                if (userCurrentPuzzle) {
                    set({
                        userPuzzleLevels: userCurrentPuzzle.puzzle_Levels,
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        currentPuzzle: {
                            ...get().currentPuzzle,
                            referrals_count: userCurrentPuzzle.referrals_count
                        }
                    });
                }
            } catch (e) {
                console.log(e)
            } finally {
                set({isLoading: false});
            }
        },

        init: async (puzzleId) => {

            set({isLoading: true});
            try {
                if (!get().puzzles?.length) {
                    await get().fetchPuzzles();
                    const puzzles = get().puzzles;

                    if (!puzzles?.length) {
                        showError();
                        return;
                    }
                }

                const puzzles = get().puzzles;

                const currentPuzzle = puzzles.find(puzzle => puzzle.id == puzzleId);

                set({currentPuzzle});

                const userCurrentPuzzle = await PuzzlesApi.fetchMyPuzzleById(
                    useUserStore.getState().user_id,
                    currentPuzzle?.id
                );

                if (userCurrentPuzzle) {
                    set({
                        userPuzzleLevels: userCurrentPuzzle.puzzle_Levels,
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        currentPuzzle: {
                            ...get().currentPuzzle,
                            referrals_count: userCurrentPuzzle.referrals_count
                        }
                    });
                }

            } catch (e) {
                console.error(e);
                showError()
            } finally {
                set({isLoading: false});
            }
        },

        fetchPuzzles: async () => {
            try {
                const puzzles = await PuzzlesApi.fetchPuzzles(useUserStore.getState().user_id);

                if (!puzzles?.length) {
                    showError();
                    return;
                }

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                set({puzzles});
            } catch (e) {
                showError()
            }
        },

        fetchMyPuzzles: async () => {
            try {
                const puzzles = await PuzzlesApi.fetchMyPuzzles(useUserStore.getState().user_id);

                if (!puzzles?.length) {
                    return;
                }

                set({userPuzzles: puzzles});
            } catch (e) {
                showError()
            }
        },

        onClaimPuzzle: async (puzzleLevel) => {
            set({loadingLevelId: puzzleLevel.id})
            try {
                await PuzzlesApi.claimPuzzle(
                    useUserStore.getState().user_id,
                    puzzleLevel
                );
                await get().init(puzzleLevel.puzzle_id);
                get().setClaimedPuzzleLevel(puzzleLevel);
            } catch (e) {
                showError()
            } finally {
                set({loadingLevelId: 0})
            }
        },

        setClaimedPuzzleLevel: (puzzleLevel) => set({claimedPuzzleLevel: puzzleLevel}),

        setInfoPopup: (value) => set({isInfoPopup: value}),

        reset: () => set(initialStore),
    }
});
