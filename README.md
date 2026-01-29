# ABC UI Template Web

Một thư viện UI components được xây dựng với shadcn/ui và Tailwind CSS.

## Cài đặt

```bash
npm install abc-ui-template-web
```

## Yêu cầu

- React >= 17
- Tailwind CSS >= 3.0.0
- React Hook Form >= 7.0.0 (cho form components)

## Sử dụng

### 1. Import CSS

Trong file CSS chính của dự án (thường là `globals.css` hoặc `index.css`):

```css
@import 'abc-ui-template-web/src/globals.css';
```

### 2. Cấu hình Tailwind CSS

Trong `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ... các file khác
    "./node_modules/abc-ui-template-web/**/*.{js,ts,jsx,tsx}",
  ],
  // ... cấu hình khác
}
```

### 3. Sử dụng Components

```tsx
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
  Textarea,
  Badge,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
  FormInput,
  FormTextarea,
  FormField
} from 'abc-ui-template-web';

function App() {
  return (
    <div>
      <Button>Click me</Button>

      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Card content goes here.</p>
        </CardContent>
      </Card>

      <Input placeholder="Enter text..." />

      <Badge variant="default">New</Badge>

      <Alert variant="success">
        <AlertIcon variant="success" />
        <AlertTitle>Success!</AlertTitle>
        <AlertDescription>
          Your changes have been saved.
        </AlertDescription>
      </Alert>
    </div>
  );
}
```

## React Hook Form Integration

Package này bao gồm các form components tích hợp sẵn với React Hook Form:

```tsx
import { useForm } from 'react-hook-form';
import { FormInput, FormTextarea } from 'abc-ui-template-web';

function ContactForm() {
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FormInput
        control={form.control}
        name="name"
        label="Name"
        rules={{ required: 'Name is required' }}
      />

      <FormInput
        control={form.control}
        name="email"
        label="Email"
        type="email"
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^\S+@\S+$/i,
            message: 'Invalid email address'
          }
        }}
      />

      <FormTextarea
        control={form.control}
        name="message"
        label="Message"
        rules={{ required: 'Message is required' }}
      />

      <Button type="submit">Submit</Button>
    </form>
  );
}
```

## Form Handlers API

Package cung cấp các function handler riêng biệt để xử lý onChange cho từng loại input:

### Sử dụng Individual Handlers

```tsx
import {
  handleTextChange,
  handleEmailChange,
  handlePhoneChange,
  handleNumberChange,
  handleSelectChange,
  handleCheckboxChange
} from 'abc-ui-template-web';

function MyForm() {
  const { setValue, trigger } = useForm();

  // Tạo handlers cho từng field
  const textHandler = handleTextChange(setValue, trigger, 'fullName');
  const emailHandler = handleEmailChange(setValue, trigger, 'email');
  const phoneHandler = handlePhoneChange(setValue, trigger, 'phone');
  const ageHandler = handleNumberChange(setValue, trigger, 'age');
  const countryHandler = handleSelectChange(setValue, trigger, 'country');
  const termsHandler = handleCheckboxChange(setValue, trigger, 'agreeToTerms');

  return (
    <form>
      <input onChange={textHandler} placeholder="Full name" />
      <input type="email" onChange={emailHandler} placeholder="Email" />
      <input type="tel" onChange={phoneHandler} placeholder="Phone" />
      <input type="number" onChange={ageHandler} placeholder="Age" />

      <select onChange={(e) => countryHandler(e.target.value)}>
        <option value="vn">Vietnam</option>
        <option value="us">United States</option>
      </select>

      <input type="checkbox" onChange={termsHandler} />
    </form>
  );
}
```

### Các Handler Functions

| Function | Description | Input Type |
|----------|-------------|------------|
| `handleTextChange` | Text input với basic validation | `text`, `textarea` |
| `handleEmailChange` | Email input với lowercase formatting | `email` |
| `handlePhoneChange` | Phone input với Vietnamese formatting | `tel` |
| `handleNumberChange` | Number input với validation | `number` |
| `handleCurrencyChange` | Currency input (removes non-numeric) | `number` |
| `handleSelectChange` | Select dropdown handler | `select` |
| `handleCheckboxChange` | Checkbox handler | `checkbox` |
| `handleRadioChange` | Radio button handler | `radio` |
| `handleFileChange` | File input handler | `file` |

