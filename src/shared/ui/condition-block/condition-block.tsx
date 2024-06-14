import React, {FC, ReactNode} from 'react';
import {Loader} from "../loader/loader.tsx";

interface IProps {
    condition: boolean;
    children: ReactNode;
    emptyContent?: ReactNode | string;
}

export const ConditionBlock: FC<IProps> = ({condition, emptyContent = '', children}) => {
    if (!condition) {
        return (
            <>{emptyContent}</>
        )
    }

    return <>{children}</>;
};