import React, {FC, ReactNode} from 'react';
import {Loader} from "../loader/loader.tsx";

interface IProps {
    loading?: boolean;
    condition: boolean;
    children: ReactNode;
    emptyContent?: ReactNode | string;
}

export const ConditionBlock: FC<IProps> = ({loading, condition, emptyContent = '', children}) => {
    if (loading) {
        return <Loader/>
    }

    if (!condition) {
        return (
            <>{emptyContent}</>
        )
    }

    return <>{children}</>;
};