import * as React from "react"
import { Controller, Control, FieldPath, FieldValues } from "react-hook-form"
import { Textarea } from "../Textarea/Textarea"
import { FormField } from "./FormField"
import { cn } from "../../lib/utils"
import { handleTextChange } from "../../lib/formHandlers"

export interface FormTextareaProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'name'> {
  control: Control<TFieldValues>
  name: TName
  label?: string
  rules?: any
  className?: string
  // Callback support for advanced customization
  onChangeCallback?: (name: string, value: any, event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const FormTextarea = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  rules,
  className,
  onChangeCallback,
  ...textareaProps
}: FormTextareaProps<TFieldValues, TName>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }: any) => {
        // Create custom onChange handler with callback support
        const handleChange = React.useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
          if (onChangeCallback) {
            // Use text handler with callback (cast to match signature)
            const handler = handleTextChange(field.onChange, undefined, name, onChangeCallback as any);
            handler(event);
          } else {
            // Default behavior
            field.onChange(event);
          }
        }, [field.onChange, name, onChangeCallback]);

        return (
          <FormField error={fieldState.error?.message} className={className}>
            {label && (
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {label}
              </label>
            )}
            <Textarea
              {...field}
              {...textareaProps}
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