import { ChangeEvent } from 'react';
import { FieldPath, FieldValues, UseFormSetValue, UseFormTrigger } from 'react-hook-form';

// ==========================================
// INDIVIDUAL FORM HANDLERS
// Projects can import and use these directly
// ==========================================

/**
 * Text input onChange handler
 * @param setValue - React Hook Form setValue function
 * @param trigger - Optional React Hook Form trigger function
 * @param name - Field name
 * @param onChangeCallback - Optional callback executed after processing
 * @returns onChange handler function
 *
 * Usage:
 * ```tsx
 * import { handleTextChange } from 'abc-ui-template-web';
 *
 * // Basic usage
 * const textHandler = handleTextChange(setValue, trigger, 'fieldName');
 *
 * // With custom callback (e.g., block @ character)
 * const customHandler = handleTextChange(
 *   setValue,
 *   trigger,
 *   'username',
 *   (name, value, event) => {
 *     // Custom logic here - executed after setValue
 *     if (value.includes('@')) {
 *       console.log('Warning: @ character detected');
 *       // You can modify value or trigger custom actions
 *     }
 *   }
 * );
 *
 * <input onChange={customHandler} />
 * ```
 */
export const handleTextChange = <T extends FieldValues>(
  setValue: UseFormSetValue<T>,
  trigger: UseFormTrigger<T> | undefined,
  name: FieldPath<T>,
  onChangeCallback?: (name: FieldPath<T>, value: any, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
) => {
  return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    setValue(name, value as any, { shouldDirty: true });

    if (trigger) {
      trigger(name);
    }

    if (onChangeCallback) {
      onChangeCallback(name, value, event);
    }
  };
};

/**
 * Number input onChange handler
 * @param setValue - React Hook Form setValue function
 * @param trigger - Optional React Hook Form trigger function
 * @param name - Field name
 * @param onChangeCallback - Optional callback executed after processing
 * @returns onChange handler function
 *
 * Usage:
 * ```tsx
 * import { handleNumberChange } from 'abc-ui-template-web';
 *
 * const numberChangeHandler = handleNumberChange(setValue, trigger, 'age');
 *
 * <input type="number" onChange={numberChangeHandler} />
 * ```
 */
export const handleNumberChange = <T extends FieldValues>(
  setValue: UseFormSetValue<T>,
  trigger: UseFormTrigger<T> | undefined,
  name: FieldPath<T>,
  onChangeCallback?: (name: FieldPath<T>, value: number | string, event: ChangeEvent<HTMLInputElement>) => void
) => {
  return (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numValue = value === '' ? '' : Number(value);

    if (value === '' || (!isNaN(Number(value)) && !isNaN(parseFloat(value)))) {
      setValue(name, numValue as any, { shouldDirty: true });

      if (trigger) {
        trigger(name);
      }

      if (onChangeCallback) {
        onChangeCallback(name, numValue, event);
      }
    }
  };
};

/**
 * Phone number input onChange handler with formatting
 * @param setValue - React Hook Form setValue function
 * @param trigger - Optional React Hook Form trigger function
 * @param name - Field name
 * @returns onChange handler function
 *
 * Usage:
 * ```tsx
 * import { handlePhoneChange } from 'abc-ui-template-web';
 *
 * const phoneChangeHandler = handlePhoneChange(setValue, trigger, 'phone');
 *
 * <input type="tel" onChange={phoneChangeHandler} />
 * ```
 */
export const handlePhoneChange = <T extends FieldValues>(
  setValue: UseFormSetValue<T>,
  trigger: UseFormTrigger<T> | undefined,
  name: FieldPath<T>,
  onChangeCallback?: (name: FieldPath<T>, value: string, event: ChangeEvent<HTMLInputElement>) => void
) => {
  return (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, ''); // Remove non-digits
    const formatted = formatPhoneNumber(value);

    setValue(name, formatted as any, { shouldDirty: true });

    if (trigger) {
      trigger(name);
    }

    if (onChangeCallback) {
      onChangeCallback(name, formatted, event);
    }
  };
};

/**
 * Email input onChange handler with lowercase formatting
 * @param setValue - React Hook Form setValue function
 * @param trigger - Optional React Hook Form trigger function
 * @param name - Field name
 * @returns onChange handler function
 *
 * Usage:
 * ```tsx
 * import { handleEmailChange } from 'abc-ui-template-web';
 *
 * const emailChangeHandler = handleEmailChange(setValue, trigger, 'email');
 *
 * <input type="email" onChange={emailChangeHandler} />
 * ```
 */
