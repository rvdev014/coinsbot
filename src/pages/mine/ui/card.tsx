import React, {FC} from 'react';
import styles from './styles.module.scss'
import {IMineCard} from "../../../shared/model/mine/store-types";
import {useTranslation} from "react-i18next";
import {formatNumber, formatPrice} from "../../../shared/utils/other";
import cl from "classnames";

interface IProps {
    card: IMineCard;
    disabled: null | { type: string, description?: string };
    onClick: (card: IMineCard) => void;
}

export const Card: FC<IProps> = ({card, disabled, onClick}) => {
    const {t} = useTranslation()

    function renderFooter() {
        if (disabled?.type === 'card') {
            return <p className={styles.disabledText}>{disabled.description}</p>
        }

        if (disabled?.type === 'invite') {
            return <p className={styles.disabledText}>+ {card.type_value} {t('friends')}</p>
        }

        if (disabled?.type === 'max_level') {
            return <p className={styles.disabledText}>{t('max_level')}</p>
        }

        return (
            <div className={styles.cardCost}>
                <img src="/img/coin-level.png" alt="coin"/>
                <span>{formatNumber(card.next_price ?? card.price)}</span>
            </div>
        );
    }

    const isDisable = disabled?.type && disabled?.type !== 'task';

    return (
        <div className={cl(styles.card, isDisable && styles.disabled)} onClick={() => onClick(card)}>

            <div className={styles.cardTop}>
                <div className={styles.cardImg}>
                    <img src={`/img/cards/card-${card.id}.png`} alt={`card-${card.id}`} />
                    {isDisable &&
                        <div className={styles.lockBackdrop}>
                            <img className={styles.lock} src="/img/puzzles/lock.png" alt="Lock"/>
                        </div>}
                </div>
                <div className={styles.cardInfo}>
                    <h4 className={styles.title}>{card.title}</h4>
                    <p className={styles.reward}>{t('coins_per_hour')}</p>
                    <div className={styles.cardCost}>
                        <img src="/img/puzzles/new-coin-icon.png" alt="coin"/>
                        <span>+{formatPrice(card.next_profit ?? card.profit)} {t('coins_per_hour')}</span>
                    </div>
                </div>
            </div>

            <hr/>

            <div className={styles.cardBottom}>
                <p className={styles.cardLevel}>lvl {card.level ?? 0}</p>
                {renderFooter()}
            </div>

        </div>
    );
};