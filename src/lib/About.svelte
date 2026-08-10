<script>
  import SiteHeader from "./SiteHeader.svelte";
  import SiteFooter from "./SiteFooter.svelte";
  import organizers from "./data/organizers.json";
</script>

<div class="page">
  <SiteHeader />

  <main>
    <section class="intro">
      <h1>
        <span class="grey">The VoDa는</span> 다양한 배경의 운영진이 함께
        이끌어가는 데이터 시각화 커뮤니티입니다.<br />
        <span class="spin" aria-hidden="true">✦</span>
        <span class="grey">
          더 많은 사람들이 데이터 시각화를 배우고 교류할 수 있는 열린 커뮤니티를
          만들어가고 있습니다.
        </span>
      </h1>
    </section>

    <section class="team" aria-label="밋업 운영진">
      <div class="team-grid">
        {#each organizers as organizer}
          <article class="member">
            <div class="member-info">
              <h3>
                {#if organizer.link}
                  <a href={organizer.link} target="_blank" rel="noreferrer">
                    {organizer.name}
                  </a>
                {:else}
                  {organizer.name}
                {/if}
              </h3>
              <p>
                {organizer.work}, <span class="role">{organizer.role}</span>
              </p>
              {#if organizer.link}
                <a
                  class="detail-link"
                  href={organizer.link}
                  target="_blank"
                  rel="noopener noreferrer">자세히 보기 →</a
                >
              {/if}
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
    padding: clamp(68px, calc(4vw + 46px), 94px) 0 clamp(90px, 12vw, 150px);
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

  .grey {
    color: #b8b8b8;
  }

  .team {
    padding-bottom: clamp(80px, 12vw, 140px);
  }

  .team-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: clamp(18px, 2.5vw, 32px);
  }

  .member {
    padding-top: clamp(20px, 2.5vw, 28px);
    /* padding-bottom: clamp(20px, 2.5vw, 28px); */
    border-top: 1px solid currentColor;
    /* border-bottom: 1px solid currentColor; */
  }

  .member-info {
    padding-top: 0;
  }

  .member h3 {
    margin: 0;
    font-family: "Archivo", "Noto Sans KR", sans-serif;
    font-size: clamp(19px, 2vw, 22px);
    font-weight: 400;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  .member p {
    margin: 6px 0 0;
    color: currentColor;
    font-family: "Archivo", "Noto Sans KR", sans-serif;
    font-size: clamp(14px, 1.5vw, 16px);
    line-height: 1.35;
  }

  .role {
    color: #aaa;
  }

  .detail-link {
    display: inline-block;
    margin-top: 18px;
    padding-bottom: 2px;
    border-bottom: 1px solid currentColor;
    font-size: 13px;
    font-weight: 600;
  }

  .detail-link:hover {
    opacity: 0.6;
  }

  .spin {
    display: inline-block;
    transform-origin: center;
    animation: voda-spin-3 2.4s cubic-bezier(0.4, 0, 0.2, 1) both;
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

  @media (max-width: 780px) {
    h1 {
      line-height: 1.3;
    }

    .team-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      row-gap: 64px;
    }
  }

  @media (max-width: 520px) {
    .team-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
