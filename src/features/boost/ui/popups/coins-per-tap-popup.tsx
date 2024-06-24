import React, {FC, useEffect, useMemo, useState} from 'react';
import styles from "./popups.module.scss";
import {Flex} from "@chakra-ui/react";
import cl from "classnames";
import {useUserStore} from "../../../../shared/model/user/store.ts";
import {formatPrice} from "../../../../shared/utils/other.ts";
import {shallow} from "zustand/shallow";
import {dateGreaterThan} from "../../../../shared/utils/date.ts";
import {Timer} from "../../../../shared/ui/timer/timer.tsx";
import {useBoostStore} from "../../model/store.ts";
import {ClaimBtn} from "../../../../shared/ui/claim-btn/claim-btn.tsx";
import {boostImgData} from "../../model/utils.ts";
import {useTranslation} from "react-i18next";

interface IProps {
    onUpgrade: () => void;
}

export const CoinsPerTapPopup: FC<IProps> = ({onUpgrade}) => {
    const {t} = useTranslation();
    const isSubmitLoading = useBoostStore(state => state.isSubmitLoading);

    const boostData = useUserStore(state => state.boost);
    const [coinsDisabled, setCoinsDisabled] = useState<boolean>(false);

    useEffect(() => {
        const unsubscribe = useUserStore.subscribe(
            state => state.coins,
            coins => {
                setCoinsDisabled(coins < boostData?.coins_per_tap?.coins);
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
            <img className={styles.taskIcon} src={boostImgData.coinLevel} alt="Paw"/>
            <h2 className={styles.title}>{t('coins_per_tap')}</h2>
            <p className={styles.text}>{t('coins_per_tap_desc')}</p>

            <div className={styles.priceWrapper}>
                <Flex className={styles.price} alignItems='center'>
                    <img src={boostImgData.coinIconLg} alt="Coin"/>
                    <span>{formatPrice(boostData?.coins_per_tap?.coins)}</span>
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