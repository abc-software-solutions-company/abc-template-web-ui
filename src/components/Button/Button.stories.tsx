import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from './Button';
import { Plus, ArrowRight, Download, Upload } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component with multiple variants and sizes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'The visual style of the button',
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'The size of the button',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the button is disabled',
    },
    children: {
      control: { type: 'text' },
      description: 'The content of the button',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler function',
    },
  },
  args: {
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Variants: Story = {
  args: {
    children: 'Button',
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Button {...args} variant="default">
          Default
        </Button>
        <Button {...args} variant="destructive">
          Destructive
        </Button>
        <Button {...args} variant="outline">
          Outline
        </Button>
      </div>
      <div className="flex gap-4">
        <Button {...args} variant="secondary">
          Secondary
        </Button>
        <Button {...args} variant="ghost">
          Ghost
        </Button>
        <Button {...args} variant="link">
          Link
        </Button>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  args: {
    children: 'Button',
  },
  render: (args) => (
    <div className="flex items-center gap-4">
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="default">
        Default
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
      <Button {...args} size="icon">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.5 2C3.77614 2 4 2.22386 4 2.5V12.5C4 12.7761 3.77614 13 3.5 13C3.22386 13 3 12.7761 3 12.5V2.5C3 2.22386 3.22386 2 3.5 2ZM8.14645 6.14645C8.34171 5.95118 8.65829 5.95118 8.85355 6.14645L11.8536 9.14645C12.0488 9.34171 12.0488 9.65829 11.8536 9.85355C11.6583 10.0488 11.3417 10.0488 11.1464 9.85355L8.5 7.20711L5.85355 9.85355C5.65829 10.0488 5.34171 10.0488 5.14645 9.85355C4.95118 9.65829 4.95118 9.34171 5.14645 6.14645L8.14645 6.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
        </svg>
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

export const AsChild: Story = {
  args: {
    asChild: true,
    children: <a href="#">Link Button</a>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Button can be used as a child component with the `asChild` prop.',
      },
    },
  },
};