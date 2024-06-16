import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import {Flex} from "@chakra-ui/react";
import {formatNumber, formatPrice, getFirstLetter, hexToRgb, renderUserName} from "../../../shared/utils/other.ts";
import {t} from "i18next";
import {useUserStore} from "../../../shared/model/user/store.ts";
import {useLevelStore} from "../model/store.ts";
import {Loader} from "../../../shared/ui/loader/loader.tsx";
import {IUserData} from "../../../shared/model/user/store-types.ts";
import cl from "classnames";
import {levelsImgData} from "../model/utils.ts";

export const Levels = () => {

    const userId = useUserStore(state => state.id);
    const userLevel = useUserStore(state => state.level);

    const rank = useLevelStore(state => state.rank);
    const currentUser = useUserStore(state => state);
    const level = useLevelStore(state => state.currentLevel);
    const users = useLevelStore(state => state.users);
    const isLoading = useLevelStore(state => state.isLoading);
    const isStatsLoading = useLevelStore(state => state.isStatsLoading);
    const initLevels = useLevelStore(state => state.init);
    const onSlide = useLevelStore(state => state.onSlide);

    useEffect(() => {
        initLevels();
    }, [userLevel]);

    if (!level) return;

    return (
        <div className={styles.wrapper}>
            <Flex className={styles.slider}>
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
            </Flex>

            <div className={styles.levelInfo}>
                <h2 className={styles.levelTitle}>{level.title}</h2>
                <h2 className={styles.levelText}>{t('from')} {formatNumber(level.coins)}</h2>
            </div>

            <div className={styles.usersWrapper}>
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
                                                className={styles.userItem}
                                                justifyContent='space-between'
                                                alignItems='center'
                                                key={index}
                                                style={{
                                                    position: 'sticky',
                                                    top: '0',
                                                    bottom: '0',
                                                    zIndex: 999,
                                                    border: `1px solid ${level.color}`,
                                                }}
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
                            </>
                            :
                            <Flex className={styles.userItem} justifyContent='space-between' alignItems='center'>
                                <Flex className={styles.userItem_left}>
                                    <div className={styles.userInfo}>
                                        <p className={styles.userName}>{t('be_first')}</p>
                                    </div>
                                </Flex>
                            </Flex>}

                    {rank > 100 && (
                        <Flex
                            className={styles.userItem}
                            justifyContent='space-between'
                            alignItems='center'
                            style={{
                                position: 'sticky',
                                top: '0',
                                bottom: '0',
                                zIndex: 999,
                                border: `1px solid ${level.color}`,
                            }}
                        >
                            <Flex className={styles.userItem_left}>
                                <div className={styles.userAvatar}>
                                    {/*<img src="/img/asd.png" alt="Avatar"/>*/}
                                    <p>{getFirstLetter(currentUser) ?? 'AA'}</p>
                                </div>
                                <div className={styles.userInfo}>
                                    <p className={styles.userName}>
                                        {renderUserName(currentUser)}
                                    </p>
                                    <Flex className={styles.userBalance} alignItems='center'>
                                        <img src="/img/coin-level.png" alt="Coin"/>
                                        <span>{formatPrice(currentUser.coins)}</span>
                                    </Flex>
                                </div>
                            </Flex>

                            <p className={styles.userRank}>{rank}</p>
                        </Flex>
                    )}

                </div>
            </div>
        </div>
    )
};
