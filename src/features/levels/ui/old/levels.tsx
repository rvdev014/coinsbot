import React, {useEffect} from 'react';
import {useLevelsStore} from "../model/store.ts";
import {Flex, Progress, Text} from "@chakra-ui/react";

import styles from './styles.module.scss';
import {useUserStore} from "../../../shared/model/user/store.ts";
import classNames from 'classnames';
import {Loader} from "../../../shared/ui/loader/loader.tsx";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;

export const Levels = () => {

    const currentUserLogo = useUserStore(state => state.logo);
    const currentUserCoins = useUserStore(state => state.coins);
    const currentUserName = useUserStore(state => state.username);
    const currentUserLevel = useUserStore(state => state.level);

    const initLevels = useLevelsStore(state => state.init);
    const loading = useLevelsStore(state => state.loading);
    const level = useLevelsStore(state => state.level);
    const nextLevel = useLevelsStore(state => state.next_level);
    const users = useLevelsStore(state => state.users);
    const currentUserRank = useLevelsStore(state => state.rank);
    const onPrev = useLevelsStore(state => state.onPrev);
    const onNext = useLevelsStore(state => state.onNext);

    useEffect(() => {
        initLevels();
    }, []);

    function getProgress() {
        if (!nextLevel) return 0;
        return nextLevel.coins === 0 ? 100 : (currentUserCoins / nextLevel.coins) * 100;
    }

    function isSameLevel() {
        return currentUserLevel.step === level.step;
    }

    if (loading) {
        return <Loader/>
    }

    return (
        <div className={styles.wrapper}>

        <Flex justifyContent='space-between' className={styles.levelBlock}>
                <button
                    className={styles.switchLevel}
                    onClick={onPrev}
                >
                    <img style={{transform: 'rotate(180deg)'}} src="/img/arrow.png" alt="Left"/>
                </button>
                <Flex flexDirection='column' alignItems='center' className={styles.level}>
                    <img src={level.img} alt={level.title_en} onError={e => e.currentTarget.src = '/img/medal.png'}/>
                    <Text fontSize='30px' fontWeight='bold'>{level.title_ru}</Text>
                    {isSameLevel() && (
                        <Flex>
                            <Text fontSize='16px'>{currentUserCoins}</Text>
                            /
                            <Text fontSize='16px'>{nextLevel?.coins || 0}</Text>
                        </Flex>
                    )}
                </Flex>
                <button
                    className={styles.switchLevel}
                    onClick={onNext}
                >
                    <img src="/img/arrow.png" alt="Right"/>
                </button>
            </Flex>

            {isSameLevel() && (
                <Progress color='yellow' hasStripe value={getProgress()}/>
            )}


            <Flex flexDirection='column' justifyContent='space-between'>
                <div className={styles.users}>
                    <ul>
                        {users.map((user, index) => (
                            <Flex
                                key={user.username}
                                justifyContent='space-between'
                                alignItems='center'
                                className={styles.userItem}
                            >
                                <Flex>
                                    <img
                                        src={`${user.logo}`}
                                        alt={user.username}
                                        onError={e => e.currentTarget.src = '/img/empty-avatar.png'}
                                        className={styles.userItem_avatar}
                                    />
                                    <Flex flexDirection='column' className={styles.userItem_info}>
                                        <Text
                                            fontSize='18px'
                                            fontWeight='bold'
                                            className={styles.userItem_name}
                                        >{user.username}</Text>
                                        <Flex alignItems='center'>
                                            <img src="/img/coin.png" alt="Coins"/>
                                            <Text fontWeight='bold'>{user.coins}</Text>
                                        </Flex>
                                    </Flex>
                                </Flex>
                                <Text fontSize='24px'>{index + 1}</Text>
                            </Flex>
                        ))}
                    </ul>
                </div>

                {isSameLevel() && (
                    <Flex
                        justifyContent='space-between'
                        alignItems='center'
                        className={classNames([styles.userItem, styles.userItemCurrent])}
                    >
                        <Flex>
                            <img
                                src={`${currentUserLogo}`}
                                alt={currentUserName}
                                onError={e => e.currentTarget.src = '/img/empty-avatar.png'}
                                className={styles.userItem_avatar}
                            />
                            <Flex flexDirection='column' className={styles.userItem_info}>
                                <Text fontSize='18px' fontWeight='bold'
                                      className={styles.userItem_name}>{currentUserName}</Text>
                                <Flex alignItems='center'>
                                    <img src="/img/coin.png" alt="Coins"/>
                                    <Text fontWeight='bold'>{currentUserCoins}</Text>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Text fontSize='24px'>{currentUserRank}</Text>
                    </Flex>
                )}


            </Flex>

        </div>
    );
};