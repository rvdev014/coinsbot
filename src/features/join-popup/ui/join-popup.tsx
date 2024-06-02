import React, {FC} from 'react';
import styles from "./styles.module.scss";
import {Popup} from "../../../shared/ui/popup/popup.tsx";
import {Flex} from "@chakra-ui/react";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

export const JoinPopup: FC<IProps> = ({isOpen, onClose}) => {
    return (
        <Popup isOpen={isOpen} onClose={onClose}>
            <div className={styles.content}>
                <img className={styles.taskIcon} src="/img/task-tg-lg.png" alt="Task tg"/>
                <h2 className={styles.title}>Join our Telegram channel</h2>
                <p className={styles.text}>
                    All major news about the project will be published there. Keep up to date
                    with the latest information
                </p>

                <Flex className={styles.taskPrice} alignItems='center'>
                    <img src="/img/coin-icon-lg.png" alt="Coin"/>
                    <span>+50 000</span>
                </Flex>

                <button className={styles.startBtn}>Start a task</button>

            </div>
        </Popup>
    );
};