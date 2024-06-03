import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import {Flex, Text} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {useUserStore} from "../../../shared/model/user/store.ts";
import {t} from "i18next";
import {EnergyInfo} from "./energy-info.tsx";
import {useExchangeStore} from "../../../shared/model/exchange/store.ts";
import {formatPrice} from "../../../shared/utils/other.ts";

export const HomePage = () => {

    const tapperRef = React.useRef<HTMLDivElement>(null);

    const onTap = useExchangeStore(state => state.onTap);
    const initExchange = useExchangeStore(state => state.initExchange);

    const level = useUserStore(state => state.level);
    const nextLevel = useUserStore(state => state.next_level);
    const lastLevel = useUserStore(state => state.last_level);
    const coinsPerTap = useUserStore(state => state.coins_per_tap);
    const coinsPerHour = useUserStore(state => state.coins_per_hour);
    const coins = useUserStore(state => state.coins);

    useEffect(() => {
        initExchange();
    }, [initExchange]);

    function tapper(event: React.MouseEvent<HTMLDivElement>) {
        event.preventDefault();
        if (!tapperRef.current || !coinsPerHour || useUserStore.getState().energy < coinsPerTap) return;

        const plusOne = document.createElement('span')
        plusOne.innerHTML = `+${coinsPerTap}`;

        const x = event.clientX;
        const y = event.clientY;

        plusOne.style.position = 'absolute';
        plusOne.style.left = x + 'px';
        plusOne.style.top = y + 'px';
        plusOne.style.fontSize = '28px';
        plusOne.style.fontWeight = 'bold';
        plusOne.style.textShadow = '0 0 2px #000';
        plusOne.style.color = '#ffce33';
        plusOne.style.transition = 'all 1.5s';
        plusOne.style.transform = 'translate(-50%, -50%)';
        plusOne.style.zIndex = '1000';
        tapperRef.current.appendChild(plusOne);

        onTap();

        setTimeout(() => {
            plusOne.style.top = y - 150 + 'px';
            plusOne.style.opacity = '0';
        }, 20);

        setTimeout(() => {
            tapperRef.current?.removeChild(plusOne);
        }, 1000);
    }

    function getRemainCoins() {
        if (!nextLevel) return 0;
        return nextLevel?.coins - coins;
    }

    function getProgress() {
        return nextLevel?.coins === 0 ? 100 : (coins / nextLevel?.coins) * 100;
    }

    return (
        <div className={styles.wrapper}>

            <Flex className={styles.header} justifyContent='space-between'>

                <div className={styles.headerInfo_block}>
                    <span className={styles.headerInfo_text}>Coins for tap</span>
                    <Flex className={styles.headerInfo_info}>
                        <img src="/img/coin-icon.png" alt="Coin"/>
                        <Text>+{coinsPerTap}</Text>
                    </Flex>
                </div>

                <div className={styles.headerInfo_block}>
                    <span className={styles.headerInfo_text}>{t('coins_for_level_up')}</span>
                    <Flex className={styles.headerInfo_info}>
                        <Text>{getRemainCoins()}</Text>
                    </Flex>
                </div>

                <div className={styles.headerInfo_block}>
                    <span className={styles.headerInfo_text}>{t('coins_per_hour')}</span>
                    <Flex className={styles.headerInfo_info}>
                        <Text>+{coinsPerHour}</Text>
                    </Flex>
                </div>

            </Flex>

            <div className={styles.mainContent}>

                <div className={styles.levelWrapper}>
                    <Flex className={styles.balance} alignItems='center'>
                        <img src="/img/coin-icon-lg.png" alt="Coin"/>
                        <Text className={styles.balance_number}>{formatPrice(coins)}</Text>
                    </Flex>
                    <Link to={`/levels/${level?.step ?? 1}`}>
                        <Flex className={styles.level} alignItems='center'>
                            <Flex className={styles.level_info}>
                                <Text>Puppy</Text>
                                <Text>{level?.step ?? '1'}<span>/{lastLevel?.step ?? '15'}</span></Text>
                            </Flex>
                            <div className={styles.level_btn}>
                                <img src="/img/arrow.png" alt="Arrow"/>
                            </div>
                        </Flex>
                    </Link>
                </div>

                <div className={styles.tapWrapper}>
                    <div className={styles.tapper} ref={tapperRef} onClick={tapper}>
                        <img draggable={false} src="/img/dog.png" alt="Tapper"/>
                    </div>
                </div>

                <EnergyInfo/>

            </div>

        </div>
    );
};