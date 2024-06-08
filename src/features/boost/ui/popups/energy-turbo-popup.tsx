import React, {FC, useEffect, useState} from 'react';
import styles from "./popups.module.scss";
import {Flex} from "@chakra-ui/react";
import cl from "classnames";
import {t} from "i18next";
import {useUserStore} from "../../../../shared/model/user/store.ts";

interface IProps {
    onUpgrade: () => void;
}

export const EnergyTurboPopup: FC<IProps> = ({onUpgrade}) => {

    const energyTurboEndsAt = useUserStore(state => state.energy_turbo_at);
    const [timeDiff, setTimeDiff] = useState();

    useEffect(() => {

    }, []);

    function checkDisabled() {
        if (energyTurboEndsAt && timeDiff) {
            return timeDiff > 0;
        }
        return false;
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

            {checkDisabled()
                ?
                <button className={styles.startBtn} disabled={true}>{t('turbo_mining_active')}</button>
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