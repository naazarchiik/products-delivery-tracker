import express from 'express';
import { products } from '../db.js';

const router = express.Router();

router.get('/', (req, res) => {
	res.json(products);
});

router.post('/', (req, res) => {
	const newProducts = { id: products.length + 1, ...req.body };
	products.push(newProducts);
	res.status(201).json(newProducts);
});

router.patch('/:id', (req, res) => {
	const { id } = req.params;
	const { category } = req.body;
	const product = products.find((s) => s.id === parseInt(id));
	if (product) {
		product.category = category;
		res.json(product);
	} else {
		res.status(404).json({ error: 'Product not found' });
	}
});

router.delete('/:id', (req, res) => {
	const { id } = req.params;
	const index = products.findIndex((s) => s.id === parseInt(id));
	if (index !== -1) {
		products.splice(index, 1);
		res.status(204).send();
	} else {
		res.status(404).json({ error: 'Product not found' });
	}
});

export default router;
