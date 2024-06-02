import React from 'react';
import styles from './styles.module.scss';
import {Flex} from "@chakra-ui/react";

export const FriendsPage = () => {
    return (
        <div className={styles.wrapper}>

            <div className={styles.mainBlock}>
                <h2 className={styles.title}>Invite Frens</h2>
                <hr className={styles.divider}/>
                <p className={styles.text}>You've earned from your friends</p>
                <Flex className={styles.earnedBalance} alignItems='center'>
                    <img src="/img/coin-icon-lg.png" alt="Coin"/>
                    <span>5 875 695</span>
                </Flex>

                <Flex className={styles.friendsInfo} alignItems='center'>
                    <img src="/img/friends-icon.png" alt="Friends"/>
                    <p>2 376 <span>friends</span></p>
                </Flex>
            </div>

            <Flex className={styles.infoBlocks} gap='8px'>
                <div className={styles.infoBlock}>
                    <h3 className={styles.infoBlock_title}>Regular user</h3>
                    <h3 className={styles.infoBlock_text}>for you and your friend</h3>
                    <Flex className={styles.earnedBalance} alignItems='center'>
                        <img src="/img/coin-icon-lg.png" alt="Coin"/>
                        <span>+5 000</span>
                    </Flex>
                </div>
                <div className={styles.infoBlock}>
                    <h3 className={styles.infoBlock_title}>Telegram Premium</h3>
                    <h3 className={styles.infoBlock_text}>for you and your friend</h3>
                    <Flex className={styles.earnedBalance} alignItems='center'>
                        <img src="/img/coin-icon-lg.png" alt="Coin"/>
                        <span>+25 000</span>
                    </Flex>
                </div>
            </Flex>


            <div className={styles.friendsWrapper}>
                <Flex className={styles.friendsTitleWrapper} alignItems='center'>
                    <hr className={styles.divider}/>
                    <h2>First line</h2>
                    <span>+8%</span>
                    <hr className={styles.divider}/>
                </Flex>

                <div className={styles.friendsList}>

                    <Flex className={styles.userItem} justifyContent='space-between' alignItems='center'>

                        <Flex className={styles.userItem_left}>
                            <div className={styles.userAvatar}>
                                {/*<img src="/img/asd.png" alt="Avatar"/>*/}
                                <p>v</p>
                            </div>
                            <div className={styles.userInfo}>
                                <p className={styles.userName}>vtsss</p>
                                <Flex className={styles.userBalance} alignItems='center'>
                                    <span className={styles.userLevel}>King</span>
                                    <img src="/img/coin-icon.png" alt="Coin"/>
                                    <span>19 583 078</span>
                                </Flex>
                            </div>
                        </Flex>

                        <p className={styles.prize}>+56 875 695</p>

                    </Flex>

                    <Flex className={styles.userItem} justifyContent='space-between' alignItems='center'>

                        <Flex className={styles.userItem_left}>
                            <div className={styles.userAvatar}>
                                {/*<img src="/img/asd.png" alt="Avatar"/>*/}
                                <p>v</p>
                            </div>
                            <div className={styles.userInfo}>
                                <p className={styles.userName}>uxdsgnr</p>
                                <Flex className={styles.userBalance} alignItems='center'>
                                    <span className={styles.userLevel}>King</span>
                                    <img src="/img/coin-icon.png" alt="Coin"/>
                                    <span>1 500 000</span>
                                </Flex>
                            </div>
                        </Flex>

                        <p className={styles.prize}>+1 875 157</p>

                    </Flex>

                    <Flex className={styles.userItem} justifyContent='space-between' alignItems='center'>

                        <Flex className={styles.userItem_left}>
                            <div className={styles.userAvatar}>
                                {/*<img src="/img/asd.png" alt="Avatar"/>*/}
                                <p>v</p>
                            </div>
                            <div className={styles.userInfo}>
                                <p className={styles.userName}>uxdsgnr</p>
                                <Flex className={styles.userBalance} alignItems='center'>
                                    <span className={styles.userLevel}>King</span>
                                    <img src="/img/coin-icon.png" alt="Coin"/>
                                    <span>1 500 000</span>
                                </Flex>
                            </div>
                        </Flex>

                        <p className={styles.prize}>+1 875 157</p>

                    </Flex>

                    <Flex className={styles.userItem} justifyContent='space-between' alignItems='center'>

                        <Flex className={styles.userItem_left}>
                            <div className={styles.userAvatar}>
                                {/*<img src="/img/asd.png" alt="Avatar"/>*/}
                                <p>v</p>
                            </div>
                            <div className={styles.userInfo}>
                                <p className={styles.userName}>uxdsgnr</p>
                                <Flex className={styles.userBalance} alignItems='center'>
                                    <span className={styles.userLevel}>King</span>
                                    <img src="/img/coin-icon.png" alt="Coin"/>
                                    <span>1 500 000</span>
                                </Flex>
                            </div>
                        </Flex>

                        <p className={styles.prize}>+1 875 157</p>

                    </Flex>

                    <Flex className={styles.userItem} justifyContent='space-between' alignItems='center'>

                        <Flex className={styles.userItem_left}>
                            <div className={styles.userAvatar}>
                                {/*<img src="/img/asd.png" alt="Avatar"/>*/}
                                <p>v</p>
                            </div>
                            <div className={styles.userInfo}>
                                <p className={styles.userName}>uxdsgnr</p>
                                <Flex className={styles.userBalance} alignItems='center'>
                                    <span className={styles.userLevel}>King</span>
                                    <img src="/img/coin-icon.png" alt="Coin"/>
                                    <span>1 500 000</span>
                                </Flex>
                            </div>
                        </Flex>

                        <p className={styles.prize}>+1 875 157</p>

                    </Flex>


                </div>
            </div>

            <button className={styles.inviteFriendBtn}>Invite a fren</button>

        </div>
    );
};