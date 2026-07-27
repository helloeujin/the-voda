// Minimal client-side router (Svelte 5 runes).
// `/`      → About / main page (The VoDa)
// `/talks` → Past Meetups

const baseUrl = import.meta.env.BASE_URL
const basePath = baseUrl.replace(/\/$/, '')

function routePath(pathname) {
  if (pathname === basePath || pathname === `${basePath}/`) return '/'
  if (basePath && pathname.startsWith(`${basePath}/`)) {
    const path = pathname.slice(basePath.length)
    return path.length > 1 ? path.replace(/\/+$/, '') : path
  }
  return pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
}

export function routeUrl(to) {
  const [path, hash] = to.split('#')
  const relativePath = (path || '/').replace(/^\//, '')
  return `${baseUrl}${relativePath}${hash ? `#${hash}` : ''}`
}

export const router = $state({ path: routePath(window.location.pathname) })

window.addEventListener('popstate', () => {
  router.path = routePath(window.location.pathname)
})

/**
 * SPA navigation. Supports an optional `#hash` for in-page scroll.
 * @param {string} to e.g. "/", "/talks", "/#subscribe"
 */
export function navigate(to) {
  const [path, hash] = to.split('#')
  const target = path || '/'

  if (target !== router.path) {
    window.history.pushState({}, '', routeUrl(to))
    router.path = target
  } else if (hash) {
    window.history.replaceState({}, '', routeUrl(to))
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
