import React, {FC, ReactNode} from 'react';
import {t} from "i18next";
import {Spinner} from "@chakra-ui/react";

interface IProps {
    disabled?: boolean;
    disabledContent?: ReactNode | string;
    loading?: boolean;
    onClick: () => void;
    children: ReactNode;
}

export const ClaimBtn: FC<IProps> = (
    {disabled, disabledContent = '', loading, onClick, ...props}
) => {

    if (disabled) {
        return (
            <button className='claimBtn' disabled={true}>{disabledContent}</button>
        );
    }

    return (
        <button className='claimBtn gradientWrapper' onClick={!loading ? onClick : () => {}}>
            {loading ? <Spinner color='#fff' size='md'/> : props.children}
            <span className='gradient' style={{boxShadow: `0 0 100px 50px rgba(153, 214, 23, 0.5)`}}/>
        </button>
    );
};