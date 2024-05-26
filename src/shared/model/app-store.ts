import {create} from "zustand";
import {IAppStore, ITgDataUnsafe} from "./app-store-types.ts";
import {apiInstance} from "../api/axios.ts";
import {MainApi} from "../api/main-api.ts";
import {useUserStore} from "./user/store.ts";

const initialStore = {
    isAppLoading: true,
} as IAppStore;

export const useAppStore = create<IAppStore>((set, get) => {
    return {
        ...initialStore,
        initTelegram: async () => {
            set({isAppLoading: true});
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const tg = window.Telegram.WebApp;
            tg.ready();

            /*const tgDataUnsafe: ITgDataUnsafe = tg.initDataUnsafe;
            if (!tgDataUnsafe?.user) {
                set({
                    // isTelegramWebApp: false,
                    isAppLoading: false
                });
                return;
            }*/

            try {
                useUserStore.getState().init(355919981);
            } catch (e) {
                console.log('e', e)
            } finally {
                set({isAppLoading: false});
            }
        },
    }
})