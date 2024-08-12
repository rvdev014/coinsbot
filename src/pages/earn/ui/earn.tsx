import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import {Flex, Text} from "@chakra-ui/react";
import {DailyPopup} from "../../../features/daily-popup";
import {JoinPopup} from "../../../features/join-popup";
import {useEarnStore} from "../../../shared/model/earn/store.ts";
import {formatPrice} from "../../../shared/utils/other.ts";
import {useUserStore} from "../../../shared/model/user/store.ts";
import {Popup} from "../../../shared/ui/popup/popup.tsx";
import {earnImgData} from "../../../shared/model/earn/utils.ts";
import {LoaderBlock} from "../../../shared/ui/loader-block/loader-block.tsx";
import {ConditionBlock} from "../../../shared/ui/condition-block/condition-block.tsx";

import {motion} from "framer-motion";
import {useTranslation} from "react-i18next";
import {ITask} from "../../../shared/model/earn/store-types.ts";
import {InvitePopup} from "../../../features/invite-popup";

export const EarnPage = () => {
    const {t} = useTranslation();
    const isOpenDaily = useEarnStore(state => state.isOpenDaily);

    const tasksOwner = useEarnStore(state => state.tasksOwner);
    const tasksInvite = useEarnStore(state => state.tasksInvite);
    const tasksPartner = useEarnStore(state => state.tasksPartner);
    const userTasks = useUserStore(state => state.tasks);
    const country = useUserStore(state => state.country);
    const languageCode = useUserStore(state => state.language_code);
    const bonuses = useEarnStore(state => state.bonuses);
    const totalBonusCoins = useEarnStore(state => state.totalBonusCoins);
    const selectedTask = useEarnStore(state => state.selectedTask);
    const activeDayBonus = useEarnStore(state => state.active_day_bonus);
    const onDailyClick = useEarnStore(state => state.onDailyClick);
    const onTaskClick = useEarnStore(state => state.onTaskClick);
    const onCompleteTask = useEarnStore(state => state.onCompleteTask);
    const onTaskClose = useEarnStore(state => state.onTaskClose);
    const initEarn = useEarnStore(state => state.init);
    const isTasksLoading = useEarnStore(state => state.isTasksLoading);

    useEffect(() => {
        initEarn();
    }, [initEarn]);

    function sortTasksByCondition(arr1: ITask[], arr2: { id: number }[]): ITask[] {
        // Фильтруем элементы, которых нет во втором массиве
        const notInSecondArray = arr1.filter(task1 =>
            !arr2.some(task2 => task2.id === task1.id)
        );

        // Фильтруем элементы, которые есть во втором массиве
        const inSecondArray = arr1.filter(task1 =>
            arr2.some(task2 => task2.id === task1.id)
        );

        // Объединяем массивы: сначала элементы, которых нет во втором массиве
        return [...notInSecondArray, ...inSecondArray];
    }

    function taskMap(tasks: ITask[], title: string) {

        tasks = sortTasksByCondition(tasks, userTasks);

        return (
            <ConditionBlock condition={tasks?.length > 0}>
                <div className={styles.tasksList}>

                <div className={styles.tasksTitle}>
                    <p>{title}</p>
                </div>

                <ul>
                    {tasks?.map((task, index) => {

                        const countryExists = task?.countries?.includes(country);
                        const languageExists = task?.countries?.includes(languageCode);

                        if (!task || task?.countries && country && !countryExists) {

                            if (!languageExists) {
                                return (<></>)
                            }

                        }

                        const isCompleted = userTasks?.some(userTask => userTask.id === task.id);

                        return (
                            <li
                                key={index}
                                className={styles.taskItem}
                                onClick={isCompleted ? () => {} : () => onTaskClick(task)}
                            >

                                <Flex className={styles.taskItem_left}>
                                    {/*<div className={styles.taskIcon + ' ' + (task.type === 'partner' ? styles.taskIconBg : '')}>*/}
                                    <div className={styles.taskIcon}>
                                        <img
                                            // src={earnImgData.taskTg}
                                            src={task.img ?? earnImgData.taskTg}
                                            // onError={(e) => e.target.src = earnImgData.taskTg}
                                            alt="Task tg"
                                        />
                                    </div>
                                    <div className={styles.taskInfo}>
                                        <p className={styles.taskName}>{task.title}</p>
                                        <Flex className={styles.taskPrice} alignItems='center'>
                                            <img src={earnImgData.coinIcon} alt="Coin"/>
                                            <span>{formatPrice(task.coins)}</span>
                                        </Flex>
                                    </div>
                                </Flex>

                                {isCompleted
                                    ?
                                    <Text className={styles.taskArrow}>&#10003;</Text>
                                    :
                                    <img className={styles.taskArrow} src={earnImgData.arrow} alt="Arrow"/>}

                            </li>
                        )
                    })}
                </ul>

            </div>
            </ConditionBlock>
        )
    }

    return (
        <>

            <div className={styles.wrapper}>

                <div className={styles.header}>
                    <motion.img
                        initial={{y: -20}}
                        animate={{y: 0}}
                        className={styles.headerCoinIcon} src={earnImgData.coinLevel}
                        alt="Coin level"
                    />
                    <motion.p
                        initial={{x: -20}}
                        animate={{x: 0}}
                        className={styles.title}
                    >{t('earn_more_coins')}</motion.p>
                    <motion.p
                        initial={{x: 20}}
                        animate={{x: 0}}
                        className={styles.bonusTitle}
                    >+{formatPrice(totalBonusCoins ?? 0)}</motion.p>

                    <motion.button
                        initial={{x: -20}}
                        animate={{x: 0}}
                        className={styles.dailyBtn}
                        onClick={onDailyClick}
                    >
                        <Flex className={styles.dailyBtn_left}>
                            <div className={styles.badgeIcon}>
                                <img src={earnImgData.coinIcon} alt="Coin"/>
                                {activeDayBonus && <span></span>}
                            </div>
                            <p>{t('daily_reward')}</p>
                        </Flex>
                        <img src={earnImgData.arrow} alt="Arrow"/>
                    </motion.button>
                </div>

                <LoaderBlock loading={isTasksLoading}>
                    <motion.div
                        initial={{x: -20}}
                        animate={{x: 0}}
                        className={styles.tasksWrapper}
                    >
                        {taskMap(tasksOwner,   t('owner_tasks'))}
                        {taskMap(tasksInvite,  t('invite_tasks'))}
                        {taskMap(tasksPartner, t('partner_tasks'))}
                    </motion.div>
                </LoaderBlock>
            </div>

            <Popup isOpen={isOpenDaily} onClose={() => useEarnStore.setState({isOpenDaily: false})}>
                <DailyPopup bonuses={bonuses}/>
            </Popup>

            <Popup isOpen={selectedTask !== null && !selectedTask?.type?.includes('invite_')} onClose={onTaskClose}>
                <JoinPopup
                    task={selectedTask}
                    onCompleteTask={onCompleteTask}
                />
            </Popup>

            <Popup isOpen={selectedTask !== null && selectedTask?.type?.includes('invite_')} onClose={onTaskClose}>
                <InvitePopup
                    task={selectedTask}
                    onCompleteTask={onCompleteTask}
                />
            </Popup>
        </>
    );
};