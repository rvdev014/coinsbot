import {create} from "zustand";
import {IBoostStore} from "./store-types.ts";
import {createStandaloneToast, useToast} from "@chakra-ui/react";
import {showError, success} from "../../../shared/utils/other.ts";
import {CoinsApi} from "../../../shared/api/coins-api.ts";
import {useUserStore} from "../../../shared/model/user/store.ts";
import {apiInstance} from "../../../shared/api/axios.ts";
import {dateGreaterThan} from "../../../shared/utils/date.ts";

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
                const user  = await CoinsApi.restoreEnergy(userId);
                if (user) {
                    set({popupType: null})
                    useUserStore.getState().setInitialStore({...user}, true)

                    get().checkRestoreEnergyClaimDisabled()

                    success('Energy restored successfully.')
                }
            } catch (e) {
                showError()
            } finally {
                set({isSubmitLoading: false})
            }
        },

        checkRestoreEnergyClaimDisabled: async () => {
            const restoreEnergyAt = new Date(useUserStore.getState().restore_energy_at)
            restoreEnergyAt.setHours(restoreEnergyAt.getHours() + 6);

            set({isRestoreEnergyClaimDisabled: dateGreaterThan(restoreEnergyAt)})
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
