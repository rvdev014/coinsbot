import React, {FC, useEffect, useState} from 'react';
import styles from "./popups.module.scss";
import {Flex} from "@chakra-ui/react";
import cl from "classnames";
import {useUserStore} from "../../../../shared/model/user/store.ts";
import {Timer} from "../../../../shared/ui/timer/timer.tsx";
import {dateGreaterThan} from "../../../../shared/utils/date.ts";
import {shallow} from "zustand/shallow";
import {useBoostStore} from "../../model/store.ts";
import {ClaimBtn} from "../../../../shared/ui/claim-btn/claim-btn.tsx";
import {boostImgData} from "../../model/utils.ts";
import {useTranslation} from "react-i18next";

interface IProps {
    onUpgrade: () => void;
}

export const EnergyTurboPopup: FC<IProps> = ({onUpgrade}) => {
    const {t} = useTranslation();
    const isSubmitLoading = useBoostStore(state => state.isSubmitLoading);

    const boostData = useUserStore(state => state.boost);
    const energyTurboEndsAt = useUserStore(state => state.energy_turbo_at);
    const [timerDisabled, setTimerDisabled] = useState<boolean>(false);
    const [coinsDisabled, setCoinsDisabled] = useState<boolean>(false);

    useEffect(() => {
        const unsubscribe = useUserStore.subscribe(
            state => state.coins,
            coins => {
                setCoinsDisabled(coins < boostData?.energy_turbo?.coins);
            },
            {
                equalityFn: shallow,
                fireImmediately: true
            }
        );

        console.log(energyTurboEndsAt, dateGreaterThan(energyTurboEndsAt))

        setTimerDisabled(dateGreaterThan(energyTurboEndsAt));

        return () => unsubscribe();
    }, [boostData, energyTurboEndsAt]);

    function onTimerEnds() {
        setTimerDisabled(dateGreaterThan(energyTurboEndsAt));
    }

    return (
        <div className={styles.content}>

            <img className={styles.taskIcon} src={boostImgData.turboLg} alt="Paw"/>
            <h2 className={styles.title}>{t('turbo_mining')}</h2>
            <p className={styles.text}>{t('turbo_mining_desc')}</p>

            <div className={styles.priceWrapper}>
                <Flex className={styles.price} alignItems='center'>
                    <img src={boostImgData.coinIconLg} alt="Coin"/>
                    <span>{boostData?.energy_turbo?.coins}</span>
                </Flex>
            </div>

            {timerDisabled
                ?
                <button className={styles.startBtn} disabled={true}>
                    <Timer toDate={energyTurboEndsAt} onTimerEnds={onTimerEnds}/>
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