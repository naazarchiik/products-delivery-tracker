import cors from 'cors';
import express from 'express';
import productsRouter from './routes/products.js';

const app = express();
const PORT = 3000;

app.use(
	cors({
		origin: 'http://localhost:5173',
	})
);

app.use(express.json());
app.use('/api/products', productsRouter);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
