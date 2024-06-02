import React, {useEffect, useState} from 'react';

import styles from './styles.module.scss';
import {Flex} from "@chakra-ui/react";
import {useLocation, useNavigate} from "react-router-dom";
import {formatNumber} from "../../../shared/utils/other.ts";
import {t} from "i18next";
import {useStatisticStore} from "../../../shared/model/statistics/store.ts";

export const Levels = () => {
    const location  = useLocation();
    const navigate= useNavigate();
    const locationLevel  = parseInt(location?.pathname?.replace('/levels/', ''))
    const level            = useStatisticStore(state => state.level);

    const [step, setStep] = useState(locationLevel ?? 1);

    const changeLevel = (type: string, step: number) => {

        let newStep = type === 'left' ? step - 1 : step + 1;

        if (newStep < 1) {
            newStep = 1;
        } else if (newStep > 15) {
            newStep = 15;
        }

        console.log(newStep)
        setStep(newStep)
    }

    useEffect(() => {
        navigate(`/levels/${step}`);
    }, [step]);

    return (
        <div className={styles.wrapper}>

            <Flex className={styles.slider}>
                <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={() => changeLevel('left', step)}>
                    <img src="/img/arrow-left.png" alt="Left"/>
                </button>

                <div className={styles.levelImg}>
                    <img src={level?.img ?? '/img/dog.png'} alt="Tapper"/>
                </div>

                <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={() => changeLevel('right', step)}>
                    <img src="/img/arrow-right.png" alt="Right"/>
                </button>
            </Flex>

            <div className={styles.levelInfo}>
                <h2 className={styles.levelTitle}>{level?.title_en}</h2>
                <h2 className={styles.levelText}>{t('from')} {formatNumber(level?.coins)}</h2>
            </div>

            <div className={styles.usersWrapper}>

                <div className={styles.usersList}>

                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((user, index) => (
                        <Flex className={styles.userItem} justifyContent='space-between' alignItems='center'>

                            <Flex className={styles.userItem_left}>
                                <div className={styles.userAvatar}>
                                    {/*<img src="/img/asd.png" alt="Avatar"/>*/}
                                    <p>v</p>
                                </div>
                                <div className={styles.userInfo}>
                                    <p className={styles.userName}>vtsss</p>
                                    <Flex className={styles.userBalance}>
                                        <img src="/img/coin-icon.png" alt="Coin"/>
                                        <span>19 583 078</span>
                                    </Flex>
                                </div>
                            </Flex>

                            <p className={styles.userRank}>1</p>

                        </Flex>
                    ))}

                </div>

            </div>

        </div>
    );
};