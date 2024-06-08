import React, {FC, useEffect, useMemo, useState} from 'react';
import styles from "./popups.module.scss";
import {Flex} from "@chakra-ui/react";
import cl from "classnames";
import {t} from "i18next";
import {useUserStore} from "../../../../shared/model/user/store.ts";
import {generateTimeDiff} from "../../../../shared/utils/date.ts";

interface IProps {
    onUpgrade: () => void;
}

export const RestoreEnergyPopup: FC<IProps> = ({onUpgrade}) => {

    const restoreEnergyAt = useUserStore(state => state.restore_energy_at);
    const [disableClaim, setDisableClaim] = useState(false);
    const [timer, setTimer] = useState<string>('');

    useEffect(() => {
        function checkClaim() {
            const time6hoursEarlier = new Date().getTime() - 6 * 60 * 60 * 1000;
            const restoreAtTime = new Date(restoreEnergyAt).getTime();
            setDisableClaim(restoreAtTime < time6hoursEarlier);
        }

        checkClaim();
        const interval = setInterval(checkClaim, 1000);

        return () => clearInterval(interval);
    }, []);

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

            <button
                className={cl(styles.startBtn, 'gradientWrapper')}
                onClick={onUpgrade}
                disabled={disableClaim}
            >
                {disableClaim ? generateTimeDiff(restoreEnergyAt) : t('upgrade')}

                {!disableClaim &&
                    <span
                        className='gradient'
                        style={{
                            boxShadow: `0 0 50px 50px rgba(153, 214, 23, 0.61)`,
                            bottom: '-30px'
                        }}
                    />}

            </button>

        </div>
    );
};