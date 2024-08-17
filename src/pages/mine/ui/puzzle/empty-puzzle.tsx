import React, {FC} from 'react';
import styles from './styles.module.scss'
import cl from "classnames";

interface IProps {
}

export const EmptyPuzzle: FC<IProps> = () => {
    function renderPuzzle(level: number) {
        const puzzleImg = `/img/puzzles/q-puzzle-piece-${level}.png`;
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