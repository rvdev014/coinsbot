export interface IExchangeStore {
    tapped: number;

    onTap: () => void;
    onTapEnd: () => void;
    reset: () => void;

    storeBalance: (balance: number) => Promise<void>;
}
