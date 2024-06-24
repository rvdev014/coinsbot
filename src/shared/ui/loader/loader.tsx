import React from 'react';
import {Spinner} from "@chakra-ui/react";
import {UI_COLOR} from "../../consts.ts";
import {useTranslation} from "react-i18next";

export const Loader = ({withText = false, size = 'md', styles = {}}) => {
    const {t} = useTranslation();
    return (
        <div className='AppLoader' style={{...styles}}>
            <div className='loaderBlock'>
                <Spinner color={UI_COLOR} size={size}/>
                {withText && <p>{t('loading')}...</p>}
            </div>
        </div>
    );
};