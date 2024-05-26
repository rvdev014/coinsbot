import React from 'react';
import {Spinner} from "@chakra-ui/react";
import {UI_COLOR} from "../../consts.ts";

export const Loader = ({withText = false}) => {
    return (
        <div className='AppLoader'>
            <div className='loaderBlock'>
                <Spinner color={UI_COLOR} size='xl'/>
                {withText && <p>Loading...</p>}
            </div>
        </div>
    );
};