import React, {FC} from 'react';
import {Drawer, DrawerContent, DrawerOverlay} from "@chakra-ui/react";
import styles from "./styles.module.scss";


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
                <DrawerContent className={styles.wrapper}>
                    {children}
                    <button className={styles.close} onClick={onClose}>
                        <img src="/img/close.png" alt="Close"/>
                    </button>
                </DrawerContent>
            </Drawer>
        </div>
    );
};