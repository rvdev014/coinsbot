import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import {Flex} from "@chakra-ui/react";
import {useReferralStore} from "../../../shared/model/friends/store.ts";
import {useUserStore} from "../../../shared/model/user/store.ts";
import {showError} from "../../../shared/utils/other.ts";
import cl from "classnames";
import {t} from "i18next";
import {useAppStore} from "../../../shared/model/app-store.ts";

export const FriendsPage = () => {
    const userId = useUserStore(state => state.user_id);

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

    useEffect(() => {}, [referrals]);

    const onInviteFriend = async () => {
        try {
            useAppStore.getState().webApp?.switchInlineQuery('Join us! https://t.me/cryptokawasbot?start=542918091', ["users", "groups", "channels"])
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
                <Flex className={styles.earnedBalance} alignItems='center'>
                    <img src="/img/coin-icon-lg.png" alt="Coin"/>
                    <span>{referrals?.total_coins ?? 0}</span>
                </Flex>

                <Flex className={styles.friendsInfo} alignItems='center'>
                    <img src="/img/friends-icon.png" alt="Friends"/>
                    <p>{referrals?.total_count ?? 0} <span>{t('friends')}</span></p>
                </Flex>

                <span
                    className='gradient'
                    style={{
                        boxShadow: `rgba(201, 142, 29, 0.5) 0px 0px 100px 80px`,
                        top: '-30px',
                    }}
                />
            </div>

            {/*<Flex className={styles.infoBlocks} gap='8px'>*/}
            {/*    <div className={cl(styles.infoBlock, 'gradientWrapper')}>*/}
            {/*        <h3 className={styles.infoBlock_title}>{t('regular_user')}</h3>*/}
            {/*        <h3 className={styles.infoBlock_text}>{t('for_u_and_fren')}</h3>*/}
            {/*        <Flex className={styles.earnedBalance} alignItems='center'>*/}
            {/*            <img src="/img/coin-icon-lg.png" alt="Coin"/>*/}
            {/*            <span>+5 000</span>*/}
            {/*        </Flex>*/}
            {/*        <span className='gradient' style={{boxShadow: `0 0 30px 20px rgba(23, 214, 134, 0.5)`}}/>*/}
            {/*    </div>*/}
            {/*    <div className={cl(styles.infoBlock, 'gradientWrapper')}>*/}
            {/*        <h3 className={styles.infoBlock_title}>Telegram Premium</h3>*/}
            {/*        <h3 className={styles.infoBlock_text}>{t('for_u_and_fren')}</h3>*/}
            {/*        <Flex className={styles.earnedBalance} alignItems='center'>*/}
            {/*            <img src="/img/coin-icon-lg.png" alt="Coin"/>*/}
            {/*            <span>+25 000</span>*/}
            {/*        </Flex>*/}
            {/*        <span className='gradient' style={{boxShadow: `0 0 30px 20px rgba(117, 70, 251, 0.5)`}}/>*/}
            {/*    </div>*/}
            {/*</Flex>*/}


            <div className={styles.friendsWrapper}>
                {referrals?.list?.map((list, index) => (
                    <span key={index}>
                        <Flex className={styles.friendsTitleWrapper} alignItems='center'>
                            <hr className={styles.divider}/>
                            <h2>{list?.level} {t('line')}</h2>
                            <span>+{list?.percent}%</span>
                            <hr className={styles.divider}/>
                        </Flex>

                        <div className={styles.friendsList}>

                            {list?.users?.map((user, key) => (
                                <Flex className={styles.userItem} justifyContent='space-between' alignItems='center'
                                      key={key}>

                                    <Flex className={styles.userItem_left}>
                                        <div className={styles.userAvatar}>
                                            {/*<img src="/img/asd.png" alt="Avatar"/>*/}
                                            <p>v</p>
                                        </div>
                                        <div className={styles.userInfo}>
                                            <p className={styles.userName}>{user?.full_name ?? user?.username}</p>
                                            <Flex className={styles.userBalance} alignItems='center'>
                                                <span className={styles.userLevel}>{user?.level?.title_en}</span>
                                                <img src="/img/coin-icon.png" alt="Coin"/>
                                                <span>{user?.coins}</span>
                                            </Flex>
                                        </div>
                                    </Flex>

                                    <p className={styles.prize}>+{user?.profit}</p>

                                </Flex>
                            ))}

                            {
                                list?.users?.length === 0 &&
                                <Flex className={styles.userItem} justifyContent='space-between' alignItems='center'>
                                    <Flex className={styles.userItem_left}>
                                        <div className={styles.userInfo}>
                                            <p className={styles.userName}></p>
                                            <Flex className={styles.userBalance} alignItems='center'>
                                                <span className={styles.userLevel}></span>
                                            </Flex>
                                        </div>
                                    </Flex>
                                </Flex>
                            }

                        </div>
                    </span>
                ))}
            </div>

            <button className={styles.inviteFriendBtnWrapper} onClick={onInviteFriend}>
                <div className={cl(styles.inviteFriendBtn, 'gradientWrapper')}>
                    {t('invite_fren')}
                    <span
                        className='gradient'
                        style={{
                            boxShadow: `0 0 50px 50px rgba(153, 214, 23, 0.61)`,
                            bottom: '-30px'
                        }}
                    />
                </div>
            </button>

        </div>
    );
};