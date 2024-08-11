import React, {FC} from 'react';
import styles from "./style.module.scss";
import {Flex} from "@chakra-ui/react";
import {useUserStore} from "../../../shared/model/user/store.ts";
import {formatPrice} from "../../../shared/utils/other.ts";
import {ClaimBtn} from "../../../shared/ui/claim-btn/claim-btn.tsx";
import {boostImgData} from "../../boost/model/utils.ts";
import {useTranslation} from "react-i18next";

interface IProps {
    onClosePopup: () => void;
}

export const NewCoinPopup: FC<IProps> = ({onClosePopup}) => {
    const {t} = useTranslation();

    return (

        <div className={styles.content}>
            <img
                className={styles.icon}
                src={`/img/puzzles/new-coin-lg.png`}
                alt="Task tg"
            />
            <h2 className={styles.title} dangerouslySetInnerHTML={{ __html: t('new_coin_title') }}></h2>
            <p className={styles.text}>
                {t('new_coin_desc_1')}
            </p>
            <p className={styles.text} style={{marginBottom: '36px'}}>
                {t('new_coin_desc_2')}
            </p>

            <ClaimBtn isAds={false} onClick={onClosePopup}>
                {t('open_puzzle')}
            </ClaimBtn>
        </div>

    );
};