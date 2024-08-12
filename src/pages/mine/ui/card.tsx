import React from 'react';
import styles from './styles.module.scss'

export const Card = () => {
    return (
        <div className={styles.card}>

            <div className={styles.cardTop}>
                <div className={styles.cardImg}>
                    <img src="/img/mine/card-img.png" alt="card img"/>
                </div>
                <div className={styles.cardInfo}>
                    <h4 className={styles.title}>CEO</h4>
                    <p className={styles.reward}>Coins for tap</p>
                    <div className={styles.cardCost}>
                        <img src="/img/coin-level.png" alt="coin"/>
                        <span>+50k</span>
                    </div>
                </div>
            </div>

            <hr/>

            <div className={styles.cardBottom}>
                <p className={styles.cardLevel}>10 lvl</p>
                <div className={styles.cardCost}>
                    <img src="/img/coin-level.png" alt="coin"/>
                    <span>512 000</span>
                </div>
            </div>

        </div>
    );
};