import { useCallback, useState } from 'react'
import { validateFields } from '../../lib/validation'
import { submitForm } from '../../lib/api'

// Standard columns the backend stores as first-class fields. Any other field in
// a form config is bundled into `metadata` so all form types share one table.
const TOP_LEVEL = new Set(['name', 'email', 'phone', 'message'])

/**
 * Form state machine shared by every form on the site.
 *
 * @param {Object} opts
 * @param {string} opts.formType  tag stored with the submission (e.g. 'get-help')
 * @param {Array}  opts.fields    field configs (see formConfigs.js)
 */
export function useForm({ formType, fields }) {
  const initial = Object.fromEntries(fields.map((f) => [f.name, '']))
  const [values, setValues] = useState({ ...initial, company: '' }) // company = honeypot
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [serverError, setServerError] = useState('')

  const setField = useCallback((name, value) => {
    setValues((v) => ({ ...v, [name]: value }))
    // Clear a field's error as soon as the user edits it.
    setErrors((e) => (e[name] ? { ...e, [name]: undefined } : e))
  }, [])

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      setServerError('')

      const fieldErrors = validateFields(values, fields)
      if (Object.keys(fieldErrors).length > 0) {
        setErrors(fieldErrors)
        // Move focus to the first invalid field for keyboard/AT users.
        const first = fields.find((f) => fieldErrors[f.name])
        if (first) document.getElementById(`field-${first.name}`)?.focus()
        return
      }

      // Honeypot: a real user never fills the hidden "company" field. If it's
      // set, silently show success without hitting the server (deters bots).
      if (values.company) {
        setStatus('success')
        return
      }

      setStatus('submitting')

      // DEMO / PREVIEW MODE: when VITE_DEMO_MODE is 'true' (set for the
      // frontend-only deploy that has no backend), simulate a successful submit
      // so the full form UX can be shown without a live API. Remove the flag —
      // or set it to 'false' — once the .NET backend is deployed.
      if (import.meta.env.VITE_DEMO_MODE === 'true') {
        await new Promise((r) => setTimeout(r, 600)) // brief pause so it feels real
        setStatus('success')
        return
      }

      // Split values into top-level columns vs. metadata.
      const metadata = {}
      const payload = { formType, metadata }
      for (const field of fields) {
        const value = String(values[field.name] ?? '').trim()
        if (TOP_LEVEL.has(field.name)) payload[field.name] = value
        else if (value) metadata[field.name] = value
      }

      const result = await submitForm(payload)
      if (result.ok) {
        setStatus('success')
      } else {
        setStatus('error')
        setServerError(result.message || 'Submission failed. Please try again.')
      }
    },
    [values, fields, formType],
  )

  const reset = useCallback(() => {
    setValues({ ...initial, company: '' })
    setErrors({})
    setStatus('idle')
    setServerError('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { values, errors, status, serverError, setField, handleSubmit, reset }
}
