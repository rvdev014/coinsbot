import {create} from "zustand";
import {IAppStore, ITgDataUnsafe} from "./app-store-types.ts";
import {useUserStore} from "./user/store.ts";
import {showError} from "../utils/other.ts";

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

            const tgDataUnsafe: ITgDataUnsafe = tg.initDataUnsafe;

            /*if (!tgDataUnsafe?.user) {
                set({
                    // isTelegramWebApp: false,
                    isAppLoading: false
                });
                return;
            }*/

            try {
                await useUserStore.getState().init(tgDataUnsafe?.user?.id ?? 355919981);
            } catch (e) {
                showError()
            } finally {
                set({isAppLoading: false});
            }
        },
    }
})