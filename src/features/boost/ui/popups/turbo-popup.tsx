import React, {FC, useEffect, useMemo, useState} from 'react';
import styles from "./popups.module.scss";
import {Flex} from "@chakra-ui/react";
import cl from "classnames";
import {t} from "i18next";
import {useUserStore} from "../../../../shared/model/user/store.ts";
import {Timer} from "../../../../shared/ui/timer/timer.tsx";
import {dateGreaterThan} from "../../../../shared/utils/date.ts";
import {formatPrice} from "../../../../shared/utils/other.ts";
import {shallow} from "zustand/shallow";
import {useBoostStore} from "../../model/store.ts";
import {ClaimBtn} from "../../../../shared/ui/claim-btn/claim-btn.tsx";
import {boostImgData} from "../../model/utils.ts";

interface IProps {
    onUpgrade: () => void;
}

export const TurboPopup: FC<IProps> = ({onUpgrade}) => {

    const isSubmitLoading = useBoostStore(state => state.isSubmitLoading);

    const boostData = useUserStore(state => state.boost);
    const turboEndsAt = useUserStore(state => state.turbo);
    const [timerDisabled, setTimerDisabled] = useState<boolean>(false);
    const [coinsDisabled, setCoinsDisabled] = useState<boolean>(false);

    useEffect(() => {
        const unsubscribe = useUserStore.subscribe(
            state => state.coins,
            coins => {
                setCoinsDisabled(coins < boostData?.turbo?.coins);
            },
            {
                equalityFn: shallow,
                fireImmediately: true
            }
        );

        setTimerDisabled(dateGreaterThan(turboEndsAt));

        return () => unsubscribe();
    }, [boostData, turboEndsAt]);

    function onTimerEnds() {
        setTimerDisabled(dateGreaterThan(turboEndsAt));
    }

    return (
        <div className={styles.content}>
            <img className={styles.taskIcon} src={boostImgData.miningLg} alt="Paw"/>
            <h2 className={styles.title}>{t('mining')}</h2>
            <p className={styles.text}>{t('mining_desc')}</p>

            <div className={styles.priceWrapper}>
                <Flex className={styles.price} alignItems='center'>
                    <img src={boostImgData.coinIconLg} alt="Coin"/>
                    <span>{formatPrice(boostData?.turbo?.coins)}</span>
                </Flex>
            </div>

            {timerDisabled
                ?
                <button className={styles.startBtn} disabled={true}>
                    <Timer toDate={turboEndsAt} onTimerEnds={onTimerEnds}/>
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