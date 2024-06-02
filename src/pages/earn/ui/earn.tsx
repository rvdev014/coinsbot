import React from 'react';
import styles from './styles.module.scss';
import {Flex} from "@chakra-ui/react";
import {DailyPopup} from "../../../features/daily-popup";
import {JoinPopup} from "../../../features/join-popup";

export const EarnPage = () => {

    const [isOpenDaily, setIsOpenDaily] = React.useState(false);
    const [isOpenJoin, setIsOpenJoin] = React.useState(false);

    return (
        <>

            <div className={styles.wrapper}>

                <div className={styles.header}>
                    <img src="/img/coin-level.png" alt="Coin level"/>
                    <p className={styles.title}>Earn more coins</p>
                    <p className={styles.bonusTitle}>+10 000 000</p>

                    <button className={styles.dailyBtn} onClick={() => setIsOpenDaily(true)}>
                        <Flex className={styles.dailyBtn_left}>
                            <div className={styles.badgeIcon}>
                                <img src="/img/coin-icon.png" alt="Coin"/>
                                <span></span>
                            </div>
                            <p>Daily reward</p>
                        </Flex>
                        <img src="/img/arrow.png" alt="Arrow"/>
                    </button>
                </div>

                <div className={styles.tasksWrapper}>

                    <div className={styles.tasksList}>

                        {[1, 2, 3].map((user, index) => (
                            <Flex
                                key={user}
                                className={styles.taskItem}
                                justifyContent='space-between'
                                alignItems='center'
                                onClick={() => setIsOpenJoin(true)}
                            >

                                <Flex className={styles.taskItem_left}>
                                    <div className={styles.taskIcon}>
                                        <img src="/img/task-tg.png" alt="Task tg"/>
                                    </div>
                                    <div className={styles.taskInfo}>
                                        <p className={styles.taskName}>Join our Telegram channel</p>
                                        <Flex className={styles.taskPrice} alignItems='center'>
                                            <img src="/img/coin-icon.png" alt="Coin"/>
                                            <span>19 583 078</span>
                                        </Flex>
                                    </div>
                                </Flex>

                                <img className={styles.taskArrow} src="/img/arrow.png" alt="Arrow"/>

                            </Flex>
                        ))}

                    </div>

                </div>

            </div>


            <DailyPopup isOpen={isOpenDaily} onClose={() => setIsOpenDaily(false)}/>

            <JoinPopup isOpen={isOpenJoin} onClose={() => setIsOpenJoin(false)}/>
        </>
    );
};