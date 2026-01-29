import { ChangeEvent, FocusEvent } from 'react';
import { FieldPath, FieldValues, UseFormSetValue, UseFormTrigger } from 'react-hook-form';

// ==========================================
// FORM HANDLERS - Centralized onChange functions
// ==========================================

/**
 * Standard text input handler with basic validation
 * Usage: const handleTextChange = createTextHandler(setValue, trigger);
 *        <input onChange={handleTextChange('fieldName')} />
 * @param setValue - React Hook Form setValue function
 * @param trigger - Optional React Hook Form trigger function
 * @param onChangeCallback - Optional callback executed after processing
 */
export const createTextHandler = <T extends FieldValues>(
  setValue: UseFormSetValue<T>,
  trigger?: UseFormTrigger<T>,
  onChangeCallback?: (name: FieldPath<T>, value: any, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
) => {
  return (name: FieldPath<T>) => {
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
};

/**
 * Number input handler with validation
 * @param setValue - React Hook Form setValue function
 * @param trigger - Optional React Hook Form trigger function
 * @param onChangeCallback - Optional callback executed after processing
 */
export const createNumberHandler = <T extends FieldValues>(
  setValue: UseFormSetValue<T>,
  trigger?: UseFormTrigger<T>,
  onChangeCallback?: (name: FieldPath<T>, value: any, event: ChangeEvent<HTMLInputElement>) => void
) => {
  return (name: FieldPath<T>) => {
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
};

/**
 * Phone number handler with formatting
 * @param setValue - React Hook Form setValue function
 * @param trigger - Optional React Hook Form trigger function
 * @param onChangeCallback - Optional callback executed after processing
 */
export const createPhoneHandler = <T extends FieldValues>(
  setValue: UseFormSetValue<T>,
  trigger?: UseFormTrigger<T>,
  onChangeCallback?: (name: FieldPath<T>, value: string, event: ChangeEvent<HTMLInputElement>) => void
) => {
  return (name: FieldPath<T>) => {
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
};

/**
 * Email handler with basic validation
 * @param setValue - React Hook Form setValue function
 * @param trigger - Optional React Hook Form trigger function
 * @param onChangeCallback - Optional callback executed after processing
 */
export const createEmailHandler = <T extends FieldValues>(
  setValue: UseFormSetValue<T>,
  trigger?: UseFormTrigger<T>,
  onChangeCallback?: (name: FieldPath<T>, value: string, event: ChangeEvent<HTMLInputElement>) => void
) => {
  return (name: FieldPath<T>) => {
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
};

/**
 * Currency input handler
 * @param setValue - React Hook Form setValue function
 * @param trigger - Optional React Hook Form trigger function
 * @param onChangeCallback - Optional callback executed after processing
 */
export const createCurrencyHandler = <T extends FieldValues>(
  setValue: UseFormSetValue<T>,
  trigger?: UseFormTrigger<T>,
  onChangeCallback?: (name: FieldPath<T>, value: number | string, event: ChangeEvent<HTMLInputElement>) => void
) => {
  return (name: FieldPath<T>) => {
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
};

/**
 * Checkbox handler
 * @param setValue - React Hook Form setValue function
 * @param trigger - Optional React Hook Form trigger function
 * @param onChangeCallback - Optional callback executed after processing
 */
export const createCheckboxHandler = <T extends FieldValues>(
  setValue: UseFormSetValue<T>,
  trigger?: UseFormTrigger<T>,
  onChangeCallback?: (name: FieldPath<T>, value: boolean, event: ChangeEvent<HTMLInputElement>) => void
) => {
  return (name: FieldPath<T>) => {
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
};

/**
 * Select handler
 * @param setValue - React Hook Form setValue function
 * @param trigger - Optional React Hook Form trigger function
 * @param onChangeCallback - Optional callback executed after processing
 */
export const createSelectHandler = <T extends FieldValues>(
  setValue: UseFormSetValue<T>,
  trigger?: UseFormTrigger<T>,
  onChangeCallback?: (name: FieldPath<T>, value: string | number) => void
) => {
  return (name: FieldPath<T>) => {
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
};

// ==========================================
// FORMATTERS - Input formatting utilities
// ==========================================

/**
 * Format phone number (Vietnamese style)
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
 * Format date for input (YYYY-MM-DD)
 */
export const formatDateForInput = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

// ==========================================
// VALIDATION HELPERS - Reusable validation functions
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

/**
 * Pattern validation
 */
export const pattern = (regex: RegExp, message = 'Giá trị không hợp lệ') => {
  return (value: string) => {
    return regex.test(value) || message;
  };
};

// ==========================================
// FORM STATE HELPERS - Advanced form utilities
// ==========================================

/**
 * Create debounced validation trigger
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

/**
 * Form field focus/blur handlers
 */
export const createFocusHandlers = <T extends FieldValues>(
  trigger?: UseFormTrigger<T>
) => {
  return (name: FieldPath<T>) => ({
    onBlur: () => {
      if (trigger) {
        trigger(name);
      }
    },
    onFocus: () => {
      // Optional: Add focus logic here
    }
  });
};

/**
 * Conditional validation helper
 */
export const createConditionalValidation = <T extends FieldValues>(
  condition: (data: T) => boolean,
  validationFn: (value: any) => string | true
) => {
  return (value: any, formData: T) => {
    if (condition(formData)) {
      return validationFn(value);
    }
    return true;
  };
};

// ==========================================
// TYPE DEFINITIONS
// ==========================================

export type FormHandler<T extends FieldValues> = (
  setValue: UseFormSetValue<T>,
  trigger?: UseFormTrigger<T>
) => (name: FieldPath<T>) => (event: ChangeEvent<any>) => void;

export type SelectHandler<T extends FieldValues> = (
  setValue: UseFormSetValue<T>,
  trigger?: UseFormTrigger<T>
) => (name: FieldPath<T>) => (value: string | number) => void;

export type ValidationFunction = (value: any, formData?: any) => string | true;