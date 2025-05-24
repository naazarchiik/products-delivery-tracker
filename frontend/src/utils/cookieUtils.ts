/**
 * Retrieves the user's cookie consent settings from localStorage or cookies.
 *
 * @returns The consent string if found, otherwise null.
 */
export const getCookieConsent = (): string | null => {
	if (typeof window !== 'undefined') {
		const fromLocalStorage = localStorage.getItem('cookie_consent');
		const fromCookies = document.cookie
			.split('; ')
			.find((row) => row.startsWith('gdpr-consent='))
			?.split('=')[1];

		return fromLocalStorage || fromCookies || null;
	}
	return null;
};

/**
 * Retrieves the user's cookie consent settings from localStorage or cookies.
 *
 * @returns The consent string if found, otherwise null.
 */
export const setCookieConsent = (value: string): void => {
	if (typeof window !== 'undefined') {
		localStorage.setItem('cookie_consent', value);
		document.cookie = `gdpr-consent=${value}; max-age=${
			365 * 24 * 60 * 60
		}; path=/; SameSite=Lax`;
	}
};

/**
 * Checks if the user has given consent for a specific cookie type.
 *
 * @param type - The type of consent to check ('analytics' or 'marketing').
 * @returns True if consent is given for the specified type, otherwise false.
 */
export const checkConsent = (type: 'analytics' | 'marketing'): boolean => {
	const consent = getCookieConsent();
	if (!consent) return false;

	try {
		const parsed = JSON.parse(consent);
		return parsed[type] === true;
	} catch {
		return false;
	}
};
