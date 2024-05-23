import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import {Avatar, Button, Flex, Progress, Text} from "@chakra-ui/react";
import {useExchangeStore} from "../../../shared/model/exchange/store.ts";
import EnergyInfo from "./energy-info.tsx";

export const HomePage = () => {

    const tapperRef = React.useRef<HTMLDivElement>(null);

    const balance = useExchangeStore(state => state.balance);
    const amountPerHour = useExchangeStore(state => state.amountPerHour);
    const amountPerTap = useExchangeStore(state => state.amountPerTap);
    const level = useExchangeStore(state => state.level);
    const nextLevel = useExchangeStore(state => state.nextLevel);
    const maxLevelNumber = useExchangeStore(state => state.maxLevelNumber);

    const onTap = useExchangeStore(state => state.onTap);
    const initExchange = useExchangeStore(state => state.initExchange);
    const reset = useExchangeStore(state => state.reset);

    useEffect(() => {
        initExchange();

        return () => reset()
    }, [initExchange, reset])

    console.log('render HomePage');

    function tapper(event: React.MouseEvent<HTMLDivElement>) {
        event.preventDefault();
        if (!tapperRef.current || useExchangeStore.getState().currentEnergy < amountPerTap) return;

        const plusOne = document.createElement('span')
        plusOne.innerHTML = `+${amountPerTap}`;

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
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    function getProgress() {
        return nextLevel.minAmount === 0 ? 100 : (balance / nextLevel.minAmount) * 100;
    }

    return (
        <div className={styles.wrapper}>

            <Flex alignItems='center' justifyContent='space-between' className={styles.header}>
                <div className={styles.headerRight}>
                    <Flex alignItems='center'>
                        <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov'/>
                        <Text ml={2}>Dan Abrahmov</Text>
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
                            <span>+{amountPerTap}</span>
                        </div>
                    </div>
                    <div className={styles.infoCard}>
                        <Text color='#7072b3' className={styles.infoCard_text}>To level up</Text>
                        <div className={styles.infoCard_bottom}>
                            <img src="/img/coin.png" alt="Coin"/>
                            <span>+{nextLevel.minAmount - balance}</span>
                        </div>
                    </div>
                    <div className={styles.infoCard}>
                        <Text color='#95ca99' className={styles.infoCard_text}>Per hour</Text>
                        <div className={styles.infoCard_bottom}>
                            <img src="/img/coin.png" alt="Coin"/>
                            <span>+{amountPerHour}</span>
                        </div>
                    </div>
                </Flex>

                <div className={styles.balance}>
                    <Flex alignItems='center'>
                        <img src="/img/coin.png" alt="Coin"/>
                        <Text fontSize='36px' fontWeight='bold'>{formatNumber(balance)}</Text>
                    </Flex>
                </div>

                <div className={styles.progress}>
                    <Flex justifyContent='space-between'>
                        <Text fontWeight='400'>{level.name}</Text>
                        <Text fontWeight='400' ml={2}>Level {level.number}/{maxLevelNumber}</Text>
                    </Flex>
                    <Progress color='yellow' hasStripe value={getProgress()}/>
                </div>

                <div className={styles.tapper} ref={tapperRef} onClick={tapper}>
                    <div className={styles.tapperArea}>
                        <img draggable={false} src="/img/tapper.jpg" alt="Tapper"/>
                    </div>
                </div>

                <EnergyInfo/>


            </div>

        </div>
    );
};