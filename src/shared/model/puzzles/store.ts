import {create} from "zustand";
import {IPuzzle, IPuzzlesStore} from "./store-types.ts";
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
                const user = await PuzzlesApi.claimPuzzle(
                    useUserStore.getState().user_id,
                    puzzleLevel
                );

                let userPuzzles = get().userPuzzles;
                if (userPuzzles?.length > 0) {
                    const userPuzzle = userPuzzles.find(puzzle => puzzle.id === puzzleLevel.puzzle_id);
                    if (userPuzzle) {
                        userPuzzles = userPuzzles.map(puzzle => {
                            if (puzzle.id === puzzleLevel.puzzle_id) {
                                return {...puzzle, puzzle_Levels: [...puzzle.puzzle_Levels, puzzleLevel]}
                            }
                            return puzzle;
                        });
                    } else {
                        userPuzzles = [
                            ...userPuzzles,
                            {
                                ...get().currentPuzzle,
                                puzzle_Levels: [puzzleLevel]
                            } as IPuzzle
                        ];
                    }
                }

                set({
                    userPuzzleLevels: [...get().userPuzzleLevels, puzzleLevel],
                    userPuzzles
                })
                get().setClaimedPuzzleLevel(puzzleLevel);

                await useUserStore.getState().setInitialStore(user);
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