### Parameters

```tsx
handleTextChange<T>(
  setValue: UseFormSetValue<T>,  // React Hook Form setValue
  trigger: UseFormTrigger<T>,    // Optional: React Hook Form trigger
  name: FieldPath<T>             // Field name
): (event: ChangeEvent) => void  // Returns onChange handler
```

### Advanced Usage với Debouncing

```tsx
import { createDebouncedTrigger } from 'abc-ui-template-web';

function MyForm() {
  const { setValue, trigger } = useForm();
  const debouncedTrigger = createDebouncedTrigger(trigger, 500); // 500ms delay

  const emailHandler = handleEmailChange(setValue, debouncedTrigger, 'email');

  return <input type="email" onChange={emailHandler} />;
}
```
```

## Components có sẵn

- **Button**: Nút với nhiều variant (default, destructive, outline, secondary, ghost, link) và size (default, sm, lg, icon), loading state, icons, tooltips
- **Card**: Container component với CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- **Input**: Input field với styling nhất quán
- **Textarea**: Textarea component cho multi-line input
- **Badge**: Badge component cho labels và status với variants (default, secondary, destructive, outline)
- **Alert**: Alert component cho notifications với variants (default, destructive, success, warning) và icons
- **Form Components**: FormInput, FormTextarea, FormField - tích hợp với React Hook Form

## Phát triển

```bash
# Cài đặt dependencies
npm install

# Chạy build
npm run build

# Chạy dev mode
npm run dev

# Kiểm tra TypeScript
npm run lint

# Chạy Storybook
npm run storybook
```

## Storybook

Thư viện có Storybook để xem và test các component:

- **Button**: Các variant (default, destructive, outline, secondary, ghost, link) và sizes (sm, default, lg, icon)
- **Card**: Các layout khác nhau với header, content, footer

Truy cập: http://localhost:6006 sau khi chạy `npm run storybook`

## Demo

Xem file `demo.html` để thấy ví dụ sử dụng các component với CSS thuần.

## Xuất bản

```bash
npm publish
```

## Build Storybook (Optional)

Để build Storybook thành static files:

```bash
npm run build-storybook
```

---

## 🔧 Advanced Form Handlers API

Ngoài FormInput/FormTextarea components, package cung cấp **individual handler functions** để bạn có toàn quyền kiểm soát onChange logic cho form phức tạp:

### Direct Handler Functions Usage

```tsx
import {
  handleTextChange,
  handleEmailChange,
  handlePhoneChange,
  handleNumberChange,
  handleSelectChange,
  handleCheckboxChange,
  createDebouncedTrigger
} from 'abc-ui-template-web';

function AdvancedForm() {
  const { setValue, trigger } = useForm();

  // Debounced validation (300ms delay)
  const debouncedTrigger = createDebouncedTrigger(trigger, 300);

  // Create individual handlers for each field
  const nameHandler = handleTextChange(setValue, debouncedTrigger, 'fullName');
  const emailHandler = handleEmailChange(setValue, trigger, 'email');
  const phoneHandler = handlePhoneChange(setValue, trigger, 'phone');
  const ageHandler = handleNumberChange(setValue, trigger, 'age');
  const salaryHandler = handleCurrencyChange(setValue, trigger, 'salary');
  const countryHandler = handleSelectChange(setValue, trigger, 'country');
  const termsHandler = handleCheckboxChange(setValue, trigger, 'agreeToTerms');

  return (
    <form>
      <input onChange={nameHandler} placeholder="Full name" />
      <input type="email" onChange={emailHandler} placeholder="Email" />
      <input type="tel" onChange={phoneHandler} placeholder="Phone" />
      <input type="number" onChange={ageHandler} placeholder="Age" />
      <input type="number" onChange={salaryHandler} placeholder="Salary" />

      <select onChange={(e) => countryHandler(e.target.value)}>
        <option value="vn">Vietnam</option>
        <option value="us">United States</option>
      </select>

      <input type="checkbox" onChange={termsHandler} />
      <label>Agree to terms</label>
    </form>
  );
}
```

### Handler Functions Reference

| Handler Function | Input Type | Special Features |
|------------------|------------|------------------|
| `handleTextChange` | text/textarea | Basic text input with validation |
| `handleEmailChange` | email | Auto lowercase & trim |
| `handlePhoneChange` | tel | Vietnamese phone number formatting |
| `handleNumberChange` | number | Number validation & parsing |
| `handleCurrencyChange` | number | Currency input (numeric only) |
| `handleSelectChange` | select | Dropdown value handling |
| `handleCheckboxChange` | checkbox | Boolean toggle |
| `handleRadioChange` | radio | Radio button groups |
| `handleFileChange` | file | File upload handling |

### Function Signature

```tsx
handleTextChange<TFieldValues>(
  setValue: UseFormSetValue<TFieldValues>,    // React Hook Form setValue
  trigger?: UseFormTrigger<TFieldValues>,     // Optional validation trigger
  name: FieldPath<TFieldValues>               // Field name
): (event: ChangeEvent<HTMLInputElement>) => void
```

### Advanced Features

#### Debounced Validation
```tsx
import { handleEmailChange, createDebouncedTrigger } from 'abc-ui-template-web';

