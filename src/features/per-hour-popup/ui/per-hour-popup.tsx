import React, {FC} from 'react';
import styles from "./style.module.scss";
import {Flex} from "@chakra-ui/react";
import {useUserStore} from "../../../shared/model/user/store.ts";
import {formatPrice} from "../../../shared/utils/other.ts";
import {ClaimBtn} from "../../../shared/ui/claim-btn/claim-btn.tsx";
import {boostImgData} from "../../boost/model/utils.ts";
import {useTranslation} from "react-i18next";

interface IProps {
    onClaim: () => void;
}

export const PerHourPopup: FC<IProps> = ({onClaim}) => {
    const {t} = useTranslation();
    const collectedCoins = useUserStore(state => state.collected_coins);

    return (

        <div className={styles.content}>
            <div className={styles.priceWrapper}>
                <Flex className={styles.price} alignItems='center'>
                    <img src={boostImgData.coinIconLg} alt="Coin"/>
                    <span>{formatPrice(collectedCoins)}</span>
                </Flex>
                <p className={styles.text}>{t('coins_collected')}</p>
            </div>

            <ClaimBtn onClick={onClaim}>
                {t('thanks')} <span className={styles.heart}>❤️</span>
            </ClaimBtn>

        </div>

    );
};