export const handleEmailChange = <T extends FieldValues>(
  setValue: UseFormSetValue<T>,
  trigger: UseFormTrigger<T> | undefined,
  name: FieldPath<T>,
  onChangeCallback?: (name: FieldPath<T>, value: string, event: ChangeEvent<HTMLInputElement>) => void
) => {
  return (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase().trim();
    setValue(name, value as any, { shouldDirty: true });

    if (trigger) {
      trigger(name);
    }

    if (onChangeCallback) {
      onChangeCallback(name, value, event);
    }
  };
};

/**
 * Currency input onChange handler
 * @param setValue - React Hook Form setValue function
 * @param trigger - Optional React Hook Form trigger function
 * @param name - Field name
 * @returns onChange handler function
 *
 * Usage:
 * ```tsx
 * import { handleCurrencyChange } from 'abc-ui-template-web';
 *
 * const currencyChangeHandler = handleCurrencyChange(setValue, trigger, 'salary');
 *
 * <input type="number" onChange={currencyChangeHandler} />
 * ```
 */
export const handleCurrencyChange = <T extends FieldValues>(
  setValue: UseFormSetValue<T>,
  trigger: UseFormTrigger<T> | undefined,
  name: FieldPath<T>,
  onChangeCallback?: (name: FieldPath<T>, value: number | string, event: ChangeEvent<HTMLInputElement>) => void
) => {
  return (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^\d.]/g, '');
    const numValue = value === '' ? '' : parseFloat(value);

    setValue(name, numValue as any, { shouldDirty: true });

    if (trigger) {
      trigger(name);
    }

    if (onChangeCallback) {
      onChangeCallback(name, numValue, event);
    }
  };
};

/**
 * Checkbox onChange handler
 * @param setValue - React Hook Form setValue function
 * @param trigger - Optional React Hook Form trigger function
 * @param name - Field name
 * @returns onChange handler function
 *
 * Usage:
 * ```tsx
 * import { handleCheckboxChange } from 'abc-ui-template-web';
 *
 * const checkboxChangeHandler = handleCheckboxChange(setValue, trigger, 'agreeToTerms');
 *
 * <input type="checkbox" onChange={checkboxChangeHandler} />
 * ```
 */
export const handleCheckboxChange = <T extends FieldValues>(
  setValue: UseFormSetValue<T>,
  trigger: UseFormTrigger<T> | undefined,
  name: FieldPath<T>,
  onChangeCallback?: (name: FieldPath<T>, value: boolean, event: ChangeEvent<HTMLInputElement>) => void
) => {
  return (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setValue(name, checked as any, { shouldDirty: true });

    if (trigger) {
      trigger(name);
    }

    if (onChangeCallback) {
      onChangeCallback(name, checked, event);
    }
  };
};

/**
 * Select onChange handler
 * @param setValue - React Hook Form setValue function
 * @param trigger - Optional React Hook Form trigger function
 * @param name - Field name
 * @returns onChange handler function
 *
 * Usage:
 * ```tsx
 * import { handleSelectChange } from 'abc-ui-template-web';
 *
 * const selectChangeHandler = handleSelectChange(setValue, trigger, 'country');
 *
 * <select onChange={selectChangeHandler}>
 *   <option value="vn">Vietnam</option>
 *   <option value="us">United States</option>
 * </select>
 * ```
 */
export const handleSelectChange = <T extends FieldValues>(
  setValue: UseFormSetValue<T>,
  trigger: UseFormTrigger<T> | undefined,
  name: FieldPath<T>,
  onChangeCallback?: (name: FieldPath<T>, value: string | number) => void
) => {
  return (value: string | number) => {
    setValue(name, value as any, { shouldDirty: true });

    if (trigger) {
      trigger(name);
    }

    if (onChangeCallback) {
      onChangeCallback(name, value);
    }
  };
};

/**
 * File input onChange handler
 * @param setValue - React Hook Form setValue function
 * @param trigger - Optional React Hook Form trigger function
 * @param name - Field name
 * @returns onChange handler function
 *
 * Usage:
 * ```tsx
 * import { handleFileChange } from 'abc-ui-template-web';
 *
 * const fileChangeHandler = handleFileChange(setValue, trigger, 'avatar');
 *
 * <input type="file" onChange={fileChangeHandler} />
 * ```
 */
