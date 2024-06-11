import {createStandaloneToast} from "@chakra-ui/react";

export function preloadImages(images: string[]) {
    return new Promise((resolve, reject) => {
        let loadedCount = 0;
        const totalImages = images.length;

        if (totalImages === 0) {
            resolve(1);
            return;
        }

        images.forEach(url => {
            const img = new Image();
            img.src = url;
            img.onload = () => {
                loadedCount += 1;
                if (loadedCount === totalImages) {
                    resolve(1);
                }
            };
            img.onerror = () => {
                reject(new Error(`Failed to load image: ${url}`));
            };
        });
    });
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
export const formatNumber = (num: any) => {

    switch (true) {
        case num <= 1000:
            num = 0
            break
        case num < 1000000:
            num =  (num / 1000).toFixed(0) + 'K'
            break
        case num >= 1000000 && num < 1000000000:
            num =  (num / 1000000).toFixed(0) + 'M'
            break
        case num >= 1000000000:
            num =  (num / 1000000000).toFixed(0) + 'B+'
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
        // title: 'Error occurred.',
        description: message || "Request failed.",
        status: 'error',
        position: "top",
        duration: 9000,
        isClosable: true,
        size: 'small'
    })
}

export function hexToRgb(hex?: string, alpha: number = 1): string {
    if (!hex) return 'rgba(0,0,0,0)';
    const [r, g, b] = hex.match(/\w\w/g)!.map(x => parseInt(x, 16));
    return `rgba(${r},${g},${b},${alpha})`;
}