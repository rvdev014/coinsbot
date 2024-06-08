import {create} from "zustand";
import {IBoostStore} from "./store-types.ts";
import {createStandaloneToast, useToast} from "@chakra-ui/react";
import {showError, success} from "../../../shared/utils/other.ts";
import {CoinsApi} from "../../../shared/api/coins-api.ts";
import {useUserStore} from "../../../shared/model/user/store.ts";
import {apiInstance} from "../../../shared/api/axios.ts";

const initialStore = {} as IBoostStore;

const { toast } = createStandaloneToast()

export const useBoostStore = create<IBoostStore>((set, get) => {
    return {
        ...initialStore,

        onFullEnergyUpgrade: async () => {
            try {
                const userId = useUserStore.getState().user_id;
                const user  = await CoinsApi.restoreEnergy(userId)
                useUserStore.getState().setInitialStore({...user})
                set({popupType: null})
                success('Energy restored successfully.')
            } catch (e) {
                showError()
            }
        },

        onTurboEnergyUpdate: async () => {
            try {
                const userId = useUserStore.getState().user_id;
                const user  = await CoinsApi.turboEnergyUpdate(userId, 500)
                useUserStore.getState().setInitialStore({...user})
                set({popupType: null})
                success('Turbo energy upgraded successfully.')
            } catch (e) {
                showError()
            }
        },

        onCoinsPerTapUpgrade: async () => {
            try {
                const userId = useUserStore.getState().user_id;
                const user  = await CoinsApi.coinsPerTapUpdate(userId, 500)
                useUserStore.getState().setInitialStore({...user})
                set({popupType: null})
                success('Coins per tap upgraded successfully.')
            } catch (e) {
                showError()
            }
        },

        onMultiTapUpgrade: async () => {
            try {
                const userId = useUserStore.getState().user_id;
                const user  = await CoinsApi.multiTapUpdate(userId, 500)
                useUserStore.getState().setInitialStore({...user})
                set({popupType: null})
                success('Multi tap upgraded successfully.')
            } catch (e) {
                showError()
            }
        },

        onMiningUpgrade: async () => {
            try {
                const userId = useUserStore.getState().user_id;
                const user  = await CoinsApi.miningUpdate(userId, 500)
                useUserStore.getState().setInitialStore({...user})
                set({popupType: null})
                success('Mining started successfully.')
            } catch (e) {
                showError()
            }
        },

        onEnergyLimitUpgrade: async (price) => {
            try {
                const userId = useUserStore.getState().user_id;
                const user  = await CoinsApi.energyLimitUpdate(userId, price)
                useUserStore.getState().setInitialStore({...user})
                set({popupType: null})
                success('Energy limit upgraded successfully.')
            } catch (e) {
                showError()
            }
        },

        onBoosterClick: async (popupType) => {
            set({popupType})
        },

        onClosePopup: async () => {
            set({popupType: null})
        },

        init: async () => {
            try {

            } catch (e) {
                showError()
            }
        }
    }
})