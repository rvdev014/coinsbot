import React, {useEffect, useState} from 'react';
import styles from './styles.module.scss'
import cl from "classnames";
import {ClaimBtn} from "../../../shared/ui/claim-btn/claim-btn";
import {usePuzzlesStore} from "../../../shared/model/puzzles/store";
import {Loader} from "../../../shared/ui/loader/loader";
import {Spinner} from "@chakra-ui/react";
import {JoinPopup} from "../../../features/join-popup";
import {Popup} from "../../../shared/ui/popup/popup";
import {useEarnStore} from "../../../shared/model/earn/store";
import {LoaderBlock} from "../../../shared/ui/loader-block/loader-block";
import {useUserStore} from "../../../shared/model/user/store";
import {PuzzleClaimedPopup} from "../../../features/puzzle-claimed-popup";
import {createPortal} from "react-dom";
import {motion} from "framer-motion";
import {useInviteFriends} from "../../../shared/hooks/useInviteFriends";
import {useTranslation} from "react-i18next";
import {NewCoinPopup} from "../../../features/new-coin-popup";

export const PuzzlesPage = () => {
    const {t} = useTranslation();
    const [expandedConditions, setExpandedConditions] = useState(false)

    const init = usePuzzlesStore(state => state.init)
    const isLoading = usePuzzlesStore(state => state.isLoading)
    const loadingLevelId = usePuzzlesStore(state => state.loadingLevelId)
    const onClaimPuzzle = usePuzzlesStore(state => state.onClaimPuzzle)
    const currentPuzzle = usePuzzlesStore(state => state.currentPuzzle)
    const userPuzzleLevels = usePuzzlesStore(state => state.userPuzzleLevels)
    const claimedPuzzleLevel = usePuzzlesStore(state => state.claimedPuzzleLevel)
    const setClaimedPuzzleLevel = usePuzzlesStore(state => state.setClaimedPuzzleLevel)

    const isInfoPopup = usePuzzlesStore(state => state.isInfoPopup)
    const setInfoPopup = usePuzzlesStore(state => state.setInfoPopup)

    const tasks = useEarnStore(state => state.tasks);
    const userTasks = useUserStore(state => state.tasks);

    const fetchTasks = useEarnStore(state => state.fetchTasks);
    const selectedTask = useEarnStore(state => state.selectedTask);
    const onTaskClick = useEarnStore(state => state.onTaskClick);
    const onTaskClose = useEarnStore(state => state.onTaskClose);
    const onCompleteTask = useEarnStore(state => state.onCompleteTask);

    const {onInviteFriend} = useInviteFriends();

    function expandConditions() {
        setExpandedConditions(prev => !prev)
    }

    useEffect(() => {
        init();
        fetchTasks();
    }, [init])

    function renderPuzzle(level: number) {
        if (!currentPuzzle) {
            return;
        }

        const puzzle = currentPuzzle.puzzle_Levels.find(p => p.level === level)
        if (!puzzle) {
            return <img className={cl(styles.puzzle, styles.empty)} src={`/img/puzzles/puzzle-piece-${level}.png`} alt={`puzzle ${level}`}/>
        }

        const userPuzzle = userPuzzleLevels.find(p => p.level === level)
        const puzzleImg = `/img/puzzles/puzzle-${currentPuzzle.id}/${level}.png`;
        if (!userPuzzle) {
            return <img className={cl(styles.puzzle, styles.nonCollected)} src={puzzleImg} alt={`puzzle ${level}`}/>
        }

        return <img className={styles.puzzle} src={puzzleImg} alt={`puzzle ${level}`}/>
    }

    function renderCondition(puzzleLevel, isPuzzleCollected) {
        const isTask = puzzleLevel.condition_type === 'task';

        if (isPuzzleCollected) {
            return (
                <>
                    {puzzleLevel.condition_type === 'task'
                        ?
                        <span>{t('puzzle_collected')}</span>
                        :
                        <p>{puzzleLevel.frens_count ?? puzzleLevel.condition}/{puzzleLevel.condition}<span>{t('friends')}</span></p>}
                    <img src="/img/puzzles/complete-icon.png" alt="complete"/>
                </>
            )
        }

        if (isTask) {
            const task = tasks.find(t => t.id == puzzleLevel.condition)
            const taskCompleted = userTasks.some(t => t.id === task?.id)

            if (taskCompleted) {
                const isClaiming = loadingLevelId === puzzleLevel.id;
                return (
                    <button
                        className={cl(styles.startTaskBtn, 'gradientWrapper')}
                        onClick={() => onClaimPuzzle(puzzleLevel)}
                        disabled={isClaiming}
                    >
                        {isClaiming ? <Spinner color='#fff' size='sm'/> : 'Claim puzzle'}
                        <span className='gradient' style={{boxShadow: `0 0 50px 50px rgba(153, 214, 23, 0.5)`, bottom: '-30px'}}/>
                    </button>
                )
            }

            return (
                <button
                    className={cl(styles.startTaskBtn, 'gradientWrapper')}
                    onClick={() => onTaskClick(task)}
                >
                    {t('start_task')}
                    <span className='gradient' style={{boxShadow: `0 0 50px 50px rgba(153, 214, 23, 0.5)`, bottom: '-30px'}}/>
                </button>
            )
        }

        return (
            <>
                <p>{puzzleLevel.frens_count ?? 0}/{puzzleLevel.condition}<span>{t('friends')}</span></p>
                <img src="/img/puzzles/friends-icon.png" alt="friends"/>
            </>
        )
    }

    return (
        <>
            <div className={cl(styles.wrapper, 'gradientWrapper')}>

                <span
                    className='gradient'
                    style={{
                        boxShadow: `rgba(201, 142, 29, 0.5) 0px 0px 100px 80px`,
                        top: '-30px',
                    }}
                />

                <div className={styles.titleBlock}>
                    <h2>{t('unlock_puzzle')}</h2>
                    <p>{t('unlock_puzzle_desc')}</p>
                </div>

                <div className={styles.infoBlock} onClick={() => setInfoPopup(true)}>
                    <div className={styles.infoBlockLeft}>
                        <img src="/img/puzzles/new-coin-icon.png" alt="new coin"/>
                        <p>{t('what_new_coin')}</p>
                    </div>
                    <div className={styles.infoBlockRight}>
                        <img src="/img/arrow-right.png" alt="arrow"/>
                    </div>
                </div>

                <hr className={styles.infoBlockHr}/>

                <LoaderBlock
                    loading={isLoading}
                    height='200px'
                >
                    <div className={styles.puzzlesBlock}>
                        <div className={styles.puzzles}>
                            {renderPuzzle(1)}
                            {renderPuzzle(2)}
                            {renderPuzzle(3)}
                            {renderPuzzle(4)}
                            {renderPuzzle(5)}
                            {renderPuzzle(6)}
                        </div>
                        <p className={styles.puzzlesDesc}>{currentPuzzle?.title}</p>

                        <div className={cl(styles.conditions, [expandedConditions && styles.expanded])}>
                            {currentPuzzle?.puzzle_Levels?.map(puzzleLevel => {

                                const isPuzzleCollected = userPuzzleLevels.some(p => p.level === puzzleLevel.level)

                                return (
                                    <div key={puzzleLevel.level} className={styles.condition}>
                                        <p className={styles.conditionLabel}>{t('piece')} #{puzzleLevel.level}</p>
                                        <div className={styles.conditionRight}>
                                            {renderCondition(puzzleLevel, isPuzzleCollected)}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className={cl(styles.expand, [expandedConditions && styles.expanded])}
                             onClick={expandConditions}>
                            <p>{t('expand')}</p>
                            <img src="/img/puzzles/arrow-bottom.png" alt="arrow bottom"/>
                        </div>

                    </div>
                </LoaderBlock>

            </div>

            {/*<ClaimBtn isAds={false} className={styles.taskBtn}>Invite friends</ClaimBtn>*/}
            {createPortal(
                <div className={styles.inviteFriendBtnWrapper}>
                    <motion.button
                        animate={{
                            y: 0,
                            scale: [0.98, 1.02, 0.98],
                            repeatDur: 1,
                        }}
                        transition={{
                            duration: 1.5, // Duration of the animation cycle
                            repeat: Infinity, // Repeat the animation infinitely
                            repeatType: "loop", // Loop the animation
                            ease: "easeInOut" // Easing function
                        }}
                        className={cl(styles.inviteFriendBtn, 'gradientWrapper')} onClick={onInviteFriend}
                    >
                        {t('invite_fren')}
                        <span
                            className='gradient'
                            style={{
                                boxShadow: `0 0 50px 50px rgba(153, 214, 23, 0.61)`,
                                bottom: '-30px'
                            }}
                        />
                    </motion.button>
                </div>,
                // @ts-ignore
                document.getElementById('root')
            )}

            <Popup isOpen={isInfoPopup} onClose={() => setInfoPopup(false)}>
                <NewCoinPopup
                    onClosePopup={() => setInfoPopup(false)}
                />
            </Popup>

            <Popup isOpen={selectedTask !== null && !selectedTask?.type?.includes('invite_')} onClose={onTaskClose}>
                <JoinPopup
                    task={selectedTask}
                    onCompleteTask={onCompleteTask}
                />
            </Popup>

            <Popup isOpen={claimedPuzzleLevel !== null} onClose={() => setClaimedPuzzleLevel(null)}>
                <PuzzleClaimedPopup
                    puzzleLevel={claimedPuzzleLevel!}
                    onClosePopup={() => setClaimedPuzzleLevel(null)}
                />
            </Popup>
        </>
    );
};
