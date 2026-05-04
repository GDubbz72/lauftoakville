export const formatPhoneNumber = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 10);
  if (digits.length === 0) return '';
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};

export const formatPostalCode = (value: string): string => {
  const cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6);
  if (cleaned.length === 0) return '';
  if (cleaned.length <= 3) return cleaned;
  return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
};
