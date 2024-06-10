import React from 'react'
import Routing from "./app/routing.tsx";
import {ChakraProvider} from '@chakra-ui/react'
import './App.scss'
import styles from "./widgets/main-layout/ui/styles.module.scss";
import {QrCode} from "./pages/qrCode";
import {I18nextProvider} from "react-i18next";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import i18n from "./i18n";

function App() {

    const userAgent = navigator.userAgent.toLowerCase();
    const isPhone = userAgent.includes("mobile") || userAgent.includes("android") || userAgent.includes("iphone");

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const tg = window.Telegram.WebApp;

    // if (!isPhone || tg?.platform === 'tdesktop' || tg?.platform === 'web' || tg?.platform === 'unknown') {
    //     return (
    //         <div className={styles.wrapper}>
    //             <div className={styles.content}>
    //                 <QrCode/>
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <I18nextProvider i18n={i18n}>
            <ChakraProvider>
                <Routing/>
            </ChakraProvider>
        </I18nextProvider>
    )
}

export default App
