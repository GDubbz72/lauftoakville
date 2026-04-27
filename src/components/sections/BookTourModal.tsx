'use client';

import { useState } from 'react';
import { Button, Headline, Body } from '@/components/primitives';
import { supabase } from '@/lib/supabase';

interface BookTourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  website?: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  submit?: string;
}

const validatePhone = (phone: string): boolean => {
  return /^[\d\s\-\+\(\)]+$/.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const formatPhoneNumber = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 10);
  if (digits.length === 0) return '';
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};

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

  return errors;
};

export const BookTourModal = ({ isOpen, onClose }: BookTourModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    website: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: keyof FormData, value: string) => {
    const formattedValue = field === 'phone' ? formatPhoneNumber(value) : value;
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
    });

    const newErrors = validate(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsLoading(true);

    try {
      const { data: existingSubmission } = await supabase
        .from('book_tours')
        .select('id')
        .eq('email', formData.email)
        .gte('created_at', new Date(Date.now() - 3600000).toISOString())
        .limit(1);

      if (existingSubmission && existingSubmission.length > 0) {
        setErrors({ submit: 'Please wait before submitting again.' });
        setIsLoading(false);
        return;
      }

      const { error } = await supabase.from('book_tours').insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
      ]);

      if (error) {
        setErrors({ submit: 'Failed to submit. Please try again.' });
      } else {
        setSubmitted(true);

        setTimeout(() => {
          handleClose();
        }, 2000);
      }
    } catch {
      setErrors({ submit: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ name: '', email: '', phone: '', website: '' });
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
              Book Your Tour
            </Headline>

            <Body
              size={14}
              color="#5B6771"
              weight={500}
              style={{ marginBottom: 28 }}
            >
              Schedule a walkthrough of LAUFT Oakville and see the space in person.
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
                label="Phone Number"
                placeholder="+1 (555) 123-4567"
                type="tel"
                value={formData.phone}
                error={touched.phone ? errors.phone : ''}
                onChange={(value) => handleChange('phone', value)}
                onBlur={() => handleBlur('phone')}
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
                {isLoading ? 'Booking...' : 'Request a Tour'}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--lauft-azure)] text-white rounded-full mb-4">
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
            <Headline size={32} color="#1D252C" style={{ marginBottom: 8 }}>
              Tour Requested!
            </Headline>
            <Body size={14} color="#5B6771" weight={500}>
              Thanks {formData.name.split(' ')[0]}! We'll be in touch soon to confirm your tour time.
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

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-[var(--lauft-darkest-grey)] uppercase tracking-wide">
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
          aria-label={label}
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
