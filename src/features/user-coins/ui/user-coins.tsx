import React, {FC} from 'react';
import {useUserStore} from "../../../shared/model/user/store.ts";

interface IProps {
    children: FC<{coins: number}>
}

export const UserCoins:FC<IProps> = ({...props}) => {
    const coins = useUserStore(state => state.coins);
    return <props.children coins={coins}/>;
};
