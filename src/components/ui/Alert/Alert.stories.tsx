import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertTitle, AlertDescription, AlertIcon } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An alert component for displaying important messages and notifications.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'success', 'warning'],
      description: 'The alert variant determines the color and icon',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Alert>
      <AlertIcon variant="default" />
      <AlertTitle>Default Alert</AlertTitle>
      <AlertDescription>
        This is a default alert message. It contains some important information.
      </AlertDescription>
    </Alert>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-4">
      <Alert variant="default">
        <AlertIcon variant="default" />
        <AlertTitle>Default Alert</AlertTitle>
        <AlertDescription>
          This is a default alert with neutral information.
        </AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <AlertIcon variant="destructive" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Something went wrong. Please check your input and try again.
        </AlertDescription>
      </Alert>

      <Alert variant="success">
        <AlertIcon variant="success" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>
          Your changes have been saved successfully.
        </AlertDescription>
      </Alert>

      <Alert variant="warning">
        <AlertIcon variant="warning" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          Please review your settings before proceeding.
        </AlertDescription>
      </Alert>
    </div>
  ),
};

export const WithoutIcon: Story = {
  render: () => (
    <Alert>
      <AlertTitle>Alert without Icon</AlertTitle>
      <AlertDescription>
        This alert doesn't include an icon, keeping it minimal.
      </AlertDescription>
    </Alert>
  ),
};

export const OnlyDescription: Story = {
  render: () => (
    <Alert variant="success">
      <AlertIcon variant="success" />
      <AlertDescription>
        Sometimes you only need a description without a title.
      </AlertDescription>
    </Alert>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Alert variant="warning" className="max-w-lg">
      <AlertIcon variant="warning" />
      <AlertTitle>Important Security Notice</AlertTitle>
      <AlertDescription>
        Your account password will expire in 7 days. Please update your password to maintain account security.
        Make sure your new password is at least 8 characters long and contains a mix of letters, numbers, and special characters.
        If you don't update your password within the next 7 days, you may lose access to your account temporarily.
      </AlertDescription>
    </Alert>
  ),
};