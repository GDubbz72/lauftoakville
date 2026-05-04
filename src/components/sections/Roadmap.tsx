'use client';

import { useState, useCallback } from 'react';
import { Button, Headline, Body, Eyebrow, FormField, SelectField } from '@/components/primitives';
import { validateEmail } from '@/lib/validation';

interface FormData {
  name: string;
  email: string;
  currentWorkspace: string;
  companySize: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  currentWorkspace?: string;
  companySize?: string;
  submit?: string;
}

interface FormFieldDef {
  key: keyof FormData;
  label: string;
  placeholder: string;
  type?: 'text' | 'email' | 'select';
  options?: { value: string; label: string }[];
}

const currentWorkspaceOptions = [
  { value: 'home-office', label: 'Home Office' },
  { value: 'office', label: 'Office' },
  { value: 'coworking', label: 'Coworking Space' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'other', label: 'Other' },
];

const companySizeOptions = [
  { value: '1', label: '1' },
  { value: '2-5', label: '2-5 people' },
  { value: '6-15', label: '6-15 people' },
  { value: '16-25', label: '16-25 people' },
  { value: '26-50', label: '26-50 people' },
  { value: '50+', label: '50+' },
];

const formFields: FormFieldDef[] = [
  { key: 'name', label: 'Your name', placeholder: 'John Doe', type: 'text' },
  { key: 'email', label: 'Email', placeholder: 'john@company.com', type: 'email' },
  { key: 'currentWorkspace', label: 'Current Workspace', placeholder: 'Current Workspace', type: 'select', options: currentWorkspaceOptions },
  { key: 'companySize', label: 'Company Size', placeholder: 'Select company size', type: 'select', options: companySizeOptions },
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

  if (!data.currentWorkspace) {
    errors.currentWorkspace = 'Please select your current workspace';
  }

  if (!data.companySize) {
    errors.companySize = 'Please select your company size';
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
    currentWorkspace: '',
    companySize: '',
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
      currentWorkspace: true,
      companySize: true,
    });

    const newErrors = validate(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/roadmap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          current_workspace: formData.currentWorkspace,
          company_size: formData.companySize,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ submit: data.error || 'Failed to submit. Please try again.' });
      } else {
        setSubmitted(true);
      }
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
              {formFields.map((field, index) => (
                <div key={field.key}>
                  {field.key === 'currentWorkspace' && (
                    <div className="mt-6 mb-3.5">
                      <div className="font-lato font-bold text-base text-[var(--lauft-darkest-grey)] uppercase tracking-wide mb-3.5">
                        What's your current working journey look like?
                      </div>
                      <RoadmapFormField
                        field={field}
                        value={formData[field.key]}
                        error={touched[field.key] ? errors[field.key] : ''}
                        onChange={(value) => handleChange(field.key, value)}
                        onBlur={() => handleBlur(field.key)}
                        disabled={isLoading}
                      />
                    </div>
                  )}
                  {field.key !== 'currentWorkspace' && (
                    <RoadmapFormField
                      field={field}
                      value={formData[field.key]}
                      error={touched[field.key] ? errors[field.key] : ''}
                      onChange={(value) => handleChange(field.key, value)}
                      onBlur={() => handleBlur(field.key)}
                      disabled={isLoading}
                    />
                  )}
                </div>
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

interface RoadmapFormFieldProps {
  field: FormFieldDef;
  value: string;
  error: string | undefined;
  onChange: (value: string) => void;
  onBlur: () => void;
  disabled: boolean;
}

function RoadmapFormField({ field, value, error, onChange, onBlur, disabled }: RoadmapFormFieldProps) {
  const isSelect = field.type === 'select';

  if (isSelect) {
    return (
      <SelectField
        label={field.label}
        value={value}
        options={field.options || []}
        error={error}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        placeholder={field.placeholder}
      />
    );
  }

  return (
    <FormField
      label={field.label}
      placeholder={field.placeholder}
      type={field.type === 'email' ? 'email' : 'text'}
      value={value}
      error={error}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
    />
  );
}
