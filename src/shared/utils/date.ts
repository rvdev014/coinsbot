export function parseStr2Date(dateStr: string, withTimezone = true) {
    if (!withTimezone) {
        const dateWithTimeZone = new Date(dateStr);
        const userTimezoneOffset = dateWithTimeZone.getTimezoneOffset() * 60000;
        return new Date(dateWithTimeZone.getTime() + userTimezoneOffset);
    }
    return new Date(dateStr);
}