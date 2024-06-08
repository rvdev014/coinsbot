import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import {Outlet} from "react-router-dom";
import {useAppStore} from "../../../shared/model/app-store.ts";
import {BottomMenu} from "../../bottom-menu";
import {Loader} from "../../../shared/ui/loader/loader.tsx";
import {useEarnStore} from "../../../shared/model/earn/store.ts";

export const MainLayout = () => {

    const isAppLoading = useAppStore(state => state.isAppLoading)
    const initTelegram = useAppStore(state => state.initTelegram)

    useEffect(() => {

        function ensureDocumentIsScrollable() {
            const isScrollable =
                document.documentElement.scrollHeight > window.innerHeight;
            if (!isScrollable) {
                document.documentElement.style.setProperty(
                    "height",
                    "calc(100vh + 1px)",
                    "important"
                );
            }
        }
        function preventCollapse() {
            if (window.scrollY === 0) {
                window.scrollTo(0, 1);
            }
        }

        const scrollableElement = document.querySelector("#layoutWrapper");
        scrollableElement?.addEventListener("touchstart", preventCollapse);

        window.addEventListener("load", ensureDocumentIsScrollable);

        initTelegram();

        return () => {
            scrollableElement?.removeEventListener("touchstart", preventCollapse);
            window.removeEventListener("load", ensureDocumentIsScrollable);
        };
    }, [])

    if (isAppLoading) {
        return <Loader withText={true} size='xl'/>
    }

    return (
        <div id='layoutWrapper' className={styles.wrapper}>
            <div className={styles.content}>
                <Outlet/>
            </div>
            <BottomMenu/>
        </div>
    );
};