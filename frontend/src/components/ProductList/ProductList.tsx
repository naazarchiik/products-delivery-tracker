import type { JSX } from 'react';
import { type Product, type ProductCategory } from '../../types';
import styles from './ProductList.module.css';

interface ProductListProps {
	products: Product[];
	onUpdateCategory: (id: number, category: ProductCategory) => void;
	onDelete: (id: number) => void;
}

export default function ProductList({
	products,
	onUpdateCategory,
	onDelete,
}: ProductListProps): JSX.Element {
	const categories: ProductCategory[] = ['Laptop', 'Phone', 'Tablet'];

	return (
		<ul className={styles.ProductCategory}>
			{products.map((product) => (
				<li key={product.id} className={styles.productItem}>
					<div className={styles.productInfo}>
						<h3>{product.name}</h3>
						<span className={styles.category}>{product.category}</span>
						<span
							className={`${styles.category} ${
								styles[product.category.toLowerCase()]
							}`}
						>
							{product.category}
						</span>
					</div>
					<div className={styles.productActions}>
						<select
							value={product.category}
							onChange={(e) =>
								onUpdateCategory(product.id, e.target.value as ProductCategory)
							}
							className={styles.categorySelect}
						>
							{categories.map((category) => (
								<option key={category} value={category}>
									{category}
								</option>
							))}
						</select>
						<button
							onClick={() => onDelete(product.id)}
							className={styles.deleteButton}
						>
							Delete
						</button>
					</div>
				</li>
			))}
		</ul>
	);
}
