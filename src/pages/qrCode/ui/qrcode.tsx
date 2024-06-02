import React, {useState} from 'react';
import styles from './styles.module.scss';
import {AbsoluteCenter, Text} from "@chakra-ui/react";

export const QrCode = () => {

    const [copySuccess, setCopySuccess] = useState('');

    const copyUrl = async () => {
        try {
            await navigator.clipboard.writeText(import.meta.env.VITE_QRCODE);
            setCopySuccess('Copied ✅');
        } catch (e) {
            setCopySuccess('Failed ❌');
        }
    }

    return (
        <div className={styles.wrapper}>
            <AbsoluteCenter bg='' color='white' axis='both'>
                <div className={styles.qrcode_block}>
                    <Text>Play on your mobile</Text>
                    <img className={styles.qrcode_img} src="/img/qrcode.png" alt="QR Code"/>

                    <div className={styles.qrcode_info}>
                        <Text onClick={copyUrl} className={styles.qrcode_copy}>
                            {copySuccess ? <span>{copySuccess}</span> : <span>Copy url</span>}
                        </Text>
                    </div>

                </div>
            </AbsoluteCenter>
        </div>
    );
};