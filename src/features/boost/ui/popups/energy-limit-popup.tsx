import React, {FC} from 'react';
import styles from "./popups.module.scss";
import {Flex} from "@chakra-ui/react";
import cl from "classnames";
import {t} from "i18next";
import {useUserStore} from "../../../../shared/model/user/store.ts";
import {formatPrice} from "../../../../shared/utils/other.ts";

interface IProps {
    onUpgrade: (price: number) => void;
}

export const EnergyLimitPopup: FC<IProps> = ({onUpgrade}) => {

    function getUpgradePrice() {
        const price = 500;

        const userStore = useUserStore.getState();
        const userLevelEnergyLimit = userStore.level.energy_limit;

        const diff = userStore.energy_limit - userLevelEnergyLimit;
        if (diff > 0) {
            return price * (diff / 500 + 1);
        }
        return price;
    }

    return (
        <div className={styles.content}>
            <img className={styles.taskIcon} src="/img/bone-icon-lg.png" alt="Bone"/>
            <h2 className={styles.title}>{t('energy_limit')}</h2>
            <p className={styles.text}>{t('energy_limit_desc')}</p>

            <div className={styles.priceWrapper}>
                <Flex className={styles.price} alignItems='center'>
                    <img src="/img/coin-icon-lg.png" alt="Coin"/>
                    <span>{formatPrice(getUpgradePrice())}</span>
                </Flex>
            </div>

            <button
                className={cl(styles.startBtn, 'gradientWrapper')}
                onClick={() => onUpgrade(getUpgradePrice())}
            >
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