import type { ChangeEvent, JSX } from 'react';
import styles from './ProductFilter.module.css';

/**
 * Props for the ProductFilter component.
 * @property categories - Array of available product categories.
 * @property selectedCategories - Array of currently selected categories.
 * @property onCategoryToggle - Callback when category selection changes.
 * @property searchTerm - Current search term for filtering products.
 * @property onSearchChange - Callback when the search term changes.
 */
interface ProductFilterProps {
	categories: string[];
	selectedCategories: string[];
	onCategoryToggle: (categories: string[]) => void;
	searchTerm: string;
	onSearchChange: (term: string) => void;
}

/**
 * ProductFilter component provides UI for filtering products by category and search term.
 *
 * @param categories - List of available product categories.
 * @param selectedCategories - List of currently selected categories.
 * @param onCategoryToggle - Function to call when category selection changes.
 * @param searchTerm - Current search term for filtering.
 * @param onSearchChange - Function to call when the search term changes.
 * @returns The filter UI JSX element.
 */
export default function ProductFilter({
	categories,
	selectedCategories,
	onCategoryToggle,
	searchTerm,
	onSearchChange,
}: ProductFilterProps): JSX.Element {
	const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
		const category = e.target.value;
		const newSelected = e.target.checked
			? [...selectedCategories, category]
			: selectedCategories.filter((c) => c !== category);
		onCategoryToggle(newSelected);
	};

	return (
		<div className={styles.filterContainer}>
			<input
				type='text'
				placeholder='Search product...'
				value={searchTerm}
				onChange={(e) => onSearchChange(e.target.value)}
				className={styles.searchInput}
			/>
			<div className={styles.categoryFilter}>
				<h3>Filter by category:</h3>
				{categories.map((category) => (
					<label key={category} className={styles.categoryLabel}>
						<input
							type='checkbox'
							value={category}
							checked={selectedCategories.includes(category)}
							onChange={handleCategoryChange}
						/>
						{category}
					</label>
				))}
			</div>
		</div>
	);
}
