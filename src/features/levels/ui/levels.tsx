import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import {Flex} from "@chakra-ui/react";
import {formatNumber, formatPrice, getFirstLetter, hexToRgb, renderUserName} from "../../../shared/utils/other.ts";
import {useUserStore} from "../../../shared/model/user/store.ts";
import {useLevelStore} from "../model/store.ts";
import {Loader} from "../../../shared/ui/loader/loader.tsx";
import {IUserData} from "../../../shared/model/user/store-types.ts";
import cl from "classnames";
import {levelsImgData} from "../model/utils.ts";
import {motion, useAnimate} from "framer-motion";
import {useTranslation} from "react-i18next";
import {UserCoins} from "../../user-coins";

export const Levels = () => {
    const {t} = useTranslation();

    const firstName = useUserStore(state => state.first_name);
    const lastName = useUserStore(state => state.last_name);
    const username = useUserStore(state => state.username);

    const userId = useUserStore(state => state.id);

    const rank = useLevelStore(state => state.rank);
    const level = useLevelStore(state => state.currentLevel);
    const users = useLevelStore(state => state.users);
    const isLoading = useLevelStore(state => state.isLoading);
    const isStatsLoading = useLevelStore(state => state.isStatsLoading);
    const initLevels = useLevelStore(state => state.init);
    const onSlide = useLevelStore(state => state.onSlide);

    useEffect(() => {
        initLevels();
    }, [initLevels]);

    if (!level) return;

    return (
        <div className={styles.wrapper}>
            <motion.div
                initial={{x: 20}}
                animate={{x: 0}}
                className={styles.slider}
            >
                <button
                    className={cl(styles.arrow, styles.arrowLeft)}
                    onClick={() => onSlide('prev')}
                    disabled={(level.step === 1 || isStatsLoading)}
                >
                    <img src="/img/arrow-left.png" alt="Left"/>
                </button>

                <div
                    className={styles.levelImg}
                    style={{
                        border: level.step > 7 ? 'none' : `5px solid ${level.color}`,
                        background: `radial-gradient(circle, ${level.color} -50%, #272727 100%)`,
                        boxShadow: `0 0 100px 0 ${hexToRgb(level.color, 0.7)}`,
                    }}
                >
                    <img
                        onLoad={e => e.currentTarget.style.display = 'block'}
                        src={levelsImgData[`level${level.step}`]}
                        style={{
                            width: level.step > 7 ? '100%' : `180px`,
                            height: level.step > 7 ? '100%' : `180px`,
                            display: 'none',
                        }}
                        alt="Tapper"
                    />
                </div>

                <button
                    className={cl(styles.arrow, styles.arrowRight)}
                    onClick={() => onSlide('next')}
                    disabled={(level.step === useUserStore.getState().last_level?.step || isStatsLoading)}
                >
                    <img src="/img/arrow-right.png" alt="Right"/>
                </button>
            </motion.div>

            <motion.div
                initial={{x: -20}}
                animate={{x: 0}}
                className={styles.levelInfo}
            >
                <h2 className={styles.levelTitle}>{level.title}</h2>
                <h2 className={styles.levelText}>{t('from')} {formatNumber(level.coins)}</h2>
            </motion.div>

            <motion.div
                initial={{x: 20}}
                animate={{x: 0}}
                className={styles.usersWrapper}
            >
                <div className={styles.usersList}>

                    {(isLoading || isStatsLoading)
                        ?
                        <Loader size='lg'/>
                        :
                        users?.length > 0
                            ?
                            <>
                                {users.map((user: IUserData, index: number) => {

                                    if (user.id === userId) {
                                        return (
                                            <Flex
                                                className={cl(styles.userItem, styles.userItem_sticky)}
                                                justifyContent='space-between'
                                                alignItems='center'
                                                key={index}
                                                style={{border: `1px solid ${level.color}`}}
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
                                                            <img src="/img/coin-level.png" alt="Coin"/>
                                                            <span>{formatPrice(user.coins)}</span>
                                                        </Flex>
                                                    </div>
                                                </Flex>

                                                <p className={styles.userRank}>{index + 1}</p>
                                            </Flex>
                                        );
                                    }

                                    return (
                                        <Flex
                                            className={styles.userItem}
                                            justifyContent='space-between'
                                            alignItems='center'
                                            key={index}
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
                                                        <img src="/img/coin-level.png" alt="Coin"/>
                                                        <span>{formatPrice(user.coins)}</span>
                                                    </Flex>
                                                </div>
                                            </Flex>

                                            <p className={styles.userRank}>{index + 1}</p>
                                        </Flex>
                                    )
                                })}

                                {rank > 100 && (
                                    <Flex
                                        className={cl(styles.userItem, styles.userItem_sticky)}
                                        justifyContent='space-between'
                                        alignItems='center'
                                        style={{border: `1px solid ${level.color}`}}
                                    >
                                        <Flex className={styles.userItem_left}>
                                            <div className={styles.userAvatar}>
                                                {/*<img src="/img/asd.png" alt="Avatar"/>*/}
                                                <p>{getFirstLetter({
                                                    first_name: firstName,
                                                    last_name: lastName,
                                                    username: username
                                                } as IUserData) ?? 'AA'}</p>
                                            </div>
                                            <div className={styles.userInfo}>
                                                <p className={styles.userName}>
                                                    {renderUserName({
                                                        first_name: firstName,
                                                        last_name: lastName,
                                                        username: username
                                                    } as IUserData)}
                                                </p>
                                                <Flex className={styles.userBalance} alignItems='center'>
                                                    <img src="/img/coin-level.png" alt="Coin"/>
                                                    <UserCoins>
                                                        {({coins}) => <span>{formatPrice(coins)}</span>}
                                                    </UserCoins>
                                                </Flex>
                                            </div>
                                        </Flex>

                                        <p className={styles.userRank}>{rank}</p>
                                    </Flex>
                                )}
                            </>
                            :
                            <Flex className={styles.userItem} justifyContent='space-between' alignItems='center'>
                                <Flex className={styles.userItem_left}>
                                    <div className={styles.userInfo}>
                                        <p className={styles.beFirstText}>{t('be_first')}</p>
                                    </div>
                                </Flex>
                            </Flex>}

                </div>
            </motion.div>
        </div>
    )
};
