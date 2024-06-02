import React from 'react'
import Routing from "./app/routing.tsx";
import { ChakraProvider } from '@chakra-ui/react'
import './App.scss'
import styles from "./widgets/main-layout/ui/styles.module.scss";
import {QrCode} from "./pages/qrCode";

function App() {

    // const userAgent = navigator.userAgent.toLowerCase();
    // const isPhone = userAgent.includes("mobile") || userAgent.includes("android") || userAgent.includes("iphone");
    //
    // if (!isPhone) {
    //     return (
    //         <div className={styles.wrapper}>
    //             <div className={styles.content}>
    //                 <QrCode/>
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <ChakraProvider>
            <Routing/>
        </ChakraProvider>
    )
}

export default App
