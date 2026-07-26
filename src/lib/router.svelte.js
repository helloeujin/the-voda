// Minimal client-side router (Svelte 5 runes).
// `/`      → About / main page (The VoDa)
// `/talks` → Past Meetups

export const router = $state({ path: window.location.pathname })

window.addEventListener('popstate', () => {
  router.path = window.location.pathname
})

/**
 * SPA navigation. Supports an optional `#hash` for in-page scroll.
 * @param {string} to e.g. "/", "/talks", "/#subscribe"
 */
export function navigate(to) {
  const [path, hash] = to.split('#')
  const target = path || '/'

  if (target !== router.path) {
    window.history.pushState({}, '', to)
    router.path = target
  }

  // Scroll after the DOM has a chance to render the new route.
  requestAnimationFrame(() => {
    if (hash) {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0 })
    }
  })
}
