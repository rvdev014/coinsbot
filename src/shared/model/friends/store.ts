import {create} from "zustand";
import {IFriendsStore, IList} from "./store-types.ts";
import {MainApi} from "../../api/main-api.ts";
import {showError} from "../../utils/other.ts";

const initialStore = {
    list: [] as IList[],
    loading: false,
} as IFriendsStore;

export const useReferralStore = create<IFriendsStore>((set, get) => {
    return {
        ...initialStore,
        init: async (userId: number | string)=> {

            try {
                set({loading: true});

                if (get().list.length > 0) return;

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