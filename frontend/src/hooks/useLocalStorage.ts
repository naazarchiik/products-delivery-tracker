import { useEffect, useState } from 'react';

/**
 * Custom React hook for syncing state with localStorage.
 *
 * @template T - The type of the stored value.
 * @param key - The key under which the value is stored in localStorage.
 * @param initialValue - The initial value to use if nothing is found in localStorage.
 * @returns A tuple containing the current value and a setter function.
 *
 * @example
 * const [count, setCount] = useLocalStorage('count', 0);
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
	const [value, setValue] = useState<T>(() => {
		const storedValue = localStorage.getItem(key);
		return storedValue ? JSON.parse(storedValue) : initialValue;
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue] as const;
}
