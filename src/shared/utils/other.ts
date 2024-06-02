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
            num.toString()
    }

    return num
};