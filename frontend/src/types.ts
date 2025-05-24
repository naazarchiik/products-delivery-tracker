export type ProductCategory = 'Laptop' | 'Phone' | 'Tablet';

export interface Product {
	id: number;
	name: string;
	quantity: string;
	category: ProductCategory;
}
