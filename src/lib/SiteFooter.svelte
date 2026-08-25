<script>
  let { instagramUrl = "https://instagram.com/the__voda" } = $props();
</script>

<footer class="footer">
  <div class="inner">
    <span>© 2026 The VoDa. All rights reserved.</span>
    <div class="socials">
      <a
        href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=the.voda.2022%40gmail.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="The VoDa에 이메일 보내기"
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="2" y="4.5" width="20" height="15" rx="3" />
          <polyline points="3 6.5 12 13 21 6.5" />
        </svg>
      </a>
      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener"
        aria-label="Instagram"
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
        >
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
    margin-top: clamp(30px, 3vw, 40px);
    padding: 40px clamp(20px, 5vw, 65px) clamp(45px, 5vw, 65px);
    /* padding: 50px 60px 80px; */
    background-color: #f7f7f7;
    /* border-top: 1px solid #111; */
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
