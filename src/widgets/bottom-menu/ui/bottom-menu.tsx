import React from 'react';
import styles from './styles.module.scss';
import {Flex, Text} from "@chakra-ui/react";
import {Link, useLocation} from "react-router-dom";

import cl from 'classnames';

export const BottomMenu = () => {
    const location = useLocation();

    function isActive(path: string) {
        return location.pathname === path;
    }

    return (
        <div className={styles.bottomMenuWrapper}>
            <Flex className={styles.bottomMenu} justifyContent='space-between' gap='4px'>
                <Link to='/' className={`${styles.menuItem} ${isActive('/') ? styles.active : ''}`}>
                    <img src="/img/tap-icon.png" alt="Tap"/>
                    <Text className={styles.menuItem_text}>Tap</Text>
                </Link>
                <Link to='/tasks' className={`${styles.menuItem} ${isActive('/tasks') ? styles.active : ''}`}>
                    <img src="/img/task-icon.png" alt="Tap"/>
                    <Text className={styles.menuItem_text}>Task</Text>
                </Link>
                <Link to='/friends' className={`${styles.menuItem} ${isActive('/friends') ? styles.active : ''}`}>
                    <img src="/img/frens-icon.png" alt="Tap"/>
                    <Text className={styles.menuItem_text}>Frens</Text>
                </Link>
            </Flex>
        </div>
    );
};
