import React from 'react';
import styles from "./styles.module.scss";
import {Flex, Text} from "@chakra-ui/react";
import {useUserStore} from "../../../shared/model/user/store.ts";
import {Link} from "react-router-dom";

export const EnergyInfo = () => {

    const level = useUserStore(state => state.level);
    const energy = useUserStore(state => state.energy)
    const energyLimit = useUserStore(state => state.energy_limit)

    return (
        <Flex className={styles.footer} justifyContent='space-between'>
            <Flex className={styles.energy} alignItems='center'>
                <img src="/img/energy-icon.png" alt="Energy"/>
                <Text>{energy}/{energyLimit}</Text>
            </Flex>
            <button>
                <Link to='/boost'>
                    <Flex className={styles.boost} alignItems='center'>
                        <img src="/img/boost-icon.png" alt="Boost"/>
                        <Text>Boost</Text>
                    </Flex>
                </Link>
            </button>
        </Flex>
    );
};