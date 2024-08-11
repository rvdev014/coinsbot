import React from 'react';
import styles from "./styles.module.scss";
import {Flex, Text} from "@chakra-ui/react";
import {useUserStore} from "../../../shared/model/user/store.ts";
import {Link} from "react-router-dom";
import {motion} from "framer-motion";
import {Balance} from "../../../shared/ui/balance/balance.tsx";
import {useTranslation} from "react-i18next";

export const EnergyInfo = () => {
    const {t} = useTranslation();

    const energy = useUserStore(state => state.energy)
    const energyLimit = useUserStore(state => state.energy_limit)

    return (
        <Flex className={styles.footer} justifyContent='space-between'>
            <motion.div
                initial={{x: -20}}
                animate={{x: 0}}
                className={styles.energy}
            >
                <img src='/img/energy-icon.png' alt="Energy"/>
                <Flex alignItems='center'>
                    <Balance value={energy} width='9px' spaceWidth='1px'/>
                    <span style={{margin: '0 3px'}}>/</span>
                    <Balance value={energyLimit} width='9px' spaceWidth='1px'/>
                </Flex>
            </motion.div>
            <Link to='/boost'>
                <motion.div
                    initial={{x: 20}}
                    animate={{x: 0}}
                    className={styles.boost}
                >
                    <img src='/img/boost-icon.png' alt="Boost"/>
                    <Text>{t('boost')}</Text>
                </motion.div>
            </Link>
        </Flex>
    );
};
