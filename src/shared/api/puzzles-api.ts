import {apiInstance} from "./axios.ts";
import {IPuzzle, IPuzzleLevel} from "../model/puzzles/store-types";

export const PuzzlesApi = {
    async fetchPuzzles(user_id?: string|number) {
        const response = await apiInstance.get<{ data: IPuzzle }>(`/puzzles`, {
            params: {user_id}
        });
        return response.data?.data;
    },
    async fetchMyPuzzles(userId: string|number) {
        const response = await apiInstance.get(`/user/${userId}/my-puzzles`);
        return response.data?.data;
    },
    async fetchMyPuzzleById(userId: string|number, puzzleId: string|number) {
        const response = await apiInstance.get(`/user/${userId}/my-puzzles/${puzzleId}`);
        return response.data?.data;
    },
    async claimPuzzle(userId: string|number, puzzleLevel: IPuzzleLevel) {
        await apiInstance.post(`/user/${userId}/check-puzzle`, {
            puzzle_id: puzzleLevel.puzzle_id,
            level: puzzleLevel.level
        });
    },
}