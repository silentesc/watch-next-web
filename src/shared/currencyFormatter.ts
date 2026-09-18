interface FormatOptions {
    locale?: string;
    currency?: string;
    maximumFractionDigits?: number;
}

export function formatCurrency(
    value: number | undefined | null,
    options: FormatOptions = {}
): string {
    if (value === undefined || value === null || Number.isNaN(value)) {
        return 'N/A';
    }

    const userLocale = options.locale ||
        (typeof navigator !== 'undefined' ? navigator.language : 'en-US');

    try {
        return new Intl.NumberFormat(userLocale, {
            style: 'currency',
            currency: options.currency || 'USD',
            maximumFractionDigits: options.maximumFractionDigits ?? 0,
        }).format(value);
    } catch {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: options.currency || 'USD',
            maximumFractionDigits: options.maximumFractionDigits ?? 0,
        }).format(value);
    }
}
