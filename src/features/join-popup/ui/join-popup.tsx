import React, {FC} from 'react';
import styles from "./styles.module.scss";
import {Popup} from "../../../shared/ui/popup/popup.tsx";
import {Flex} from "@chakra-ui/react";
import {ITask} from "../../../shared/model/earn/store-types.ts";
import {formatPrice} from "../../../shared/utils/other.ts";

interface IProps {
    task: ITask | null;
    onClose: () => void;
}

export const JoinPopup: FC<IProps> = ({task, onClose}) => {
    return (
        <Popup isOpen={task !== null} onClose={onClose}>
            {task && (
                <div className={styles.content}>
                    <img className={styles.taskIcon} src="/img/task-tg-lg.png" alt="Task tg"/>
                    <h2 className={styles.title}>{task.title_ru}</h2>
                    <p className={styles.text}>
                        All major news about the project will be published there. Keep up to date
                        with the latest information
                    </p>

                    <Flex className={styles.taskPrice} alignItems='center'>
                        <img src="/img/coin-icon-lg.png" alt="Coin"/>
                        <span>+{formatPrice(task.coins)}</span>
                    </Flex>

                    <button className={styles.startBtn}>Start a task</button>

                </div>
            )}
        </Popup>
    );
};