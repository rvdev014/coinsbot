import React from 'react';
import styles from './styles.module.scss';
import {Avatar, Button, Container, Flex, Progress, Text, WrapItem} from "@chakra-ui/react";

export const HomePage = () => {
    return (
        <div className={styles.wrapper}>

            <Flex alignItems='center' justifyContent='space-between' className={styles.header}>
                <div className={styles.headerRight}>
                    <Flex alignItems='center'>
                        <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                        <Text ml={2}>Dan Abrahmov</Text>
                    </Flex>
                </div>
                <div className={styles.headerLeft}>
                    <Button colorScheme="blue">Exchange</Button>
                </div>
            </Flex>

            <div className={styles.contentWrapper}>
                <Flex className={styles.infoBlocks} gap='1'>
                    <div className={styles.infoCard}>
                        <Text color='#ff7300' className={styles.infoCard_text}>Per tap</Text>
                        <div className={styles.infoCard_bottom}>
                            <img src="/img/coin.png" alt="Coin"/>
                            <span>+3</span>
                        </div>
                    </div>
                    <div className={styles.infoCard}>
                        <Text color='#7072b3' className={styles.infoCard_text}>To level up</Text>
                        <div className={styles.infoCard_bottom}>
                            <img src="/img/coin.png" alt="Coin"/>
                            <span>+3</span>
                        </div>
                    </div>
                    <div className={styles.infoCard}>
                        <Text color='#95ca99' className={styles.infoCard_text}>Per hour</Text>
                        <div className={styles.infoCard_bottom}>
                            <img src="/img/coin.png" alt="Coin"/>
                            <span>+3</span>
                        </div>
                    </div>
                </Flex>

                <div className={styles.balance}>
                    <Flex alignItems='center'>
                        <img src="/img/coin.png" alt="Coin"/>
                        <Text fontSize='40px' fontWeight='bold'>23,152</Text>
                    </Flex>
                </div>

                <div className={styles.progress}>
                    <Flex justifyContent='space-between'>
                        <Text fontWeight='400'>Gold</Text>
                        <Text fontWeight='400' ml={2}>Level 6/9</Text>
                    </Flex>
                    <Progress hasStripe value={64} />
                </div>

                <div className={styles.tapper}>
                    <div className={styles.tapperArea}>
                        <img src="/img/tapper.jpg" alt="Tapper"/>
                    </div>
                </div>


            </div>

        </div>
    );
};