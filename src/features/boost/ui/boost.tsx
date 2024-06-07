import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import {Flex} from "@chakra-ui/react";
import {formatPrice} from "../../../shared/utils/other.ts";
import {useExchangeStore} from "../../../shared/model/exchange/store.ts";
import {EnergyLimitPopup} from "../../energy-popup";
import {useBoostStore} from "../model/store.ts";
import {FullEnergyPopup} from "../../full-energy-popup";
import {TurboMiningPopup} from "../../turbo-mining-popup";
import {MultitapPopup} from "../../multitap-popup";
import {TurboEnergyPopup} from "../../turbo-energy-popup";
import {UserCoins} from "../../user-coins";
import cl from "classnames";
import {t} from "i18next";
import {CoinsPerTapPopup} from "../../coins-per-tap-popup";
import {useUserStore} from "../../../shared/model/user/store.ts";

export const Boost = () => {

    // const coins = useUserStore(state => state.coins);
    const boostData = useUserStore(state => state.boost);
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

                <div className={cl(styles.mainCard, 'gradientWrapper')}>
                    <p className={styles.mainCard_title}>{t('your_balance')}</p>
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
                        <p className={styles.mainCard_info_text}>{t('how_boost_works')}</p>
                    </Flex>

                    <span
                        className='gradient'
                        style={{
                            boxShadow: `rgba(0, 122, 255, 0.5) 0px 0px 90px 72px`,
                            top: '-30px'
                        }}
                    />
                </div>

                <div className={styles.freeBoosters}>
                    <p className={styles.title}>{t('boosters')}</p>
                    <Flex className={styles.balance} justifyContent='space-between' gap={'11px'}>

                        <Flex
                            className={styles.card}
                            alignItems='center'
                            flex={1}
                            onClick={() => onBoosterClick('restore_energy')}
                        >
                            <img src="/img/energy-icon-lg.png" alt="Energy"/>
                            <div className={styles.cardInfo}>
                                <p className={styles.cardInfo_title}>{t('full_energy')}</p>
                                {/*<p className={styles.cardInfo_text}>6/6 available</p>*/}
                            </div>
                        </Flex>

                        <Flex
                            className={styles.card}
                            alignItems='center'
                            flex={1}
                            onClick={() => onBoosterClick('energy_turbo')}
                        >
                            <img src="/img/boost-icon-lg.png" alt="Boost"/>
                            <div className={styles.cardInfo}>
                                <p className={styles.cardInfo_title}>{t('turbo_mining')}</p>
                                {/*<p className={styles.cardInfo_text}>3/3 available</p>*/}
                            </div>
                        </Flex>

                    </Flex>
                </div>


                <div className={styles.boosters}>

                    <div className={styles.boostersList}>

                        <Flex
                            className={cl(styles.boosterItem, 'gradientWrapper')}
                            justifyContent='space-between'
                            alignItems='center'
                            onClick={() => onBoosterClick('coins_per_tap')}
                        >
                            <Flex className={styles.boosterItem_left}>
                                <div className={styles.boosterItem_icon}>
                                    <img src="/img/coin-level.png" alt="coins"/>
                                </div>
                                <div className={styles.boosterInfo}>
                                    <p className={styles.boosterName}>{t('coins_per_tap')}</p>
                                    <Flex className={styles.boosterPrice} alignItems='center'>
                                        <img src="/img/coin-icon.png" alt="Coin"/>
                                        <span>{boostData?.coins_per_tap?.coins}</span>
                                    </Flex>
                                </div>
                            </Flex>
                            <div className={styles.boosterArrow}>
                                <img src="/img/arrow.png" alt="Arrow"/>
                            </div>

                            <span
                                className='gradient'
                                style={{
                                    boxShadow: `rgba(62, 136, 247, 0.5) 0px 0px 100px 60px`,
                                    bottom: '-30px',
                                    left: 0
                                }}
                            />
                        </Flex>

                        <Flex
                            className={cl(styles.boosterItem, 'gradientWrapper')}
                            justifyContent='space-between'
                            alignItems='center'
                            onClick={() => onBoosterClick('multi_tap')}
                        >
                            <Flex className={styles.boosterItem_left}>
                                <div className={styles.boosterItem_icon}>
                                    <img src="/img/multitap-icon.png" alt="Avatar"/>
                                </div>
                                <div className={styles.boosterInfo}>
                                    <p className={styles.boosterName}>{t('multitap')}</p>
                                    <Flex className={styles.boosterPrice} alignItems='center'>
                                        <img src="/img/coin-icon.png" alt="Coin"/>
                                        <span>{boostData?.multi_tap?.coins}</span>
                                    </Flex>
                                </div>
                            </Flex>
                            <div className={styles.boosterArrow}>
                                <img src="/img/arrow.png" alt="Arrow"/>
                            </div>

                            <span
                                className='gradient'
                                style={{
                                    boxShadow: `rgba(62, 136, 247, 0.5) 0px 0px 100px 60px`,
                                    bottom: '-30px',
                                    left: 0
                                }}
                            />
                        </Flex>

                        <Flex
                            className={cl(styles.boosterItem, 'gradientWrapper')}
                            justifyContent='space-between'
                            alignItems='center'
                            onClick={() => onBoosterClick('turbo')}
                        >
                            <Flex className={styles.boosterItem_left}>
                                <div className={styles.boosterItem_icon}>
                                    <img src="/img/mining-icon.png" alt="Avatar"/>
                                </div>
                                <div className={styles.boosterInfo}>
                                    <p className={styles.boosterName}>{t('mining')}</p>
                                    <Flex className={styles.boosterPrice} alignItems='center'>
                                        <img src="/img/coin-icon.png" alt="Coin"/>
                                        <span>{boostData?.turbo?.coins}</span>
                                    </Flex>
                                </div>
                            </Flex>
                            <div className={styles.boosterArrow}>
                                <img src="/img/arrow.png" alt="Arrow"/>
                            </div>

                            <span
                                className='gradient'
                                style={{
                                    boxShadow: `rgba(62, 136, 247, 0.5) 0px 0px 100px 60px`,
                                    bottom: '-30px',
                                    left: 0
                                }}
                            />
                        </Flex>

                        <Flex
                            className={cl(styles.boosterItem, 'gradientWrapper')}
                            justifyContent='space-between'
                            alignItems='center'
                            onClick={() => onBoosterClick('energy_limit')}
                        >
                            <Flex className={styles.boosterItem_left}>
                                <div className={styles.boosterItem_icon}>
                                    <img src="/img/bone-icon.png" alt="Avatar"/>
                                </div>
                                <div className={styles.boosterInfo}>
                                    <p className={styles.boosterName}>{t('energy_limit')}</p>
                                    <Flex className={styles.boosterPrice} alignItems='center'>
                                        <img src="/img/coin-icon.png" alt="Coin"/>
                                        <span>{boostData?.energy_limit?.coins}</span>
                                    </Flex>
                                </div>
                            </Flex>
                            <div className={styles.boosterArrow}>
                                <img src="/img/arrow.png" alt="Arrow"/>
                            </div>

                            <span
                                className='gradient'
                                style={{
                                    boxShadow: `rgba(62, 136, 247, 0.5) 0px 0px 100px 60px`,
                                    bottom: '-30px',
                                    left: 0
                                }}
                            />
                        </Flex>

                    </div>
                </div>

            </div>

            <FullEnergyPopup
                open={popupType === 'restore_energy'}
                onClose={onClosePopup}
                onUpgrade={onFullEnergyUpgrade}
            />

            <TurboEnergyPopup
                open={popupType === 'energy_turbo'}
                onClose={onClosePopup}
                onUpgrade={onTurboEnergyUpdate}
            />

            <CoinsPerTapPopup
                open={popupType === 'coins_per_tap'}
                onClose={onClosePopup}
                onUpgrade={onMultiTapUpgrade}
            />

            <MultitapPopup
                open={popupType === 'multi_tap'}
                onClose={onClosePopup}
                onUpgrade={onMultiTapUpgrade}
            />

            <TurboMiningPopup
                open={popupType === 'turbo'}
                onClose={onClosePopup}
                onUpgrade={onMiningUpgrade}
            />

            <EnergyLimitPopup
                open={popupType === 'energy_limit'}
                onClose={onClosePopup}
                onUpgrade={onEnergyLimitUpgrade}
            />
        </>
    )
};
