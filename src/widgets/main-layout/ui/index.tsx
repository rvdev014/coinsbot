import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import {Outlet, useLocation} from "react-router-dom";
import {useAppStore} from "../../../shared/model/app-store.ts";
import {BottomMenu} from "../../bottom-menu";
import {Loader} from "../../../shared/ui/loader/loader.tsx";

export const MainLayout = () => {

    const isAppLoading = useAppStore(state => state.isAppLoading)
    const initTelegram = useAppStore(state => state.initTelegram)
    const layoutRef = React.useRef<HTMLDivElement>(null)

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

    useEffect(() => {
        if (!layoutRef.current) return;

        const layout = layoutRef.current;
        console.log('layout', layout)

        function scrollHandler() {
            console.log('layout.scrollTop', layout.scrollTop)
            if (layout.scrollTop === 0) {
                layout.scrollTop = 1; // Prevent bounce effect when reaching the top
            }
            if (layout.scrollTop + layout.offsetHeight === layout.scrollHeight) {
                layout.scrollTop = layout.scrollTop - 1; // Prevent bounce effect when reaching the bottom
            }
        }

        /*layout.addEventListener('scroll', scrollHandler);

        return () => {
            layout.removeEventListener('scroll', scrollHandler);
        };*/
    }, [layoutRef.current]);

    if (isAppLoading) {
        return <Loader withText={true} size='xl' styles={{marginTop: '30px'}}/>
    }

    return (
        <div id='layoutWrapper' className={styles.wrapper} ref={layoutRef}>
            <div className={styles.content}>
                <Outlet/>
            </div>
            <BottomMenu/>
        </div>
    );
};