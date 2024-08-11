import {BOT_USERNAME} from "../consts";
import {useUserStore} from "../model/user/store";
import {useAppStore} from "../model/app-store";

export const useInviteFriends = () => {
    const onInviteFriend = async () => {
        try {
            const referralLink = `https://t.me/${BOT_USERNAME}/clyde?startapp=${useUserStore.getState().user_id}`; // Your referral link
            const messages: any = {
                en: `Join me and earn Wclyde with me!

💵10k Wclayde as a first-time gift
💰20k Wclayde if you have Telegram Premium`,
                ru: `Присоединяйся ко мне и зарабатывай Wclyde вместе со мной!

💵10 тысяч Wclayde в подарок на первое посещение
💰20 тысяч Wclayde, если у тебя Telegram Premium`
            }


            const message = messages[useUserStore.getState().language_code ?? 'en'];

            useAppStore.getState().webApp?.openTelegramLink(
                `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(message)}`
            );
            // window.location.href = `https://telegram.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(message)}`;
            // useAppStore.getState().webApp?.switchInlineQuery('Join us! https://t.me/cryptokawasbot?start=542918091', ["users", "groups", "channels"])
        } catch (e) {
            console.log(e)
        }
    }

    return {onInviteFriend}
}