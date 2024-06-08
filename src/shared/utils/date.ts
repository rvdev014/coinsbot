export function parseStr2Date(dateStr: string, withTimezone = true) {
    if (!withTimezone) {
        const dateWithTimeZone = new Date(dateStr);
        const userTimezoneOffset = dateWithTimeZone.getTimezoneOffset() * 60000;
        return new Date(dateWithTimeZone.getTime() + userTimezoneOffset);
    }
    return new Date(dateStr);
}

export function generateTimeDiff(timeTo: string) {
    const date = new Date().getTime();
    const toDate = new Date(timeTo).getTime();
    const diff = date - toDate;
    const hours = 6 - (diff / 1000 / 60 / 60);
    const minutes = 60 - (diff / 1000 / 60 % 60);
    return `Wait ${Math.floor(hours)}h ${Math.floor(minutes)}m`
}

export function dateGreaterThan(date1: string, date2?: string) {
    if (!date2) return new Date(date1) > new Date();
    return new Date(date1) > new Date(date2);
}

export function getDayDiffFromNow(date1: string, abs = true) {
    const diff = (new Date(date1).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24);
    return Math.floor(abs ? Math.abs(diff) : diff);
}

export function checkDatesEqual(date1: Date, date2: Date, withDay = false) {
    return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        (withDay ? date1.getDate() === date2.getDate() : true);
}