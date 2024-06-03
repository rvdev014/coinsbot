export interface IExchangeStore {
    tappedCoins: number;
    energyTimeout: number | null;
    coinsTimeout: number | null;

    initExchange(): void;
    onTap(): void;
    onTapEnd(): void;
    reset(): void;
}