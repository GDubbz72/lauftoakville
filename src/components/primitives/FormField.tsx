import { useState } from 'react';

interface FormFieldProps {
  label: string;
  placeholder: string;
  type?: 'text' | 'email' | 'tel';
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  disabled: boolean;
}

export function FormField({
  label,
  placeholder,
  type = 'text',
  value,
  error,
  onChange,
  onBlur,
  disabled,
}: FormFieldProps) {
  const [focus, setFocus] = useState(false);
  const showError = !!error;
  const fieldId = `form-field-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={fieldId}
        className="text-xs font-semibold text-[var(--lauft-darkest-grey)] uppercase tracking-wide"
      >
        {label}
      </label>
      <div
        className={`
          flex items-center gap-3 px-4 py-3.5 bg-white rounded
          transition-all duration-180
          ${
            showError
              ? 'border border-[var(--lauft-bright-berry)]'
              : focus
                ? 'border border-[var(--lauft-azure)] shadow-[0_0_0_3px_rgba(0,171,234,0.18)]'
                : 'border border-[var(--lauft-darkest-grey)]'
          }
          ${disabled ? 'opacity-60' : ''}
        `}
      >
        <input
          id={fieldId}
          name={label.toLowerCase().replace(/\s+/g, '-')}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => {
            setFocus(false);
            onBlur();
          }}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 border-none outline-none bg-transparent font-lato font-medium text-base text-[var(--lauft-darkest-grey)] placeholder-gray-500"
        />
      </div>
      {showError && (
        <span className="text-xs font-semibold text-[var(--lauft-bright-berry)] pl-1">
          {error}
        </span>
      )}
    </div>
  );
}
