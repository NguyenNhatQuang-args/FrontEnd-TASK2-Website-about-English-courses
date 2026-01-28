import { ChangeEvent } from "react";

interface FormItemProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function FormItem({
  label,
  name,
  type = "text",
  placeholder,
  value,
  error,
  required = false,
  disabled = false,
  onChange,
  onBlur,
}: FormItemProps) {
  return (
    <div className="form-item">
      <label className={`form-item-label ${required ? "required" : ""}`} htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        className={`form-item-input ${error ? "has-error" : ""}`}
      />
      {error && <span className="form-item-error">{error}</span>}
    </div>
  );
}
