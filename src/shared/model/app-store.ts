import {create} from "zustand";
import {IAppStore, ITgDataUnsafe} from "./app-store-types.ts";
import {useUserStore} from "./user/store.ts";

const initialStore = {
    isAppLoading: true,
} as IAppStore;

export const useAppStore = create<IAppStore>((set, get) => {
    return {
        ...initialStore,
        initTelegram: async () => {
            set({isAppLoading: false});
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const tg = window.Telegram.WebApp;
            tg.ready();

            const tgDataUnsafe: ITgDataUnsafe = tg.initDataUnsafe;

            if (!tgDataUnsafe?.user) {
                set({
                    // isTelegramWebApp: false,
                    isAppLoading: false
                });
                return;
            }

            try {
                console.log(tgDataUnsafe?.user?.id, tgDataUnsafe?.user?.id ?? 355919981)
                await useUserStore.getState().init(tgDataUnsafe?.user?.id ?? 355919981);
            } catch (e) {
                console.log('e', e)
            } finally {
                set({isAppLoading: false});
            }
        },
    }
})