const PHONE_LENGTH = 10;

export function onlyDigits(value: string) {
  return value.replace(/\D/g, "").slice(0, PHONE_LENGTH);
}

export function formatPhone(value: string) {
  const digits = onlyDigits(value);

  if (!digits) return "";

  if (digits.length < 4) {
    return `(${digits}`;
  }

  if (digits.length < 7) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }

  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}
