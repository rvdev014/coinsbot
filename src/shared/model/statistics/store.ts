import {create} from "zustand";
import {IStatisticStore} from "./store-types.ts";
import {MainApi} from "../../api/main-api.ts";

const initialStore = {

} as IStatisticStore;

export const useStatisticStore = create<IStatisticStore>((set, get) => {
    return {
        ...initialStore,
        init: async (step, userId) => {
            try {
                console.log('step, userId', step, userId)
                const statistics = await MainApi.statistics(step, userId);
                if (!statistics) return;

                set({...statistics});
            } catch (e) {
                console.log('e', e)
            }
        },
        setStatisticData: (data) => set({...data})
    }
})