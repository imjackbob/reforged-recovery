// Renders a single labelled form control (text, email, tel, textarea, or
// select) with accessible error messaging. Driven by a field config object.
export default function Field({ field, value, error, onChange }) {
  const id = `field-${field.name}`
  const errorId = `${id}-error`
  const describedBy = error ? errorId : undefined

  const baseControl =
    'w-full rounded-md border bg-white px-3.5 py-2.5 text-forge-900 placeholder:text-stone-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ember-500'
  const borderClass = error
    ? 'border-red-500 focus-visible:ring-red-500'
    : 'border-stone-300 focus:border-ember-500'
  const controlClass = `${baseControl} ${borderClass}`

  return (
    <div className={field.colSpan === 2 ? 'sm:col-span-2' : ''}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-forge-800">
        {field.label}
        {field.required && (
          <span className="ml-1 text-ember-700" aria-hidden="true">
            *
          </span>
        )}
        {!field.required && <span className="ml-1 font-normal text-stone-500">(optional)</span>}
      </label>

      {field.type === 'textarea' ? (
        <textarea
          id={id}
          name={field.name}
          rows={field.rows || 5}
          value={value}
          required={field.required}
          placeholder={field.placeholder}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy}
          onChange={(e) => onChange(field.name, e.target.value)}
          className={controlClass}
        />
      ) : field.type === 'select' ? (
        <select
          id={id}
          name={field.name}
          value={value}
          required={field.required}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy}
          onChange={(e) => onChange(field.name, e.target.value)}
          className={`${controlClass} ${value ? '' : 'text-stone-400'}`}
        >
          <option value="" disabled>
            {field.placeholder || 'Select an option…'}
          </option>
          {field.options.map((opt) => (
            <option key={opt} value={opt} className="text-forge-900">
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          name={field.name}
          type={field.type || 'text'}
          value={value}
          required={field.required}
          placeholder={field.placeholder}
          autoComplete={field.autoComplete}
          inputMode={field.type === 'tel' ? 'tel' : undefined}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy}
          onChange={(e) => onChange(field.name, e.target.value)}
          className={controlClass}
        />
      )}

      {error && (
        <p id={errorId} className="mt-1.5 text-sm font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}
