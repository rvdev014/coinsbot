import {create} from "zustand";
import {IAppStore, ITgDataUnsafe} from "./app-store-types.ts";
import {useUserStore} from "./user/store.ts";
import {showError} from "../utils/other.ts";
import {APP_ENV} from "../consts.ts";
// import {boostImgData} from "../../features/boost/model/utils.ts";
// import {earnImgData} from "./earn/utils.ts";
// import {levelsImgData} from "../../features/levels/model/utils.ts";

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

            const tgDataUnsafe: ITgDataUnsafe = tg?.initDataUnsafe;

            /*if (!tgDataUnsafe?.user) {
                set({
                    // isTelegramWebApp: false,
                    isAppLoading: false
                });
                return;
            }*/

            try {
                const userId = tgDataUnsafe?.user?.id ?? (APP_ENV !== 'production' ? 355919981 : 0);

                const promises = [
                    useUserStore.getState().init(userId, {
                        user_id: userId,
                        username: tgDataUnsafe?.user?.username,
                        first_name: tgDataUnsafe?.user?.first_name,
                        last_name: tgDataUnsafe?.user?.last_name,
                        language_code: tgDataUnsafe?.user?.language_code,
                        // logo: tgDataUnsafe?.user?.logo,
                        is_premium: tgDataUnsafe?.user?.is_premium,
                        referral: tgDataUnsafe?.start_param,
                    }),
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    /*preloadImages([
                        ...Object.values(boostImgData),
                        ...Object.values(earnImgData),
                        ...Object.values(levelsImgData),
                    ] as any)*/
                ];

                await Promise.allSettled(promises);

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
