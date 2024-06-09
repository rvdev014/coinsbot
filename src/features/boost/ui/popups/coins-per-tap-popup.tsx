import React, {FC, useMemo} from 'react';
import styles from "./popups.module.scss";
import {Flex} from "@chakra-ui/react";
import cl from "classnames";
import {t} from "i18next";
import {useUserStore} from "../../../../shared/model/user/store.ts";
import {formatPrice} from "../../../../shared/utils/other.ts";

interface IProps {
    onUpgrade: () => void;
}

export const CoinsPerTapPopup: FC<IProps> = ({onUpgrade}) => {

    const boostData = useUserStore(state => state.boost);

    return (

        <div className={styles.content}>
            <img className={styles.taskIcon} src="/img/coin-level.png" alt="Paw"/>
            <h2 className={styles.title}>{t('coins_per_tap')}</h2>
            <p className={styles.text}>{t('coins_per_tap_desc')}</p>

            <div className={styles.priceWrapper}>
                <Flex className={styles.price} alignItems='center'>
                    <img src="/img/coin-icon-lg.png" alt="Coin"/>
                    <span>{formatPrice(boostData?.coins_per_tap?.coins)}</span>
                </Flex>
            </div>

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

        </div>

    );
};