export const handleFileChange = <T extends FieldValues>(
  setValue: UseFormSetValue<T>,
  trigger: UseFormTrigger<T> | undefined,
  name: FieldPath<T>,
  onChangeCallback?: (name: FieldPath<T>, value: FileList | null, event: ChangeEvent<HTMLInputElement>) => void
) => {
  return (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    setValue(name, files as any, { shouldDirty: true });

    if (trigger) {
      trigger(name);
    }

    if (onChangeCallback) {
      onChangeCallback(name, files, event);
    }
  };
};

/**
 * Radio button onChange handler
 * @param setValue - React Hook Form setValue function
 * @param trigger - Optional React Hook Form trigger function
 * @param name - Field name
 * @returns onChange handler function
 *
 * Usage:
 * ```tsx
 * import { handleRadioChange } from 'abc-ui-template-web';
 *
 * const radioChangeHandler = handleRadioChange(setValue, trigger, 'gender');
 *
 * <input type="radio" value="male" onChange={radioChangeHandler} />
 * <input type="radio" value="female" onChange={radioChangeHandler} />
 * ```
 */
export const handleRadioChange = <T extends FieldValues>(
  setValue: UseFormSetValue<T>,
  trigger: UseFormTrigger<T> | undefined,
  name: FieldPath<T>,
  onChangeCallback?: (name: FieldPath<T>, value: string, event: ChangeEvent<HTMLInputElement>) => void
) => {
  return (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValue(name, value as any, { shouldDirty: true });

    if (trigger) {
      trigger(name);
    }

    if (onChangeCallback) {
      onChangeCallback(name, value, event);
    }
  };
};

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

/**
 * Format phone number (Vietnamese style)
 * Exported for direct use if needed
 */
export const formatPhoneNumber = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');

  if (cleaned.length === 0) return '';
  if (cleaned.length <= 3) return cleaned;
  if (cleaned.length <= 6) return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
  if (cleaned.length <= 9) return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;

  return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9, 12)}`;
};

/**
 * Format currency (VND)
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value);
};

/**
 * Format number with thousand separators
 */
export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('vi-VN').format(value);
};

/**
 * Debounced trigger for validation
 */
export const createDebouncedTrigger = <T extends FieldValues>(
  trigger: UseFormTrigger<T>,
  delay = 300
) => {
  let timeoutId: number;

  return (name: FieldPath<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      trigger(name);
    }, delay) as any;
  };
};

// ==========================================
// CUSTOM HANDLER EXAMPLES
// ==========================================
// VALIDATION HELPERS
// ==========================================

/**
 * Required field validation
 */
export const required = (message = 'Trường này là bắt buộc') => {
  return (value: any) => {
    if (value === undefined || value === null || value === '') {
      return message;
    }
    if (Array.isArray(value) && value.length === 0) {
      return message;
    }
    return true;
  };
};

/**
 * Email validation
 */
export const email = (message = 'Email không hợp lệ') => {
  return (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) || message;
  };
};

/**
 * Phone validation (Vietnamese)
 */
export const phone = (message = 'Số điện thoại không hợp lệ') => {
  return (value: string) => {
    const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
    const cleaned = value.replace(/\s/g, '');
    return phoneRegex.test(cleaned) || message;
  };
};

/**
 * Min length validation
 */
export const minLength = (min: number, message?: string) => {
  return (value: string) => {
    const defaultMessage = `Phải có ít nhất ${min} ký tự`;
    return value.length >= min || (message || defaultMessage);
  };
};

/**
 * Max length validation
 */
export const maxLength = (max: number, message?: string) => {
  return (value: string) => {
    const defaultMessage = `Không được vượt quá ${max} ký tự`;
    return value.length <= max || (message || defaultMessage);
  };
};

/**
 * Numeric validation
 */
export const numeric = (message = 'Phải là số') => {
  return (value: any) => {
    return !isNaN(value) || message;
  };
};

/**
 * Min value validation
 */
export const minValue = (min: number, message?: string) => {
  return (value: number) => {
    const defaultMessage = `Giá trị phải lớn hơn hoặc bằng ${min}`;
    return value >= min || (message || defaultMessage);
  };
};

/**
 * Max value validation
 */
export const maxValue = (max: number, message?: string) => {
  return (value: number) => {
    const defaultMessage = `Giá trị phải nhỏ hơn hoặc bằng ${max}`;
    return value <= max || (message || defaultMessage);
  };
};

// ==========================================
// TYPE EXPORTS
// ==========================================

export type FormChangeHandler = (event: ChangeEvent<any>) => void;
export type SelectChangeHandler = (value: string | number) => void;
export type FileChangeHandler = (event: ChangeEvent<HTMLInputElement>) => void;
export type ValidationFunction = (value: any, formData?: any) => string | true;