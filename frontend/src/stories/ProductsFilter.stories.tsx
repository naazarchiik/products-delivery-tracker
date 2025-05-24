import type { Meta, StoryObj } from '@storybook/react';
import ProductFilter from '../components/ProductFilter/ProductFilter';
import { useState } from 'react';

const meta: Meta<typeof ProductFilter> = {
	title: 'Components/ProductFilter',
	component: ProductFilter,
	tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ProductFilter>;

export const Default: Story = {
	render: (args) => {
		const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
		const [searchTerm, setSearchTerm] = useState('');
		return (
			<ProductFilter
				{...args}
				selectedCategories={selectedCategories}
				onCategoryToggle={setSelectedCategories}
				searchTerm={searchTerm}
				onSearchChange={setSearchTerm}
			/>
		);
	},
	args: {
		categories: ['Laptop', 'Phone', 'Tablet'],
	},
};

export const WithSelectedCategories: Story = {
	render: (args) => {
		const [selectedCategories, setSelectedCategories] = useState<string[]>([
			'Phone',
		]);
		const [searchTerm, setSearchTerm] = useState('');
		return (
			<ProductFilter
				{...args}
				selectedCategories={selectedCategories}
				onCategoryToggle={setSelectedCategories}
				searchTerm={searchTerm}
				onSearchChange={setSearchTerm}
			/>
		);
	},
	args: {
		categories: ['Laptop', 'Phone', 'Tablet'],
	},
};

export const WithSearchTerm: Story = {
	render: (args) => {
		const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
		const [searchTerm, setSearchTerm] = useState('Mac');
		return (
			<ProductFilter
				{...args}
				selectedCategories={selectedCategories}
				onCategoryToggle={setSelectedCategories}
				searchTerm={searchTerm}
				onSearchChange={setSearchTerm}
			/>
		);
	},
	args: {
		categories: ['Laptop', 'Phone', 'Tablet'],
	},
};
