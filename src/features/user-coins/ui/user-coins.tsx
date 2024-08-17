import React, {FC} from 'react';
import {useUserStore} from "../../../shared/model/user/store.ts";

interface IProps {
    golden: boolean
    children: FC<{coins: number}>
}

export const UserCoins:FC<IProps> = ({golden, ...props}) => {
    const coins = useUserStore(state => state.coins);
    const goldenCoins = useUserStore(state => state.g_coins);
    return <props.children coins={golden ? goldenCoins : coins}/>;
};
