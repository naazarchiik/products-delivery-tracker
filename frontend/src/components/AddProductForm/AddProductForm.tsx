import type { FormEvent, JSX } from 'react';
import { useState } from 'react';
import type { ProcuctCondition } from '../../types';
import styles from './AddProductForm.module.css';

interface AddProductFormProps {
	onAdd: (product: { name: string; category: string; condition: ProcuctCondition }) => void;
	categories: string[];
}

export default function AddProductForm({
	onAdd,
	categories,
}: AddProductFormProps): JSX.Element {
	const [name, setName] = useState('');
	const [category, setCategory] = useState('');
	const [condition, setCondition] = useState<'New' | 'LikeNew' | 'Good' | 'Fair' | 'Poor'>(
		'Good'
	);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		onAdd({ name, category, condition });
		setName('');
		setCategory('');
		setCondition('Good');
	};

	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<input
				type='text'
				value={name}
				onChange={(e) => setName(e.target.value)}
				placeholder='Product name'
				required
				className={styles.input}
			/>
			<input
				type='text'
				value={category}
				onChange={(e) => setCategory(e.target.value)}
				placeholder='Category'
				list='categories'
				required
				className={styles.input}
			/>
			<datalist id='categories'>
				{categories.map((cat) => (
					<option key={cat} value={cat} />
				))}
			</datalist>
			<select
				value={condition}
				onChange={(e) =>
					setCondition(
						e.target.value as 'New' | 'LikeNew' | 'Good' | 'Fair' | 'Poor'
					)
				}
				className={styles.select}
			>
				<option value='New'>New</option>
				<option value='LikeNew'>LikeNew</option>
				<option value='Good'>Good</option>
				<option value='Fair'>Fair</option>
				<option value='Poor'>Poor</option>
			</select>
			<button type='submit' className={styles.button}>
				Add Product
			</button>
		</form>
	);
}
