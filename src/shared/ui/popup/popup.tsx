import React, {FC} from 'react';
import {Drawer, DrawerContent, DrawerOverlay} from "@chakra-ui/react";
import styles from "./styles.module.scss";
import cl from "classnames";


interface IProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const Popup: FC<IProps> = ({isOpen, onClose, children}) => {
    return (
        <div>
            <Drawer placement='bottom' onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent className={cl(styles.wrapper, 'gradientWrapper')}>
                    {children}
                    <button className={styles.close} onClick={onClose}>
                        <img src="/img/close.png" alt="Close"/>
                    </button>
                    <span
                        className='gradient'
                        style={{
                            top: 0,
                            boxShadow: `0 0 100px 50px rgba(251, 189, 70, 0.5)`
                    }}
                    />
                </DrawerContent>
            </Drawer>
        </div>
    );
};