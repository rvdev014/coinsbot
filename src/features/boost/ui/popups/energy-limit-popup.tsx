import React, {FC, useEffect, useState} from 'react';
import styles from "./popups.module.scss";
import {Flex} from "@chakra-ui/react";
import cl from "classnames";
import {useUserStore} from "../../../../shared/model/user/store.ts";
import {formatPrice} from "../../../../shared/utils/other.ts";
import {shallow} from "zustand/shallow";
import {dateGreaterThan} from "../../../../shared/utils/date.ts";
import {useBoostStore} from "../../model/store.ts";
import {ClaimBtn} from "../../../../shared/ui/claim-btn/claim-btn.tsx";
import {boostImgData} from "../../model/utils.ts";
import {useTranslation} from "react-i18next";

interface IProps {
    onUpgrade: () => void;
}

export const EnergyLimitPopup: FC<IProps> = ({onUpgrade}) => {
    const {t} = useTranslation();
    const isSubmitLoading = useBoostStore(state => state.isSubmitLoading);

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
            <img className={styles.taskIcon} src={boostImgData.boneLg} alt="Bone"/>
            <h2 className={styles.title}>{t('energy_limit')}</h2>
            <p className={styles.text}>{t('energy_limit_desc')}</p>

            <div className={styles.priceWrapper}>
                <Flex className={styles.price} alignItems='center'>
                    <img src={boostImgData.coinIconLg} alt="Coin"/>
                    <span>{formatPrice(boostData?.energy_limit?.coins)}</span>
                </Flex>
            </div>

            {coinsDisabled
                ?
                <button className={cl(styles.startBtn, styles.disabled)} disabled={true}>
                    {t('not_enough_coins')}
                </button>
                :
                <ClaimBtn onClick={onUpgrade} loading={isSubmitLoading}>
                    {t('upgrade')}
                </ClaimBtn>
            }

        </div>
    );
};