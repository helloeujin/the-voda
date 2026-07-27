<script>
  import { router, navigate, routeUrl } from "./router.svelte.js";

  const baseUrl = import.meta.env.BASE_URL;

  function go(e, to) {
    e.preventDefault();
    navigate(to);
  }
</script>

<header class="header">
  <a
    href={routeUrl("/")}
    class="logo"
    aria-label="The VoDa"
    onclick={(e) => go(e, "/")}
  >
    <img src={`${baseUrl}assets/voda-logo.png`} alt="The VoDa" />
  </a>
  <nav class="nav">
    <a
      href={routeUrl("/")}
      aria-current={router.path === "/" ? "page" : undefined}
      onclick={(e) => go(e, "/")}>About</a
    >
    <a
      href={routeUrl("/talks")}
      aria-current={router.path === "/talks" ? "page" : undefined}
      onclick={(e) => go(e, "/talks")}>Talks</a
    >
  </nav>
</header>

<style>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px clamp(20px, 5vw, 64px);
  }
  .logo img {
    height: 18px;
    width: auto;
    display: block;
  }
  @media (max-width: 780px) {
    .logo img {
      height: 15px;
    }
    /* .nav {
      font-size: 15px;
    } */
  }
  .nav {
    display: flex;
    align-items: center;
    gap: clamp(16px, 3vw, 32px);
    font-size: 16px;
    font-weight: 400;

    @media (max-width: 780px) {
      font-size: 14.5px;
    }
  }
  .nav a {
    color: #111;
    transition: opacity 0.15s ease;
  }
  .nav a:hover {
    opacity: 0.55;
  }
  .nav a[aria-current="page"] {
    text-underline-offset: 5px;
    text-decoration: underline;
    text-decoration-thickness: 1px;
  }
</style>
