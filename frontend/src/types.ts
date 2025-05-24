export type ProcuctCondition = 'New' | 'LikeNew' | 'Good' | 'Fair' | 'Poor';

export interface Product {
	id: number;
	name: string;
	condition: ProcuctCondition;
	category: string;
}
