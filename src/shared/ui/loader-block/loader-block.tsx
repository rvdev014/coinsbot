import React, {FC, ReactNode} from 'react';
import {Loader} from "../loader/loader.tsx";

interface IProps {
    loading: boolean;
    children: ReactNode;
    height?: string;
}

export const LoaderBlock: FC<IProps> = ({loading, children, ...props}) => {
    if (loading) {
        return (
            <div style={{height: props.height}}>
                <Loader styles={{marginTop: props.height ? '0' : '30px'}}/>
            </div>
        )
    }

    return <>{children}</>;
};