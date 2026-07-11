import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'

// Route-level code splitting: each page is its own chunk, lazy-loaded on
// navigation. Keeps the initial bundle small (helps the Lighthouse target).
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Programs = lazy(() => import('./pages/Programs'))
const Anvils = lazy(() => import('./pages/Anvils'))
const Podcast = lazy(() => import('./pages/Podcast'))
const FaithCommunity = lazy(() => import('./pages/FaithCommunity'))
const IronSharpensIron = lazy(() => import('./pages/IronSharpensIron'))
const GetHelp = lazy(() => import('./pages/GetHelp'))
const GetInvolved = lazy(() => import('./pages/GetInvolved'))
const Resources = lazy(() => import('./pages/Resources'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Minimal fallback while a route chunk loads.
function RouteFallback() {
  return (
    <div
      className="flex min-h-[50vh] items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-stone-300 border-t-ember-600" />
      <span className="sr-only">Loading…</span>
    </div>
  )
}

// Wrap a lazy page element in Suspense with the shared fallback.
const page = (Element) => (
  <Suspense fallback={<RouteFallback />}>
    <Element />
  </Suspense>
)

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={page(Home)} />
        <Route path="about" element={page(About)} />
        <Route path="programs" element={page(Programs)} />
        <Route path="anvils" element={page(Anvils)} />
        <Route path="podcast" element={page(Podcast)} />
        <Route path="faith-community" element={page(FaithCommunity)} />
        <Route path="iron-sharpens-iron" element={page(IronSharpensIron)} />
        <Route path="get-help" element={page(GetHelp)} />
        <Route path="get-involved" element={page(GetInvolved)} />
        <Route path="resources" element={page(Resources)} />
        <Route path="contact" element={page(Contact)} />
        <Route path="*" element={page(NotFound)} />
      </Route>
    </Routes>
  )
}
