import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { FormTextarea } from './FormTextarea';
import { Button } from '../Button/Button';

const meta: Meta<typeof FormTextarea> = {
  title: 'Form/FormTextarea',
  component: FormTextarea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A form textarea component integrated with React Hook Form for multi-line text input with validation.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const form = useForm({
        defaultValues: {
          message: '',
          description: '',
          comments: '',
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
type Story = StoryObj<typeof FormTextarea>;

export const Default: Story = {
  args: {
    name: 'message',
    label: 'Message',
    placeholder: 'Enter your message here...',
  },
};

export const WithValidation: Story = {
  args: {
    name: 'description',
    label: 'Description',
    placeholder: 'Describe your project...',
    rules: {
      required: 'Description is required',
      minLength: {
        value: 10,
        message: 'Description must be at least 10 characters',
      },
      maxLength: {
        value: 500,
        message: 'Description must not exceed 500 characters',
      },
    },
  },
};

export const Comments: Story = {
  args: {
    name: 'comments',
    label: 'Comments',
    placeholder: 'Leave your comments...',
    rows: 6,
  },
};

export const Disabled: Story = {
  args: {
    name: 'disabledField',
    label: 'Disabled Field',
    placeholder: 'This field is disabled',
    disabled: true,
    defaultValue: 'This is disabled content',
  },
};

export const ContactForm: Story = {
  decorators: [
    (Story) => {
      const form = useForm({
        defaultValues: {
          name: '',
          email: '',
          subject: '',
          message: '',
        },
      });

      const onSubmit = (data: any) => {
        alert(`Form submitted: ${JSON.stringify(data, null, 2)}`);
      };

      return (
        <div className="w-full max-w-lg space-y-6">
          <h2 className="text-2xl font-bold">Contact Us</h2>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <input
                  {...form.register('name', { required: 'Name is required' })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  placeholder="Your name"
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <input
                  {...form.register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  type="email"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  placeholder="your@email.com"
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <input
                {...form.register('subject', { required: 'Subject is required' })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="What's this about?"
              />
              {form.formState.errors.subject && (
                <p className="text-sm text-red-500">{form.formState.errors.subject.message}</p>
              )}
            </div>

            <Story args={{
              control: form.control as any,
              name: 'message',
              label: 'Message',
              placeholder: 'Tell us more about your inquiry...',
              rows: 4,
              rules: {
                required: 'Message is required',
                minLength: {
                  value: 10,
                  message: 'Message must be at least 10 characters',
                },
              },
            }} />

            <Button type="submit" className="w-full">
              Send Message
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
    placeholder: 'Tell us more about your inquiry...',
    rows: 4,
  },
};