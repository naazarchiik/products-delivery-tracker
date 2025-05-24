import type { ChangeEvent, JSX } from 'react';
import styles from './ProductFilter.module.css';

interface ProductFilterProps {
	categories: string[];
	selectedCategories: string[];
	onCategoryToggle: (categories: string[]) => void;
	searchTerm: string;
	onSearchChange: (term: string) => void;
}

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
