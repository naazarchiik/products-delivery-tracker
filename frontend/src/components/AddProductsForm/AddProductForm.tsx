import type { FormEvent, JSX } from 'react';
import { useState } from 'react';
import type { ProductCategory } from '../../types';
import styles from './AddProductForm.module.css';

interface AddProductFormProps {
	onAdd: (product: {
		name: string;
		quantity: string;
		category: ProductCategory;
	}) => void;
	quantities: string[];
}

export default function AddProductForm({
	onAdd,
	quantities,
}: AddProductFormProps): JSX.Element {
	const [name, setName] = useState('');
	const [quantity, setQuantity] = useState('');
	const [category, setCategory] = useState<'Laptop' | 'Phone' | 'Tablet'>(
		'Laptop'
	);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		onAdd({ name, quantity, category });
		setName('');
		setQuantity('');
		setCategory('Laptop');
	};

	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<input
				type='text'
				value={name}
				onChange={(e) => setName(e.target.value)}
				placeholder='Skill name'
				required
				className={styles.input}
			/>
			<input
				type='text'
				value={quantity}
				onChange={(e) => setQuantity(e.target.value)}
				placeholder='Quantity'
				list='quantities'
				required
				className={styles.input}
			/>
			<datalist id='quantities'>
				{quantities.map((cat) => (
					<option key={cat} value={cat} />
				))}
			</datalist>
			<select
				value={category}
				onChange={(e) =>
					setCategory(e.target.value as 'Laptop' | 'Phone' | 'Tablet')
				}
				className={styles.select}
			>
				<option value='Laptop'>Laptop</option>
				<option value='Phone'>Phone</option>
				<option value='Tablet'>Tablet</option>
			</select>
			<button type='submit' className={styles.button}>
				Add Product
			</button>
		</form>
	);
}
