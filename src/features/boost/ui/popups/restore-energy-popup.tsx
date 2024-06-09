import React, {FC, useEffect, useMemo, useState} from 'react';
import styles from "./popups.module.scss";
import {Flex} from "@chakra-ui/react";
import cl from "classnames";
import {t} from "i18next";
import {useUserStore} from "../../../../shared/model/user/store.ts";
import {dateGreaterThan, generateTimeDiff} from "../../../../shared/utils/date.ts";
import {Timer} from "../../../../shared/ui/timer/timer.tsx";

interface IProps {
    onUpgrade: () => void;
}

export const RestoreEnergyPopup: FC<IProps> = ({onUpgrade}) => {

    const [disabled, setDisabled] = useState<boolean>(false);

    const restoreEnergyAt = useUserStore(state => state.restore_energy_at);
    const restoreEnergyEndsAt = useMemo(() => {
        const date = new Date(restoreEnergyAt);
        date.setHours(date.getHours() + 6);
        return date;
    }, [restoreEnergyAt]);

    useEffect(() => {
        setDisabled(dateGreaterThan(restoreEnergyEndsAt));
    }, []);

    function onTimerEnds() {
        setDisabled(dateGreaterThan(restoreEnergyEndsAt));
    }

    return (
        <div className={styles.content}>
            <img className={styles.taskIcon} src="/img/paw-lg.png" alt="Paw"/>
            <h2 className={styles.title}>{t('full_energy')}</h2>
            <p className={styles.text}>
                {t('full_energy_desc')}
            </p>

            <div className={styles.priceWrapper}>
                <Flex className={styles.price} alignItems='center'>
                    <img src="/img/coin-icon-lg.png" alt="Coin"/>
                    <span>{t('free')}</span>
                </Flex>
            </div>

            {disabled
                ?
                <button className={styles.startBtn} disabled={true}>
                    <Timer toDate={restoreEnergyEndsAt} onTimerEnds={onTimerEnds}/>
                </button>
                :
                <button className={cl(styles.startBtn, 'gradientWrapper')} onClick={onUpgrade}>
                    {t('upgrade')}
                    <span
                        className='gradient'
                        style={{
                            boxShadow: `0 0 50px 50px rgba(153, 214, 23, 0.61)`,
                            bottom: '-30px'
                        }}
                    />
                </button>
            }

        </div>
    );
};