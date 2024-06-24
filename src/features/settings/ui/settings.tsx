import React from 'react';
import styles from './styles.module.scss';
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select
} from "@chakra-ui/react";
import cl from "classnames";
import {ClaimBtn} from "../../../shared/ui/claim-btn/claim-btn.tsx";
import {useUserStore} from "../../../shared/model/user/store.ts";
import {showError} from "../../../shared/utils/other.ts";
import {useTranslation} from "react-i18next";

export const Settings = () => {
    const {t} = useTranslation();

    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [changed, setChanged] = React.useState(false);
    const [lang, setLang] = React.useState(useUserStore.getState().language_code);

    async function onSave() {
        try {
            setLoading(true);
            await useUserStore.getState().changeLang({language_code: lang});
        } catch (e) {
            showError();
        } finally {
            setOpen(false);
            setLoading(false);
        }
    }

    function onChangeLang(e: React.ChangeEvent<HTMLSelectElement>) {
        setLang(e.target.value);
        setChanged(true);
    }

    function onBtnClick() {
        setOpen(true);
        setChanged(false);
    }

    function onClose() {
        setOpen(false);
        setChanged(false);
        setLang(useUserStore.getState().language_code);
    }

    return (
        <>
            <button className={styles.btn} onClick={onBtnClick}>⚙️</button>
            <Modal
                isOpen={open}
                onClose={onClose}
                isCentered
                motionPreset='slideInBottom'
                size='xs'
            >
                <ModalOverlay/>
                <ModalContent className={cl(styles.wrapper, 'gradientWrapper')}>
                    <ModalHeader className={styles.header}>{t('Settings')}</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <p className={styles.label}>{t('change_lang')}</p>
                        <Select
                            className={styles.select}
                            value={lang}
                            onChange={onChangeLang}
                            size='md'
                        >
                            <option value='en'>{t('english')}</option>
                            <option value='ru'>{t('russian')}</option>
                        </Select>
                    </ModalBody>

                    <span
                        className='gradient'
                        style={{
                            top: 0,
                            boxShadow: `0 0 100px 50px rgba(251, 189, 70, 0.5)`
                        }}
                    />
                    <ModalFooter>
                        <ClaimBtn
                            onClick={onSave}
                            loading={loading}
                            disabled={!changed}
                            className={styles.saveBtn}
                        >{t('save')}</ClaimBtn>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};