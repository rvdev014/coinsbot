import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import {Flex} from "@chakra-ui/react";
import {useUserStore} from "../../../shared/model/user/store.ts";
import {formatPrice} from "../../../shared/utils/other.ts";
import {useExchangeStore} from "../../../shared/model/exchange/store.ts";
import {EnergyLimitPopup} from "../../energy-popup";
import {useBoostStore} from "../model/store.ts";
import {FullEnergyPopup} from "../../full-energy-popup";
import {UserCoins} from "../../user-coins/ui/user-coins.tsx";
import {TurboMiningPopup} from "../../turbo-mining-popup";
import {MultitapPopup} from "../../multitap-popup";
import {TurboEnergyPopup} from "../../turbo-energy-popup";

export const Boost = () => {

    // const coins = useUserStore(state => state.coins);
    const initExchange = useExchangeStore(state => state.initExchange);
    const popupType = useBoostStore(state => state.popupType);
    const onBoosterClick = useBoostStore(state => state.onBoosterClick);
    const onClosePopup = useBoostStore(state => state.onClosePopup);

    const onMiningUpgrade = useBoostStore(state => state.onMiningUpgrade);
    const onTurboEnergyUpdate = useBoostStore(state => state.onTurboEnergyUpdate);
    const onMultiTapUpgrade = useBoostStore(state => state.onMultiTapUpgrade);
    const onEnergyLimitUpgrade = useBoostStore(state => state.onEnergyLimitUpgrade);
    const onFullEnergyUpgrade = useBoostStore(state => state.onFullEnergyUpgrade);

    useEffect(() => {
        initExchange();
    }, [initExchange]);

    console.log('Boost render')

    return (
        <>
            <div className={styles.wrapper}>

                <div className={styles.mainCard}>
                    <p className={styles.mainCard_title}>Your balance</p>
                    <UserCoins>
                        {({coins}) => (
                            <Flex className={styles.balance} alignItems='center'>
                                <img src="/img/coin-icon-lg.png" alt="Coin"/>
                                <span className={styles.balance_number}>{formatPrice(coins)}</span>
                            </Flex>
                        )}
                    </UserCoins>
                    <Flex className={styles.mainCard_info} alignItems='center'>
                        <img src="/img/question.png" alt="Question"/>
                        <p className={styles.mainCard_info_text}>How does the boost work?</p>
                    </Flex>
                </div>

                <div className={styles.freeBoosters}>
                    <p className={styles.title}>Free Boosters</p>
                    <Flex className={styles.balance} justifyContent='space-between' gap={'11px'}>

                        <Flex
                            className={styles.card}
                            alignItems='center'
                            flex={1}
                            onClick={() => onBoosterClick('full_energy')}
                        >
                            <img src="/img/energy-icon-lg.png" alt="Energy"/>
                            <div className={styles.cardInfo}>
                                <p className={styles.cardInfo_title}>Full energy</p>
                                {/*<p className={styles.cardInfo_text}>6/6 available</p>*/}
                            </div>
                        </Flex>

                        <Flex
                            className={styles.card}
                            alignItems='center'
                            flex={1}
                            onClick={() => onBoosterClick('turbo_energy')}
                        >
                            <img src="/img/boost-icon-lg.png" alt="Boost"/>
                            <div className={styles.cardInfo}>
                                <p className={styles.cardInfo_title}>Turbo mining</p>
                                {/*<p className={styles.cardInfo_text}>3/3 available</p>*/}
                            </div>
                        </Flex>

                    </Flex>
                </div>


                <div className={styles.boosters}>
                    <p className={styles.title}>Boosters</p>

                    <div className={styles.boostersList}>

                        <Flex
                            className={styles.boosterItem}
                            justifyContent='space-between'
                            alignItems='center'
                            onClick={() => onBoosterClick('multitap')}
                        >
                            <Flex className={styles.boosterItem_left}>
                                <div className={styles.boosterItem_icon}>
                                    <img src="/img/multitap-icon.png" alt="Avatar"/>
                                </div>
                                <div className={styles.boosterInfo}>
                                    <p className={styles.boosterName}>Multitap</p>
                                    <Flex className={styles.boosterPrice} alignItems='center'>
                                        <img src="/img/coin-icon.png" alt="Coin"/>
                                        <span>500</span>
                                    </Flex>
                                </div>
                            </Flex>
                            <div className={styles.boosterArrow}>
                                <img src="/img/arrow.png" alt="Arrow"/>
                            </div>
                        </Flex>

                        <Flex
                            className={styles.boosterItem}
                            justifyContent='space-between'
                            alignItems='center'
                            onClick={() => onBoosterClick('mining')}
                        >
                            <Flex className={styles.boosterItem_left}>
                                <div className={styles.boosterItem_icon}>
                                    <img src="/img/mining-icon.png" alt="Avatar"/>
                                </div>
                                <div className={styles.boosterInfo}>
                                    <p className={styles.boosterName}>Mining</p>
                                    <Flex className={styles.boosterPrice} alignItems='center'>
                                        <img src="/img/coin-icon.png" alt="Coin"/>
                                        <span>500</span>
                                    </Flex>
                                </div>
                            </Flex>
                            <div className={styles.boosterArrow}>
                                <img src="/img/arrow.png" alt="Arrow"/>
                            </div>
                        </Flex>

                        <Flex
                            className={styles.boosterItem}
                            justifyContent='space-between'
                            alignItems='center'
                            onClick={() => onBoosterClick('upgrade_energy')}
                        >
                            <Flex className={styles.boosterItem_left}>
                                <div className={styles.boosterItem_icon}>
                                    <img src="/img/bone-icon.png" alt="Avatar"/>
                                </div>
                                <div className={styles.boosterInfo}>
                                    <p className={styles.boosterName}>Energy limit</p>
                                    <Flex className={styles.boosterPrice} alignItems='center'>
                                        <img src="/img/coin-icon.png" alt="Coin"/>
                                        <span>500</span>
                                    </Flex>
                                </div>
                            </Flex>
                            <div className={styles.boosterArrow}>
                                <img src="/img/arrow.png" alt="Arrow"/>
                            </div>
                        </Flex>

                    </div>
                </div>

            </div>

            <FullEnergyPopup
                open={popupType === 'full_energy'}
                onClose={onClosePopup}
                onUpgrade={onFullEnergyUpgrade}
            />

            <TurboEnergyPopup
                open={popupType === 'turbo_energy'}
                onClose={onClosePopup}
                onUpgrade={onTurboEnergyUpdate}
            />

            <MultitapPopup
                open={popupType === 'multitap'}
                onClose={onClosePopup}
                onUpgrade={onMultiTapUpgrade}
            />

            <TurboMiningPopup
                open={popupType === 'mining'}
                onClose={onClosePopup}
                onUpgrade={onMiningUpgrade}
            />

            <EnergyLimitPopup
                open={popupType === 'upgrade_energy'}
                onClose={onClosePopup}
                onUpgrade={onEnergyLimitUpgrade}
            />
        </>
    )
};
