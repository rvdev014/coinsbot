import React, {FC} from 'react';
import styles from "./styles.module.scss";
import {Popup} from "../../../shared/ui/popup/popup.tsx";
import {Flex} from "@chakra-ui/react";
import {ITask} from "../../../shared/model/earn/store-types.ts";
import {formatPrice} from "../../../shared/utils/other.ts";
import {Link} from "react-router-dom";

interface IProps {
    task: ITask | null;
    onClose: () => void;
    onCompleteTask: (task: ITask) => void;
}

export const JoinPopup: FC<IProps> = ({task, onClose, onCompleteTask}) => {
    const [openUrl, setOpenUrl] = React.useState(false);

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

                    {openUrl
                        ?
                        <button
                            className={styles.startBtn}
                            onClick={() => onCompleteTask(task)}
                        >Start a task</button>
                        :
                        <a
                            href={task.url}
                            target='_blank'
                            className={styles.startBtn}
                            onClick={() => setOpenUrl(true)}
                        >Subscribe</a>}

                </div>
            )}
        </Popup>
    );
};