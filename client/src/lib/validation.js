// Lightweight client-side validators. These mirror (but do not replace) the
// server-side validation in the .NET API — never trust the client alone.

// Reasonable email shape check. Deliberately permissive; the server does the
// authoritative validation.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Accepts common US phone formats: (555) 123-4567, 555-123-4567, 5551234567,
// +1 555 123 4567, etc. Requires 10–15 digits total.
const PHONE_DIGITS_RE = /^\+?[\d\s().-]{7,}$/

export function isEmail(value) {
  return EMAIL_RE.test(String(value).trim())
}

export function isPhone(value) {
  const v = String(value).trim()
  if (!PHONE_DIGITS_RE.test(v)) return false
  const digits = v.replace(/\D/g, '')
  return digits.length >= 10 && digits.length <= 15
}

export function isRequired(value) {
  return String(value ?? '').trim().length > 0
}

/**
 * Validate a set of values against a field config.
 * @param {Record<string, any>} values
 * @param {Array<{name: string, label: string, required?: boolean, type?: string}>} fields
 * @returns {Record<string, string>} map of fieldName -> error message (empty = valid)
 */
export function validateFields(values, fields) {
  const errors = {}
  for (const field of fields) {
    const value = values[field.name]
    if (field.required && !isRequired(value)) {
      errors[field.name] = `${field.label} is required.`
      continue
    }
    // Skip format checks on empty optional fields.
    if (!isRequired(value)) continue

    if (field.type === 'email' && !isEmail(value)) {
      errors[field.name] = 'Please enter a valid email address.'
    }
    if (field.type === 'tel' && !isPhone(value)) {
      errors[field.name] = 'Please enter a valid phone number.'
    }
  }
  return errors
}
