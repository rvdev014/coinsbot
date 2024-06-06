import {create} from "zustand";
import {IFriendsStore} from "./store-types.ts";
import {MainApi} from "../../api/main-api.ts";

const initialStore = {
    loading: false,
} as IFriendsStore;

export const useReferralStore = create<IFriendsStore>((set, get) => {
    return {
        ...initialStore,
        init: async (userId: number | string)=> {

            set({loading: true});

            const result = await MainApi.getReferrals(userId);

            if (!result) return;

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            set({...result});
        },
        reset: () => set(initialStore),
    }
});