import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import {Flex} from "@chakra-ui/react";
import {useReferralStore} from "../../../shared/model/friends/store.ts";
import {useUserStore} from "../../../shared/model/user/store.ts";
import {formatPrice, getFirstLetter, renderUserName, showError} from "../../../shared/utils/other.ts";
import cl from "classnames";
import {t} from "i18next";
import {BOT_USERNAME} from "../../../shared/consts.ts";
import {useAppStore} from "../../../shared/model/app-store.ts";
import {ConditionBlock} from "../../../shared/ui/condition-block/condition-block.tsx";
import {LoaderBlock} from "../../../shared/ui/loader-block/loader-block.tsx";

export const FriendsPage = () => {
    const userId = useUserStore(state => state.user_id);

    const isLoading = useReferralStore(state => state.loading);
    const referrals = useReferralStore();

    useEffect(() => {

        const fetchData = async () => {
            try {
                if (!userId) return;

                await referrals.init(userId)

            } catch (e) {
                showError()
            }
        };

        fetchData();

    }, [userId]);

    useEffect(() => {
    }, [referrals]);

    const onInviteFriend = async () => {
        try {
            const referralLink = `https://t.me/${BOT_USERNAME}/clyde?startapp=${userId}`; // Your referral link
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

    return (
        <div className={styles.wrapper}>

            <div className={cl(styles.mainBlock, 'gradientWrapper')}>
                <h2 className={styles.title}>{t('invite_frens')}</h2>
                <hr className={styles.divider}/>
                <p className={styles.text}>{t('you_have_earned')}</p>
                <LoaderBlock loading={isLoading} height='90px'>
                    <Flex className={styles.earnedBalance} alignItems='center'>
                        <img src="/img/coin-level.png" alt="Coin"/>
                        <span>{formatPrice(referrals?.total_coins ?? 0)}</span>
                    </Flex>
                    <Flex className={styles.friendsInfo} alignItems='center'>
                        <img src="/img/friends-icon.png" alt="Friends"/>
                        <p>{referrals?.total_count ?? 0} <span>{t('friends')}</span></p>
                    </Flex>
                </LoaderBlock>

                <span
                    className='gradient'
                    style={{
                        boxShadow: `rgba(201, 142, 29, 0.5) 0px 0px 100px 80px`,
                        top: '-30px',
                    }}
                />
            </div>

            <Flex className={styles.infoBlocks} gap='8px'>
                <div className={cl(styles.infoBlock, 'gradientWrapper')}>
                    <h3 className={styles.infoBlock_title}>{t('regular_user')}</h3>
                    <h3 className={styles.infoBlock_text}>{t('for_u_and_fren')}</h3>
                    <Flex className={styles.earnedBalance} alignItems='center'>
                        <img src="/img/coin-level.png" alt="Coin"/>
                        <span>+10 000</span>
                    </Flex>
                    <span className='gradient' style={{boxShadow: `0 0 30px 20px rgba(23, 214, 134, 0.5)`}}/>
                </div>
                <div className={cl(styles.infoBlock, 'gradientWrapper')}>
                    <h3 className={styles.infoBlock_title}>Telegram Premium</h3>
                    <h3 className={styles.infoBlock_text}>{t('for_u_and_fren')}</h3>
                    <Flex className={styles.earnedBalance} alignItems='center'>
                        <img src="/img/coin-level.png" alt="Coin"/>
                        <span>+20 000</span>
                    </Flex>
                    <span className='gradient' style={{boxShadow: `0 0 30px 20px rgba(117, 70, 251, 0.5)`}}/>
                </div>
            </Flex>

            <ConditionBlock
                loading={isLoading}
                condition={referrals?.total_count > 0}
                emptyContent={
                    <div className={styles.friendsEmptyList}>
                        {t('no_invited_friends')}
                    </div>
                }
            >
                <div className={styles.friendsWrapper}>

                    {referrals?.list?.map((list, index) => (
                        <ConditionBlock condition={list?.count > 0} key={list?.level}>
                            <Flex className={styles.friendsTitleWrapper} alignItems='center'>
                                <hr className={styles.divider}/>
                                <h2>{list?.level} {t('line')}</h2>
                                <span>+{list?.percent}% ({list?.count ?? 0})</span>
                                <hr className={styles.divider}/>
                            </Flex>

                            <div className={styles.friendsList}>

                                {list?.users?.map((user, key) => (
                                    <Flex
                                        className={styles.userItem}
                                        justifyContent='space-between'
                                        alignItems='center'
                                        key={key}
                                    >
                                        <Flex className={styles.userItem_left}>
                                            <div className={styles.userAvatar}>
                                                {/*<img src="/img/asd.png" alt="Avatar"/>*/}
                                                <p>{getFirstLetter(user) ?? 'AA'}</p>
                                            </div>
                                            <div className={styles.userInfo}>
                                                <p className={styles.userName}>
                                                    {renderUserName(user)}
                                                </p>
                                                <Flex className={styles.userBalance} alignItems='center'>
                                                    <span className={styles.userLevel}>{user?.level?.title_en}</span>
                                                    <img src="/img/coin-level.png" alt="Coin"/>
                                                    <span>{formatPrice(user?.coins)}</span>
                                                </Flex>
                                            </div>
                                        </Flex>
                                        <p className={styles.prize}>+{user?.profit}</p>
                                    </Flex>
                                ))}
                            </div>
                        </ConditionBlock>
                    ))}

                </div>
            </ConditionBlock>

            {/*{*/}
            {/*    referrals?.total_count === 0 && <div className={styles.friendsEmptyList}>*/}
            {/*        You don't have any invited friends yet. Send your link to your contacts to get bonuses from Clyde*/}
            {/*    </div>*/}
            {/*}*/}

            <div className={styles.inviteFriendBtnWrapper}>
                <button className={cl(styles.inviteFriendBtn, 'gradientWrapper')} onClick={onInviteFriend}>
                    {t('invite_fren')}
                    <span
                        className='gradient'
                        style={{
                            boxShadow: `0 0 50px 50px rgba(153, 214, 23, 0.61)`,
                            bottom: '-30px'
                        }}
                    />
                </button>
            </div>


        </div>
    );
};