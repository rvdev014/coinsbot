import {create} from "zustand";
import {IExchangeStore, ILevel} from "./store-types.ts";

const initialStore = {
    balance: 0,
    amountPerTap: 1,
    amountPerHour: 1,
    level: {} as ILevel,
    nextLevel: {} as ILevel,
} as IExchangeStore;

let energyTimeout: number | null = null;

export const useExchangeStore = create<IExchangeStore>((set, get) => {
    return {
        ...initialStore,
        onTap: () => {

            let balance = get().balance + get().amountPerTap;
            let currentEnergy = get().currentEnergy - get().amountPerTap;
            if (currentEnergy < 0) {
                currentEnergy = 0;
                balance = get().balance;
            }

            set({
                balance,
                currentEnergy
            })
        },
        initExchange() {
            try {
                const level = {
                    number: 1,
                    name: 'Silver',
                    minAmount: 1000
                };
                const nextLevel = {
                    number: 2,
                    name: 'Gold',
                    minAmount: 2000
                };
                set({
                    balance: 100,
                    amountPerTap: 2,
                    amountPerHour: 50,
                    level,
                    nextLevel,
                    maxLevelNumber: 9,

                    currentEnergy: 1000,
                    energyLimit: 2000,
                });

                if (!energyTimeout) {
                    energyTimeout = setInterval(() => {
                        let currentEnergy = get().currentEnergy + 3;
                        if (currentEnergy > get().energyLimit) {
                            currentEnergy = get().energyLimit;
                        }
                        set({currentEnergy});
                    }, 1000);
                }
            } catch (e) {
                console.log('e', e)
            }
        },
        reset: () => set(initialStore),
    }
});