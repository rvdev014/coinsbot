import React, {useState} from 'react';
import styles from './styles.module.scss';
import {AbsoluteCenter, Text} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";

export const QrCode = () => {

    const { t } = useTranslation();

    const [copySuccess, setCopySuccess] = useState('');

    const copyUrl = async () => {
        try {
            await navigator.clipboard.writeText(import.meta.env.VITE_QRCODE);
            setCopySuccess(t('qr_copied'));
        } catch (e) {
            setCopySuccess(t('qr_failed'));
        }
    }

    return (
        <div className={styles.wrapper}>
            <AbsoluteCenter bg='' color='white' axis='both'>
                <div className={styles.qrcode_block}>
                    <Text>{t('play_on_your_mobile')}</Text>
                    <img className={styles.qrcode_img} src="https://ds1h6bsdosamj.cloudfront.net/img/qrcode.png" alt={t('qr_code')}/>

                    <div className={styles.qrcode_info}>
                        <Text onClick={copyUrl} className={styles.qrcode_copy}>
                            {copySuccess ? <span>{copySuccess}</span> : <span>{t('qr_copy_url')}</span>}
                        </Text>
                    </div>

                </div>
            </AbsoluteCenter>
        </div>
    );
};