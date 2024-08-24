import React, {FC, useEffect, useRef} from 'react';
import styles from "./styles.module.scss";
import {Flex, Input} from "@chakra-ui/react";
import {ITask} from "../../../shared/model/earn/store-types.ts";
import {formatPrice} from "../../../shared/utils/other.ts";
import {useEarnStore} from "../../../shared/model/earn/store.ts";
import {useAppStore} from "../../../shared/model/app-store.ts";
import {ClaimBtn} from "../../../shared/ui/claim-btn/claim-btn.tsx";
import {earnImgData} from "../../../shared/model/earn/utils.ts";
import {useTranslation} from "react-i18next";

interface IProps {
    task: ITask | null;
    onCompleteTask: (task: ITask, coupon: string | null | undefined) => void;
}

export const JoinPopup: FC<IProps> = ({task, onCompleteTask}) => {
    const {t} = useTranslation();
    const tasksOpenedUrl = useEarnStore(state => state.tasksOpenedUrl);
    const isSubmitLoading = useEarnStore(state => state.isSubmitLoading);
    const timeout = useRef<number | null>(null);
    const [coupon, setCoupon] = React.useState('');

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
        } else if (task.type !== 'coupon') {
            useAppStore.getState().webApp?.openTelegramLink(task.url);
        }

        console.log(coupon)
        timeout.current = setTimeout(() => {
            useEarnStore.setState({
                tasksOpenedUrl: [...tasksOpenedUrl, task.id]
            });
        }, 1000);
    }

    if (!task) return null;

    const couponChange = (event: any) => {

        if (task?.type === 'coupon') {
            setCoupon(event.target.value);
        }

    }

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
            <div className={styles.contentInfo}>
                {task.type === 'coupon' && (
                    <div className={styles.coupon}>
                        <Input
                            name={'coupon'}
                            onChange={couponChange}
                            value={coupon || ''}
                            required={true}
                            autoFocus={false}
                            placeholder={t('enter_promocode')}
                        />
                    </div>
                )}
            </div>
            <p className={styles.text}>
                {task?.desc ?? t('channel_desc')}
            </p>

            <Flex className={styles.taskPrice} alignItems='center'>
                <img src={task.type === 'coupon' ? earnImgData.gCoinIcon : earnImgData.coinIcon} alt="Coin"/>
                <span>+{formatPrice(task.coins)}</span>
            </Flex>

            {tasksOpenedUrl.includes(task.id) || task.type === 'coupon'
                ?
                <ClaimBtn
                    disabled={task.type === 'coupon' && (!coupon || coupon === '') || false}
                    isAds={false}
                    loading={isSubmitLoading}
                    onClick={() => onCompleteTask(task, coupon)}
                >
                    {t('complete_task')}
                </ClaimBtn>
                :
                <ClaimBtn isAds={false} onClick={() => onSubscribeClick(task)}>
                    {t('subscribe')}
                </ClaimBtn>}

        </div>
    );
};