import {create} from "zustand";
import {IFriendsStore} from "./store-types.ts";
import {MainApi} from "../../api/main-api.ts";
import {showError} from "../../utils/other.ts";

const initialStore = {
    loading: false,
} as IFriendsStore;

export const useReferralStore = create<IFriendsStore>((set, get) => {
    return {
        ...initialStore,
        init: async (userId: number | string)=> {

            try {
                set({loading: true});

                const result = await MainApi.getReferrals(userId);
                if (!result) return;

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                set({...result});
            } catch (e) {
                showError()
            } finally {
                set({loading: false});
            }
        },
        reset: () => set(initialStore),
    }
});