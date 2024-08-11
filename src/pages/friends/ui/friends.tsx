import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import {Flex} from "@chakra-ui/react";
import {useReferralStore} from "../../../shared/model/friends/store.ts";
import {useUserStore} from "../../../shared/model/user/store.ts";
import {formatPrice, getFirstLetter, renderUserName, showError} from "../../../shared/utils/other.ts";
import cl from "classnames";
import {ConditionBlock} from "../../../shared/ui/condition-block/condition-block.tsx";
import {LoaderBlock} from "../../../shared/ui/loader-block/loader-block.tsx";
import {motion} from "framer-motion";
import {createPortal} from "react-dom";
import {useTranslation} from "react-i18next";
import {useInviteFriends} from "../../../shared/hooks/useInviteFriends";

export const FriendsPage = () => {
    const {t} = useTranslation();
    const userId = useUserStore(state => state.user_id);

    const isLoading = useReferralStore(state => state.loading);
    const referrals = useReferralStore();

    const {onInviteFriend} = useInviteFriends();

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

    console.log('document.getElementById(\'layoutWrapper\')', document.getElementById('layoutWrapper'))

    return (
        <div className={styles.wrapper}>

            <motion.div
                initial={{x: 20}}
                animate={{x: 0}}
                className={cl(styles.mainBlock, 'gradientWrapper')}
            >
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
            </motion.div>

            <motion.div
                initial={{x: -20}}
                animate={{x: 0}}
                className={styles.infoBlocks}
            >
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
            </motion.div>

            <ConditionBlock
                loading={isLoading}
                condition={referrals?.total_count > 0}
                emptyContent={
                    <motion.div
                        initial={{x: 20}}
                        animate={{x: 0}}
                        className={styles.friendsEmptyList}
                    >
                        {t('no_invited_friends')}
                    </motion.div>
                }
            >
                <motion.div
                    initial={{x: 20}}
                    animate={{x: 0}}
                    className={styles.friendsWrapper}
                >

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

                </motion.div>
            </ConditionBlock>

            {/*{*/}
            {/*    referrals?.total_count === 0 && <div className={styles.friendsEmptyList}>*/}
            {/*        You don't have any invited friends yet. Send your link to your contacts to get bonuses from Clyde*/}
            {/*    </div>*/}
            {/*}*/}

            {createPortal(
                <div className={styles.inviteFriendBtnWrapper}>
                    <motion.button
                        animate={{
                            y: 0,
                            scale: [0.98, 1.02, 0.98],
                            repeatDur: 1,
                        }}
                        transition={{
                            duration: 1.5, // Duration of the animation cycle
                            repeat: Infinity, // Repeat the animation infinitely
                            repeatType: "loop", // Loop the animation
                            ease: "easeInOut" // Easing function
                        }}
                        className={cl(styles.inviteFriendBtn, 'gradientWrapper')} onClick={onInviteFriend}
                    >
                        {t('invite_fren')}
                        <span
                            className='gradient'
                            style={{
                                boxShadow: `0 0 50px 50px rgba(153, 214, 23, 0.61)`,
                                bottom: '-30px'
                            }}
                        />
                    </motion.button>
                </div>,
                // @ts-ignore
                document.getElementById('root')
            )}


        </div>
    );
};