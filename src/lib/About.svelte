<script>
  import SiteHeader from "./SiteHeader.svelte";
  import SiteFooter from "./SiteFooter.svelte";

  const baseUrl = import.meta.env.BASE_URL;

  const organizers = [
    { name: "이름 1", role: "Organizer" },
    { name: "이름 2", role: "Organizer" },
    { name: "이름 3", role: "Organizer" },
    { name: "이름 4", role: "Organizer" },
  ];
</script>

<div class="page">
  <SiteHeader />

  <main>
    <section class="intro">
      <h1>
        데이터 시각화를 좋아하는 <span class="spin s2" aria-hidden="true">✦</span>
        사람들이<br />
        함께 만들고 운영합니다.
      </h1>
    </section>

    <section class="team" aria-label="밋업 운영진">
      <div class="team-grid">
        {#each organizers as organizer}
          <article class="member">
            <img
              src={`${baseUrl}assets/team-placeholder.svg`}
              alt={`${organizer.name} 프로필 사진 placeholder`}
            />
            <div class="member-info">
              <h3>{organizer.name}</h3>
              <p>{organizer.role}</p>
            </div>
          </article>
        {/each}
      </div>
    </section>
  </main>

  <SiteFooter />
</div>

<style>
  .page {
    width: 100%;
    min-height: 100vh;
    background: #fff;
    color: #111;
    overflow-x: hidden;
  }

  main {
    max-width: var(--content-max-width);
    margin: 0 auto;
    padding: 0 clamp(20px, 5vw, 64px);
  }

  .intro {
    padding: clamp(68px, calc(4vw + 46px), 94px) 0
      clamp(90px, 12vw, 150px);
  }

  h1 {
    max-width: 780px;
    margin: 0;
    font-family: "Archivo", "Noto Sans KR", sans-serif;
    font-size: clamp(28px, 3.8vw, 43px);
    font-weight: 400;
    line-height: 1.25;
    letter-spacing: -0.03em;
  }

  .team {
    padding-bottom: clamp(80px, 12vw, 140px);
  }

  .team-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: clamp(14px, 2vw, 24px);
  }

  .member img {
    display: block;
    width: 100%;
    aspect-ratio: 3 / 4;
    object-fit: cover;
    background: #ededed;
  }

  .member-info {
    padding-top: 16px;
  }

  .member h3 {
    margin: 0;
    font-size: clamp(17px, 2vw, 20px);
    font-weight: 500;
    letter-spacing: -0.02em;
  }

  .spin {
    display: inline-block;
    animation: voda-spin-3 2.4s cubic-bezier(0.4, 0, 0.2, 1) both;
  }

  .s2 {
    animation-delay: 0.1s;
  }

  @keyframes voda-spin-3 {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .spin {
      animation: none;
    }
  }

  .member p {
    margin: 5px 0 0;
    color: var(--faint);
    font-family: "Archivo", "Noto Sans KR", sans-serif;
    font-size: 14px;
  }

  @media (max-width: 780px) {
    h1 br {
      display: none;
    }

    h1 {
      line-height: 1.3;
    }

    .team-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      row-gap: 38px;
    }
  }
</style>
