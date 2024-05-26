export interface IExchangeStore {
    tappedCoins: number;
    energyTimeout: number | null;

    initExchange(): void;
    onTap(): void;
    onTapEnd(): void;
    initExchange(): void;
    reset(): void;
}