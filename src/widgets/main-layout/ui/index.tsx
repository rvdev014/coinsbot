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

    const handleTouchStart = (e: any) => {
        const state = stateRef.current;

        state.isTouching = true;
        state.startY = e.touches[0].pageY;
        state.scrollTop = scrollableRef.current.scrollTop;
        state.lastY = e.touches[0].pageY;
        state.lastMoveTime = Date.now();
        state.velocity = 0;
    };

    const handleTouchMove = (e: any) => {

        // if (e.target.closest('#tapper')) return;

        const scrollable = scrollableRef.current;
        const state = stateRef.current;

        const currentY = e.touches[0].pageY;
        const distance = currentY - state.startY;
        const currentTime = Date.now();
        const deltaTime = currentTime - state.lastMoveTime;

        const isTop = scrollable.scrollTop <= 0;
        const isBottom = (scrollable.scrollHeight - scrollable.scrollTop - 1) <= scrollable.clientHeight;

        if ((isTop && distance > 0) || (isBottom && distance < 0)) {
            scrollable.style.transform = `translateY(${distance / 16}px)`;
        }

        scrollableRef.current.scrollTop = state.scrollTop - distance;

        if (deltaTime > 0) {
            state.velocity = (currentY - state.lastY) / deltaTime;
        }

        state.lastY = currentY;
        state.lastMoveTime = currentTime;
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