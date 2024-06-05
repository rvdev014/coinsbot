import React, {FC} from 'react';
import styles from "./styles.module.scss";
import {Popup} from "../../../shared/ui/popup/popup.tsx";
import {Flex} from "@chakra-ui/react";
import {formatPrice} from "../../../shared/utils/other.ts";
import {useUserStore} from "../../../shared/model/user/store.ts";

interface IProps {
    open: boolean;
    onClose: () => void;
    onUpgrade: (price: number) => void;
}

export const EnergyLimitPopup: FC<IProps> = ({open, onClose, onUpgrade}) => {

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
        <Popup isOpen={open} onClose={onClose}>
            <div className={styles.content}>
                <img className={styles.taskIcon} src="/img/bone-icon-lg.png" alt="Bone"/>
                <h2 className={styles.title}>Energy limit</h2>
                <p className={styles.text}>+500 for energy limit</p>

                <div className={styles.priceWrapper}>
                    <Flex className={styles.price} alignItems='center'>
                        <img src="/img/coin-icon-lg.png" alt="Coin"/>
                        <span>{formatPrice(getUpgradePrice())}</span>
                    </Flex>
                </div>

                <button
                    className={styles.startBtn}
                    onClick={() => onUpgrade(getUpgradePrice())}
                >Upgrade</button>

            </div>
        </Popup>
    );
};