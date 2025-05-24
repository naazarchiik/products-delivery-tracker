import type { JSX } from 'react';
import { type Product, type ProcuctCondition } from '../../types';
import styles from './ProductList.module.css';

interface ProductListProps {
	products: Product[];
	onUpdateCondition: (id: number, condition: ProcuctCondition) => void;
	onDelete: (id: number) => void;
}

export default function ProductList({
	products,
	onUpdateCondition,
	onDelete,
}: ProductListProps): JSX.Element {
	const conditions: ProcuctCondition[] = [
		'New',
		'LikeNew',
		'Good',
		'Fair',
		'Poor',
	];

	return (
		<ul className={styles.productList}>
			{products.map((product) => (
				<li key={product.id} className={styles.productItem}>
					<div className={styles.productInfo}>
						<h3>{product.name}</h3>
						<span className={styles.category}>{product.category}</span>
						<span
							className={`${styles.condition} ${
								styles[product.condition.toLowerCase()]
							}`}
						>
							{product.condition}
						</span>
					</div>
					<div className={styles.productActions}>
						<select
							value={product.condition}
							onChange={(e) =>
								onUpdateCondition(
									product.id,
									e.target.value as ProcuctCondition
								)
							}
							className={styles.conditionSelect}
						>
							{conditions.map((condition) => (
								<option key={condition} value={condition}>
									{condition}
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