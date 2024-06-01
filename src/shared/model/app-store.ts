import {create} from "zustand";
import {IAppStore} from "./app-store-types.ts";
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

            /*const tgDataUnsafe: ITgDataUnsafe = tg.initDataUnsafe;
            if (!tgDataUnsafe?.user) {
                set({
                    // isTelegramWebApp: false,
                    isAppLoading: false
                });
                return;
            }*/

            /*try {
                await useUserStore.getState().init(355919981);
            } catch (e) {
                console.log('e', e)
            } finally {
                set({isAppLoading: false});
            }*/
        },
    }
})