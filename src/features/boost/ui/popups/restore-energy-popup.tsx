import React, {FC, useEffect, useMemo, useState} from 'react';
import styles from "./popups.module.scss";
import {Flex} from "@chakra-ui/react";
import cl from "classnames";
import {t} from "i18next";
import {useUserStore} from "../../../../shared/model/user/store.ts";
import {dateGreaterThan} from "../../../../shared/utils/date.ts";
import {Timer} from "../../../../shared/ui/timer/timer.tsx";
import {ClaimBtn} from "../../../../shared/ui/claim-btn/claim-btn.tsx";
import {useBoostStore} from "../../model/store.ts";
import {boostImgData} from "../../model/utils.ts";

interface IProps {
    onUpgrade: () => void;
}

export const RestoreEnergyPopup: FC<IProps> = ({onUpgrade}) => {

    // const [disabled, setDisabled] = useState<boolean>(false);
    const isSubmitLoading = useBoostStore(state => state.isSubmitLoading);
    const isClaimDisabled = useBoostStore(state => state.isRestoreEnergyClaimDisabled);
    const restoreEnergyAt = useUserStore(state => state.restore_energy_at);
    const restoreEnergyEndsAt = useMemo(() => {
        const date = new Date(restoreEnergyAt);
        date.setHours(date.getHours() + 6);
        return date;
    }, [restoreEnergyAt]);

    useEffect(() => {
        useBoostStore.getState().checkRestoreEnergyClaimDisabled();
    }, []);

    function onTimerEnds() {
        useBoostStore.getState().checkRestoreEnergyClaimDisabled();
    }

    return (
        <div className={styles.content}>
            <img className={styles.taskIcon} src={boostImgData.pawLg} alt="Paw"/>
            <h2 className={styles.title}>{t('full_energy')}</h2>
            <p className={styles.text}>
                {t('full_energy_desc')}
            </p>

            <div className={styles.priceWrapper}>
                <Flex className={styles.price} alignItems='center'>
                    <img src={boostImgData.coinIconLg} alt="Coin"/>
                    <span>{t('free')}</span>
                </Flex>
            </div>

            <ClaimBtn
                disabled={isClaimDisabled}
                disabledContent={<Timer toDate={restoreEnergyEndsAt} onTimerEnds={onTimerEnds}/>}
                loading={isSubmitLoading}
                onClick={onUpgrade}
            >
                {t('upgrade')}
            </ClaimBtn>

            {/*{disabled
                ?
                <button className={styles.startBtn} disabled={true}>
                    <Timer toDate={restoreEnergyEndsAt} onTimerEnds={onTimerEnds}/>
                </button>
                :
                <button className={cl(styles.startBtn, 'gradientWrapper')} onClick={onUpgrade}>
                    {t('upgrade')}
                    <span
                        className='gradient'
                        style={{
                            boxShadow: `0 0 50px 50px rgba(153, 214, 23, 0.61)`,
                            bottom: '-30px'
                        }}
                    />
                </button>
            }*/}

        </div>
    );
};
