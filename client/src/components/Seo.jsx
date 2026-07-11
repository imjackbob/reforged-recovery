import { useEffect } from 'react'

const SITE_NAME = 'Reforged Recovery Inc.'
const BASE_URL = 'https://www.reforgedrecovery.org'
const DEFAULT_DESC =
  'Reforged Recovery Inc. is a nonprofit helping individuals rebuild their lives through recovery support, life skills, family restoration, faith, and community.'

/**
 * Per-page SEO. A dependency-free replacement for react-helmet (fully
 * compatible with React 19). Sets <title>, meta description, canonical URL, and
 * Open Graph tags, then restores nothing on unmount (the next page overwrites).
 *
 * @param {string} title  page title (site name is appended automatically)
 * @param {string} [description]
 * @param {string} [path]  canonical path, e.g. '/about'
 */
export default function Seo({ title, description = DEFAULT_DESC, path = '' }) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME
    document.title = fullTitle

    const url = `${BASE_URL}${path}`

    setMeta('name', 'description', description)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setLink('canonical', url)
  }, [title, description, path])

  return null
}

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}
