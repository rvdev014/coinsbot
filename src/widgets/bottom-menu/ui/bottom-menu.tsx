import React from 'react';
import styles from './styles.module.scss';
import {Flex} from "@chakra-ui/react";
import {Link, useLocation} from "react-router-dom";

import cl from 'classnames';

export const BottomMenu = () => {
    const location = useLocation();

    function isActive(path: string) {
        return location.pathname === path;
    }

    return (
        <div className={styles.wrapper}>
            <Flex justifyContent='space-between' gap='1' alignItems='stretch' className={styles.btnGroup}>
                <Link to='/' className={cl(styles.btn, isActive('/') ? styles.active : '')}>
                    <div className={styles.btnDiv}>
                        <img src="/img/doggy.png" alt="Doggy"/>
                        Exchange
                    </div>
                </Link>
                <Link to='/friends' className={cl(styles.btn, isActive('/friends') ? styles.active : '')}>
                    <div className={styles.btnDiv}>
                        <img src="/img/friends.png" alt="Doggy"/>
                        Friends
                    </div>
                </Link>
                <Link to='/earn' className={cl(styles.btn, isActive('/earn') ? styles.active : '')}>
                    <div className={styles.btnDiv}>
                        <img src="/img/coin-icon.png" alt="Coin-icon"/>
                        Earn
                    </div>
                </Link>
            </Flex>
        </div>
    );
};
