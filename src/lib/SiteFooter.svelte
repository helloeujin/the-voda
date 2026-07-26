<script>
  import { navigate } from './router.svelte.js'

  let {
    instagramUrl = 'https://instagram.com/the__voda',
    discordUrl = '#',
  } = $props()
</script>

<footer class="footer">
  <div class="inner">
    <span>© 2026 The VoDa. All rights reserved.</span>
    <div class="socials">
      <a href="/#subscribe" aria-label="이메일 구독" onclick={(e) => { e.preventDefault(); navigate('/#subscribe') }}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="4.5" width="20" height="15" rx="3" />
          <polyline points="3 6.5 12 13 21 6.5" />
        </svg>
      </a>
      <a href={discordUrl} target="_blank" rel="noopener" aria-label="Discord">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 4.5A16 16 0 0 0 15.5 3l-.6 1.3a12 12 0 0 0-5.8 0L8.5 3A16 16 0 0 0 4 4.5C1.6 8.4 1 12.4 1.4 16.4A15 15 0 0 0 6.6 19l.9-1.7" />
          <path d="M16.5 17.3l.9 1.7a15 15 0 0 0 5.2-2.6c.4-4-0.2-8-2.6-11.9" />
          <circle cx="9" cy="12.5" r="1.6" />
          <circle cx="15" cy="12.5" r="1.6" />
        </svg>
      </a>
      <a href={instagramUrl} target="_blank" rel="noopener" aria-label="Instagram">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      </a>
    </div>
  </div>
</footer>

<style>
  .footer {
    margin-top: clamp(20px, 3vw, 32px);
    padding: 10px clamp(20px, 5vw, 64px) clamp(24px, 3vw, 32px);
    background-color: #fff;
  }
  .inner {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    color: #111;
  }
  .socials {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .socials a {
    display: flex;
    align-items: center;
    color: #111;
    transition: opacity 0.15s ease;
  }
  .socials a:hover {
    opacity: 0.6;
  }
</style>
