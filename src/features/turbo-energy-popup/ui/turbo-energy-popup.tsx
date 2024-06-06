import React, {FC, useMemo} from 'react';
import styles from "./styles.module.scss";
import {Popup} from "../../../shared/ui/popup/popup.tsx";
import {Flex} from "@chakra-ui/react";
import {useUserStore} from "../../../shared/model/user/store.ts";
import cl from "classnames";
import {t} from "i18next";

interface IProps {
    open: boolean;
    onClose: () => void;
    onUpgrade: () => void;
}

export const TurboEnergyPopup: FC<IProps> = ({open, onClose, onUpgrade}) => {

    const energyTurboEndsAt = useUserStore(state => state.energy_turbo_at);

    const isDisabled = useMemo(() => {
        const now = new Date().getTime();
        const energyTurboEndsDate = new Date(energyTurboEndsAt).getTime();
        return energyTurboEndsDate > now;
    }, [energyTurboEndsAt]);

    return (
        <Popup isOpen={open} onClose={onClose}>
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

                <button
                    className={cl(styles.startBtn, 'gradientWrapper')}
                    onClick={onUpgrade}
                    disabled={isDisabled}
                >
                    {isDisabled ? t('turbo_mining_active') : t('upgrade')}
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
        </Popup>
    );
};