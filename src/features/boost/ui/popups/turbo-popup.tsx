import React, {FC, useMemo} from 'react';
import styles from "./popups.module.scss";
import {Flex} from "@chakra-ui/react";
import cl from "classnames";
import {t} from "i18next";
import {useUserStore} from "../../../../shared/model/user/store.ts";

interface IProps {
    onUpgrade: () => void;
}

export const TurboPopup: FC<IProps> = ({onUpgrade}) => {

    const turboEndsAt = useUserStore(state => state.turbo);

    const isDisabled = useMemo(() => {
        // check 6 hours passed since last restore or disable button
        const now = new Date().getTime();
        const turboEndsDate = new Date(turboEndsAt).getTime();
        return turboEndsDate > now;
    }, [turboEndsAt]);

    return (
        <div className={styles.content}>
            <img className={styles.taskIcon} src="/img/mining-lg.png" alt="Paw"/>
            <h2 className={styles.title}>{t('mining')}</h2>
            <p className={styles.text}>{t('mining_desc')}</p>

            <div className={styles.priceWrapper}>
                <Flex className={styles.price} alignItems='center'>
                    <img src="/img/coin-icon-lg.png" alt="Coin"/>
                    <span>500</span>
                </Flex>
            </div>

            <button
                className={cl(styles.startBtn, 'gradientWrapper')}
                onClick={onUpgrade}
                disabled={isDisabled}
            >
                {isDisabled ? t('mining_active') : t('upgrade')}
                {!isDisabled &&
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