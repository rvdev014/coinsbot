import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Flex } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import {formatNumber, hexToRgb, showError} from "../../../shared/utils/other.ts";
import { t } from "i18next";
import { useUserStore } from "../../../shared/model/user/store.ts";
import {useLevelStore} from "../model/store.ts";
import {Loader} from "../../../shared/ui/loader/loader.tsx";

export const Levels = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const locationLevel = parseInt(location?.pathname?.replace('/levels/', ''));
    const userId = useUserStore(state => state.user_id);
    const levelStore = useLevelStore();
    const rank = useLevelStore(state => state.rank);

    const [step, setStep] = useState(locationLevel ?? 1);

    const changeLevel = (type: string, step: number) => {
        let newStep = type === 'prev' ? step - 1 : step + 1;

        if (newStep < 1) {
            newStep = 1;
        } else if (newStep > 15) {
            newStep = 15;
        }

        setStep(newStep);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!userId) return;

                await levelStore.init(userId, step);
            } catch (e) {
                showError()
            }
        };

        fetchData();
    }, [userId, step]);

    useEffect(() => {
    }, [levelStore]);

    useEffect(() => {
        navigate(`/levels/${step}`);
    }, [step, navigate]);

    if (levelStore?.loading) {
        return <Loader/>
    }

    return (
        <div className={styles.wrapper}>
            <Flex className={styles.slider}>
                <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={() => changeLevel('prev', step)}>
                    <img src="/img/arrow-left.png" alt="Left" />
                </button>

                <div
                    className={styles.levelImg}
                    style={{
                        border: `5px solid ${levelStore?.level?.color}`,
                        background: `radial-gradient(circle, ${levelStore?.level?.color} -50%, #272727 100%)`,
                        boxShadow: `0 0 100px 0 ${hexToRgb(levelStore?.level?.color, 0.7)}`,
                    }}
                >
                    <img
                        src={levelStore?.level?.img ?? '/img/dog.png'}
                        alt="Tapper"
                    />
                </div>

                <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={() => changeLevel('next', step)}>
                    <img src="/img/arrow-right.png" alt="Right" />
                </button>
            </Flex>

            <div className={styles.levelInfo}>
                <h2 className={styles.levelTitle}>{levelStore?.level?.title}</h2>
                <h2 className={styles.levelText}>{t('from')} {formatNumber(levelStore?.level?.coins)}</h2>
            </div>

            <div className={styles.usersWrapper}>
                <div className={styles.usersList}>
                    {levelStore?.users?.map((user, index) => (
                        <Flex className={styles.userItem} justifyContent='space-between' alignItems='center' key={index}>
                            <Flex className={styles.userItem_left}>
                                <div className={styles.userAvatar}>
                                    {/*<img src="/img/asd.png" alt="Avatar"/>*/}
                                    <p>{user?.username?.charAt(0)?.toUpperCase() ?? 'C'}</p>
                                </div>
                                <div className={styles.userInfo}>
                                    <p className={styles.userName}>
                                        {
                                            user?.first_name || user?.last_name
                                                ? `${user?.first_name} ${user?.last_name}`
                                                : user?.username
                                        }
                                    </p>
                                    <Flex className={styles.userBalance} alignItems='center'>
                                        <img src="/img/coin-icon.png" alt="Coin" />
                                        <span>{user?.coins}</span>
                                    </Flex>
                                </div>
                            </Flex>

                            <p className={styles.userRank}>{index + 1}</p>
                        </Flex>
                    ))}
                    {levelStore?.users?.length === 0 ?
                        <Flex className={styles.userItem} justifyContent='space-between' alignItems='center'>
                            <Flex className={styles.userItem_left}>
                                <div className={styles.userAvatar}>
                                    {/*<img src="/img/asd.png" alt="Avatar"/>*/}
                                    <p>C</p>
                                </div>
                                <div className={styles.userInfo}>
                                    <p className={styles.userName}>{t('be_first')}</p>
                                </div>
                            </Flex>
                        </Flex> : <span></span>
                    }
                </div>
            </div>
        </div>
    )
};
