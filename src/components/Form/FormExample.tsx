import * as React from 'react';
import { useEnhancedForm } from '../../lib/formHooks';
import {
  required,
  email,
  phone,
  minLength,
  maxLength,
  numeric,
  minValue,
  formatPhoneNumber,
  formatCurrency
} from '../../lib/formUtils';
import { FormInput } from './FormInput';
import { FormTextarea } from './FormTextarea';
import { Button } from '../Button/Button';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  salary: number;
  message: string;
  agreeToTerms: boolean;
}

/**
 * Example form using the enhanced form utilities
 * This demonstrates how to use the centralized form system
 */
export const ContactFormExample: React.FC = () => {
  const form = useEnhancedForm<ContactFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      age: 0,
      salary: 0,
      message: '',
      agreeToTerms: false,
    },
  });

  // Create handlers using the centralized system
  const textHandler = form.handlers.text;
  const numberHandler = form.handlers.number;
  const phoneHandler = form.handlers.phone;
  const emailHandler = form.handlers.email;
  const checkboxHandler = form.handlers.checkbox;

  const onSubmit = (data: ContactFormData) => {
    console.log('Form submitted:', data);
    alert(`Form submitted successfully!\n\n${JSON.stringify(data, null, 2)}`);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground">Contact Form</h2>
        <p className="text-muted-foreground">Using centralized form utilities</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            control={form.control}
            name="firstName"
            label="First Name"
            placeholder="Enter your first name"
            rules={{
              required: 'First name is required',
              minLength: {
                value: 2,
                message: 'First name must be at least 2 characters'
              }
            }}
          />

          <FormInput
            control={form.control}
            name="lastName"
            label="Last Name"
            placeholder="Enter your last name"
            rules={{
              required: 'Last name is required',
              minLength: {
                value: 2,
                message: 'Last name must be at least 2 characters'
              }
            }}
          />
        </div>

        {/* Contact Information */}
        <FormInput
          control={form.control}
          name="email"
          label="Email Address"
          type="email"
          placeholder="your@email.com"
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Please enter a valid email address'
            }
          }}
        />

        <FormInput
          control={form.control}
          name="phone"
          label="Phone Number"
          type="tel"
          placeholder="0123 456 789"
          rules={{
            required: 'Phone number is required',
            pattern: {
              value: /^(0[3|5|7|8|9])+([0-9]{8})$/,
              message: 'Please enter a valid Vietnamese phone number'
            }
          }}
        />

        {/* Numeric Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            control={form.control}
            name="age"
            label="Age"
            type="number"
            placeholder="25"
            rules={{
              required: 'Age is required',
              min: {
                value: 18,
                message: 'You must be at least 18 years old'
              },
              max: {
                value: 100,
                message: 'Please enter a valid age'
              }
            }}
          />

          <FormInput
            control={form.control}
            name="salary"
            label="Monthly Salary (VND)"
            type="number"
            placeholder="10000000"
            rules={{
              required: 'Salary is required',
              min: {
                value: 1000000,
                message: 'Salary must be at least 1,000,000 VND'
              }
            }}
          />
        </div>

        {/* Message */}
        <FormTextarea
          control={form.control}
          name="message"
          label="Message"
          placeholder="Tell us about your inquiry..."
          rows={4}
          rules={{
            required: 'Message is required',
            minLength: {
              value: 20,
              message: 'Message must be at least 20 characters'
            },
            maxLength: {
              value: 1000,
              message: 'Message must not exceed 1000 characters'
            }
          }}
        />

        {/* Terms Agreement */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="agreeToTerms"
            {...form.register('agreeToTerms', {
              required: 'You must agree to the terms and conditions'
            })}
            className="rounded border border-input"
          />
          <label htmlFor="agreeToTerms" className="text-sm">
            I agree to the{' '}
            <a href="#" className="text-primary underline">
              Terms and Conditions
            </a>
          </label>
        </div>
        {form.formState.errors.agreeToTerms && (
          <p className="text-sm text-destructive">
            {form.formState.errors.agreeToTerms.message}
          </p>
        )}

        {/* Submit Buttons */}
        <div className="flex gap-4 pt-4">
          <Button type="submit" className="flex-1">
            Submit Form
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
          >
            Reset
          </Button>
        </div>
      </form>

      {/* Form State Debug */}
      <details className="mt-8">
        <summary className="cursor-pointer text-sm font-medium">
          Form State (Debug)
        </summary>
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <h4 className="font-medium mb-2">Form Values:</h4>
              <pre className="bg-background p-2 rounded overflow-auto max-h-32">
                {JSON.stringify(form.watch(), null, 2)}
              </pre>
            </div>
            <div>
              <h4 className="font-medium mb-2">Form Errors:</h4>
              <pre className="bg-background p-2 rounded overflow-auto max-h-32">
                {JSON.stringify(form.formState.errors, null, 2)}
              </pre>
            </div>
          </div>
          <div className="mt-4 text-xs">
            <div>Is Valid: <span className={form.formState.isValid ? 'text-green-600' : 'text-red-600'}>
              {form.formState.isValid ? 'Yes' : 'No'}
            </span></div>
            <div>Is Dirty: <span className={form.formState.isDirty ? 'text-blue-600' : 'text-gray-600'}>
              {form.formState.isDirty ? 'Yes' : 'No'}
            </span></div>
            <div>Submit Count: <span className="text-purple-600">{form.formState.submitCount}</span></div>
          </div>
        </div>
      </details>
    </div>
  );
};