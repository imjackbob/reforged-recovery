import { useForm } from './useForm'
import Field from './Field'
import Button from '../ui/Button'
import Icon from '../ui/Icon'

/**
 * Config-driven form used everywhere on the site (Get Help intake, Anvils
 * notify, Volunteer, Partnership, Contact). Handles validation, the honeypot,
 * submission to the single backend endpoint, and success/error states.
 *
 * To add a NEW form later (e.g. the future recovery-housing application), just
 * define a field config in formConfigs.js and render <Form> with it — no new
 * plumbing required.
 *
 * @param {string} formType
 * @param {Array}  fields
 * @param {string} submitLabel
 * @param {string} successTitle
 * @param {string} successMessage
 * @param {boolean} compact  tighter spacing for mini-forms
 */
export default function Form({
  formType,
  fields,
  submitLabel = 'Send',
  successTitle = 'Thank you!',
  successMessage = "We've received your message and will be in touch soon.",
  compact = false,
}) {
  const { values, errors, status, serverError, setField, handleSubmit, reset } = useForm({
    formType,
    fields,
  })

  if (status === 'success') {
    return (
      <div
        role="status"
        className="rounded-xl border border-ember-600/20 bg-ember-600/5 p-8 text-center"
      >
        <span className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-ember-600 text-white">
          <Icon name="check" className="h-8 w-8" />
        </span>
        <h3 className="text-2xl font-semibold text-forge-900">{successTitle}</h3>
        <p className="mx-auto mt-2 max-w-md text-forge-600">{successMessage}</p>
        <button
          type="button"
          onClick={reset}
          className="mt-5 font-display text-sm font-semibold uppercase tracking-wide text-ember-700 hover:text-ember-800"
        >
          Submit another response
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={compact ? '' : ''}>
      {/* Server/network error banner */}
      {status === 'error' && serverError && (
        <div
          role="alert"
          className="mb-5 flex items-start gap-2 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          <Icon name="spark" className="mt-0.5 h-4 w-4 flex-none" />
          <span>{serverError}</span>
        </div>
      )}

      <div className={`grid grid-cols-1 sm:grid-cols-2 ${compact ? 'gap-4' : 'gap-5'}`}>
        {fields.map((field) => (
          <Field
            key={field.name}
            field={field}
            value={values[field.name]}
            error={errors[field.name]}
            onChange={setField}
          />
        ))}
      </div>

      {/*
        Honeypot: hidden from users (and from assistive tech via aria-hidden +
        tabindex -1). Bots that auto-fill every field trip it; see useForm.js.
      */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="field-company">Company (leave this field empty)</label>
        <input
          id="field-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(e) => setField('company', e.target.value)}
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={status === 'submitting'} size={compact ? 'sm' : 'md'}>
          {status === 'submitting' ? 'Sending…' : submitLabel}
        </Button>
        <p className="text-sm text-stone-500">
          Fields marked <span className="text-ember-700">*</span> are required.
        </p>
      </div>

      {/* Preview/demo builds have no backend; make that clear on the form. */}
      {import.meta.env.VITE_DEMO_MODE === 'true' && (
        <p className="mt-3 text-xs text-stone-400">
          Preview site — form submissions are simulated and not saved or sent.
        </p>
      )}
    </form>
  )
}
