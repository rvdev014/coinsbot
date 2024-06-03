import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import {Flex} from "@chakra-ui/react";
import {DailyPopup} from "../../../features/daily-popup";
import {JoinPopup} from "../../../features/join-popup";
import {useEarnStore} from "../../../shared/model/earn/store.ts";
import {Loader} from "../../../shared/ui/loader/loader.tsx";
import {formatPrice} from "../../../shared/utils/other.ts";

export const EarnPage = () => {

    const isOpenDaily = useEarnStore(state => state.isOpenDaily);

    const tasks = useEarnStore(state => state.tasks);
    const selectedTask = useEarnStore(state => state.selectedTask);
    const activeDayBonus = useEarnStore(state => state.activeDayBonus);
    const onDailyClick = useEarnStore(state => state.onDailyClick);
    const onTaskClick = useEarnStore(state => state.onTaskClick);
    const onTaskClose = useEarnStore(state => state.onTaskClose);
    const initEarn = useEarnStore(state => state.initEarn);
    const isLoading = useEarnStore(state => state.isLoading);
    const isTasksLoading = useEarnStore(state => state.isTasksLoading);

    useEffect(() => {
        initEarn();
    }, []);

    return (
        <>

            <div className={styles.wrapper}>

                <div className={styles.header}>
                    <img src="/img/coin-level.png" alt="Coin level"/>
                    <p className={styles.title}>Earn more coins</p>
                    <p className={styles.bonusTitle}>+10 000 000</p>

                    <button className={styles.dailyBtn} onClick={onDailyClick}>
                        <Flex className={styles.dailyBtn_left}>
                            <div className={styles.badgeIcon}>
                                <img src="/img/coin-icon.png" alt="Coin"/>
                                {activeDayBonus && <span></span>}
                            </div>
                            <p>Daily reward</p>
                        </Flex>
                        <img src="/img/arrow.png" alt="Arrow"/>
                    </button>
                </div>

                <div className={styles.tasksWrapper}>

                    {(isLoading || isTasksLoading)
                        ? <Loader/>
                        :
                        <div className={styles.tasksList}>

                            {tasks.map((task, index) => (
                                <Flex
                                    key={task.id}
                                    className={styles.taskItem}
                                    justifyContent='space-between'
                                    alignItems='center'
                                    onClick={() => onTaskClick(task)}
                                >

                                    <Flex className={styles.taskItem_left}>
                                        <div className={styles.taskIcon}>
                                            <img src="/img/task-tg.png" alt="Task tg"/>
                                        </div>
                                        <div className={styles.taskInfo}>
                                            <p className={styles.taskName}>{task.title_ru}</p>
                                            <Flex className={styles.taskPrice} alignItems='center'>
                                                <img src="/img/coin-icon.png" alt="Coin"/>
                                                <span>{formatPrice(task.coins)}</span>
                                            </Flex>
                                        </div>
                                    </Flex>

                                    <img className={styles.taskArrow} src="/img/arrow.png" alt="Arrow"/>

                                </Flex>
                            ))}

                        </div>
                    }


                </div>

            </div>


            <DailyPopup
                isOpen={isOpenDaily}
                onClose={() => useEarnStore.setState({isOpenDaily: false})}
            />

            <JoinPopup
                task={selectedTask}
                onClose={onTaskClose}
            />
        </>
    );
};