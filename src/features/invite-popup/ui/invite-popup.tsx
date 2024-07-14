import React, {FC} from 'react';
import styles from "./styles.module.scss";
import {Flex} from "@chakra-ui/react";
import {useEarnStore} from "../../../shared/model/earn/store.ts";
import {formatPrice} from "../../../shared/utils/other.ts";
import {ITask} from "../../../shared/model/earn/store-types.ts";
import {ClaimBtn} from "../../../shared/ui/claim-btn/claim-btn.tsx";
import {useTranslation} from "react-i18next";
import {earnImgData} from "../../../shared/model/earn/utils.ts";

interface IProps {
    task: ITask | null;
    onCompleteTask: (task: ITask) => void;
}

export const InvitePopup: FC<IProps> = ({task, onCompleteTask}) => {
    const {t} = useTranslation();
    const isSubmitLoading = useEarnStore(state => state.isSubmitLoading);

    if (!task) return null;

    return (
        <div className={styles.content}>
            <img
                className={styles.taskIcon}
                src={task.img ?? earnImgData.taskTg}
                // src={task.img ?? earnImgData.taskTg}
                // onError={(e) => e.target.src = earnImgData.taskTgLg}
                alt="Task tg"
            />
            <h2 className={styles.title}>{task.title}</h2>
            <p className={styles.text}>
                {task?.desc ?? t('channel_desc')}
            </p>

            <Flex className={styles.taskPrice} alignItems='center'>
                <img src={earnImgData.coinIconLg} alt="Coin"/>
                <span>+{formatPrice(task.coins)}</span>
            </Flex>

            {
                <ClaimBtn loading={isSubmitLoading} onClick={() => onCompleteTask(task)}>
                    {t('complete_task')}
                </ClaimBtn>
            }

        </div>
    );
};