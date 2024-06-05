import React, {FC, useMemo} from 'react';
import styles from "./styles.module.scss";
import {Popup} from "../../../shared/ui/popup/popup.tsx";
import {Flex} from "@chakra-ui/react";
import {useUserStore} from "../../../shared/model/user/store.ts";
import {generateTimeDiff} from "../../../shared/utils/date.ts";

interface IProps {
    open: boolean;
    onClose: () => void;
    onUpgrade: () => void;
}

export const MultitapPopup: FC<IProps> = ({open, onClose, onUpgrade}) => {

    const multiTapEndsAt = useUserStore(state => state.multi_tap);

    const isDisabled = useMemo(() => {
        // check 6 hours passed since last restore or disable button
        const now = new Date().getTime();
        const multiTapEndsDate = new Date(multiTapEndsAt).getTime();
        return multiTapEndsDate > now;
    }, [multiTapEndsAt]);

    return (
        <Popup isOpen={open} onClose={onClose}>
            <div className={styles.content}>
                <img className={styles.taskIcon} src="/img/multitap-lg.png" alt="Paw"/>
                <h2 className={styles.title}>Multitap</h2>
                <p className={styles.text}>x2 for coins per tap</p>

                <div className={styles.priceWrapper}>
                    <p className={styles.text}>+1 coin per tap</p>
                    <Flex className={styles.price} alignItems='center'>
                        <img src="/img/coin-icon-lg.png" alt="Coin"/>
                        <span>500</span>
                    </Flex>
                </div>

                <button
                    className={styles.startBtn}
                    onClick={onUpgrade}
                    disabled={isDisabled}
                >{isDisabled ? 'Multitap is active' : 'Upgrade'}</button>

            </div>
        </Popup>
    );
};