'use client';

import { useState } from 'react';
import { Button, Headline, Body } from '@/components/primitives';
import { validatePhone, validateEmail, validatePostalCode } from '@/lib/validation';
import { formatPhoneNumber, formatPostalCode } from '@/lib/formatters';

interface PreRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  postalCode: string;
  spaceDesired: string;
  website?: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  postalCode?: string;
  spaceDesired?: string;
  submit?: string;
}

const spaceOptions = [
  { value: '1-person', label: '1 Person' },
  { value: '2-3-people', label: '2-3 People' },
  { value: '3-5-people', label: '3-5 People' },
  { value: '5-plus', label: '5+ People' },
];


const validate = (data: FormData): FormErrors => {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = 'Please enter your name';
  }

  if (!data.email.trim()) {
    errors.email = 'Please enter your email';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!data.phone.trim()) {
    errors.phone = 'Please enter your phone number';
  } else if (!validatePhone(data.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  if (!data.company.trim()) {
    errors.company = 'Please enter your company';
  }

  if (!data.postalCode.trim()) {
    errors.postalCode = 'Please enter your postal code';
  } else if (!validatePostalCode(data.postalCode)) {
    errors.postalCode = 'Please enter a valid postal code (A1A 1A1)';
  }

  if (!data.spaceDesired) {
    errors.spaceDesired = 'Please select a space';
  }

  return errors;
};

export const PreRegisterModal = ({ isOpen, onClose }: PreRegisterModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    postalCode: '',
    spaceDesired: '',
    website: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: keyof FormData, value: string) => {
    let formattedValue = value;
    if (field === 'phone') {
      formattedValue = formatPhoneNumber(value);
    } else if (field === 'postalCode') {
      formattedValue = formatPostalCode(value);
    }
    setFormData((prev) => ({ ...prev, [field]: formattedValue }));

    if (touched[field]) {
      const newErrors = validate({ ...formData, [field]: formattedValue });
      setErrors(newErrors);
    }
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const newErrors = validate(formData);
    setErrors(newErrors);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.website) {
      return;
    }

    setTouched({
      name: true,
      email: true,
      phone: true,
      company: true,
      postalCode: true,
      spaceDesired: true,
    });

    const newErrors = validate(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/pre-register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          postal_code: formData.postalCode,
          space_desired: formData.spaceDesired,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ submit: data.error || 'Failed to submit. Please try again.' });
      } else {
        setSubmitted(true);

        setTimeout(() => {
          handleClose();
        }, 2500);
      }
    } catch {
      setErrors({ submit: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      postalCode: '',
      spaceDesired: '',
      website: '',
    });
    setErrors({});
    setTouched({});
    setSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-[32px] p-8 lg:p-12 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 p-2 min-w-[44px] min-h-[44px] text-[var(--lauft-mid-grey)] hover:text-[var(--lauft-darkest-grey)] transition-colors"
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {!submitted ? (
          <>
            <Headline
              size={40}
              color="#1D252C"
              style={{ marginBottom: 16, letterSpacing: '-0.01em' }}
            >
              Pre-Register
            </Headline>

            <Body
              size={14}
              color="#5B6771"
              weight={500}
              style={{ marginBottom: 28 }}
            >
              Lock in founding-member pricing and be first through the doors at LAUFT Oakville.
            </Body>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3.5">
              {errors.submit && (
                <div className="p-3 text-sm text-[var(--lauft-bright-berry)] bg-red-50 rounded">
                  {errors.submit}
                </div>
              )}

              {/* Name */}
              <FormField
                label="Name"
                placeholder="Your name"
                type="text"
                value={formData.name}
                error={touched.name ? errors.name : ''}
                onChange={(value) => handleChange('name', value)}
                onBlur={() => handleBlur('name')}
                disabled={isLoading}
              />

              {/* Email */}
              <FormField
                label="Email"
                placeholder="your@email.com"
                type="email"
                value={formData.email}
                error={touched.email ? errors.email : ''}
                onChange={(value) => handleChange('email', value)}
                onBlur={() => handleBlur('email')}
                disabled={isLoading}
              />

              {/* Phone */}
              <FormField
                label="Phone"
                placeholder="+1 (555) 123-4567"
                type="tel"
                value={formData.phone}
                error={touched.phone ? errors.phone : ''}
                onChange={(value) => handleChange('phone', value)}
                onBlur={() => handleBlur('phone')}
                disabled={isLoading}
              />

              {/* Postal Code */}
              <FormField
                label="Postal Code"
                placeholder="A1A 1A1"
                type="text"
                value={formData.postalCode}
                error={touched.postalCode ? errors.postalCode : ''}
                onChange={(value) => handleChange('postalCode', value)}
                onBlur={() => handleBlur('postalCode')}
                disabled={isLoading}
              />

              {/* Company */}
              <FormField
                label="Company"
                placeholder="Where do you work?"
                type="text"
                value={formData.company}
                error={touched.company ? errors.company : ''}
                onChange={(value) => handleChange('company', value)}
                onBlur={() => handleBlur('company')}
                disabled={isLoading}
              />

              {/* Space Desired - Dropdown */}
              <SelectField
                label="Space Desired"
                value={formData.spaceDesired}
                options={spaceOptions}
                error={touched.spaceDesired ? errors.spaceDesired : ''}
                onChange={(value) => handleChange('spaceDesired', value)}
                onBlur={() => handleBlur('spaceDesired')}
                disabled={isLoading}
              />

              {/* Honeypot field - hidden from users */}
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={(e) => handleChange('website', e.target.value)}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              <Button
                variant="primary"
                size="small"
                type="submit"
                disabled={isLoading}
                fullWidth
                className="sm:px-9 sm:py-4.5 sm:text-sm"
              >
                {isLoading ? 'Submitting...' : 'Claim Your Spot'}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--lauft-azure)] text-white rounded-full mb-6">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path
                  d="M6 16 L14 24 L26 8"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <Headline
              size={32}
              color="#1D252C"
              style={{ marginBottom: 8, letterSpacing: '-0.01em' }}
            >
              You're on the list!
            </Headline>
            <Body size={14} color="#5B6771" weight={500}>
              Thanks {formData.name.split(' ')[0]}! We'll send Oakville opening details and founding-member pricing soon.
            </Body>
          </div>
        )}
      </div>
    </div>
  );
};

interface FormFieldProps {
  label: string;
  placeholder: string;
  type: string;
  value: string;
  error: string | undefined;
  onChange: (value: string) => void;
  onBlur: () => void;
  disabled: boolean;
}

function FormField({
  label,
  placeholder,
  type,
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

interface SelectFieldProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  error: string | undefined;
  onChange: (value: string) => void;
  onBlur: () => void;
  disabled: boolean;
}

function SelectField({
  label,
  value,
  options,
  error,
  onChange,
  onBlur,
  disabled,
}: SelectFieldProps) {
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
        <select
          id={fieldId}
          name={label.toLowerCase().replace(/\s+/g, '-')}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => {
            setFocus(false);
            onBlur();
          }}
          disabled={disabled}
          className="flex-1 border-none outline-none bg-transparent font-lato font-medium text-base text-[var(--lauft-darkest-grey)] cursor-pointer"
        >
          <option value="" disabled>
            Select a space...
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {showError && (
        <span className="text-xs font-semibold text-[var(--lauft-bright-berry)] pl-1">
          {error}
        </span>
      )}
    </div>
  );
}
