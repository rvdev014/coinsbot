import {create} from "zustand";
import {IBoostStore} from "./store-types.ts";
import {createStandaloneToast, useToast} from "@chakra-ui/react";
import {showError, success} from "../../../shared/utils/other.ts";
import {CoinsApi} from "../../../shared/api/coins-api.ts";
import {useUserStore} from "../../../shared/model/user/store.ts";
import {apiInstance} from "../../../shared/api/axios.ts";

const initialStore = {
    isSubmitLoading: false,
    popupType: null,
} as IBoostStore;

export const useBoostStore = create<IBoostStore>((set, get) => {
    return {
        ...initialStore,

        onFullEnergyUpgrade: async () => {
            set({isSubmitLoading: true})
            try {
                const userId = useUserStore.getState().user_id;
                const user  = await CoinsApi.restoreEnergy(userId)
                set({popupType: null})
                useUserStore.getState().setInitialStore({...user})
                success('Energy restored successfully.')
            } catch (e) {
                showError()
            } finally {
                set({isSubmitLoading: false})
            }
        },

        onTurboEnergyUpdate: async () => {
            set({isSubmitLoading: true})
            try {
                const userId = useUserStore.getState().user_id;
                const user  = await CoinsApi.turboEnergyUpdate(userId, 500)
                useUserStore.getState().setInitialStore({...user})
                set({popupType: null})
                success('Turbo energy upgraded successfully.')
            } catch (e) {
                showError()
            } finally {
                set({isSubmitLoading: false})
            }
        },

        onCoinsPerTapUpgrade: async () => {
            set({isSubmitLoading: true})
            try {
                const userId = useUserStore.getState().user_id;
                const user  = await CoinsApi.coinsPerTapUpdate(userId, 500)
                useUserStore.getState().setInitialStore({...user})
                set({popupType: null})
                success('Coins per tap upgraded successfully.')
            } catch (e) {
                showError()
            } finally {
                set({isSubmitLoading: false})
            }
        },

        onMultiTapUpgrade: async () => {
            set({isSubmitLoading: true})
            try {
                const userId = useUserStore.getState().user_id;
                const user  = await CoinsApi.multiTapUpdate(userId, 500)
                useUserStore.getState().setInitialStore({...user})
                set({popupType: null})
                success('Multi tap upgraded successfully.')
            } catch (e) {
                showError()
            } finally {
                set({isSubmitLoading: false})
            }
        },

        onMiningUpgrade: async () => {
            set({isSubmitLoading: true})
            try {
                const userId = useUserStore.getState().user_id;
                const user  = await CoinsApi.miningUpdate(userId, 500)
                useUserStore.getState().setInitialStore({...user})
                set({popupType: null})
                success('Mining started successfully.')
            } catch (e) {
                showError()
            } finally {
                set({isSubmitLoading: false})
            }
        },

        onEnergyLimitUpgrade: async () => {
            set({isSubmitLoading: true})
            try {
                const userId = useUserStore.getState().user_id;
                const user  = await CoinsApi.energyLimitUpdate(userId, 500)
                useUserStore.getState().setInitialStore({...user})
                set({popupType: null})
                success('Energy limit upgraded successfully.')
            } catch (e) {
                showError()
            } finally {
                set({isSubmitLoading: false})
            }
        },

        onBoosterClick: async (popupType) => {
            set({popupType})
        },

        onClosePopup: async () => {
            set({popupType: null})
        }
    }
})