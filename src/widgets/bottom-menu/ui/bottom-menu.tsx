import React from 'react';
import styles from './styles.module.scss';
import {Flex, Text} from "@chakra-ui/react";
import {Link, useLocation} from "react-router-dom";
import {t} from "i18next";
import {useUserStore} from "../../../shared/model/user/store.ts";

export const BottomMenu = () => {
    const location = useLocation();

    const tasksActive = useUserStore(state => state.tasks_active);

    function isActive(path: string) {
        return location.pathname === path;
    }

    return (
        <div className={styles.bottomMenuWrapper}>
            <Flex className={styles.bottomMenu} justifyContent='space-between' gap='4px'>
                <Link to='/' className={`${styles.menuItem} ${isActive('/') ? styles.active : ''}`}>
                    <img src="https://ds1h6bsdosamj.cloudfront.net/img/tap-icon.png" alt="Tap"/>
                    <Text className={styles.menuItem_text}>{t('tap')}</Text>
                </Link>
                <Link to='/tasks' className={`${styles.menuItem} ${isActive('/tasks') ? styles.active : ''}`}>
                    {tasksActive && <span className={styles.badge}/>}
                    <img src="https://ds1h6bsdosamj.cloudfront.net/img/task-icon.png" alt="Tap"/>
                    <Text className={styles.menuItem_text}>
                        {t('tasks')}
                    </Text>
                </Link>
                <Link to='/friends' className={`${styles.menuItem} ${isActive('/friends') ? styles.active : ''}`}>
                    <img src="https://ds1h6bsdosamj.cloudfront.net/img/frens-icon.png" alt="Tap"/>
                    <Text className={styles.menuItem_text}>{t('frens')}</Text>
                </Link>
            </Flex>
        </div>
    );
};
