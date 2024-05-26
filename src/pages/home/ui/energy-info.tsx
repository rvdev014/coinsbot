import React from 'react';
import styles from "./styles.module.scss";
import {Flex, Text} from "@chakra-ui/react";
import {useExchangeStore} from "../../../shared/model/exchange/store.ts";
import {useUserStore} from "../../../shared/model/user/store.ts";

const EnergyInfo = () => {

    const level = useUserStore(state => state.level);
    const currentEnergy = useUserStore(state => state.energy)

    return (
        <div className={styles.energyBlock}>
            <Flex className={styles.energyInfo} alignItems='center' justifyContent='space-between'>
                <img src="/img/energy.png" alt="Energy"/>
                <Text fontSize='18px' fontWeight='bold'>{currentEnergy}</Text>/
                <Text fontSize='18px' fontWeight='bold'>{level?.energy_limit}</Text>
            </Flex>
        </div>
    );
};

export default EnergyInfo;