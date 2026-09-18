export type DateStyle = 'short' | 'medium' | 'long' | 'full';

interface FormatOptions {
    locale?: string;
    timeZone?: string;
}

/**
 * Formats a date, trying user locale first and falling back when necessary
 */
export function formatDate(
    date: Date | string | number,
    style: DateStyle = 'medium',
    options: FormatOptions = {}
): string {
    const dateObj = date instanceof Date ? date : new Date(date);

    if (isNaN(dateObj.getTime())) {
        return 'Invalid Date';
    }

    const userLocale = options.locale ||
        (typeof navigator !== 'undefined' ? navigator.language : 'en-US');

    const formatter = new Intl.DateTimeFormat(userLocale, {
        dateStyle: style,
        timeZone: options.timeZone,
    });

    return formatter.format(dateObj);
}

/**
 * Formats both date and time, trying user locale first and falling back when necessary
 */
export function formatDateTime(
    date: Date | string | number,
    dateStyle: DateStyle = 'medium',
    timeStyle: DateStyle = 'short',
    options: FormatOptions = {}
): string {
    const dateObj = date instanceof Date ? date : new Date(date);
    if (isNaN(dateObj.getTime())) return 'Invalid Date';

    const userLocale = options.locale ||
        (typeof navigator !== 'undefined' ? navigator.language : 'en-US');

    const formatter = new Intl.DateTimeFormat(userLocale, {
        dateStyle,
        timeStyle,
        timeZone: options.timeZone,
    });

    return formatter.format(dateObj);
}
