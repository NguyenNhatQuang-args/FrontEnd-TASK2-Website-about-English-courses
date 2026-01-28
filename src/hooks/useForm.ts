import { useState, FormEvent, ChangeEvent } from "react";

export interface FormFieldConfig {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  patternMessage?: string;
  validate?: (value: string, formData: Record<string, string>) => string | null;
}

export interface FormErrors {
  [key: string]: string;
}

export interface UseFormReturn {
  values: Record<string, string>;
  errors: FormErrors;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (onSubmit: (values: Record<string, string>) => Promise<void>) => (e: FormEvent) => void;
  setFieldError: (field: string, error: string) => void;
  resetForm: () => void;
  isValid: boolean;
}

export function useForm(fields: FormFieldConfig[]): UseFormReturn {
  const initialValues = fields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {} as Record<string, string>);

  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name: string, value: string): string | null => {
    const fieldConfig = fields.find((f) => f.name === name);
    if (!fieldConfig) return null;

    if (fieldConfig.required && !value.trim()) {
      return `${fieldConfig.label} là bắt buộc`;
    }

    if (fieldConfig.minLength && value.length < fieldConfig.minLength) {
      return `${fieldConfig.label} phải có ít nhất ${fieldConfig.minLength} ký tự`;
    }

    if (fieldConfig.maxLength && value.length > fieldConfig.maxLength) {
      return `${fieldConfig.label} không được vượt quá ${fieldConfig.maxLength} ký tự`;
    }

    if (fieldConfig.pattern && !fieldConfig.pattern.test(value)) {
      return fieldConfig.patternMessage || `${fieldConfig.label} không hợp lệ`;
    }

    if (fieldConfig.validate) {
      return fieldConfig.validate(value, values);
    }

    return null;
  };

  const validateAllFields = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    fields.forEach((field) => {
      const error = validateField(field.name, values[field.name]);
      if (error) {
        newErrors[field.name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error || "",
      }));
    }
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error || "",
    }));
  };

  const handleSubmit = (onSubmit: (values: Record<string, string>) => Promise<void>) => {
    return async (e: FormEvent) => {
      e.preventDefault();

      const allTouched = fields.reduce((acc, field) => {
        acc[field.name] = true;
        return acc;
      }, {} as Record<string, boolean>);
      setTouched(allTouched);

      if (!validateAllFields()) {
        return;
      }

      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } finally {
        setIsSubmitting(false);
      }
    };
  };

  const setFieldError = (field: string, error: string) => {
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  };

  const isValid = Object.values(errors).every((e) => !e) &&
    fields.filter(f => f.required).every(f => values[f.name].trim());

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldError,
    resetForm,
    isValid,
  };
}
