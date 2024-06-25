import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import {Outlet, useLocation} from "react-router-dom";
import {useAppStore} from "../../../shared/model/app-store.ts";
import {BottomMenu} from "../../bottom-menu";
import {Loader} from "../../../shared/ui/loader/loader.tsx";
import cl from "classnames";
import {motion, useAnimation} from "framer-motion";

export const MainLayout = () => {

    const isAppLoading = useAppStore(state => state.isAppLoading)
    const initTelegram = useAppStore(state => state.initTelegram)
    const scrollableRef = React.useRef<any>(null)
    const stateRef = React.useRef<any>({
        lastY: 0,
        lastMoveTime: 0,
        velocity: 0,
    });

    useEffect(() => {
        initTelegram();
    }, []);

    const location = useLocation();

    useEffect(() => {
        // check location is not main page (/)
        if (location.pathname !== '/') {
            useAppStore.getState().webApp?.BackButton.show();
        } else {
            useAppStore.getState().webApp?.BackButton.hide();
        }
    }, [location]);

    if (isAppLoading) {
        return (
            <div className={styles.bg}>
                <Loader withText={true} size='xl' styles={{marginTop: '0'}}/>
            </div>
        )
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
