import React, {FC, useEffect, useRef} from 'react';
import styles from "./styles.module.scss";
import {Popup} from "../../../shared/ui/popup/popup.tsx";
import {Flex} from "@chakra-ui/react";
import {ITask} from "../../../shared/model/earn/store-types.ts";
import {formatPrice} from "../../../shared/utils/other.ts";
import cl from "classnames";
import {t} from "i18next";
import {useEarnStore} from "../../../shared/model/earn/store.ts";
import {useAppStore} from "../../../shared/model/app-store.ts";
import {ClaimBtn} from "../../../shared/ui/claim-btn/claim-btn.tsx";
import {earnImgData} from "../../../shared/model/earn/utils.ts";

interface IProps {
    task: ITask | null;
    onCompleteTask: (task: ITask) => void;
}

export const JoinPopup: FC<IProps> = ({task, onCompleteTask}) => {
    const tasksOpenedUrl = useEarnStore(state => state.tasksOpenedUrl);
    const isSubmitLoading = useEarnStore(state => state.isSubmitLoading);
    const timeout = useRef<number | null>(null);

    useEffect(() => {
        return () => {
            if (timeout.current) {
                clearTimeout(timeout.current);
            }
        }
    }, []);

    function onSubscribeClick(task: ITask) {
        if (task.is_external) {
            useAppStore.getState().webApp?.openLink(task.url);
        } else {
            useAppStore.getState().webApp?.openTelegramLink(task.url);
        }

        timeout.current = setTimeout(() => {
            useEarnStore.setState({
                tasksOpenedUrl: [...tasksOpenedUrl, task.id]
            });
        }, 1000);
    }

    if (!task) return null;

    return (
        <div className={styles.content}>
            <img
                className={styles.taskIcon}
                src={earnImgData.taskTgLg}
                // src={task.img ?? earnImgData.taskTg}
                // @ts-ignore
                // onError={(e) => e.target.src = earnImgData.taskTgLg}
                alt="Task tg"
            />
            <h2 className={styles.title}>{task.title}</h2>
            <p className={styles.text}>
                {t('channel_desc')}
            </p>

            <Flex className={styles.taskPrice} alignItems='center'>
                <img src={earnImgData.coinIconLg} alt="Coin"/>
                <span>+{formatPrice(task.coins)}</span>
            </Flex>

            {tasksOpenedUrl.includes(task.id)
                ?
                <ClaimBtn loading={isSubmitLoading} onClick={() => onCompleteTask(task)}>
                    {t('complete_task')}
                </ClaimBtn>
                :
                <ClaimBtn onClick={() => onSubscribeClick(task)}>
                    {t('subscribe')}
                </ClaimBtn>}

        </div>
    )
        ;
};