function DebouncedForm() {
  const { setValue, trigger } = useForm();

  // 500ms debounced validation to avoid excessive API calls
  const debouncedTrigger = createDebouncedTrigger(trigger, 500);
  const emailHandler = handleEmailChange(setValue, debouncedTrigger, 'email');

  return (
    <input
      type="email"
      onChange={emailHandler}
      placeholder="Email with debounced validation"
    />
  );
}
```

#### Custom Validation Rules
```tsx
import {
  required, email, phone, minLength, maxLength, numeric, minValue, maxValue
} from 'abc-ui-template-web';

const formValidationRules = {
  name: {
    validate: {
      ...required('Tên là bắt buộc'),
      ...minLength(2, 'Tên phải có ít nhất 2 ký tự'),
      ...maxLength(50, 'Tên không được vượt quá 50 ký tự')
    }
  },
  email: {
    validate: email('Email không hợp lệ')
  },
  phone: {
    validate: phone('Số điện thoại không đúng định dạng')
  },
  age: {
    validate: {
      ...required('Tuổi là bắt buộc'),
      ...numeric('Tuổi phải là số'),
      ...minValue(18, 'Phải từ 18 tuổi trở lên'),
      ...maxValue(100, 'Tuổi không hợp lệ')
    }
  }
};
```

#### Formatting Utilities
```tsx
import { formatPhoneNumber, formatCurrency, formatNumber } from 'abc-ui-template-web';

// Phone formatting: "0123456789" → "0123 456 789"
const formattedPhone = formatPhoneNumber('0123456789');

// Currency formatting: 1000000 → "₫1,000,000"
const formattedPrice = formatCurrency(1000000);

// Number formatting: 1234567 → "1,234,567"
const formattedNumber = formatNumber(1234567);
```

### Benefits

✅ **Maximum Flexibility** - Control exactly how each input behaves
✅ **Performance** - Direct handlers without component overhead
✅ **Custom Logic** - Add your own validation/formatting
✅ **Type Safety** - Full TypeScript support with generics
✅ **Consistency** - Standardized handlers across your projects
✅ **Advanced Features** - Debouncing, custom formatting, etc.

### Real-World Example

```tsx
import { useForm } from 'react-hook-form';
import {
  handleTextChange,
  handleEmailChange,
  handlePhoneChange,
  handleNumberChange,
  handleCheckboxChange,
  required,
  email,
  phone,
  minLength
} from 'abc-ui-template-web';

interface UserForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  agreeToTerms: boolean;
}

