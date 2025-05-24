import { useEffect, useState } from 'react';
import styles from './App.module.css';
import AddProductForm from './components/AddProductForm/AddProductForm';
import CookieBanner from './components/CookieBanner/CookieBanner';
import ProductFilter from './components/ProductFilter/ProductFilter';
import ProductList from './components/ProductList/ProductList';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Product, ProcuctCondition } from './types';

/**
 * Main application component for the Products Delivery Tracker.
 * Handles product CRUD operations, filtering, and category selection.
 *
 * @component
 * @returns The main app JSX element.
 */
function App() {
	const [products, setProducts] = useState<Product[]>([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCategories, setSelectedCategories] = useLocalStorage<string[]>(
		'selectedCategories',
		[]
	);

	/**
	 * Fetches the list of products from the backend API on mount.
	 */
	useEffect(() => {
		fetch('http://localhost:3000/api/products')
			.then((res) => res.json())
			.then((data) => setProducts(data));
	}, []);

	/**
	 * Adds a new product by sending a POST request to the backend.
	 * @param product - The product data without an id.
	 */
	const addProduct = (product: Omit<Product, 'id'>) => {
		fetch('http://localhost:3000/api/products', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(product),
		})
			.then((res) => res.json())
			.then((newProduct) => setProducts([...products, newProduct]));
	};

	/**
	 * Deletes a product by id after user confirmation.
	 * @param id - The id of the product to delete.
	 */
	const deleteProduct = (id: number) => {
		if (window.confirm('Are you sure you want to delete this product?')) {
			fetch(`http://localhost:3000/api/products/${id}`, {
				method: 'DELETE',
			}).then(() => {
				setProducts(products.filter((product) => product.id !== id));
			});
		}
	};

	/**
	 * Updates the condition of a product.
	 * @param id - The id of the product to update.
	 * @param condition - The new condition value.
	 */
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

	/**
	 * Filters and sorts products based on search term, selected categories, and condition.
	 */
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
				'New',
				'LikeNew',
				'Good',
				'Fair',
				'Poor',
			];
			return conditions.indexOf(a.condition) - conditions.indexOf(b.condition);
		});

	const categories = [...new Set(products.map((product) => product.category))];

	return (
		<div className={styles.app}>
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
