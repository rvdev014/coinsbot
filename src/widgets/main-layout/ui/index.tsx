import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import {Outlet} from "react-router-dom";
import {useAppStore} from "../../../shared/model/app-store.ts";
import {UI_COLOR} from "../../../shared/consts.ts";
import {Spinner} from "@chakra-ui/react";
import {BottomMenu} from "../../bottom-menu";

export const MainLayout = () => {

    const isAppLoading = useAppStore(state => state.isAppLoading)
    const initTelegram = useAppStore(state => state.initTelegram)

    useEffect(() => {
        initTelegram();
    }, [])

    if (isAppLoading) {
        return (
            <div className='AppLoader'>
                <Spinner color={UI_COLOR} size='xl'/>
            </div>
        )
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