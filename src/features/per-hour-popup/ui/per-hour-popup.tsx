import React, {FC} from 'react';
import styles from "./style.module.scss";
import {Flex} from "@chakra-ui/react";
import {t} from "i18next";
import {useUserStore} from "../../../shared/model/user/store.ts";
import {formatPrice} from "../../../shared/utils/other.ts";
import {ClaimBtn} from "../../../shared/ui/claim-btn/claim-btn.tsx";
import {boostImgData} from "../../boost/model/utils.ts";

interface IProps {
    onClaim: () => void;
}

export const PerHourPopup: FC<IProps> = ({onClaim}) => {

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
                {t('thanks')}
            </ClaimBtn>

        </div>

    );
};