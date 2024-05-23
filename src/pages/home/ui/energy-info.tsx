import React from 'react';
import styles from "./styles.module.scss";
import {Flex, Text} from "@chakra-ui/react";
import {useExchangeStore} from "../../../shared/model/exchange/store.ts";

const EnergyInfo = () => {

    const currentEnergy = useExchangeStore(state => state.currentEnergy);
    const energyLimit = useExchangeStore(state => state.energyLimit);

    return (
        <div className={styles.energyBlock}>
            <Flex className={styles.energyInfo} alignItems='center' justifyContent='space-between'>
                <img src="/img/energy.png" alt="Energy"/>
                <Text fontSize='18px' fontWeight='bold'>{currentEnergy}</Text>/
                <Text fontSize='18px' fontWeight='bold'>{energyLimit}</Text>
            </Flex>
        </div>
    );
};

export default EnergyInfo;