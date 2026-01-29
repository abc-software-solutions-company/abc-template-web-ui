import { useCallback, useMemo, useState } from 'react';
import { useForm, UseFormReturn, FieldValues, UseFormProps } from 'react-hook-form';
import {
  createTextHandler,
  createNumberHandler,
  createPhoneHandler,
  createEmailHandler,
  createCurrencyHandler,
  createCheckboxHandler,
  createSelectHandler,
  createDebouncedTrigger,
  createFocusHandlers,
  FormHandler,
  SelectHandler
} from './formUtils';

/**
 * Enhanced useForm hook with built-in handlers
 */
export function useEnhancedForm<T extends FieldValues = FieldValues>(
  props?: UseFormProps<T>
): UseFormReturn<T> & {
  handlers: {
    text: (name: keyof T) => (event: any) => void;
    number: (name: keyof T) => (event: any) => void;
    phone: (name: keyof T) => (event: any) => void;
    email: (name: keyof T) => (event: any) => void;
    currency: (name: keyof T) => (event: any) => void;
    checkbox: (name: keyof T) => (event: any) => void;
    select: (name: keyof T) => (value: any) => void;
  };
  utils: {
    debouncedTrigger: (delay?: number) => (name: any) => void;
    focusHandlers: (name: any) => {
      onBlur: () => void;
      onFocus: () => void;
    };
  };
} {
  const form = useForm<T>(props);

  // Create handlers
  const handlers = useMemo(() => ({
    text: (name: keyof T) => createTextHandler(form.setValue, form.trigger)(name as any),
    number: (name: keyof T) => createNumberHandler(form.setValue, form.trigger)(name as any),
    phone: (name: keyof T) => createPhoneHandler(form.setValue, form.trigger)(name as any),
    email: (name: keyof T) => createEmailHandler(form.setValue, form.trigger)(name as any),
    currency: (name: keyof T) => createCurrencyHandler(form.setValue, form.trigger)(name as any),
    checkbox: (name: keyof T) => createCheckboxHandler(form.setValue, form.trigger)(name as any),
    select: (name: keyof T) => createSelectHandler(form.setValue, form.trigger)(name as any),
  }), [form.setValue, form.trigger]);

  // Create utilities
  const utils = useMemo(() => ({
    debouncedTrigger: (delay = 300) =>
      createDebouncedTrigger(form.trigger, delay),
    focusHandlers: createFocusHandlers(form.trigger),
  }), [form.trigger]);

  return {
    ...form,
    handlers,
    utils,
  };
}

/**
 * Hook for form field management with validation
 */
export function useFormField<T extends FieldValues>(
  form: UseFormReturn<T>,
  name: keyof T,
  options: {
    validateOnChange?: boolean;
    validateOnBlur?: boolean;
    debounceMs?: number;
  } = {}
) {
  const {
    validateOnChange = true,
    validateOnBlur = true,
    debounceMs = 300
  } = options;

  const debouncedTrigger = useMemo(
    () => createDebouncedTrigger(form.trigger, debounceMs),
    [form.trigger, debounceMs]
  );

  const focusHandlers = useMemo(
    () => createFocusHandlers(validateOnBlur ? form.trigger : undefined),
    [form.trigger, validateOnBlur]
  );

  const handleChange = useCallback((event: any) => {
    const value = event.target ? event.target.value : event;
    form.setValue(name as any, value, { shouldDirty: true });

    if (validateOnChange) {
      debouncedTrigger(name as any);
    }
  }, [form, name, validateOnChange, debouncedTrigger]);

  const handleBlur = useCallback(() => {
    if (validateOnBlur) {
      form.trigger(name as any);
    }
  }, [form, name, validateOnBlur]);

  return {
    value: form.watch(name as any),
    error: form.formState.errors[name]?.message,
    onChange: handleChange,
    ...focusHandlers(name as any),
  };
}

/**
 * Hook for form submission with loading state
 */
export function useFormSubmit<T extends FieldValues>(
  form: UseFormReturn<T>,
  onSubmit: (data: T) => Promise<void> | void,
  options: {
    resetOnSuccess?: boolean;
    successMessage?: string;
    errorMessage?: string;
  } = {}
) {
  const {
    resetOnSuccess = false,
    successMessage,
    errorMessage = 'Có lỗi xảy ra. Vui lòng thử lại.'
  } = options;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = useCallback(async (data: T) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      await onSubmit(data);
      setSubmitSuccess(true);

      if (resetOnSuccess) {
        form.reset();
      }

      if (successMessage) {
        // You can integrate with toast library here
        alert(successMessage);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : errorMessage;
      setSubmitError(message);
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  }, [form, onSubmit, resetOnSuccess, successMessage, errorMessage]);

  return {
    isSubmitting,
    submitError,
    submitSuccess,
    handleSubmit: form.handleSubmit(handleSubmit),
    resetSubmitState: () => {
      setSubmitError(null);
      setSubmitSuccess(false);
    }
  };
}