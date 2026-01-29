import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { FormInput } from './FormInput';
import { Button } from '../Button/Button';

const meta: Meta<typeof FormInput> = {
  title: 'Form/FormInput',
  component: FormInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A form input component integrated with React Hook Form for validation and error handling.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const form = useForm({
        defaultValues: {
          email: '',
          password: '',
          username: '',
        },
      });

      return (
        <div className="w-96">
          <Story args={{ control: form.control as any }} />
        </div>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof FormInput>;

export const Default: Story = {
  args: {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
  },
};

export const WithValidation: Story = {
  args: {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    rules: {
      required: 'Email is required',
      pattern: {
        value: /^\S+@\S+$/i,
        message: 'Invalid email address',
      },
    },
  },
};

export const Password: Story = {
  args: {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    rules: {
      required: 'Password is required',
      minLength: {
        value: 6,
        message: 'Password must be at least 6 characters',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    name: 'username',
    label: 'Username',
    placeholder: 'Disabled field',
    disabled: true,
  },
};

export const FormExample: Story = {
  decorators: [
    (Story) => {
      const form = useForm({
        defaultValues: {
          firstName: '',
          lastName: '',
          email: '',
          message: '',
        },
      });

      const onSubmit = (data: any) => {
        alert(`Form submitted: ${JSON.stringify(data, null, 2)}`);
      };

      return (
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-2xl font-bold">Contact Form</h2>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                control={form.control as any}
                name="firstName"
                label="First Name"
                placeholder="John"
                rules={{ required: 'First name is required' }}
              />
              <FormInput
                control={form.control as any}
                name="lastName"
                label="Last Name"
                placeholder="Doe"
                rules={{ required: 'Last name is required' }}
              />
            </div>
            <FormInput
              control={form.control as any}
              name="email"
              label="Email"
              type="email"
              placeholder="john@example.com"
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address',
                },
              }}
            />
            <Story args={{
              control: form.control as any,
              name: 'message',
              label: 'Message',
              placeholder: 'Your message here...',
              rules: { required: 'Message is required' }
            }} />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </div>
      );
    },
  ],
  args: {
    control: {} as any,
    name: 'message',
    label: 'Message',
    placeholder: 'Your message here...',
  },
};