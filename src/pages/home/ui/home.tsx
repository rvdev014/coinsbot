import React from 'react';
import styles from './styles.module.scss';
import {Flex, Image, Text} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {useUserStore} from "../../../shared/model/user/store.ts";
import {EnergyInfo} from "./energy-info.tsx";
import {useExchangeStore} from "../../../shared/model/exchange/store.ts";
import {formatNumber, hexToRgb} from "../../../shared/utils/other.ts";
import {buildStyles, CircularProgressbarWithChildren} from "react-circular-progressbar";

import 'react-circular-progressbar/dist/styles.css';
import cl from "classnames";
import {Balance} from "../../../shared/ui/balance/balance.tsx";
import {AnimatePresence, motion} from "framer-motion";
import {Popup} from "../../../shared/ui/popup/popup.tsx";
import {PerHourPopup} from "../../../features/per-hour-popup";
import {useTranslation} from "react-i18next";

import coinLevelIcon from "../../../assets/img/coin-level.png";
import newCoinIcon from "../../../assets/img/new-coin-lg.png";
import arrowIcon from "../../../assets/img/arrow.png";

export const HomePage = () => {
    const {t} = useTranslation();
    const tapperRef = React.useRef<HTMLButtonElement>(null);

    const onTap = useExchangeStore(state => state.onTap);

    const isCollectedPopup = useUserStore(state => state.isCollectedPopup);
    const gCoins = useUserStore(state => state.g_coins);
    const coins = useUserStore(state => state.coins);
    const level = useUserStore(state => state.level);
    const nextLevel = useUserStore(state => state.next_level);
    const lastLevel = useUserStore(state => state.last_level);
    const coinsPerTap = useUserStore(state => state.coins_per_tap);
    const gCoinsPerHour = useUserStore(state => state.g_coins_per_hour);
    const coinsPerHour = useUserStore(state => state.coins_per_hour);
    const energy = useUserStore(state => state.energy);
    const energyLimit = useUserStore(state => state.energy_limit);

    function tapper(event: React.TouchEvent<HTMLButtonElement>) {
        if (!tapperRef.current || !coinsPerHour || useUserStore.getState().energy < coinsPerTap) return;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        for (const touch of event.changedTouches) {
            const plusOne = document.createElement('span')
            plusOne.innerHTML = `+${coinsPerTap}`;

            const x = touch.clientX - tapperRef.current.getBoundingClientRect().left;
            const y = touch.clientY - tapperRef.current.getBoundingClientRect().top;

            plusOne.style.position = 'absolute';
            plusOne.style.left = x + 'px';
            plusOne.style.top = y + 'px';
            plusOne.style.fontSize = '28px';
            plusOne.style.fontWeight = 'bold';
            plusOne.style.textShadow = '0 0 2px #000';
            plusOne.style.color = '#fff';
            plusOne.style.transition = 'all 1.5s';
            plusOne.style.transform = 'translate(-50%, -50%)';
            plusOne.style.zIndex = '1000';
            tapperRef.current.appendChild(plusOne);

            onTap();

            setTimeout(() => {
                plusOne.style.top = y - 130 + 'px';
                plusOne.style.opacity = '0';
            }, 20);

            setTimeout(() => {
                tapperRef.current?.removeChild(plusOne);
            }, 800);
        }
    }

    function getRemainCoins(coins: number) {
        if (!nextLevel) return 0;

        return nextLevel?.coins - coins;
    }

    function getProgress(forEnergy = false) {
        if (forEnergy) {
            const progress = energyLimit - (energyLimit - energy) > 0 ? (energyLimit - (energyLimit - energy)) / energyLimit * 100 : 0;
            return 100 - progress;
        }
        return nextLevel?.coins === 0 ? 100 : (coins / nextLevel?.coins) * 100;
    }

    const [coinType, setCoinType] = React.useState<'default' | 'gold'>('default');

    function onClickBalance(coinType: 'default' | 'gold') {
        setCoinType(coinType);
    }

    return (
        <>

            <div className={styles.wrapper}>

                <motion.div
                    initial={{x: -20}}
                    animate={{x: 0}}
                    className={styles.header}
                >

                    <div className={cl(styles.headerInfo_block, 'gradientWrapper')}>
                        <span className={styles.headerInfo_text}>{t('coins_per_tap')}</span>
                        <Flex className={styles.headerInfo_info}>
                            <Image src={coinLevelIcon} alt="Coin"/>
                            <Text>+{coinsPerTap}</Text>
                        </Flex>
                        <span className='gradient' style={{boxShadow: `0 0 30px 20px rgba(251, 189, 70, 0.5)`}}/>
                    </div>

                    <div className={cl(styles.headerInfo_block, 'gradientWrapper')}>
                        <span className={styles.headerInfo_text}>{t('coins_for_level_up')}</span>
                        <Flex className={styles.headerInfo_info}>
                            <Balance value={getRemainCoins(coins)} width='9px' spaceWidth='2px'/>
                        </Flex>
                        <span className='gradient' style={{boxShadow: `0 0 30px 20px rgba(0, 122, 255, 0.5)`}}/>
                    </div>

                    {coinType === 'gold' &&
                        <div className={cl(styles.headerInfo_block, 'gradientWrapper')}>
                            <span className={styles.headerInfo_text}>{t('g_coins_per_hour')}</span>
                            <Flex className={styles.headerInfo_info}>
                                <Image src={`/img/puzzles/new-coin-lg.png`} alt="Coin"/>
                                <Text>+{formatNumber(gCoinsPerHour)}</Text>
                            </Flex>
                            <span className='gradient' style={{boxShadow: `0 0 30px 20px rgba(23, 214, 134, 0.5)`}}/>
                        </div>}

                    {coinType === 'default' &&
                        <div className={cl(styles.headerInfo_block, 'gradientWrapper')}>
                            <span className={styles.headerInfo_text}>{t('coins_per_hour')}</span>
                            <Flex className={styles.headerInfo_info}>
                                <Image src={coinLevelIcon} alt="Coin"/>
                                <Text>+{formatNumber(coinsPerHour)}</Text>
                            </Flex>
                            <span className='gradient' style={{boxShadow: `0 0 30px 20px rgba(251, 189, 70, 0.5)`}}/>
                        </div>}

                </motion.div>

                <div className={styles.mainContent}>

                    <div className={styles.levelWrapper}>

                        {coinType === 'default' &&
                            <motion.div
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className={styles.balanceAbs}
                            >
                                <Image onClick={() => onClickBalance('gold')} src={newCoinIcon} alt="Gold coin"/>
                            </motion.div>}

                        {coinType === 'gold' &&
                            <motion.div
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className={styles.balanceAbs}
                            >
                                <Image onClick={() => onClickBalance('default')} src={coinLevelIcon} alt="Coin"/>
                            </motion.div>}

                        {coinType === 'gold' &&
                            <motion.div
                                initial={{ opacity: 0, x: -80 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -80 }}
                                transition={{duration: 0.3}}
                                className={styles.balance}
                            >
                                <Image src={newCoinIcon} alt="Gold coin"/>
                                <Balance
                                    value={gCoins}
                                    className={styles.balanceNumber}
                                    classNameWrapper={styles.balanceNumberWrapper}
                                />
                            </motion.div>}

                        {coinType === 'default' &&
                            <motion.div
                                initial={{ opacity: 0, x: -80 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -80 }}
                                transition={{duration: 0.3}}
                                className={styles.balance}
                            >
                                <Image src={coinLevelIcon} alt="Coin"/>
                                <Balance
                                    value={coins}
                                    className={styles.balanceNumber}
                                    classNameWrapper={styles.balanceNumberWrapper}
                                />
                            </motion.div>}

                        <motion.div initial={{x: -20}} animate={{x: 0}}>
                            <Link to='/levels'>
                                <Flex className={styles.level} alignItems='center'>
                                    <Flex className={styles.level_info}>
                                        <Text>{level?.title}</Text>
                                        <Text>{level?.step ?? '1'}<span>/{lastLevel?.step ?? '15'}</span></Text>
                                    </Flex>
                                    <div className={styles.level_btn}>
                                        <Image src={arrowIcon} alt="Arrow"/>
                                    </div>
                                </Flex>
                            </Link>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{scale: 1.1}}
                        animate={{scale: 1}}
                        className={styles.tapWrapper}
                        id='tapper'
                    >
                        <CircularProgressbarWithChildren
                            value={getProgress(true)}
                            strokeWidth={2}
                            className={styles.tapProgress}
                            styles={buildStyles({
                                textColor: "transparent",
                                pathColor: level?.color ?? '#B9B9B9',
                                trailColor: "transparent"
                            })}
                        >
                            <button
                                className={styles.tapper}
                                style={{
                                    background: `radial-gradient(circle, ${level?.color ?? '#B9B9B9'} -50%, #272727 100%)`,
                                    boxShadow: `0 0 40px 0 ${hexToRgb(level?.color ?? '#B9B9B9', 0.6)}`,
                                }}
                                ref={tapperRef}
                                onTouchEnd={tapper}
                            >
                                <Image
                                    draggable={false}
                                    src={`/img/levels/level-${level?.step ?? 1}.png`}
                                    alt="Tapper"
                                />
                            </button>
                        </CircularProgressbarWithChildren>
                    </motion.div>

                    <EnergyInfo/>

                </div>

            </div>

            <Popup isOpen={isCollectedPopup}>
                <PerHourPopup onClaim={() => useUserStore.setState({isCollectedPopup: false})}></PerHourPopup>
            </Popup>

        </>
    );
};
