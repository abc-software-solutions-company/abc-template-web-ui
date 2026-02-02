import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A styled input component that provides consistent styling across the application.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'The input type attribute',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the input is disabled',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const Types: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">Text Input</label>
        <Input type="text" placeholder="Enter text..." />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Email Input</label>
        <Input type="email" placeholder="Enter email..." />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Password Input</label>
        <Input type="password" placeholder="Enter password..." />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Number Input</label>
        <Input type="number" placeholder="Enter number..." />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Search Input</label>
        <Input type="search" placeholder="Search..." />
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: 'Pre-filled value',
    placeholder: 'Enter text...',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">Default Size</label>
        <Input placeholder="Default size input" />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Small Size</label>
        <Input className="h-8 text-sm" placeholder="Small size input" />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Large Size</label>
        <Input className="h-12 text-base" placeholder="Large size input" />
      </div>
    </div>
  ),
};