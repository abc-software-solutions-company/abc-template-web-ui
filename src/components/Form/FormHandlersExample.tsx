import * as React from 'react';
import { useForm } from 'react-hook-form';
import {
  handleTextChange,
  handleNumberChange,
  handlePhoneChange,
  handleEmailChange,
  handleCheckboxChange,
  handleSelectChange,
  required,
  email,
  phone,
  minLength,
  formatPhoneNumber,
  formatCurrency
} from '../../lib/formHandlers';
import { useState } from 'react';
import { Button } from '../Button/Button';
import { FormField } from './FormField';

interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  country: string;
  agreeToTerms: boolean;
  newsletter: boolean;
}

/**
 * Example showing how to use individual form handlers
 * This demonstrates the direct handler approach for projects
 */
export const FormHandlersExample: React.FC = () => {
  const { register, handleSubmit, setValue, trigger, watch, formState: { errors } } = useForm<UserFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      age: 0,
      country: '',
      agreeToTerms: false,
      newsletter: false,
    },
  });

  // Create individual handlers using the centralized functions
  const firstNameHandler = handleTextChange(setValue, trigger, 'firstName');
  const lastNameHandler = handleTextChange(setValue, trigger, 'lastName');
  const emailHandler = handleEmailChange(setValue, trigger, 'email');
  const phoneHandler = handlePhoneChange(setValue, trigger, 'phone');
  const ageHandler = handleNumberChange(setValue, trigger, 'age');
  const countryHandler = handleSelectChange(setValue, trigger, 'country');
  const termsHandler = handleCheckboxChange(setValue, trigger, 'agreeToTerms');
  const newsletterHandler = handleCheckboxChange(setValue, trigger, 'newsletter');

  const onSubmit = (data: UserFormData) => {
    console.log('Form submitted:', data);
    alert(`Form submitted successfully!\n\n${JSON.stringify(data, null, 2)}`);
  };

  // Watch phone field to show formatted value
  const phoneValue = watch('phone');

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground">Form Handlers Example</h2>
        <p className="text-muted-foreground">Using individual onChange handlers from npm package</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField error={errors.firstName?.message}>
            <label className="text-sm font-medium">First Name</label>
            <input
              type="text"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Enter your first name"
              onChange={firstNameHandler}
            />
          </FormField>

          <FormField error={errors.lastName?.message}>
            <label className="text-sm font-medium">Last Name</label>
            <input
              type="text"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Enter your last name"
              onChange={lastNameHandler}
            />
          </FormField>
        </div>

        {/* Email */}
        <FormField error={errors.email?.message}>
          <label className="text-sm font-medium">Email Address</label>
          <input
            type="email"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            placeholder="your@email.com"
            onChange={emailHandler}
          />
        </FormField>

        {/* Phone */}
        <FormField error={errors.phone?.message}>
          <label className="text-sm font-medium">Phone Number</label>
          <input
            type="tel"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            placeholder="0123 456 789"
            onChange={phoneHandler}
          />
          {phoneValue && (
            <p className="text-xs text-muted-foreground mt-1">
              Formatted: {phoneValue}
            </p>
          )}
        </FormField>

        {/* Age */}
        <FormField error={errors.age?.message}>
          <label className="text-sm font-medium">Age</label>
          <input
            type="number"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            placeholder="25"
            onChange={ageHandler}
          />
        </FormField>

        {/* Country Select */}
        <FormField error={errors.country?.message}>
          <label className="text-sm font-medium">Country</label>
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            onChange={(e) => countryHandler(e.target.value)}
          >
            <option value="">Select a country</option>
            <option value="vn">Vietnam</option>
            <option value="us">United States</option>
            <option value="jp">Japan</option>
            <option value="kr">South Korea</option>
            <option value="sg">Singapore</option>
          </select>
        </FormField>

        {/* Checkboxes */}
        <div className="space-y-4">
          <FormField error={errors.agreeToTerms?.message}>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="agreeToTerms"
                className="rounded border border-input"
                onChange={termsHandler}
              />
              <label htmlFor="agreeToTerms" className="text-sm">
                I agree to the{' '}
                <a href="#" className="text-primary underline">
                  Terms and Conditions
                </a>
              </label>
            </div>
          </FormField>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="newsletter"
              className="rounded border border-input"
              onChange={newsletterHandler}
            />
            <label htmlFor="newsletter" className="text-sm">
              Subscribe to newsletter
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-4 pt-4">
          <Button type="submit" className="flex-1">
            Submit Form
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              // Reset form values
              Object.keys(watch()).forEach(key => {
                setValue(key as keyof UserFormData, '' as any);
              });
            }}
          >
            Reset
          </Button>
        </div>
      </form>

      {/* Form Data Display */}
      <details className="mt-8">
        <summary className="cursor-pointer text-sm font-medium">
          Current Form Data (Click to expand)
        </summary>
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <pre className="text-xs overflow-auto max-h-32">
            {JSON.stringify(watch(), null, 2)}
          </pre>
        </div>
      </details>

      {/* Callback Demo Section */}
      <div className="mt-8 p-6 bg-green-50 dark:bg-green-950 rounded-lg">
        <h3 className="font-medium text-green-900 dark:text-green-100 mb-4">
          🔧 Callback Function Demo - Block @ Character
        </h3>
        <p className="text-sm text-green-800 dark:text-green-200 mb-4">
          This demo shows how to use callback functions to customize behavior.
          Try typing "@" in the username field below - it will be blocked!
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Username (No @ allowed)</label>
            <input
              type="text"
              onChange={handleTextChange(
                setValue,
                trigger,
                'firstName',
                // Custom callback: Block @ character
                (fieldName, value, event) => {
                  if (typeof value === 'string' && value.includes('@')) {
                    // Block the @ character by reverting to previous value
                    const previousValue = watch('firstName') || '';
                    setValue(fieldName, previousValue.replace(/@/g, ''), { shouldDirty: true });
                    console.warn('⚠️ @ character is not allowed in username!');
                  }
                }
              )}
              placeholder="Try typing @ character..."
              className="flex h-10 w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Custom callback prevents @ character from being entered
            </p>
          </div>

          <div>
            <label className="text-sm font-medium">Email with logging</label>
            <input
              type="email"
              onChange={handleEmailChange(
                setValue,
                trigger,
                'email',
                // Custom callback: Log email changes
                (fieldName, value) => {
                  console.log(`📧 Email changed to: ${value}`);
                }
              )}
              placeholder="Email with logging callback"
              className="flex h-10 w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Check console for email change logs
            </p>
          </div>

          <div>
            <label className="text-sm font-medium">Age with validation</label>
            <input
              type="number"
              onChange={handleNumberChange(
                setValue,
                trigger,
                'age',
                // Custom callback: Validate age range
                (fieldName, value) => {
                  if (typeof value === 'number') {
                    if (value < 0) {
                      console.warn('⚠️ Age cannot be negative!');
                      setValue(fieldName, 0, { shouldDirty: true });
                    } else if (value > 150) {
                      console.warn('⚠️ Age seems too high!');
                      setValue(fieldName, 150, { shouldDirty: true });
                    }
                  }
                }
              )}
              placeholder="Age with validation (0-150)"
              className="flex h-10 w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Auto-corrects invalid age values
            </p>
          </div>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
        <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
          How to use these handlers in your project:
        </h3>
        <pre className="text-xs text-blue-800 dark:text-blue-200 overflow-auto">
{`import {
  handleTextChange,
  handleEmailChange,
  handlePhoneChange,
  handleNumberChange,
  handleSelectChange,
  handleCheckboxChange
} from 'abc-ui-template-web';

function MyForm() {
  const { setValue, trigger } = useForm();

  // Create handlers
  const textHandler = handleTextChange(setValue, trigger, 'fieldName');
  const emailHandler = handleEmailChange(setValue, trigger, 'email');
  const phoneHandler = handlePhoneChange(setValue, trigger, 'phone');

  return (
    <input onChange={textHandler} />
    <input type="email" onChange={emailHandler} />
    <input type="tel" onChange={phoneHandler} />
  );
}`}
        </pre>
      </div>
    </div>
  );
};