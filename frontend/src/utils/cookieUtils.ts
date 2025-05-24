export const getCookieConsent = (): string | null => {
	if (typeof window !== 'undefined') {
		const fromLocalStorage = localStorage.getItem('cookie_consent')
		const fromCookies = document.cookie
			.split('; ')
			.find(row => row.startsWith('gdpr-consent='))
			?.split('=')[1]

		return fromLocalStorage || fromCookies || null
	}
	return null
}

export const setCookieConsent = (value: string): void => {
	if (typeof window !== 'undefined') {
		localStorage.setItem('cookie_consent', value)
		document.cookie = `gdpr-consent=${value}; max-age=${
			365 * 24 * 60 * 60
		}; path=/; SameSite=Lax`
	}
}

export const checkConsent = (type: 'analytics' | 'marketing'): boolean => {
	const consent = getCookieConsent()
	if (!consent) return false

	try {
		const parsed = JSON.parse(consent)
		return parsed[type] === true
	} catch {
		return false
	}
}
