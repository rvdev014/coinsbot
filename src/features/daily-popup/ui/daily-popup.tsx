import React, {FC} from 'react';
import styles from "./styles.module.scss";
import {Flex} from "@chakra-ui/react";
import {Popup} from "../../../shared/ui/popup/popup.tsx";
import cl from 'classnames';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

export const DailyPopup: FC<IProps> = ({isOpen, onClose}) => {
    return (
        <Popup isOpen={isOpen} onClose={onClose}>
            <div className={styles.content}>
                <h2 className={styles.title}>Daily reward</h2>
                <p className={styles.text}>
                    Pick up coins for logging into the game daily without skipping. The “Pick up” button must be pressed
                    daily, otherwise the day count will start again
                </p>

                <div className={styles.daysList}>

                    <div className={cl(styles.dayItem, styles.complete)}>
                        <p className={styles.dayItem_text}>Day 1</p>
                        <Flex className={styles.dayItem_info} alignItems='center'>
                            <img src="/img/coin-icon.png" alt="Coin"/>
                            <span>+500</span>
                        </Flex>
                    </div>

                    <div className={cl(styles.dayItem, styles.complete)}>
                        <p className={styles.dayItem_text}>Day 2</p>
                        <Flex className={styles.dayItem_info} alignItems='center'>
                            <img src="/img/coin-icon.png" alt="Coin"/>
                            <span>+500</span>
                        </Flex>
                    </div>

                    <div className={cl(styles.dayItem, styles.complete)}>
                        <p className={styles.dayItem_text}>Day 3</p>
                        <Flex className={styles.dayItem_info} alignItems='center'>
                            <img src="/img/coin-icon.png" alt="Coin"/>
                            <span>+500</span>
                        </Flex>
                    </div>

                    <div className={cl(styles.dayItem, styles.active)}>
                        <p className={styles.dayItem_text}>Day 4</p>
                        <Flex className={styles.dayItem_info} alignItems='center'>
                            <img src="/img/coin-icon.png" alt="Coin"/>
                            <span>+500</span>
                        </Flex>
                    </div>

                    <div className={styles.dayItem}>
                        <p className={styles.dayItem_text}>Day 5</p>
                        <Flex className={styles.dayItem_info} alignItems='center'>
                            <img src="/img/coin-icon.png" alt="Coin"/>
                            <span>+500</span>
                        </Flex>
                    </div>

                    <div className={styles.dayItem}>
                        <p className={styles.dayItem_text}>Day 6</p>
                        <Flex className={styles.dayItem_info} alignItems='center'>
                            <img src="/img/coin-icon.png" alt="Coin"/>
                            <span>+500</span>
                        </Flex>
                    </div>

                    <div className={styles.dayItem}>
                        <p className={styles.dayItem_text}>Day 7</p>
                        <Flex className={styles.dayItem_info} alignItems='center'>
                            <img src="/img/coin-icon.png" alt="Coin"/>
                            <span>+500</span>
                        </Flex>
                    </div>

                    <div className={styles.dayItem}>
                        <p className={styles.dayItem_text}>Day 8</p>
                        <Flex className={styles.dayItem_info} alignItems='center'>
                            <img src="/img/coin-icon.png" alt="Coin"/>
                            <span>+500</span>
                        </Flex>
                    </div>

                </div>

                <button className={styles.claimBtn}>Claim</button>

            </div>
        </Popup>
    );
};