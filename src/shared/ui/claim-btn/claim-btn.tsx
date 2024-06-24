import React, {FC, ReactNode} from 'react';
import {Spinner} from "@chakra-ui/react";
import cl from "classnames";
import {useTranslation} from "react-i18next";

interface IProps {
    disabled?: boolean;
    disabledContent?: ReactNode | string;
    loading?: boolean;
    onClick: () => void;
    children: ReactNode;
    className?: string;
}

export const ClaimBtn: FC<IProps> = (
    {disabled, disabledContent, loading, onClick, ...props}
) => {
    if (disabled) {
        return (
            <button className={cl('claimBtn', props.className)} disabled={true}>{disabledContent ?? props.children}</button>
        );
    }

    return (
        <button className={cl('claimBtn', 'gradientWrapper', props.className)} onClick={!loading ? onClick : () => {}}>
            {loading ? <Spinner color='#fff' size='md'/> : props.children}
            <span className='gradient' style={{boxShadow: `0 0 50px 50px rgba(153, 214, 23, 0.5)`, bottom: '-30px'}}/>
        </button>
    );
};