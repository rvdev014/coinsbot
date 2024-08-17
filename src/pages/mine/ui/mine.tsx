import React, {useEffect, useMemo, useState} from 'react';
import styles from './styles.module.scss'
import {Card} from "./card";
import cl from "classnames";
import {motion} from "framer-motion";
import {useMineStore} from "../../../shared/model/mine/store";
import {usePuzzlesStore} from "../../../shared/model/puzzles/store";
import {Puzzle} from "./puzzle/puzzle";
import {LoaderBlock} from "../../../shared/ui/loader-block/loader-block";
import {useTranslation} from "react-i18next";
import {Popup} from "../../../shared/ui/popup/popup";
import {CardPopup} from "../../../features/card-popup/ui/card-popup";
import {Flex} from "@chakra-ui/react";
import {boostImgData} from "../../../features/boost/model/utils";
import {Balance} from "../../../shared/ui/balance/balance";
import {UserCoins} from "../../../features/user-coins";
import {useUserStore} from "../../../shared/model/user/store";
import {Link} from "react-router-dom";

export const MinePage = () => {
    const {t} = useTranslation();
    const [expandedPuzzles, setExpandedPuzzles] = useState(false)

    const userTasks = useUserStore(state => state.tasks);

    const isLoading = useMineStore(state => state.isLoading);
    const isLoadingPuzzles = useMineStore(state => state.isLoadingPuzzles);

    const selectedCard = useMineStore(state => state.selectedCard);
    const setSelectedCard = useMineStore(state => state.setSelectedCard);
    const onCardClick = useMineStore(state => state.onCardClick);
    const onCardBuy = useMineStore(state => state.onCardBuy);

    const tabCategory = useMineStore(state => state.tabCategory);
    const onTabCategory = useMineStore(state => state.onTabCategory);

    const init = useMineStore(state => state.init);
    const initPuzzles = useMineStore(state => state.initPuzzles);
    const categories = useMineStore(state => state.categories);
    const userCards = useMineStore(state => state.userCards);

    const puzzles = usePuzzlesStore(state => state.puzzles);
    const userPuzzles = usePuzzlesStore(state => state.userPuzzles);

    const puzzlesMapped = useMemo(() => {
        return expandedPuzzles ? puzzles : puzzles.slice(0, 3);
    }, [puzzles, expandedPuzzles])

    useEffect(() => {
        Promise.allSettled([
            init(),
            initPuzzles()
        ])
    }, [init, initPuzzles])

    function expandPuzzles() {
        setExpandedPuzzles(prev => !prev);
    }

    function checkCard(card) {

        if ((card.level ?? 0) < 1) {
            if (card.type === 'invite') {
                if ((card.refs_count ?? 0) < card.type_value) {
                    return {type: 'invite'}
                }
            }

            if (card.type === 'task') {
                if (!userTasks?.some(userTask => userTask.id == card.type_value)) {
                    return {type: 'task'}
                }
            }

            if (card.type === 'card') {
                const dependCategory = categories.find(category => category.cards.some(c => c.id == card.type_value));
                const dependCard = dependCategory?.cards.find(c => c.id == card.type_value);
                if (!userCards?.some(userCard => userCard.card_id == card.type_value && userCard.level == card.depend_level)) {
                    return {
                        type: 'card',
                        description: `${dependCard?.title} ${card.depend_level} lvl`
                    }
                }
            }
        }

        if (card.max_level && card.level === card.max_level) {
            return {type: 'max_level'}
        }

        const cardPrice = card.next_price ?? card.price;
        if (cardPrice > useUserStore.getState().coins) {
            return {type: 'coins'}
        }

        return null;
    }

    return (
        <>

            <div className={styles.wrapper}>

                <div className={styles.balanceWrapper}>
                    <UserCoins golden={true}>
                        {({coins}) => (
                            <Flex className={styles.balance} alignItems='center'>
                                <img src='/img/puzzles/new-coin-icon.png' alt="New coin"/>
                                <Balance value={coins} className={styles.balanceNumber}/>
                            </Flex>
                        )}
                    </UserCoins>
                    <UserCoins>
                        {({coins}) => (
                            <Flex className={styles.balance} alignItems='center'>
                                <img src={boostImgData.coinIconLg} alt="Coin"/>
                                <Balance value={coins} className={styles.balanceNumber}/>
                            </Flex>
                        )}
                    </UserCoins>
                </div>

                <div className={styles.puzzlesWrapper}>
                    <LoaderBlock
                        loading={isLoadingPuzzles}
                        height='100px'
                    >
                        <div className={styles.puzzlesList}>
                            {puzzlesMapped.map((puzzle, index) => {
                                const userPuzzle = userPuzzles.find(p => p.id === puzzle.id);
                                return (
                                    <Link to={`/puzzles/${puzzle.id}`} key={puzzle.id}>
                                        <Puzzle
                                            puzzle={puzzle}
                                            puzzleLevels={puzzle.puzzle_Levels}
                                            userPuzzleLevels={userPuzzle?.puzzle_Levels || []}
                                        />
                                    </Link>
                                );
                            })}
                        </div>
                        {puzzles?.length > 3 && (
                            <div
                                className={cl(styles.expand, [expandedPuzzles && styles.expanded])}
                                onClick={expandPuzzles}
                            >
                                <p>{t('expand')}</p>
                                <img src="/img/puzzles/arrow-bottom.png" alt="arrow bottom"/>
                            </div>
                        )}
                    </LoaderBlock>
                </div>

                <LoaderBlock loading={isLoading}>
                    <div className={styles.tabs}>
                        {categories.map((category, index) => {
                            if (category.cards.length === 0) return null;

                            return (
                                <motion.div
                                    key={category.id}
                                    onClick={() => onTabCategory(category)}
                                    className={cl(styles.tab, tabCategory?.id === category.id && styles.active)}
                                >
                                    {category.title_ru}
                                </motion.div>
                            )
                        })}
                    </div>

                    <div className={styles.cardsWrapper}>
                        {tabCategory?.cards.map(card => {
                            return (
                                <Card
                                    key={card.id}
                                    card={card}
                                    disabled={checkCard(card)}
                                    onClick={onCardClick}
                                />
                            )
                        })}
                    </div>
                </LoaderBlock>

            </div>

            <Popup isOpen={selectedCard !== null} onClose={() => setSelectedCard(null)}>
                <CardPopup card={selectedCard} onSubmit={onCardBuy}/>
            </Popup>

        </>
    );
};