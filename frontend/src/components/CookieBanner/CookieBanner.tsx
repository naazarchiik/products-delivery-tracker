import { useEffect, useState, type JSX } from 'react';
import CookieConsent from 'react-cookie-consent';
import { getCookieConsent, setCookieConsent } from '../../utils/cookieUtils';
import styles from './CookieBanner.module.css';

/**
 * Consent settings for cookies.
 * @property necessary - Whether necessary cookies are enabled (always true).
 * @property analytics - Whether analytics cookies are enabled.
 * @property marketing - Whether marketing cookies are enabled.
 */
interface ConsentSettings {
	necessary: boolean;
	analytics: boolean;
	marketing: boolean;
}

/**
 * CookieBanner component displays a GDPR-compliant cookie consent banner.
 * Allows users to accept all cookies, decline all except necessary, or customize their preferences.
 *
 * @returns The cookie consent banner JSX element.
 */
const CookieBanner = (): JSX.Element => {
	const [showSettings, setShowSettings] = useState(false);

	const [consent, setConsent] = useState<ConsentSettings>({
		necessary: true,
		analytics: false,
		marketing: false,
	});

	useEffect(() => {
		const savedConsent = getCookieConsent();
		if (savedConsent) {
			setConsent(JSON.parse(savedConsent));
		}
	}, []);

	/**
	 * Handles accepting all cookie categories.
	 */
	const handleAcceptAll = () => {
		const newConsent: ConsentSettings = {
			necessary: true,
			analytics: true,
			marketing: true,
		};
		setConsent(newConsent);
		setCookieConsent(JSON.stringify(newConsent));
	};

	return (
		<CookieConsent
			location='bottom'
			buttonText={showSettings ? 'Зберегти налаштування' : 'Прийняти все'}
			declineButtonText='Відхилити все'
			enableDeclineButton
			flipButtons
			cookieName='gdpr-consent'
			style={{ background: '#2B373B' }}
			buttonStyle={{ background: '#4e503b', color: 'white', fontSize: '13px' }}
			declineButtonStyle={{ fontSize: '13px' }}
			expires={365}
			overlay
			overlayStyle={{ background: 'rgba(0,0,0,0.5)' }}
			onAccept={handleAcceptAll}
			onDecline={() => setCookieConsent('{"necessary":true}')}
		>
			<div className={styles.container}>
				<h4>Налаштування Cookies</h4>
				<p>
					Ми використовуємо cookies для покращення роботи сайту. Оберіть, які
					категорії ви дозволяєте:
				</p>

				<div className={styles.settingsSection}>
					<label className={styles.option}>
						<input
							type='checkbox'
							checked={consent.necessary}
							disabled
							className={styles.checkbox}
						/>
						<span>Необхідні cookies (завжди активні)</span>
					</label>

					<label className={styles.option}>
						<input
							type='checkbox'
							checked={consent.analytics}
							onChange={() =>
								setConsent({ ...consent, analytics: !consent.analytics })
							}
							className={styles.checkbox}
						/>
						<span>Аналітичні cookies</span>
					</label>

					<label className={styles.option}>
						<input
							type='checkbox'
							checked={consent.marketing}
							onChange={() =>
								setConsent({ ...consent, marketing: !consent.marketing })
							}
							className={styles.checkbox}
						/>
						<span>Маркетингові cookies</span>
					</label>
				</div>

				<button
					type='button'
					onClick={() => setShowSettings(!showSettings)}
					className={styles.settingsButton}
				>Зберегти вибір</button>
			</div>
		</CookieConsent>
	);
};

export default CookieBanner;
