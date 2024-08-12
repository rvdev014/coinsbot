import React from 'react';
import styles from './styles.module.scss'
import {Card} from "./card";
import cl from "classnames";
import {motion} from "framer-motion";

export const MinePage = () => {
    const [tab, setTab] = React.useState(0);

    function onTab(tab: number) {
        setTab(tab);
    }

    return (
        <div className={styles.wrapper}>

            <div className={styles.tabs}>
                <motion.div
                    onClick={() => onTab(1)}
                    className={cl(styles.tab, tab === 1 && styles.active)}
                >PR & Team</motion.div>
                <motion.div
                    onClick={() => onTab(2)}
                    className={cl(styles.tab, tab === 2 && styles.active)}
                >Markets</motion.div>
                <motion.div
                    onClick={() => onTab(3)}
                    className={cl(styles.tab, tab === 3 && styles.active)}
                >Legal</motion.div>
                <motion.div
                    onClick={() => onTab(4)}
                    className={cl(styles.tab, tab === 4 && styles.active)}
                >Specials</motion.div>
            </div>

            <div className={styles.cardsWrapper}>

                <Card/>
                <Card/>
                <Card/>

            </div>

        </div>
    );
};