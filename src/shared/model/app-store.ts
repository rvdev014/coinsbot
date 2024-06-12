import {create} from "zustand";
import {IAppStore, ITgDataUnsafe} from "./app-store-types.ts";
import {useUserStore} from "./user/store.ts";
import {showError} from "../utils/other.ts";
import {history} from "../../app/router/router-history.ts";

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
            tg.expand();
            tg.enableClosingConfirmation();

            tg.onEvent('backButtonClicked', function() {
                history.push('/');
            });

            const tgDataUnsafe: ITgDataUnsafe = tg?.initDataUnsafe;

            /*if (!tgDataUnsafe?.user) {
                set({
                    // isTelegramWebApp: false,
                    isAppLoading: false
                });
                return;
            }*/

            try {
                const userId = tgDataUnsafe?.user?.id ?? 355919981;
                await useUserStore.getState().init(userId, {
                    user_id: userId,
                    username: tgDataUnsafe?.user?.username,
                    first_name: tgDataUnsafe?.user?.first_name,
                    last_name: tgDataUnsafe?.user?.last_name,
                    language_code: tgDataUnsafe?.user?.language_code,
                    // logo: tgDataUnsafe?.user?.logo,
                    is_premium: tgDataUnsafe?.user?.is_premium,
                    referral: tgDataUnsafe?.start_param,
                });
            } catch (e) {
                showError()
            } finally {
                set({
                    isAppLoading: false,
                    webApp: tg,
                });
            }
        },
    }
})