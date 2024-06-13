export function testDate() {
    // date 10 seconds greater than now
    return new Date(new Date().getTime() + 10000);
}

export function parseStr2Date(dateStr: string, withTimezone = true) {
    if (!withTimezone) {
        const dateWithTimeZone = new Date(dateStr);
        const userTimezoneOffset = dateWithTimeZone.getTimezoneOffset() * 60000;
        return new Date(dateWithTimeZone.getTime() + userTimezoneOffset);
    }
    return new Date(dateStr);
}

export function dateGreaterThan(date1?: string|Date, date2?: string|Date) {
    console.log('date1', date1)
    if (!date1) return false;
    if (!date2) {
        return new Date(date1) > new Date();
    }
    return new Date(date1) > new Date(date2);
}

export function getDayDiffFromNow(date: string, abs = true) {
    const fromDate = new Date(date);
    const timezoneOffset = fromDate.getTimezoneOffset() * 60000;
    const now = new Date(fromDate.getTime() + timezoneOffset);
    const givenDate = new Date(Date.now() + timezoneOffset);

    console.log('givenDate', givenDate)
    console.log('now', now)

    // Normalize both dates to the start of the day (midnight)
    now.setHours(0, 0, 0, 0);
    givenDate.setHours(0, 0, 0, 0);

    // Calculate the difference in milliseconds and convert to days
    const diffInMillis = now.getTime() - givenDate.getTime();
    const diffInDays = diffInMillis / (1000 * 60 * 60 * 24);

    // Return the absolute value of the difference if abs is true, otherwise return the difference
    return abs ? Math.abs(diffInDays) : diffInDays;
}

export function checkDatesEqual(date1: Date, date2: Date, withDay = false) {
    return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        (withDay ? date1.getDate() === date2.getDate() : true);
}
