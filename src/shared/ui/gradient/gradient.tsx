import React, {FC, ReactNode} from 'react';
import './gradient.scss';

interface IProps {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
    boxShadow?: string;
    children: FC<{children: ReactNode}>;
}

export const Gradient: FC<IProps> = ({...props}) => {
    return (
        <div className='gradientWrapper'>
            <props.children>
                <span
                    className='gradient'
                    style={{
                        top: props.top,
                        bottom: props.bottom,
                        left: props.left,
                        right: props.right,
                        boxShadow: props.boxShadow
                    }}
                ></span>
            </props.children>
        </div>
    );
};
