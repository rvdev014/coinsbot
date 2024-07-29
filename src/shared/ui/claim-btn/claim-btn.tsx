import React, {FC, ReactNode, useCallback, useRef} from 'react';
import {Spinner} from "@chakra-ui/react";
import cl from "classnames";
import {t} from "i18next";
import {ADS_GRAM_ID} from "../../consts.ts";

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

    const showAds = () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        // eslint-disable-next-line react-hooks/rules-of-hooks,react-hooks/exhaustive-deps
        const onReward = useCallback(() => {
            onClick()
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        // eslint-disable-next-line react-hooks/rules-of-hooks,react-hooks/exhaustive-deps
        const onError = useCallback(() => {
            alert(t('error_ads'));
        });

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const AdControllerRef = useRef<any>(undefined);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        AdControllerRef.current = window.Adsgram?.init({ blockId: ADS_GRAM_ID, debug: false, debugBannerType: 'FullscreenMedia' });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // eslint-disable-next-line react-hooks/rules-of-hooks,react-hooks/exhaustive-deps
        return useCallback(async () => {

            if (AdControllerRef.current) {
                AdControllerRef.current
                    .show()
                    .then(() => {
                        onReward();
                    })
                    .catch(() => {
                        onError?.();
                    });
            } else {
                onError?.();
            }
        }, [onError, onReward]);
    }

    return (
        <button className={cl('claimBtn', 'gradientWrapper', props.className)} onClick={showAds()}>
            {loading ? <Spinner color='#fff' size='md'/> : props.children}
            <span className='gradient' style={{boxShadow: `0 0 50px 50px rgba(153, 214, 23, 0.5)`, bottom: '-30px'}}/>
        </button>
    );
};