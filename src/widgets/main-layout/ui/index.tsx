import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import {Outlet, useLocation} from "react-router-dom";
import {useAppStore} from "../../../shared/model/app-store.ts";
import {BottomMenu} from "../../bottom-menu";
import {Loader} from "../../../shared/ui/loader/loader.tsx";
import cl from "classnames";
import useEventListener from "../../../shared/hooks/useEventListener.ts";

export const MainLayout = () => {

    const isAppLoading = useAppStore(state => state.isAppLoading)
    const initTelegram = useAppStore(state => state.initTelegram)
    const scrollableRef = React.useRef<any>(null)

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

    const handleTouchStart = (e: any) => {
        const scrollable = scrollableRef.current;
        scrollable.startY = e.touches[0].pageY;
        scrollable.startScrollTop = scrollable.scrollTop;
    };

    const handleTouchMove = (e: any) => {

        if (e.target.closest('#tapper')) return;

        const scrollable = scrollableRef.current;
        const distance = e.touches[0].pageY - scrollable.startY;
        const isTop = scrollable.scrollTop <= 0;
        const isBottom = (scrollable.scrollHeight - scrollable.scrollTop - 1) <= scrollable.clientHeight;

        if ((isTop && distance > 0) || (isBottom && distance < 0)) {
            // e.preventDefault();
            scrollable.style.transform = `translateY(${distance / 16}px)`;
        }
    };

    const handleTouchEnd = () => {
        const scrollable = scrollableRef.current;
        scrollable.style.transition = 'transform 0.3s ease';
        scrollable.style.transform = 'translateY(0px)';
        setTimeout(() => {
            scrollable.style.transition = '';
        }, 300);
    };

    if (isAppLoading) {
        return (
            <div className={styles.bg}>
                <Loader withText={true} size='xl' styles={{marginTop: '0'}}/>
            </div>
        )
    }

    return (
        <div
            id='layoutWrapper'
            className={cl(styles.wrapper)}
            // ref={scrollableRef}
        >
            <div
                className={cl(styles.content, 'scrollable')}
                ref={scrollableRef}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <Outlet/>
            </div>
            <BottomMenu/>
        </div>
    );
};