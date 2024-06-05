export type BoostType = 'full_energy' | 'turbo_energy' | 'multitap' | 'upgrade_energy' | 'mining';

export interface IBoostStore {
    popupType: BoostType | null;

    onBoosterClick: (type: BoostType) => void;
    onClosePopup: () => void;
    onMultiTapUpgrade: () => void;
    onEnergyLimitUpgrade: (price: number) => void;
    onTurboEnergyUpdate: () => void;
    onMiningUpgrade: () => void;
    onFullEnergyUpgrade: () => void;

    init(): Promise<void>;
    reset(): void;
}