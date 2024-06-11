import React, {FC, useEffect, useState} from 'react';
import styles from "./popups.module.scss";
import {Flex} from "@chakra-ui/react";
import cl from "classnames";
import {t} from "i18next";
import {useUserStore} from "../../../../shared/model/user/store.ts";
import {formatPrice} from "../../../../shared/utils/other.ts";
import {dateGreaterThan} from "../../../../shared/utils/date.ts";
import {Timer} from "../../../../shared/ui/timer/timer.tsx";
import {shallow} from "zustand/shallow";
import {useBoostStore} from "../../model/store.ts";
import {ClaimBtn} from "../../../../shared/ui/claim-btn/claim-btn.tsx";
import {boostImgData} from "../../model/utils.ts";

interface IProps {
    onUpgrade: () => void;
}

export const MultiTapPopup: FC<IProps> = ({onUpgrade}) => {

    const isSubmitLoading = useBoostStore(state => state.isSubmitLoading);

    const boostData = useUserStore(state => state.boost);
    const multiTapEndsAt = useUserStore(state => state.multi_tap);
    const [timerDisabled, setTimerDisabled] = useState<boolean>(false);
    const [coinsDisabled, setCoinsDisabled] = useState<boolean>(false);

    useEffect(() => {
        const unsubscribe = useUserStore.subscribe(
            state => state.coins,
            coins => {
                setCoinsDisabled(coins < boostData?.multi_tap?.coins);
            },
            {
                equalityFn: shallow,
                fireImmediately: true
            }
        );

        setTimerDisabled(dateGreaterThan(multiTapEndsAt));

        return () => unsubscribe();
    }, [boostData, multiTapEndsAt]);

    function onTimerEnds() {
        setTimerDisabled(dateGreaterThan(multiTapEndsAt));
    }

    return (
        <div className={styles.content}>
            <img className={styles.taskIcon} src={boostImgData.multitapLg} alt="Paw"/>
            <h2 className={styles.title}>{t('multitap')}</h2>
            <p className={styles.text}>{t('multitap_desc')}</p>

            <div className={styles.priceWrapper}>
                <Flex className={styles.price} alignItems='center'>
                    <img src={boostImgData.coinIconLg} alt="Coin"/>
                    <span>{formatPrice(boostData?.multi_tap?.coins)}</span>
                </Flex>
            </div>

            {timerDisabled
                ?
                <button className={styles.startBtn} disabled={true}>
                    <Timer toDate={multiTapEndsAt} onTimerEnds={onTimerEnds}/>
                </button>
                :
                coinsDisabled
                    ?
                    <button className={cl(styles.startBtn, styles.disabled)} disabled={true}>
                        {t('not_enough_coins')}
                    </button>
                    :
                    <ClaimBtn onClick={onUpgrade} loading={isSubmitLoading}>
                        {t('upgrade')}
                    </ClaimBtn>
            }

        </div>
    );
};