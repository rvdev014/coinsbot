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
import {ClaimBtn} from "../../../shared/ui/claim-btn/claim-btn.tsx";

interface IProps {
    bonuses: IBonus[] | null;
}

export const DailyPopup: FC<IProps> = ({bonuses}) => {

    const userDayBonus = useUserStore(state => state.day_bonus);
    const isBonusesLoading = useEarnStore(state => state.isBonusesLoading);
    const activeDayBonus = useEarnStore(state => state.active_day_bonus);
    const onClaimClick = useEarnStore(state => state.onClaimClick);
    const isSubmitLoading = useEarnStore(state => state.isSubmitLoading);

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

                            const isActive = activeDayBonus ? (activeDayBonus.day === bonus.day) : false;
                            let isComplete = userDayBonus ? (userDayBonus.day >= bonus.day) : false;
                            if (isDayBonusLast && activeDayBonus) {
                                isComplete = false;
                            }

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
                                            src='https://ds1h6bsdosamj.cloudfront.net/img/coin-level.png'
                                            alt="Coin"
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

            <ClaimBtn
                disabled={!activeDayBonus}
                disabledContent={t('not_today')}
                loading={isBonusesLoading || isSubmitLoading}
                onClick={onClaimClick}
            >
                {t('claim')}
            </ClaimBtn>
        </div>
    );
};