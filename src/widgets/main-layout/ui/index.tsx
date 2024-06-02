import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import {Outlet} from "react-router-dom";
import {useAppStore} from "../../../shared/model/app-store.ts";
import {BottomMenu} from "../../bottom-menu";
import {Loader} from "../../../shared/ui/loader/loader.tsx";

export const MainLayout = () => {

    const isAppLoading = useAppStore(state => state.isAppLoading)
    const initTelegram = useAppStore(state => state.initTelegram)

    useEffect(() => {
        initTelegram();
    }, [])

    if (isAppLoading) {
        return <Loader withText={true}/>
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <Outlet/>
            </div>
            <BottomMenu/>
        </div>
    );
};