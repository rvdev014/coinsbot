import {create} from "zustand";
import {IPuzzlesStore} from "./store-types.ts";
import {useUserStore} from "../user/store.ts";
import {showError} from "../../utils/other.ts";
import {PuzzlesApi} from "../../api/puzzles-api";

const initialStore = {
    isLoading: false,
    isInfoPopup: false,
    currentPuzzle: null,
    userPuzzleLevels: [],
    claimedPuzzleLevel: null,
    /*claimedPuzzleLevel: {
        "id": 3,
        "puzzle_id": 1,
        "title_ru": "level 3",
        "title_en": "level 3",
        "title": "level 3",
        "condition_type": "task",
        "condition": "2",
        "img": "/img/golden-3.png",
        "level": 3,
        "reward": "energy_turbo",
        "is_complete": true,
        "created_at": "2024-08-09 18:16:59Z",
        "updated_at": "2024-08-09 18:16:59Z"
    },*/
} as IPuzzlesStore;

export const usePuzzlesStore = create<IPuzzlesStore>((set, get) => {
    return {
        ...initialStore,

        init: async (force) => {
            if (!force && get().currentPuzzle) return;

            set({isLoading: true});
            try {
                const currentPuzzles = await PuzzlesApi.fetchPuzzles(useUserStore.getState().user_id);
                if (!currentPuzzles.length) {
                    showError();
                    return;
                }

                const currentPuzzle = currentPuzzles[0];
                set({currentPuzzle});

                const userCurrentPuzzle = await PuzzlesApi.fetchMyPuzzleById(
                    useUserStore.getState().user_id,
                    currentPuzzle.id
                );
                if (userCurrentPuzzle) {
                    set({
                        userPuzzleLevels: userCurrentPuzzle.puzzle_Levels,
                        currentPuzzle: {
                            ...get().currentPuzzle,
                            referrals_count: userCurrentPuzzle.referrals_count
                        }
                    });
                }

            } catch (e) {
                showError()
            } finally {
                set({isLoading: false});
            }
        },

        onClaimPuzzle: async (puzzleLevel) => {
            set({loadingLevelId: puzzleLevel.id})
            try {
                await PuzzlesApi.claimPuzzle(
                    useUserStore.getState().user_id,
                    puzzleLevel
                );
                await get().init(true);
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
