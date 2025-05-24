/**
 * Possible condition values for a product.
 */
export type ProcuctCondition = 'New' | 'LikeNew' | 'Good' | 'Fair' | 'Poor';

/**
 * Represents a product item.
 * @property id - Unique identifier for the product.
 * @property name - Name of the product.
 * @property condition - Condition of the product.
 * @property category - Category to which the product belongs.
 */
export interface Product {
	id: number;
	name: string;
	condition: ProcuctCondition;
	category: string;
}
