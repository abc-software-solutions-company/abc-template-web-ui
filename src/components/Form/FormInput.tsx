import * as React from "react"
import { Controller, Control, FieldPath, FieldValues } from "react-hook-form"
import { Input, InputProps } from "../Input/Input"
import { FormField } from "./FormField"
import { cn } from "../../lib/utils"
import {
  handleTextChange,
  handleNumberChange,
  handleEmailChange,
  handlePhoneChange,
  handleCurrencyChange
} from "../../lib/formHandlers"

export interface FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<InputProps, 'name'> {
  control: Control<TFieldValues>
  name: TName
  label?: string
  rules?: any
  className?: string
  // Callback support for advanced customization
  onChangeCallback?: (name: string, value: any, event: React.ChangeEvent<HTMLInputElement>) => void
  // Input type presets with built-in handlers
  inputType?: 'text' | 'email' | 'number' | 'phone' | 'currency'
}

export const FormInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  rules,
  className,
  onChangeCallback,
  inputType,
  ...inputProps
}: FormInputProps<TFieldValues, TName>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }: any) => {
        // Create custom onChange handler with callback support
        const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
          let handler: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;

          // Use preset handlers based on inputType
          if (inputType) {
            switch (inputType) {
              case 'email':
                handler = handleEmailChange(field.onChange, undefined, name, onChangeCallback as any);
                break;
              case 'number':
                handler = handleNumberChange(field.onChange, undefined, name, onChangeCallback as any);
                break;
              case 'phone':
                handler = handlePhoneChange(field.onChange, undefined, name, onChangeCallback as any);
                break;
              case 'currency':
                handler = handleCurrencyChange(field.onChange, undefined, name, onChangeCallback as any);
                break;
              case 'text':
              default:
                handler = handleTextChange(field.onChange, undefined, name, onChangeCallback as any);
                break;
            }
          } else if (onChangeCallback) {
            // Use text handler with callback if no inputType specified
            handler = handleTextChange(field.onChange, undefined, name, onChangeCallback as any);
          }

          // Execute handler or fallback to default
          if (handler) {
            handler(event);
          } else {
            field.onChange(event);
          }
        }, [field.onChange, name, inputType, onChangeCallback]);

        return (
          <FormField error={fieldState.error?.message} className={className}>
            {label && (
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {label}
              </label>
            )}
            <Input
              {...field}
              {...inputProps}
              onChange={handleChange}
              className={cn(
                fieldState.error && "border-destructive focus-visible:ring-destructive"
              )}
            />
          </FormField>
        );
      }}
    />
  )
}