export interface IExchangeStore {
    tappedCoins: number;

    onTap(): void;
    onTapEnd(): void;
    reset(): void;

    storeBalance(balance: number): Promise<void>;
}