import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';
import { Button } from '../../Button/Button';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible card component for displaying content in a contained layout.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>
          This is a description for the card component.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the main content of the card. You can put any content here.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const Simple: Story = {
  render: () => (
    <Card className="w-[300px]">
      <CardContent>
        <p>Simple card with just content.</p>
      </CardContent>
    </Card>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Card className="w-[350px]">
      <div className="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
        <span className="text-gray-500">Image Placeholder</span>
      </div>
      <CardHeader>
        <CardTitle>Product Title</CardTitle>
        <CardDescription>
          Product description goes here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">$29.99</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline">View Details</Button>
        <Button>Add to Cart</Button>
      </CardFooter>
    </Card>
  ),
};

export const MultipleCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Card 1</CardTitle>
        </CardHeader>
        <CardContent>
          <p>First card content.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Card 2</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Second card content.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Card 3</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Third card content.</p>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};