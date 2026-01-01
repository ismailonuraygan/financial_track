// Map common currency symbols to ISO codes
const currencySymbolToCode: Record<string, string> = {
	$: 'USD',
	'€': 'EUR',
	'£': 'GBP',
	'¥': 'JPY',
	'₺': 'TRY',
	'₹': 'INR',
};

// Validate if a string is a valid ISO 4217 currency code (3 uppercase letters)
const isValidCurrencyCode = (code: string): boolean => {
	return /^[A-Z]{3}$/.test(code);
};

/**
 * Format amount with currency using Intl.NumberFormat
 * Supports different currencies (USD, EUR, TRY, etc.)
 * Also handles currency symbols ($, €, etc.) by converting them to ISO codes
 */
export const formatCurrency = (
	amount: number,
	currency: string = 'USD',
	options?: {
		showSign?: boolean;
		locale?: string;
	}
): string => {
	const { showSign = false, locale = 'en-US' } = options || {};

	// Normalize currency - convert symbols to ISO codes
	let normalizedCurrency = currency?.trim() || 'USD';

	// If it's a symbol, convert to ISO code
	if (currencySymbolToCode[normalizedCurrency]) {
		normalizedCurrency = currencySymbolToCode[normalizedCurrency];
	}

	// If still not a valid ISO code, fallback to USD
	if (!isValidCurrencyCode(normalizedCurrency)) {
		console.warn(`Invalid currency code: "${currency}", falling back to USD`);
		normalizedCurrency = 'USD';
	}

	const formatted = new Intl.NumberFormat(locale, {
		style: 'currency',
		currency: normalizedCurrency,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(Math.abs(amount));

	if (showSign) {
		const sign = amount < 0 ? '- ' : '+ ';
		return `${sign}${formatted}`;
	}

	return formatted;
};

/**
 * Format date to readable string
 */
export const formatDate = (dateString: string, options?: Intl.DateTimeFormatOptions): string => {
	const date = new Date(dateString);
	const defaultOptions: Intl.DateTimeFormatOptions = {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
	};

	return date.toLocaleDateString('en-US', options || defaultOptions);
};

/**
 * Format time from date string
 */
export const formatTime = (dateString: string): string => {
	const date = new Date(dateString);
	return date.toLocaleTimeString('en-US', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	});
};
