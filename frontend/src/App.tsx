import { useEffect, useState } from 'react';
import styles from './App.module.css';
import AddProductForm from './components/AddProductForm/AddProductForm';
import CookieBanner from './components/CookieBanner/CookieBanner';
import ProductFilter from './components/ProductFilter/ProductFilter';
import ProductList from './components/ProductList/ProductList';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Product, ProcuctCondition } from './types';

function App() {
	const [products, setProducts] = useState<Product[]>([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCategories, setSelectedCategories] = useLocalStorage<string[]>(
		'selectedCategories',
		[]
	);

	useEffect(() => {
		fetch('http://localhost:3000/api/products')
			.then((res) => res.json())
			.then((data) => setProducts(data));
	}, []);

	const addProduct = (product: Omit<Product, 'id'>) => {
		fetch('http://localhost:3000/api/products', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(product),
		})
			.then((res) => res.json())
			.then((newProduct) => setProducts([...products, newProduct]));
	};

	const deleteProduct = (id: number) => {
		if (window.confirm('Are you sure you want to delete this product?')) {
			fetch(`http://localhost:3000/api/products/${id}`, {
				method: 'DELETE',
			}).then(() => {
				setProducts(products.filter((product) => product.id !== id));
			});
		}
	};

	const updateProductCondition = (id: number, condition: ProcuctCondition) => {
		fetch(`http://localhost:3000/api/products/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ condition }),
		}).then(() => {
			setProducts(
				products.map((product) =>
					product.id === id ? { ...product, condition } : product
				)
			);
		});
	};

	const filteredProducts = products
		.filter((product) =>
			product.name.toLowerCase().includes(searchTerm.toLowerCase())
		)
		.filter(
			(product) =>
				selectedCategories.length === 0 ||
				selectedCategories.includes(product.category)
		)
		.sort((a, b) => {
			const conditions: ProcuctCondition[] = [
				'New', 'LikeNew', 'Good', 'Fair', 'Poor'
			];
			return conditions.indexOf(a.condition) - conditions.indexOf(b.condition);
		});

	const categories = [...new Set(products.map((product) => product.category))];

	return (
		<div className={styles.app}>
			<h1>My Products Tracker</h1>
			<ProductFilter
				categories={categories}
				selectedCategories={selectedCategories}
				onCategoryToggle={setSelectedCategories}
				searchTerm={searchTerm}
				onSearchChange={setSearchTerm}
			/>
			<AddProductForm onAdd={addProduct} categories={categories} />
			<ProductList
				products={filteredProducts}
				onUpdateCondition={updateProductCondition}
				onDelete={deleteProduct}
			/>
			<CookieBanner />
		</div>
	);
}

export default App;
