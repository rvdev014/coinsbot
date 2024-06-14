import React, {FC, ReactNode} from 'react';
import {Loader} from "../loader/loader.tsx";

interface IProps {
    loading: boolean;
    children: ReactNode;
}

export const LoaderBlock: FC<IProps> = ({loading, children}) => {
    if (loading) {
        return <Loader/>
    }

    return <>{children}</>;
};