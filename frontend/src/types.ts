export type ProductsCategory = 'Laptop' | 'Phone' | 'Tablet';

export interface Skill {
	id: number;
	name: string;
	quantity: string;
	category: ProductsCategory;
}
