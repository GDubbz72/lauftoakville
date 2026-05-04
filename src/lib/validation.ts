export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePhone = (phone: string): boolean => {
  return /^[\d\s\-\+\(\)]+$/.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

export const validatePostalCode = (postalCode: string): boolean => {
  return /^[A-Z]\d[A-Z] \d[A-Z]\d$/.test(postalCode);
};
