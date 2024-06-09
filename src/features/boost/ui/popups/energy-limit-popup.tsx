import React, {FC, useEffect, useState} from 'react';
import styles from "./popups.module.scss";
import {Flex} from "@chakra-ui/react";
import cl from "classnames";
import {t} from "i18next";
import {useUserStore} from "../../../../shared/model/user/store.ts";
import {formatPrice} from "../../../../shared/utils/other.ts";
import {shallow} from "zustand/shallow";
import {dateGreaterThan} from "../../../../shared/utils/date.ts";

interface IProps {
    onUpgrade: () => void;
}

export const EnergyLimitPopup: FC<IProps> = ({onUpgrade}) => {

    const boostData = useUserStore(state => state.boost);
    const [coinsDisabled, setCoinsDisabled] = useState<boolean>(false);

    useEffect(() => {
        const unsubscribe = useUserStore.subscribe(
            state => state.coins,
            coins => {
                setCoinsDisabled(coins < boostData?.energy_limit?.coins);
            },
            {
                equalityFn: shallow,
                fireImmediately: true
            }
        );
        return () => unsubscribe();
    }, [boostData]);

    return (
        <div className={styles.content}>
            <img className={styles.taskIcon} src="/img/bone-icon-lg.png" alt="Bone"/>
            <h2 className={styles.title}>{t('energy_limit')}</h2>
            <p className={styles.text}>{t('energy_limit_desc')}</p>

            <div className={styles.priceWrapper}>
                <Flex className={styles.price} alignItems='center'>
                    <img src="/img/coin-icon-lg.png" alt="Coin"/>
                    <span>{formatPrice(boostData?.energy_limit?.coins)}</span>
                </Flex>
            </div>

            {coinsDisabled
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