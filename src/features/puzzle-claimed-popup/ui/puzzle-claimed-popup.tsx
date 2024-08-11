import React, {FC} from 'react';
import styles from "./styles.module.scss";
import {ITask} from "../../../shared/model/earn/store-types.ts";
import {ClaimBtn} from "../../../shared/ui/claim-btn/claim-btn.tsx";
import {earnImgData} from "../../../shared/model/earn/utils.ts";
import {useTranslation} from "react-i18next";
import {IPuzzleLevel} from "../../../shared/model/puzzles/store-types";
import {rewards} from "../utils/consts";
import cl from "classnames";

interface IProps {
    puzzleLevel: IPuzzleLevel;
    onClosePopup: () => void;
}

export const PuzzleClaimedPopup: FC<IProps> = ({puzzleLevel, onClosePopup}) => {
    const {t} = useTranslation();

    function renderReward() {
        const reward = rewards[puzzleLevel.reward];
        if (!reward) {
            return null;
        }

        return (
            <div className={cl(styles.reward, 'gradientWrapper')}>
                <img src={reward.icon} alt={reward.title}/>
                <p>{reward.title}</p>

                <span
                    className='gradient'
                    style={{
                        boxShadow: `rgba(62, 136, 247, 0.5) 0px 0px 100px 60px`,
                        bottom: '-30px',
                        left: 0
                    }}
                />
            </div>
        );
    }

    return (
        <div className={styles.content}>
            <img
                className={styles.icon}
                src={`/img/puzzles/puzzle-${puzzleLevel.puzzle_id}/${puzzleLevel.level}.png`}
                alt="Task tg"
            />
            <h2 className={styles.title}>Congratulations</h2>
            <p className={styles.text}>
                You have successfully got a piece of the puzzle and additional prize
            </p>

            {renderReward()}

            <ClaimBtn isAds={false} onClick={onClosePopup}>
                {t('thanks')} <span>❤️</span>
            </ClaimBtn>
        </div>
    );
};