import React from 'react';

import styles from './styles.module.scss';
import {Flex} from "@chakra-ui/react";

export const Levels = () => {

    return (
        <div className={styles.wrapper}>

            <Flex className={styles.slider}>
                <button className={`${styles.arrow} ${styles.arrowLeft}`}>
                    <img src="/img/arrow-left.png" alt="Left"/>
                </button>

                <div className={styles.levelImg}>
                    <img src="/img/dog.png" alt="Tapper"/>
                </div>

                <button className={`${styles.arrow} ${styles.arrowRight}`}>
                    <img src="/img/arrow-right.png" alt="Right"/>
                </button>
            </Flex>

            <div className={styles.levelInfo}>
                <h2 className={styles.levelTitle}>Puppy</h2>
                <h2 className={styles.levelText}>From 50M</h2>
            </div>

            <div className={styles.usersWrapper}>

                <div className={styles.usersList}>

                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((user, index) => (
                        <Flex className={styles.userItem} justifyContent='space-between' alignItems='center'>

                            <Flex className={styles.userItem_left}>
                                <div className={styles.userAvatar}>
                                    {/*<img src="/img/asd.png" alt="Avatar"/>*/}
                                    <p>v</p>
                                </div>
                                <div className={styles.userInfo}>
                                    <p className={styles.userName}>vtsss</p>
                                    <Flex className={styles.userBalance} alignItems='center'>
                                        <img src="/img/coin-icon.png" alt="Coin"/>
                                        <span>19 583 078</span>
                                    </Flex>
                                </div>
                            </Flex>

                            <p className={styles.userRank}>1</p>

                        </Flex>
                    ))}

                </div>

            </div>

        </div>
    );
};