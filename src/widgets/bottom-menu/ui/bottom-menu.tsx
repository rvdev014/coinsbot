import React from 'react';
import styles from './styles.module.scss';
import {Flex, Text} from "@chakra-ui/react";
import {Link, useLocation} from "react-router-dom";
import {useUserStore} from "../../../shared/model/user/store.ts";
import {Settings} from "../../../features/settings";
import {useTranslation} from "react-i18next";

export const BottomMenu = () => {
    const {t} = useTranslation();
    const location = useLocation();

    const tasksActive = useUserStore(state => state.tasks_active);

    function isActive(path: string) {
        return location.pathname === path;
    }

    return (
        <div className={styles.bottomMenuWrapper}>
            <Flex className={styles.bottomMenu} justifyContent='space-between' gap='4px'>
                <Link to='/' className={`${styles.menuItem} ${isActive('/') ? styles.active : ''}`}>
                    <img src="/img/tap-icon.png" alt="Tap"/>
                    <Text className={styles.menuItem_text}>{t('tap')}</Text>
                </Link>
                <Link to='/tasks' className={`${styles.menuItem} ${styles.menuItem_task} ${isActive('/tasks') ? styles.active : ''}`}>
                    {tasksActive && <span/>}
                    <img src="/img/task-icon.png" alt="Tap"/>
                    <Text className={styles.menuItem_text}>
                        {t('tasks')}
                    </Text>
                </Link>
                <Link to='/friends' className={`${styles.menuItem} ${isActive('/friends') ? styles.active : ''}`}>
                    <img src="/img/frens-icon.png" alt="Tap"/>
                    <Text className={styles.menuItem_text}>{t('frens')}</Text>
                </Link>
                <div className={styles.settingsItem}>
                    <Settings/>
                </div>
            </Flex>
        </div>
    );
};
