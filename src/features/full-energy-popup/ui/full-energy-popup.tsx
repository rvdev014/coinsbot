import React, {FC, memo, useCallback, useMemo} from 'react';
import styles from "./styles.module.scss";
import {Popup} from "../../../shared/ui/popup/popup.tsx";
import {Flex} from "@chakra-ui/react";
import {formatPrice} from "../../../shared/utils/other.ts";
import {useUserStore} from "../../../shared/model/user/store.ts";
import {generateTimeDiff} from "../../../shared/utils/date.ts";

interface IProps {
    open: boolean;
    onClose: () => void;
    onUpgrade: () => void;
}

export const FullEnergyPopup: FC<IProps> = ({open, onClose, onUpgrade}) => {

    const restoreEnergyAt = useUserStore(state => state.restore_energy_at);

    const isDisabled = useMemo(() => {
        // check 6 hours passed since last restore or disable button
        const now = new Date().getTime();
        const restoreDate = new Date(restoreEnergyAt).getTime();
        const diff = now - restoreDate;
        const hours = diff / 1000 / 60 / 60;
        console.log('hours < 6', hours < 6)
        return hours < 6;
    }, [restoreEnergyAt]);

    return (
        <Popup isOpen={open} onClose={onClose}>
            <div className={styles.content}>
                <img className={styles.taskIcon} src="/img/paw-lg.png" alt="Paw"/>
                <h2 className={styles.title}>Full energy</h2>
                <p className={styles.text}>
                    Fills the energy scale to maximum, without waiting
                </p>

                <div className={styles.priceWrapper}>
                    <Flex className={styles.price} alignItems='center'>
                        <img src="/img/coin-icon-lg.png" alt="Coin"/>
                        <span>Free</span>
                    </Flex>
                </div>

                <button
                    className={styles.startBtn}
                    onClick={onUpgrade}
                    disabled={isDisabled}
                >{isDisabled ? generateTimeDiff(restoreEnergyAt) : 'Upgrade'}</button>

            </div>
        </Popup>
    );
};