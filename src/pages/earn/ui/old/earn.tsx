import React from 'react';
import styles from './styles.module.scss';
import {Flex, Text} from "@chakra-ui/react";

export const EarnPage = () => {
    return (
        <div className={styles.wrapper}>

            <div className={styles.earnBlock}>
                <div className={styles.earnBlock_imgBlock}>
                    <img src="/img/coin.png" alt="Coin"/>
                </div>
                <Text fontSize='30px' fontWeight='bold'>Earn more coins</Text>
            </div>

            <div className={styles.dailyTasks}>
                <Text fontSize='18px' fontWeight='bold' className={styles.taskCategory}>Daily tasks</Text>
                <Flex flexDirection='column'>
                    <Flex className={styles.taskItem} alignItems='center'>
                        <img src="/img/calendar.png" alt="Calendar" className={styles.taskItem_img}/>
                        <Flex flexDirection='column'>
                            <Text fontSize='18px' fontWeight='400'>Daily reward</Text>
                            <Flex className={styles.taskItem_info} alignItems='center'>
                                <img src="/img/coin.png" alt="Coin"/>
                                <Text fontSize='16px' fontWeight='bold'>+2,000</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </div>

            <div className={styles.dailyTasks} style={{marginTop: '20px'}}>
                <Text fontSize='18px' fontWeight='bold' className={styles.taskCategory}>Tasks list</Text>
                <Flex flexDirection='column'>
                    <Flex className={styles.taskItem} alignItems='center'>
                        <img src="/img/calendar.png" alt="Calendar" className={styles.taskItem_img}/>
                        <Flex flexDirection='column'>
                            <Text fontSize='18px' fontWeight='400'>Daily reward</Text>
                            <Flex className={styles.taskItem_info} alignItems='center'>
                                <img src="/img/coin.png" alt="Coin"/>
                                <Text fontSize='16px' fontWeight='bold'>+2,000</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex className={styles.taskItem} alignItems='center'>
                        <img src="/img/calendar.png" alt="Calendar" className={styles.taskItem_img}/>
                        <Flex flexDirection='column'>
                            <Text fontSize='18px' fontWeight='400'>Daily reward</Text>
                            <Flex className={styles.taskItem_info} alignItems='center'>
                                <img src="/img/coin.png" alt="Coin"/>
                                <Text fontSize='16px' fontWeight='bold'>+2,000</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex className={styles.taskItem} alignItems='center'>
                        <img src="/img/calendar.png" alt="Calendar" className={styles.taskItem_img}/>
                        <Flex flexDirection='column'>
                            <Text fontSize='18px' fontWeight='400'>Daily reward</Text>
                            <Flex className={styles.taskItem_info} alignItems='center'>
                                <img src="/img/coin.png" alt="Coin"/>
                                <Text fontSize='16px' fontWeight='bold'>+2,000</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex className={styles.taskItem} alignItems='center'>
                        <img src="/img/calendar.png" alt="Calendar" className={styles.taskItem_img}/>
                        <Flex flexDirection='column'>
                            <Text fontSize='18px' fontWeight='400'>Daily reward</Text>
                            <Flex className={styles.taskItem_info} alignItems='center'>
                                <img src="/img/coin.png" alt="Coin"/>
                                <Text fontSize='16px' fontWeight='bold'>+2,000</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </div>

        </div>
    );
};