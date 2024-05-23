export interface IExchangeStore {
    balance: number,
    amountPerTap: number,
    amountPerHour: number,
    level: ILevel,
    nextLevel: ILevel,
    maxLevelNumber: number,

    currentEnergy: number,
    energyLimit: number,

    onTap(): void;
    initExchange(): void;
    reset(): void;
}

export interface ILevel {
    number: number;
    name: string;
    minAmount: number;
}