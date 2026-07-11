// Field configurations for every form on the site. Each form POSTs to the same
// /api/forms/submit endpoint, tagged with its `formType`. Standard fields
// (name/email/phone/message) are stored as columns; anything else rides along
// in `metadata` (see useForm.js).
//
// FUTURE FORMS (Phase 2) plug in here with no new plumbing:
//   - recovery-housing-application  (full Anvils application when programs open)
//   - support-request               (dedicated support intake)
// Just add a config below and render <Form config={...} /> on a page.

const NAME = { name: 'name', label: 'Name', type: 'text', required: true, autoComplete: 'name' }
const EMAIL = {
  name: 'email',
  label: 'Email',
  type: 'email',
  required: true,
  autoComplete: 'email',
  placeholder: 'you@example.com',
}
const PHONE = {
  name: 'phone',
  label: 'Phone',
  type: 'tel',
  required: false,
  autoComplete: 'tel',
  placeholder: '(555) 555-0100',
}
const MESSAGE = {
  name: 'message',
  label: 'Message',
  type: 'textarea',
  required: true,
  colSpan: 2,
  placeholder: 'Tell us a little about how we can help…',
}

// Get Help — primary contact/intake form.
export const getHelpForm = {
  formType: 'get-help',
  submitLabel: 'Request Support',
  successTitle: 'Your request has been received',
  successMessage:
    "Thank you for reaching out — it takes courage. A member of our team will contact you soon. If you need immediate help, call or text 988.",
  fields: [
    NAME,
    { ...PHONE, required: true },
    EMAIL,
    {
      name: 'supportType',
      label: 'Type of Support Needed',
      type: 'select',
      required: true,
      placeholder: 'Select the support you need…',
      options: [
        'Recovery Support',
        'Housing Interest',
        'Family Restoration',
        'Life Skills',
        'General Inquiry',
        'Other',
      ],
    },
    MESSAGE,
  ],
}

// Contact — general contact form (reuses the Get Help component per the brief).
export const contactForm = {
  formType: 'contact',
  submitLabel: 'Send Message',
  successTitle: 'Message sent',
  successMessage: "Thanks for contacting us. We'll get back to you as soon as we can.",
  fields: [NAME, EMAIL, { ...PHONE }, MESSAGE],
}

// Anvils — "get notified" mini-form (name + email only; programs aren't live).
export const anvilsNotifyForm = {
  formType: 'anvils-notify',
  submitLabel: 'Notify Me',
  successTitle: "You're on the list",
  successMessage:
    "We'll let you know as soon as The Anvils recovery housing opens for applications.",
  fields: [
    { ...NAME, colSpan: 2 },
    { ...EMAIL, colSpan: 2 },
  ],
}

// Volunteer sign-up mini-form.
export const volunteerForm = {
  formType: 'volunteer',
  submitLabel: 'Sign Up to Volunteer',
  successTitle: 'Thank you for stepping up',
  successMessage:
    "We're grateful for your heart to serve. Our outreach team will reach out about volunteer opportunities.",
  fields: [
    NAME,
    { ...PHONE },
    EMAIL,
    {
      name: 'areaOfInterest',
      label: 'Area of Interest',
      type: 'select',
      required: true,
      placeholder: 'Where would you like to help?',
      options: [
        'Mentoring',
        'Community Outreach',
        'Events',
        'Administrative Support',
        'Wherever I’m needed',
      ],
    },
  ],
}

// Partnership inquiry form.
export const partnershipForm = {
  formType: 'partnership',
  submitLabel: 'Start the Conversation',
  successTitle: "Let's build something stronger together",
  successMessage:
    "Thank you for your interest in partnering with Reforged Recovery. We'll be in touch to explore how we can work together.",
  fields: [
    NAME,
    { ...EMAIL },
    {
      name: 'organization',
      label: 'Organization',
      type: 'text',
      required: true,
      autoComplete: 'organization',
      placeholder: 'Church, business, or organization name',
    },
    {
      name: 'partnerType',
      label: 'Partner Type',
      type: 'select',
      required: false,
      placeholder: 'What kind of partner are you?',
      options: [
        'Church / Faith Organization',
        'Business',
        'Treatment Provider',
        'Community Organization',
        'Other',
      ],
    },
    { ...MESSAGE, required: false, placeholder: 'Tell us about your organization and how you’d like to partner…' },
  ],
}
