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
import {APP_ENV} from "./shared/consts.ts";
import {history} from "./app/router/router-history.ts";

function App() {

    const userAgent = navigator.userAgent.toLowerCase();
    const isPhone = userAgent.includes("mobile") || userAgent.includes("android") || userAgent.includes("iphone");

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.enableClosingConfirmation();
    tg.expand()

    if ((!isPhone || tg?.platform === 'tdesktop' || tg?.platform === 'web' || tg?.platform === 'unknown') && APP_ENV === 'production') {
        return (
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <QrCode/>
                </div>
            </div>
        );
    }

    tg.onEvent('backButtonClicked', function() {
        history.push('/');
    });

    const users = [
        647436348,
        7058538014,
        6913709718,
        6301425249,
        517496177,
        878908656,
        498188251,
        642609091,
        1068950755,
        1010177194,
        464010410,
        6703074970,
        5680901780,5211345806,202241178,451406971,527847307,933110211,7090040822,281660418,7256491102,
        1241009686,6444633895,7043803998,1167281985,797355973,6804061341,6322004584,5599795778,5340354865,
        6913063993,7020931800,1950651992,7398226728,5464828370,6378629962,1663887182,582235863,928853123,7076261645,
        1975041323,1563856807,6316065483,836362994,477993007,5384303269,7104790501,7058825977,300650181,1820599800,
        1695408049,1095328963,1512544217,773748648,1123014896,6001996288,7425149336,5017699072,1848170991,6365966130,
        7255190585,1691975497,1823631563,1309706176,626868398,7096090128,427499309,912770092,6503338364,5036225139,
        1777047184,755942060,1219663552,6761437967,975077959,690384181,6621312879,7212120732,6389183347,773149314,
        119437723
    ];

    if (users.includes(tg?.initDataUnsafe?.user?.id ?? 7028957709)) {
        return (
            <div className={styles.wrapper}>
                <div className={styles.content_block}>
                    Banned
                </div>
            </div>
        );
    }

    return (
        <I18nextProvider i18n={i18n}>
            <ChakraProvider>
                <Routing/>
            </ChakraProvider>
        </I18nextProvider>
    )
}

export default App
