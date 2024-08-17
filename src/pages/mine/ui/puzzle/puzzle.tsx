import React, {FC} from 'react';
import styles from './styles.module.scss'
import {IPuzzle, IPuzzleLevel} from "../../../../shared/model/puzzles/store-types";
import cl from "classnames";

interface IProps {
    puzzle: IPuzzle;
    puzzleLevels: IPuzzleLevel[];
    userPuzzleLevels: IPuzzleLevel[];
}

export const Puzzle: FC<IProps> = ({puzzle, puzzleLevels, userPuzzleLevels}) => {
    function renderPuzzle(level: number) {
        const puzzleLevel = puzzleLevels.find(p => p.level === level)
        if (!puzzleLevel) {
            return <img className={cl(styles.puzzleLevel, styles.empty)} src={`/img/puzzles/puzzle-piece-${level}.png`} alt={`puzzle ${level}`}/>
        }

        const userPuzzle = userPuzzleLevels?.find(p => p.level === level)
        const puzzleImg = `/img/puzzles/puzzle-${puzzle.id}/${level}.png`;
        if (!userPuzzle) {
            return <img className={cl(styles.puzzleLevel, styles.nonCollected)} src={puzzleImg} alt={`puzzle ${level}`}/>
        }

        return <img className={styles.puzzleLevel} src={puzzleImg} alt={`puzzle ${level}`}/>
    }

    return (
        <div className={styles.puzzle}>
            {renderPuzzle(1)}
            {renderPuzzle(2)}
            {renderPuzzle(3)}
            {renderPuzzle(4)}
            {renderPuzzle(5)}
            {renderPuzzle(6)}
        </div>
    );
};