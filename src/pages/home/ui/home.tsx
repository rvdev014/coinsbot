import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import {Flex, Text} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {useUserStore} from "../../../shared/model/user/store.ts";

export const HomePage = () => {
    const user = useUserStore(state => state);
    const coins = useUserStore(state => state?.coins);

    useEffect(() => {
        const interval = setInterval(() => {
            useUserStore.setState({coins: coins + user?.coins_per_second});
            
        }, 1000);

        return () => clearInterval(interval);
    }, [user]);

    return (
        <div className={styles.wrapper}>

            <Flex className={styles.header} justifyContent='space-between'>

                <div className={styles.headerInfo_block}>
                    <span className={styles.headerInfo_text}>{}</span>
                    <Flex className={styles.headerInfo_info}>
                        <img src="/img/coin-icon.png" alt="Coin"/>
                        <Text>+{user?.coins_per_tap}</Text>
                    </Flex>
                </div>

                <div className={styles.headerInfo_block}>
                    <span className={styles.headerInfo_text}>Coins for level up</span>
                    <Flex className={styles.headerInfo_info}>
                        <Text>{user?.next_level?.coins ?? 'max'}</Text>
                    </Flex>
                </div>

                <div className={styles.headerInfo_block}>
                    <span className={styles.headerInfo_text}>Profit per 1.5 hours</span>
                    <Flex className={styles.headerInfo_info}>
                        <Text>+{user?.coins_per_hour}</Text>
                    </Flex>
                </div>

            </Flex>

            <div className={styles.mainContent}>

                <div className={styles.levelWrapper}>
                    <Flex className={styles.balance} alignItems='center'>
                        <img src="/img/coin-icon-lg.png" alt="Coin"/>
                        <Text className={styles.balance_number}>{coins?.toFixed(2)}</Text>
                    </Flex>
                    <Link to='/levels'>
                        <Flex className={styles.level} alignItems='center'>
                            <Flex className={styles.level_info}>
                                <Text>Puppy</Text>
                                <Text>{user?.level?.step ?? '1'}<span>/{user?.last_level?.step ?? '15'}</span></Text>
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
                        <Text>{user?.energy}/{user?.energy_limit}</Text>
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