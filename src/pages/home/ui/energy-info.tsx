import React from 'react';
import styles from "./styles.module.scss";
import {Flex, Text} from "@chakra-ui/react";
import {useUserStore} from "../../../shared/model/user/store.ts";
import {Link} from "react-router-dom";
import {t} from "i18next";
import {boostImgData} from "../../../features/boost/model/utils.ts";
import {motion} from "framer-motion";

export const EnergyInfo = () => {

    const level = useUserStore(state => state.level);
    const energy = useUserStore(state => state.energy)
    const energyLimit = useUserStore(state => state.energy_limit)

    return (
        <Flex className={styles.footer} justifyContent='space-between'>
            <motion.div
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                className={styles.energy}
            >
                <img src="/img/energy-icon.png" alt="Energy"/>
                <Text>{energy}/{energyLimit}</Text>
            </motion.div>
            <Link to='/boost'>
                <motion.div
                    initial={{ x: 20 }}
                    animate={{ x: 0 }}
                    className={styles.boost}
                >
                    <img src={boostImgData.turboLg} alt="Boost"/>
                    <Text>{t('boost')}</Text>
                </motion.div>
            </Link>
        </Flex>
    );
};