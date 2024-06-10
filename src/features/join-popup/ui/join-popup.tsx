import React, {FC} from 'react';
import styles from "./styles.module.scss";
import {Popup} from "../../../shared/ui/popup/popup.tsx";
import {Flex} from "@chakra-ui/react";
import {ITask} from "../../../shared/model/earn/store-types.ts";
import {formatPrice} from "../../../shared/utils/other.ts";
import cl from "classnames";
import {t} from "i18next";
import {useEarnStore} from "../../../shared/model/earn/store.ts";
import {useAppStore} from "../../../shared/model/app-store.ts";

interface IProps {
    task: ITask | null;
    onCompleteTask: (task: ITask) => void;
}

export const JoinPopup: FC<IProps> = ({task, onCompleteTask}) => {
    const tasksOpenedUrl = useEarnStore(state => state.tasksOpenedUrl);

    function onSubscribeClick(task: ITask) {
        if (task.is_external) {
            useAppStore.getState().webApp?.openLink(task.url);
        } else {
            console.log(useAppStore.getState().webApp)
            useAppStore.getState().webApp?.openTelegramLink(task.url);
        }
        useEarnStore.setState({
            tasksOpenedUrl: [...tasksOpenedUrl, task.id]
        });
    }

    if (!task) return null;

    return (
        <div className={styles.content}>
            <img
                className={styles.taskIcon}
                src={task.img ?? "/img/task-tg.png"}
                // @ts-ignore
                onError={(e) => e.target.src = "/img/task-tg-lg.png"}
                alt="Task tg"
            />
            <h2 className={styles.title}>{task.title}</h2>
            <p className={styles.text}>
                {t('channel_desc')}
            </p>

            <Flex className={styles.taskPrice} alignItems='center'>
                <img src="/img/coin-icon-lg.png" alt="Coin"/>
                <span>+{formatPrice(task.coins)}</span>
            </Flex>

            {tasksOpenedUrl.includes(task.id)
                ?
                <button
                    className={cl(styles.startBtn, 'gradientWrapper')}
                    onClick={() => onCompleteTask(task)}
                >
                    {t('complete_task')}
                    <span
                        className='gradient'
                        style={{
                            boxShadow: `0 0 50px 50px rgba(153, 214, 23, 0.61)`,
                            bottom: '-30px'
                        }}
                    />
                </button>
                :
                <button
                    className={cl(styles.startBtn, 'gradientWrapper')}
                    onClick={() => onSubscribeClick(task)}
                >
                    {t('subscribe')}
                    <span
                        className='gradient'
                        style={{
                            boxShadow: `0 0 50px 50px rgba(153, 214, 23, 0.61)`,
                            bottom: '-30px'
                        }}
                    />
                </button>}

        </div>
    )
        ;
};