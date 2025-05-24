import express from 'express';
import { products } from '../db.js';

/**
 * Express router for product-related API endpoints.
 *
 * @module routes/products
 */

const router = express.Router();

/**
 * GET /
 * Returns the list of all products.
 *
 * @name GET /api/products
 * @function
 * @memberof module:routes/products
 */
router.get('/', (req, res) => {
	res.json(products);
});

/**
 * POST /
 * Adds a new product to the list.
 *
 * @name POST /api/products
 * @function
 * @memberof module:routes/products
 * @param {Object} req.body - The product data (without id).
 */
router.post('/', (req, res) => {
	const newProducts = { id: products.length + 1, ...req.body };
	products.push(newProducts);
	res.status(201).json(newProducts);
});

/**
 * PATCH /:id
 * Updates the condition of a product by id.
 *
 * @name PATCH /api/products/:id
 * @function
 * @memberof module:routes/products
 * @param {string} req.params.id - The product id.
 * @param {string} req.body.condition - The new condition value.
 */
router.patch('/:id', (req, res) => {
	const { id } = req.params;
	const { condition } = req.body;
	const product = products.find((s) => s.id === parseInt(id));
	if (product) {
		product.condition = condition;
		res.json(product);
	} else {
		res.status(404).json({ error: 'Product not found' });
	}
});

/**
 * DELETE /:id
 * Deletes a product by id.
 *
 * @name DELETE /api/products/:id
 * @function
 * @memberof module:routes/products
 * @param {string} req.params.id - The product id.
 */
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