function UserRegistrationForm() {
  const { setValue, trigger, handleSubmit, formState: { errors } } = useForm<UserForm>();

  // Create handlers with debounced validation
  const debouncedTrigger = createDebouncedTrigger(trigger, 300);

  const firstNameHandler = handleTextChange(setValue, debouncedTrigger, 'firstName');
  const emailHandler = handleEmailChange(setValue, trigger, 'email');
  const phoneHandler = handlePhoneChange(setValue, trigger, 'phone');
  const ageHandler = handleNumberChange(setValue, trigger, 'age');
  const termsHandler = handleCheckboxChange(setValue, trigger, 'agreeToTerms');

  const onSubmit = (data: UserForm) => {
    console.log('User registered:', data);
    // Submit to API
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            onChange={firstNameHandler}
            placeholder="First Name"
            className={errors.firstName ? 'border-red-500' : 'border-gray-300'}
          />
          {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName.message}</span>}
        </div>

        <div>
          <input
            type="email"
            onChange={emailHandler}
            placeholder="Email"
            className={errors.email ? 'border-red-500' : 'border-gray-300'}
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
        </div>
      </div>

      <div>
        <input
          type="tel"
          onChange={phoneHandler}
          placeholder="Phone Number"
          className={errors.phone ? 'border-red-500' : 'border-gray-300'}
        />
        {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
      </div>

      <div>
        <input
          type="number"
          onChange={ageHandler}
          placeholder="Age"
          className={errors.age ? 'border-red-500' : 'border-gray-300'}
        />
        {errors.age && <span className="text-red-500 text-sm">{errors.age.message}</span>}
      </div>

      <div>
        <input type="checkbox" onChange={termsHandler} id="terms" />
        <label htmlFor="terms">I agree to terms and conditions</label>
        {errors.agreeToTerms && <span className="text-red-500 text-sm">{errors.agreeToTerms.message}</span>}
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Register
      </button>
    </form>
  );
}
```

## Form Components with Callback Support

The `FormInput` and `FormTextarea` components now support callback functions, combining the convenience of form integration with the power of custom handlers.

### FormInput with Input Type Presets

#### Email Input with Logging
```tsx
import { FormInput } from 'abc-ui-template-web';

<FormInput
  control={control}
  name="email"
  label="Email Address"
  inputType="email"  // Built-in email formatting
  onChangeCallback={(name, value) => {
    console.log(`📧 Email changed: ${value}`);
    // Analytics tracking, validation, etc.
  }}
  rules={{
    required: 'Email is required',
    pattern: {
      value: /^\S+@\S+$/i,
      message: 'Invalid email format'
    }
  }}
/>
```

#### Phone Input with Vietnamese Validation
```tsx
<FormInput
  control={control}
  name="phone"
  label="Phone Number"
  inputType="phone"  // Auto-formats: 0123456789 → 012 345 6789
  onChangeCallback={(name, value) => {
    if (typeof value === 'string' && value.length > 0) {
      if (!value.startsWith('0')) {
        console.warn('Vietnamese numbers start with 0');
      }
    }
  }}
/>
```

### FormTextarea with Callbacks

```tsx
import { FormTextarea } from 'abc-ui-template-web';

<FormTextarea
  control={control}
  name="comment"
  label="Comment"
  rows={4}
  onChangeCallback={(name, value, event) => {
    if (typeof value === 'string') {
      // Remove excessive whitespace
      const cleanValue = value.replace(/\s+/g, ' ') .trim();

      // Word count validation
      const wordCount = cleanValue.split(' ') .length;
      if (wordCount < 3) {
        console.log('Consider writing more...');
      }
    }
  }}
  rules={{
    required: 'Comment is required',
    maxLength: { value: 1000, message: 'Too long' }
  }}
/>
```

### Available Input Types

| inputType | Handler Used | Description |
|-----------|-------------|-------------|
| `"text"` | `handleTextChange` | Basic text input |
| `"email"` | `handleEmailChange` | Email with lowercase/trim |
| `"number"` | `handleNumberChange` | Number validation |
| `"phone"` | `handlePhoneChange` | Phone formatting |
| `"currency"` | `handleCurrencyChange` | Currency parsing |

### Benefits

- ✅ **Seamless Integration**: Works directly with React Hook Form
- ✅ **Built-in Validation**: Combines form rules with callbacks
- ✅ **Type Safety**: Full TypeScript support
- ✅ **Consistent UI**: Maintains error styling and layout
- ✅ **Flexible**: Add any custom logic without breaking forms
- ✅ **Convenient**: Preset types for common use cases
