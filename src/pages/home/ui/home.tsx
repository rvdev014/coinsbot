import React from 'react';
import styles from './styles.module.scss';
import {Flex, Text} from "@chakra-ui/react";
import {Link} from "react-router-dom";

export const HomePage = () => {
    return (
        <div className={styles.wrapper}>

            <Flex className={styles.header} justifyContent='space-between'>

                <div className={styles.headerInfo_block}>
                    <span className={styles.headerInfo_text}>Coins for tap</span>
                    <Flex className={styles.headerInfo_info}>
                        <img src="/img/coin-icon.png" alt="Coin"/>
                        <Text>+1</Text>
                    </Flex>
                </div>

                <div className={styles.headerInfo_block}>
                    <span className={styles.headerInfo_text}>Coins for level up</span>
                    <Flex className={styles.headerInfo_info}>
                        <Text>50 000</Text>
                    </Flex>
                </div>

                <div className={styles.headerInfo_block}>
                    <span className={styles.headerInfo_text}>Profit per hour</span>
                    <Flex className={styles.headerInfo_info}>
                        <Text>+150</Text>
                    </Flex>
                </div>

            </Flex>

            <div className={styles.mainContent}>

                <div className={styles.levelWrapper}>
                    <Flex className={styles.balance} alignItems='center'>
                        <img src="/img/coin-icon-lg.png" alt="Coin"/>
                        <Text className={styles.balance_number}>1 078</Text>
                    </Flex>
                    <Link to='/levels'>
                        <Flex className={styles.level} alignItems='center'>
                            <Flex className={styles.level_info}>
                                <Text>Puppy</Text>
                                <Text>1<span>/15</span></Text>
                            </Flex>
                            <div className={styles.level_btn}>
                                <img src="/img/arrow.png" alt="Arrow"/>
                            </div>
                        </Flex>
                    </Link>
                </div>

                <div className={styles.tapWrapper}>
                    <div className={styles.tapper}>
                        <img src="/img/dog.png" alt="Tapper"/>
                    </div>
                </div>

                <Flex className={styles.footer} justifyContent='space-between'>
                    <Flex className={styles.energy} alignItems='center'>
                        <img src="/img/energy-icon.png" alt="Energy"/>
                        <Text>57/1000</Text>
                    </Flex>
                    <button>
                        <Flex className={styles.boost} alignItems='center'>
                            <img src="/img/boost-icon.png" alt="Boost"/>
                            <Text>Boost</Text>
                        </Flex>
                    </button>
                </Flex>


            </div>

        </div>
    );
};