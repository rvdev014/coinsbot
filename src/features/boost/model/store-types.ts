export type BoostType = 'restore_energy' | 'energy_turbo' | 'coins_per_tap' | 'multi_tap' | 'turbo' | 'energy_limit';
export interface IBoostInfo {
    coins: number;
    can_update: boolean;
}

export interface IBoostStore {
    isSubmitLoading: boolean;
    isRestoreEnergyClaimDisabled: boolean;
    popupType: BoostType | null;

    onBoosterClick: (type: BoostType) => void;
    onClosePopup: () => void;
    onMultiTapUpgrade: () => void;
    onCoinsPerTapUpgrade: () => void;
    onEnergyLimitUpgrade: () => void;
    onTurboEnergyUpdate: () => void;
    onMiningUpgrade: () => void;
    onFullEnergyUpgrade: () => void;

    checkRestoreEnergyClaimDisabled: () => void;

    init: () => Promise<void>;
    reset: () => void;
}
