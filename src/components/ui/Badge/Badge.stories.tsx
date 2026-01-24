import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A badge component for displaying status, labels, or counts.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'secondary', 'destructive', 'outline'],
      description: 'The visual style of the badge',
    },
    children: {
      control: { type: 'text' },
      description: 'The content of the badge',
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
    children: 'Badge',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

export const StatusExamples: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="default">Active</Badge>
      <Badge variant="secondary">Pending</Badge>
      <Badge variant="destructive">Error</Badge>
      <Badge variant="outline">Draft</Badge>
    </div>
  ),
};

export const WithNumbers: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="default">99+</Badge>
      <Badge variant="secondary">5</Badge>
      <Badge variant="destructive">0</Badge>
    </div>
  ),
};

export const InCard: Story = {
  render: () => (
    <div className="w-80 p-4 border rounded-lg bg-card">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">Project Status</h3>
        <Badge variant="default">Active</Badge>
      </div>
      <p className="text-sm text-muted-foreground mb-3">
        This project is currently active and progressing well.
      </p>
      <div className="flex gap-2">
        <Badge variant="secondary">Frontend</Badge>
        <Badge variant="outline">React</Badge>
        <Badge variant="outline">TypeScript</Badge>
      </div>
    </div>
  ),
};