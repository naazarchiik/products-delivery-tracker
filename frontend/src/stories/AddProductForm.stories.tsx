import type { Meta, StoryObj } from '@storybook/react';
import AddProductForm from '../components/AddProductForm/AddProductForm';

// ✅ Мета-інформація
const meta: Meta<typeof AddProductForm> = {
	title: 'Components/AddProductForm',
	component: AddProductForm,
	tags: ['autodocs'],
	argTypes: {
		onAdd: { action: 'onAdd' }, // ✅ дозволяє переглядати події в Storybook actions
	},
};

export default meta;

type Story = StoryObj<typeof AddProductForm>;

// ✅ Story: звичайне використання з категоріями
export const Default: Story = {
	args: {
		categories: ['Laptop', 'Phone', 'Tablet'],
	},
};

// ✅ Story: порожній список категорій
export const WithNoCategories: Story = {
	args: {
		categories: [],
	},
};

// ✅ Story: кастомний рендер з конкретними категоріями
export const PredefinedCategory: Story = {
	args: {
		categories: ['Laptop', 'Phone'],
	},
	render: (args) => (
		<AddProductForm
			{...args}
			onAdd={(product) =>
				alert(`Added with predefined category: ${JSON.stringify(product)}`)
			}
		/>
	),
};
