import {createStandaloneToast} from "@chakra-ui/react";

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
export const formatNumber = (num: any) => {

    switch (true) {
        case num <= 1000:
            num = 0
            break
        case num < 1000000:
            num =  (num / 1000).toFixed(0) + ' K'
            break
        case num >= 1000000 && num < 1000000000:
            num =  (num / 1000000).toFixed(0) + ' M'
            break
        case num >= 1000000000:
            num =  (num / 1000000000).toFixed(0) + ' B+'
            break
        default:
            num?.toString()
    }

    return num
};

export function formatPrice(amount: number): string {
    if (!amount) return '0';
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

const {toast} = createStandaloneToast()

export function success(message?: string) {
    toast({
        title: 'Success.',
        description: message || "Request completed successfully.",
        status: 'success',
        position: "top",
        duration: 3000,
        isClosable: true,
    })
}

export function showError(message?: string) {
    toast({
        title: 'Error occurred.',
        description: message || "Request failed.",
        status: 'error',
        position: "top",
        duration: 9000,
        isClosable: true,
    })
}