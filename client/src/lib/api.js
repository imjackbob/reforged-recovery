// Thin API client for the .NET backend.
//
// In dev, Vite proxies `/api` -> http://localhost:5254 (see vite.config.js).
// In production, set VITE_API_BASE_URL to the deployed API origin, e.g.
// https://api.reforgedrecovery.org  (leave empty to use same-origin `/api`).
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? ''

/**
 * Submit a form to the single backend endpoint. Every form on the site funnels
 * through here, distinguished by `formType`.
 *
 * @param {Object} payload
 * @param {string} payload.formType  e.g. 'get-help', 'anvils-notify', 'volunteer', 'partnership', 'contact'
 * @param {string} payload.name
 * @param {string} [payload.email]
 * @param {string} [payload.phone]
 * @param {string} [payload.message]
 * @param {Object} [payload.metadata]  extra form-specific fields (e.g. supportType, areaOfInterest)
 * @param {string} [payload.company]   honeypot field — must be empty for real users
 * @returns {Promise<{ok: boolean, message?: string}>}
 */
export async function submitForm(payload) {
  const res = await fetch(`${API_BASE}/api/forms/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  // The API returns a JSON body on both success and validation failure.
  let data = null
  try {
    data = await res.json()
  } catch {
    /* non-JSON response (e.g. 500 HTML) — fall through to generic error */
  }

  if (!res.ok) {
    const message =
      data?.message ||
      (res.status === 429
        ? 'Too many submissions. Please wait a moment and try again.'
        : 'Something went wrong. Please try again, or contact us directly.')
    return { ok: false, message }
  }

  return { ok: true, message: data?.message }
}
