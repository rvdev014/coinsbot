import React, {FC, useEffect, useState} from 'react';
import styles from "./popups.module.scss";
import {Flex} from "@chakra-ui/react";
import cl from "classnames";
import {t} from "i18next";
import {useUserStore} from "../../../../shared/model/user/store.ts";
import {Timer} from "../../../../shared/ui/timer/timer.tsx";
import {dateGreaterThan} from "../../../../shared/utils/date.ts";
import {shallow} from "zustand/shallow";

interface IProps {
    onUpgrade: () => void;
}

export const EnergyTurboPopup: FC<IProps> = ({onUpgrade}) => {

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

        setTimerDisabled(dateGreaterThan(energyTurboEndsAt));

        return () => unsubscribe();
    }, [boostData, energyTurboEndsAt]);

    function onTimerEnds() {
        setTimerDisabled(dateGreaterThan(energyTurboEndsAt));
    }

    return (
        <div className={styles.content}>

            <img className={styles.taskIcon} src="/img/turbo-lg.png" alt="Paw"/>
            <h2 className={styles.title}>{t('turbo_mining')}</h2>
            <p className={styles.text}>{t('turbo_mining_desc')}</p>

            <div className={styles.priceWrapper}>
                <Flex className={styles.price} alignItems='center'>
                    <img src="/img/coin-icon-lg.png" alt="Coin"/>
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
                <button className={cl(styles.startBtn, 'gradientWrapper')} onClick={onUpgrade}>
                    {t('upgrade')}
                    <span className='gradient'
                          style={{boxShadow: `0 0 50px 50px rgba(153, 214, 23, 0.61)`, bottom: '-30px'}}/>
                </button>
            }

        </div>
    );
};