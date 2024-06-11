import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import {Flex} from "@chakra-ui/react";
import {formatPrice, preloadImages} from "../../../shared/utils/other.ts";
import {useBoostStore} from "../model/store.ts";
import {UserCoins} from "../../user-coins";
import cl from "classnames";
import {t} from "i18next";
import {useUserStore} from "../../../shared/model/user/store.ts";
import {RestoreEnergyPopup} from "./popups/restore-energy-popup.tsx";
import {EnergyTurboPopup} from "./popups/energy-turbo-popup.tsx";
import {CoinsPerTapPopup} from "./popups/coins-per-tap-popup.tsx";
import {MultiTapPopup} from "./popups/multi-tap-popup.tsx";
import {TurboPopup} from "./popups/turbo-popup.tsx";
import {EnergyLimitPopup} from "./popups/energy-limit-popup.tsx";
import {Popup} from "../../../shared/ui/popup/popup.tsx";
import {boostImgData} from "../model/utils.ts";
import {Loader} from "../../../shared/ui/loader/loader.tsx";

export const Boost = () => {

    // const coins = useUserStore(state => state.coins);
    const boostData = useUserStore(state => state.boost);
    const popupType = useBoostStore(state => state.popupType);
    const onBoosterClick = useBoostStore(state => state.onBoosterClick);
    const onClosePopup = useBoostStore(state => state.onClosePopup);

    const onMiningUpgrade = useBoostStore(state => state.onMiningUpgrade);
    const onTurboEnergyUpdate = useBoostStore(state => state.onTurboEnergyUpdate);
    const onMultiTapUpgrade = useBoostStore(state => state.onMultiTapUpgrade);
    const onCoinsPerTapUpgrade = useBoostStore(state => state.onCoinsPerTapUpgrade);
    const onEnergyLimitUpgrade = useBoostStore(state => state.onEnergyLimitUpgrade);
    const onFullEnergyUpgrade = useBoostStore(state => state.onFullEnergyUpgrade);

    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        preloadImages(Object.values(boostImgData))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <Loader size='lg'/>;

    return (
        <>
            <div className={styles.wrapper}>

                <div className={cl(styles.mainCard, 'gradientWrapper')}>
                    <p className={styles.mainCard_title}>{t('your_balance')}</p>
                    <UserCoins>
                        {({coins}) => (
                            <Flex className={styles.balance} alignItems='center'>
                                <img src={boostImgData.coinIconLg} alt="Coin"/>
                                <span className={styles.balance_number}>{formatPrice(coins)}</span>
                            </Flex>
                        )}
                    </UserCoins>
                    <Flex className={styles.mainCard_info} alignItems='center'>
                        <img src={boostImgData.question} alt="Question"/>
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
                            className={cl(styles.card, 'gradientWrapper')}
                            alignItems='center'
                            flex={1}
                            onClick={() => onBoosterClick('restore_energy')}
                        >
                            <img src={boostImgData.energyIconLg} alt="Energy"/>
                            <div className={styles.cardInfo}>
                                <p className={styles.cardInfo_title}>{t('full_energy')}</p>
                                {/*<p className={styles.cardInfo_text}>6/6 available</p>*/}
                            </div>

                            <span
                                className='gradient'
                                style={{
                                    boxShadow: `rgba(62, 136, 247, 0.5) 0px 0px 40px 40px`,
                                    bottom: '-30px',
                                    left: 0
                                }}
                            />
                        </Flex>

                        <Flex
                            className={cl(styles.card, 'gradientWrapper')}
                            alignItems='center'
                            flex={1}
                            onClick={() => onBoosterClick('energy_turbo')}
                        >
                            <img src={boostImgData.boostIconLg} alt="Boost"/>
                            <div className={styles.cardInfo}>
                                <p className={styles.cardInfo_title}>{t('turbo_mining')}</p>
                                {/*<p className={styles.cardInfo_text}>3/3 available</p>*/}
                            </div>

                            <span
                                className='gradient'
                                style={{
                                    boxShadow: `rgba(62, 136, 247, 0.5) 0px 0px 40px 40px`,
                                    bottom: '-30px',
                                    left: 0
                                }}
                            />
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
                                    <img src={boostImgData.coinLevel} alt="coins"/>
                                </div>
                                <div className={styles.boosterInfo}>
                                    <p className={styles.boosterName}>{t('coins_per_tap')}</p>
                                    <Flex className={styles.boosterPrice} alignItems='center'>
                                        <img src={boostImgData.coinLevel} alt="Coin"/>
                                        <span>{formatPrice(boostData?.coins_per_tap?.coins)}</span>
                                    </Flex>
                                </div>
                            </Flex>
                            <div className={styles.boosterArrow}>
                                <img src={boostImgData.arrow} alt="Arrow"/>
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
                                    <img src={boostImgData.multitapIcon} alt="Avatar"/>
                                </div>
                                <div className={styles.boosterInfo}>
                                    <p className={styles.boosterName}>{t('multitap')}</p>
                                    <Flex className={styles.boosterPrice} alignItems='center'>
                                        <img src={boostImgData.coinLevel} alt="Coin"/>
                                        <span>{formatPrice(boostData?.multi_tap?.coins)}</span>
                                    </Flex>
                                </div>
                            </Flex>
                            <div className={styles.boosterArrow}>
                                <img src={boostImgData.arrow} alt="Arrow"/>
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
                                    <img src={boostImgData.miningIcon} alt="Avatar"/>
                                </div>
                                <div className={styles.boosterInfo}>
                                    <p className={styles.boosterName}>{t('mining')}</p>
                                    <Flex className={styles.boosterPrice} alignItems='center'>
                                        <img src={boostImgData.coinLevel} alt="Coin"/>
                                        <span>{formatPrice(boostData?.turbo?.coins)}</span>
                                    </Flex>
                                </div>
                            </Flex>
                            <div className={styles.boosterArrow}>
                                <img src={boostImgData.arrow} alt="Arrow"/>
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
                                    <img src={boostImgData.boneIcon} alt="Avatar"/>
                                </div>
                                <div className={styles.boosterInfo}>
                                    <p className={styles.boosterName}>{t('energy_limit')}</p>
                                    <Flex className={styles.boosterPrice} alignItems='center'>
                                        <img src={boostImgData.coinLevel} alt="Coin"/>
                                        <span>{formatPrice(boostData?.energy_limit?.coins)}</span>
                                    </Flex>
                                </div>
                            </Flex>
                            <div className={styles.boosterArrow}>
                                <img src={boostImgData.arrow} alt="Arrow"/>
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

            <Popup isOpen={popupType === 'restore_energy'} onClose={onClosePopup}>
                <RestoreEnergyPopup onUpgrade={onFullEnergyUpgrade}/>
            </Popup>

            <Popup isOpen={popupType === 'energy_turbo'} onClose={onClosePopup}>
                <EnergyTurboPopup onUpgrade={onTurboEnergyUpdate}/>
            </Popup>

            <Popup isOpen={popupType === 'coins_per_tap'} onClose={onClosePopup}>
                <CoinsPerTapPopup onUpgrade={onCoinsPerTapUpgrade}/>
            </Popup>

            <Popup isOpen={popupType === 'multi_tap'} onClose={onClosePopup}>
                <MultiTapPopup onUpgrade={onMultiTapUpgrade}/>
            </Popup>

            <Popup isOpen={popupType === 'turbo'} onClose={onClosePopup}>
                <TurboPopup onUpgrade={onMiningUpgrade}/>
            </Popup>

            <Popup isOpen={popupType === 'energy_limit'} onClose={onClosePopup}>
                <EnergyLimitPopup onUpgrade={onEnergyLimitUpgrade}/>
            </Popup>
        </>
    )
};
