import React from 'react';
import styles from './styles.module.scss';
import {Avatar, Flex, Text} from "@chakra-ui/react";

export const FriendsPage = () => {
    return (
        <div className={styles.wrapper}>

            <div className={styles.friendsBlock}>
                <Text fontSize='36px' fontWeight='bold' className={styles.title}>Invite friends!</Text>
                <Text fontSize='16px' fontWeight='400'>You and your friends will receive bonuses</Text>
            </div>

            <Flex flexDirection='column' className={styles.bonusesList}>

                <Flex className={styles.bonusItem}>
                    <img src="/img/gift.png" alt="Gift" className={styles.bonusItem_icon}/>
                    <Flex flexDirection='column'>
                        <Text fontSize='16px' fontWeight='bold' className={styles.bonusItem_name}>
                            Invite a friend
                        </Text>
                        <Flex alignItems='flex-start' className={styles.bonusItem_info}>
                            <img src="/img/coin.png" alt="Coin"/>
                            <Text fontSize='16px' fontWeight='bold' color='#face66' className={styles.bonusItem_info_text}>
                                +5,000 <span>for you and your friend</span>
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>

                <Flex className={styles.bonusItem}>
                    <img src="/img/gift.png" alt="Gift" className={styles.bonusItem_icon}/>
                    <Flex flexDirection='column'>
                        <Text fontSize='16px' fontWeight='bold' className={styles.bonusItem_name}>
                            Invite a friend with Telegram Premium
                        </Text>
                        <Flex alignItems='flex-start' className={styles.bonusItem_info}>
                            <img src="/img/coin.png" alt="Coin"/>
                            <Text fontSize='16px' fontWeight='bold' color='#face66' className={styles.bonusItem_info_text}>
                                +5,000 <span>for you and your friend</span>
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>

            </Flex>

            <div className={styles.friendsList}>
                <Text fontSize='18px' fontWeight='bold' className={styles.friendsList_title}>Friends</Text>
                <Flex alignItems='center' className={styles.friendItem}>
                    <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                    <Text ml={2}>Dan Abrahmov</Text>
                </Flex>
                <Flex alignItems='center' className={styles.friendItem}>
                    <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                    <Text ml={2}>Dan Abrahmov</Text>
                </Flex>
                <Flex alignItems='center' className={styles.friendItem}>
                    <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                    <Text ml={2}>Dan Abrahmov</Text>
                </Flex>
            </div>

        </div>
    );
};