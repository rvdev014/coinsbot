import React, {FC, useMemo} from 'react';
import styles from "./styles.module.scss";
import {Flex} from "@chakra-ui/react";
import cl from 'classnames';
import {useEarnStore} from "../../../shared/model/earn/store.ts";
import {formatPrice} from "../../../shared/utils/other.ts";
import {useUserStore} from "../../../shared/model/user/store.ts";
import {Loader} from "../../../shared/ui/loader/loader.tsx";
import {IBonus} from "../../../shared/model/earn/store-types.ts";
import {t} from "i18next";

interface IProps {
    bonuses: IBonus[] | null;
}

export const DailyPopup: FC<IProps> = ({bonuses}) => {

    const userDayBonus = useUserStore(state => state.day_bonus);
    const isBonusesLoading = useEarnStore(state => state.isBonusesLoading);
    const activeDayBonus = useEarnStore(state => state.active_day_bonus);
    const onClaimClick = useEarnStore(state => state.onClaimClick);
    const isClaimLoading = useEarnStore(state => state.isClaimLoading);

    const isDayBonusLast = useMemo(() => {
        if (!bonuses?.length || bonuses.length < 1 || !userDayBonus) return false;

        return userDayBonus.id === bonuses[bonuses.length - 1].id;
    }, [userDayBonus, bonuses]);

    return (
        <div className={styles.content}>
            <h2 className={styles.title}>{t('daily_reward')}</h2>
            <p className={styles.text}>
                {t('daily_reward_desc')}
            </p>

            {isBonusesLoading
                ? <Loader/>
                : (
                    <div className={styles.daysList}>
                        {bonuses?.map((bonus, index) => {

                            const isComplete = (!isDayBonusLast && userDayBonus) ? (userDayBonus.day >= bonus.day) : false;
                            const isActive = activeDayBonus ? (activeDayBonus.day === bonus.day) : false;

                            return (
                                <div
                                    key={bonus.id}
                                    className={cl(
                                        styles.dayItem,
                                        isComplete ? styles.complete : '',
                                        isActive ? styles.active : '',
                                        'gradientWrapper'
                                    )}
                                >
                                    <p className={styles.dayItem_text}>{t('day')} {index + 1}</p>
                                    <Flex className={styles.dayItem_info} alignItems='center'
                                          justifyContent='center'>
                                        <img
                                            src={bonus.img}
                                            alt="Coin"
                                            onError={(e) => e.currentTarget.src = '/img/coin-icon.png'}
                                        />
                                        <span>{formatPrice(bonus.coins)}</span>
                                    </Flex>
                                    {isComplete &&
                                        <span
                                            className='gradient'
                                            style={{boxShadow: `0 0 30px 20px rgba(153, 214, 23, 0.5)`}}
                                        />}
                                </div>
                            );
                        })}
                    </div>
                )}


            {!activeDayBonus
                ?
                <button className={styles.claimBtn} disabled={true}>{t('not_today')}</button>
                :
                <button
                    className={cl(styles.claimBtn, 'gradientWrapper')}
                    onClick={onClaimClick}
                    disabled={isBonusesLoading || isClaimLoading}
                >
                    {isClaimLoading ? '...' : t('claim')}
                    {!isBonusesLoading && !isClaimLoading &&
                        <span
                            className='gradient'
                            style={{boxShadow: `0 0 100px 50px rgba(153, 214, 23, 0.5)`}}
                        />}
                </button>}

        </div>
    );
};