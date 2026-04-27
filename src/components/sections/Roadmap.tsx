'use client';

import { useState, useCallback } from 'react';
import { supabase, validateSupabaseConfig } from '@/lib/supabase';
import { Button, Headline, Body, Eyebrow } from '@/components/primitives';

interface FormData {
  name: string;
  email: string;
  company: string;
  role: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
  role?: string;
  submit?: string;
}

interface FormField {
  key: keyof FormData;
  label: string;
  placeholder: string;
}

const formFields: FormField[] = [
  { key: 'name', label: 'Your name', placeholder: 'How should we greet you?' },
  { key: 'email', label: 'Email', placeholder: 'name@company.com' },
  { key: 'company', label: 'Company', placeholder: 'Where do you work?' },
  { key: 'role', label: 'Role', placeholder: 'What do you do?' },
];

const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

  if (!data.company.trim()) {
    errors.company = 'Please enter your company';
  }

  if (!data.role.trim()) {
    errors.role = 'Please enter your role';
  }

  return errors;
};

interface RoadmapProps {
  registrationRef?: React.RefObject<HTMLDivElement | null>;
}

export const Roadmap = ({ registrationRef }: RoadmapProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    role: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = useCallback((field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (touched[field]) {
      const newErrors = validate({ ...formData, [field]: value });
      setErrors(newErrors);
    }
  }, [formData, touched]);

  const handleBlur = useCallback((field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const newErrors = validate(formData);
    setErrors(newErrors);
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      company: true,
      role: true,
    });

    const newErrors = validate(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsLoading(true);

    try {
      if (!validateSupabaseConfig()) {
        setErrors({ submit: 'Form submission is not configured. Please check back later.' });
        setIsLoading(false);
        return;
      }

      const { error } = await supabase.from('oakville_registrations').insert([
        {
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          company: formData.company.trim(),
          role: formData.role.trim(),
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        setErrors({ submit: 'Failed to submit. Please try again.' });
        setIsLoading(false);
        return;
      }

      setSubmitted(true);
    } catch {
      setErrors({ submit: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      ref={registrationRef}
      id="register"
      className="px-4 py-10 lg:py-16"
    >
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-8 lg:gap-14 items-start">
        {/* Left column: title + copy */}
        <div>
          <Eyebrow color="#00ABEA" style={{ marginBottom: 14 }}>
            Pre-Register · Oakville
          </Eyebrow>
          <Headline
            color="#1D252C"
            style={{
              fontSize: 'clamp(28px, 6vw, 48px)',
              letterSpacing: '-0.02em',
              marginBottom: 24,
            }}
          >
            Your Roadmap to<br />Make Smart Work.
          </Headline>
          <Body
            size={14}
            color="#5B6771"
            weight={500}
            style={{ maxWidth: 360 }}
          >
            Tell us a little about you. We'll send Oakville opening details, founding-member
            pricing, and an invite to the launch — first.
          </Body>
        </div>

        {/* Right column: form */}
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3.5">
          {errors.submit && (
            <div className="p-3 text-sm text-[var(--lauft-bright-berry)] bg-red-50 rounded">
              {errors.submit}
            </div>
          )}

          {!submitted ? (
            <>
              {formFields.map((field) => (
                <FormField
                  key={field.key}
                  field={field}
                  value={formData[field.key]}
                  error={touched[field.key] ? errors[field.key] : ''}
                  onChange={(value) => handleChange(field.key, value)}
                  onBlur={() => handleBlur(field.key)}
                  disabled={isLoading}
                />
              ))}

              <div className="mt-2">
                <Button
                  variant="primary"
                  size="small"
                  type="submit"
                  disabled={isLoading}
                  fullWidth
                  className="sm:px-9 sm:py-4.5 sm:text-sm"
                >
                  {isLoading ? 'Sending...' : 'Send My Roadmap'}
                </Button>
              </div>
            </>
          ) : (
            <div className="inline-flex items-center gap-2.5 px-6 py-4.5 bg-[var(--lauft-azure)] text-white rounded-full font-lato font-bold text-sm uppercase tracking-widest">
              <span className="flex items-center justify-center w-5.5 h-5.5 bg-white text-[var(--lauft-azure)] rounded-full text-sm font-black">
                ✓
              </span>
              You're on the list, {formData.name.split(' ')[0]}.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

interface FormFieldProps {
  field: FormField;
  value: string;
  error: string | undefined;
  onChange: (value: string) => void;
  onBlur: () => void;
  disabled: boolean;
}

function FormField({ field, value, error, onChange, onBlur, disabled }: FormFieldProps) {
  const [focus, setFocus] = useState(false);
  const showError = !!error;

  return (
    <div className="flex flex-col gap-1.5">
      <div
        className={`
          flex items-center gap-3 px-4.5 py-3.5 bg-white rounded
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
          type={field.key === 'email' ? 'email' : 'text'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => {
            setFocus(false);
            onBlur();
          }}
          placeholder={field.placeholder}
          disabled={disabled}
          aria-label={field.label}
          className="flex-1 border-none outline-none bg-transparent font-lato font-medium text-base text-[var(--lauft-darkest-grey)] placeholder-gray-500"
        />
        {!showError && (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0 opacity-55">
            <path
              d="M11 4 L4 11 M4 11 L4 7 M4 11 L8 11"
              stroke="#1D252C"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              x="2"
              y="2"
              width="14"
              height="14"
              rx="0"
              stroke="#1D252C"
              strokeWidth="1.5"
            />
          </svg>
        )}
      </div>
      {showError && (
        <span className="text-xs font-semibold text-[var(--lauft-bright-berry)] pl-1">
          {error}
        </span>
      )}
    </div>
  );
}
