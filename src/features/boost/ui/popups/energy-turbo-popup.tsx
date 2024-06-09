import React, {FC, useEffect, useState} from 'react';
import styles from "./popups.module.scss";
import {Flex} from "@chakra-ui/react";
import cl from "classnames";
import {t} from "i18next";
import {useUserStore} from "../../../../shared/model/user/store.ts";
import {Timer} from "../../../../shared/ui/timer/timer.tsx";
import {dateGreaterThan} from "../../../../shared/utils/date.ts";

interface IProps {
    onUpgrade: () => void;
}

export const EnergyTurboPopup: FC<IProps> = ({onUpgrade}) => {

    const energyTurboEndsAt = useUserStore(state => state.energy_turbo_at);
    const [disabled, setDisabled] = useState<boolean>(false);

    useEffect(() => {
        setDisabled(dateGreaterThan(energyTurboEndsAt));
    }, []);

    function onTimerEnds() {
        setDisabled(dateGreaterThan(energyTurboEndsAt));
    }

    return (
        <div className={styles.content}>

            <img className={styles.taskIcon} src="/img/turbo-lg.png" alt="Paw"/>
            <h2 className={styles.title}>{t('turbo_mining')}</h2>
            <p className={styles.text}>{t('turbo_mining_desc')}</p>

            <div className={styles.priceWrapper}>
                <Flex className={styles.price} alignItems='center'>
                    <img src="/img/coin-icon-lg.png" alt="Coin"/>
                    <span>500</span>
                </Flex>
            </div>

            {disabled
                ?
                <button className={styles.startBtn} disabled={true}>
                    <Timer toDate={energyTurboEndsAt} onTimerEnds={onTimerEnds}/>
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