import React, {FC} from 'react';
import styles from "./styles.module.scss";
import {Flex} from "@chakra-ui/react";
import {formatPrice} from "../../../shared/utils/other.ts";
import {ClaimBtn} from "../../../shared/ui/claim-btn/claim-btn.tsx";
import {earnImgData} from "../../../shared/model/earn/utils.ts";
import {useTranslation} from "react-i18next";
import {IMineCard} from "../../../shared/model/mine/store-types";
import {useMineStore} from "../../../shared/model/mine/store";

interface IProps {
    card: IMineCard | null;
    onSubmit: (card: IMineCard) => void;
}

export const CardPopup: FC<IProps> = ({card, onSubmit}) => {
    const {t} = useTranslation();
    const isLoadingClaim = useMineStore(state => state.isLoadingClaim);

    if (!card) return null;

    return (
        <div className={styles.content}>
            <img
                className={styles.icon}
                src={`/img/cards/card-${card.id}.png`}
                alt={`card-${card.id}`}
            />
            <h2 className={styles.title}>{card.title}</h2>
            <p className={styles.text}>
                {card?.desc ?? t('card_desc')}
            </p>

            <div className={styles.profitWrapper}>
                <p className={styles.profitLabel}>Profit per hour</p>
                <Flex className={styles.profit} alignItems='center'>
                    <img src={earnImgData.coinIconLg} alt="Coin"/>
                    <span>+{formatPrice(card.next_profit ?? card.profit)}</span>
                </Flex>
            </div>

            <Flex className={styles.price} alignItems='center'>
                <img src={earnImgData.coinIconLg} alt="Coin"/>
                <span>{formatPrice(card.next_price ?? card.price)}</span>
            </Flex>

            <ClaimBtn isAds={false} loading={isLoadingClaim} onClick={() => onSubmit(card!)}>
                {t('claim')}
            </ClaimBtn>
        </div>
    );
};