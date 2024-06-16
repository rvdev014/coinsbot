import React, {FC} from 'react';
import styles from './balance.module.scss';
import cl from "classnames";
import {formatPrice} from "../../utils/other.ts";

interface IProps {
    value: number;
    width?: string;
    spaceWidth?: string;
    className?: string;
    classNameWrapper?: string;
}

export const Balance: FC<IProps> = (
    {
        value,
        width = '25px',
        spaceWidth = '6px',
        classNameWrapper,
        className
    }
) => {
    return (
        <div className={cl(styles.balance, classNameWrapper)}>
            {formatPrice(value).split('').map((item, index) => (
                <div
                    key={index}
                    style={{width: item === ' ' ? spaceWidth : width}}
                    className={cl(styles.balanceItem, className)}
                >{item}</div>
            ))}
        </div>
    );
};