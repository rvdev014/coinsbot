import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import {Avatar, Button, Flex, Progress, Text} from "@chakra-ui/react";
import {useExchangeStore} from "../../../../shared/model/exchange/store.ts";
import {EnergyInfoOld} from "./energy-info.tsx";
import {useUserStore} from "../../../../shared/model/user/store.ts";
import {Link} from "react-router-dom";

export const HomePage = () => {

    const tapperRef = React.useRef<HTMLDivElement>(null);

    const onTap = useExchangeStore(state => state.onTap);
    const initExchange = useExchangeStore(state => state.initExchange);

    const level = useUserStore(state => state.level);
    const nextLevel = useUserStore(state => state.next_level);
    const last_level = useUserStore(state => state.last_level);
    const coins = useUserStore(state => state.coins);

    useEffect(() => {
        initExchange();
    }, [initExchange]);

    console.log('render HomePage');

    function tapper(event: React.MouseEvent<HTMLDivElement>) {
        event.preventDefault();
        if (!tapperRef.current || !level?.coins_per_hour || useUserStore.getState().energy < level?.coins_per_tap) return;

        console.log('level?.coins_per_tap', level?.coins_per_tap)

        const plusOne = document.createElement('span')
        plusOne.innerHTML = `+${level?.coins_per_tap}`;

        const x = event.clientX - tapperRef.current.getBoundingClientRect().left;
        const y = event.clientY - tapperRef.current.getBoundingClientRect().top;

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

    function formatNumber(amount: number): string {
        if (!amount) return '0';
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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

            <Flex alignItems='center' justifyContent='space-between' className={styles.header}>
                <div className={styles.headerRight}>
                    <Flex alignItems='center'>
                        <Avatar name='Dan Abramov' src='https://bit.ly/dan-abramov'/>
                        <Text ml={2}>Dan Abramov</Text>
                    </Flex>
                </div>
                <div className={styles.headerLeft}>
                    <Button colorScheme="blue">Exchange</Button>
                </div>
            </Flex>

            <div className={styles.contentWrapper}>
                <Flex className={styles.infoBlocks} gap='1'>
                    <div className={styles.infoCard}>
                        <Text color='#ff7300' className={styles.infoCard_text}>Per tap</Text>
                        <div className={styles.infoCard_bottom}>
                            <img src="/img/coin.png" alt="Coin"/>
                            <span>+{level?.coins_per_tap}</span>
                        </div>
                    </div>
                    <div className={styles.infoCard}>
                        <Text color='#7072b3' className={styles.infoCard_text}>To level up</Text>
                        <div className={styles.infoCard_bottom}>
                            <img src="/img/coin.png" alt="Coin"/>
                            <span>+{getRemainCoins()}</span>
                        </div>
                    </div>
                    <div className={styles.infoCard}>
                        <Text color='#95ca99' className={styles.infoCard_text}>Per hour</Text>
                        <div className={styles.infoCard_bottom}>
                            <img src="/img/coin.png" alt="Coin"/>
                            <span>+{level?.coins_per_hour}</span>
                        </div>
                    </div>
                </Flex>

                <div className={styles.balance}>
                    <Flex alignItems='center'>
                        <img src="/img/coin.png" alt="Coin"/>
                        <Text fontSize='36px' fontWeight='bold'>{formatNumber(coins)}</Text>
                    </Flex>
                </div>

                <Link to='/levels' className={styles.progress}>
                    <Flex justifyContent='space-between'>
                        <Text fontWeight='400'>{level?.title_ru}</Text>
                        <Text fontWeight='400' ml={2}>Level {level?.step}/{last_level?.step}</Text>
                    </Flex>
                    <Progress color='yellow' hasStripe value={getProgress()}/>
                </Link>

                <div className={styles.tapper} ref={tapperRef} onClick={tapper}>
                    <div className={styles.tapperArea}>
                        <img draggable={false} src="/img/tapper.jpg" alt="Tapper"/>
                    </div>
                </div>

                <EnergyInfoOld/>

            </div>

        </div>
    );
};