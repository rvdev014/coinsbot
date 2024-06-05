import React, {FC} from 'react';
import styles from "./styles.module.scss";
import {Flex} from "@chakra-ui/react";
import {Popup} from "../../../shared/ui/popup/popup.tsx";
import cl from 'classnames';
import {useEarnStore} from "../../../shared/model/earn/store.ts";
import {formatPrice} from "../../../shared/utils/other.ts";
import {useUserStore} from "../../../shared/model/user/store.ts";
import {Loader} from "../../../shared/ui/loader/loader.tsx";
import {IBonus} from "../../../shared/model/earn/store-types.ts";

interface IProps {
    isOpen: boolean;
    bonuses: IBonus[] | null;
    onClose: () => void;
}

export const DailyPopup: FC<IProps> = ({isOpen, onClose, bonuses}) => {

    const userDayBonus = useUserStore(state => state.day_bonus);
    const isLoading = useEarnStore(state => state.isLoading);
    const isBonusesLoading = useEarnStore(state => state.isBonusesLoading);
    const activeDayBonus = useEarnStore(state => state.active_day_bonus);
    const onClaimClick = useEarnStore(state => state.onClaimClick);
    const isClaimLoading = useEarnStore(state => state.isClaimLoading);

    return (
        <Popup isOpen={isOpen} onClose={onClose}>


            <div className={styles.content}>
                <h2 className={styles.title}>Daily reward</h2>
                <p className={styles.text}>
                    Pick up coins for logging into the game daily without skipping. The “Pick up” button must be
                    pressed
                    daily, otherwise the day count will start again
                </p>

                {isBonusesLoading
                    ? <Loader/>
                    : (
                        <div className={styles.daysList}>
                            {bonuses?.map((bonus, index) => {

                                const isComplete = userDayBonus ? (userDayBonus.day >= bonus.day) : false;
                                const isActive = activeDayBonus ? (activeDayBonus.day === bonus.day) : false;

                                return (
                                    <div
                                        key={bonus.id}
                                        className={cl(
                                            styles.dayItem,
                                            isComplete ? styles.complete : '',
                                            isActive ? styles.active : ''
                                        )}
                                    >
                                        <p className={styles.dayItem_text}>Day {index + 1}</p>
                                        <Flex className={styles.dayItem_info} alignItems='center'
                                              justifyContent='center'>
                                            <img
                                                src={bonus.img}
                                                alt="Coin"
                                                onError={(e) => e.currentTarget.src = '/img/coin-icon.png'}
                                            />
                                            <span>{formatPrice(bonus.coins)}</span>
                                        </Flex>
                                    </div>
                                );
                            })}
                        </div>
                    )}


                {!activeDayBonus
                    ?
                    <button
                        className={styles.claimBtn}
                        onClick={onClaimClick}
                        disabled={true}
                    >Not today.</button>
                    :
                    <button
                        className={styles.claimBtn}
                        onClick={onClaimClick}
                        disabled={isLoading || isClaimLoading}
                    >{isClaimLoading ? 'Claiming...' : 'Claim'}</button>}

            </div>

        </Popup>
    );
};