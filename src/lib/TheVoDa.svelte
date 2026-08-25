<script>
  import { onMount } from "svelte";
  import SiteHeader from "./SiteHeader.svelte";
  import SiteFooter from "./SiteFooter.svelte";
  import EyeIcon from "./EyeIcon.svelte";
  import { fetchMeetupData } from "./data/googleSheet.js";

  const baseUrl = import.meta.env.BASE_URL;

  let { instagramHandle = "the__voda" } = $props();

  const instagramUrl = $derived(`https://instagram.com/${instagramHandle}`);

  let nextMeetup = $state(null);
  let meetupLoaded = $state(false);
  const posterImage = $derived(
    nextMeetup?.img === "poster-13.jpg" ? "poster-13.webp" : nextMeetup?.img,
  );

  onMount(() => {
    async function refreshMeetup() {
      try {
        const { upcoming, latest } = await fetchMeetupData();
        if (upcoming || latest) nextMeetup = upcoming ?? latest;
      } catch (error) {
        console.warn("Google Sheet의 밋업 정보를 불러오지 못했습니다.", error);
      } finally {
        meetupLoaded = true;
      }
    }

    refreshMeetup();
    const refreshTimer = window.setInterval(refreshMeetup, 5 * 60 * 1000);

    return () => {
      window.clearInterval(refreshTimer);
    };
  });
</script>

<div class="page">
  <SiteHeader />

  <!-- HERO -->
  <section class="hero">
    <h1>
      <span class="ink">데이터</span>
      <span class="ink"> 시각화 <EyeIcon /> 밋업</span><br />
      <span class="grey"
        ><span class="spin s2">✦</span>
        <!-- 분석가 개발자 디자이너 누구나 -->
        데이터 시각화에 관심있는 누구나
      </span>
      <!-- <span class="ink">누구나</span><br /> -->
      <span class="ink"><span class="dot">●</span> The VoDa</span>
    </h1>
  </section>

  <!-- 밋업 소식 -->
  <section id="news" class="news">
    {#if !meetupLoaded}
      <div class="news-card skeleton" aria-label="밋업 정보를 불러오는 중">
        <div class="poster-col">
          <div class="poster skeleton-block"></div>
        </div>
        <div class="news-body" aria-hidden="true">
          <div class="skeleton-line short"></div>
          <div class="skeleton-line title"></div>
          <div class="skeleton-meta">
            <div class="skeleton-line label"></div>
            <div class="skeleton-line value"></div>
            <div class="skeleton-line label"></div>
            <div class="skeleton-line value"></div>
            <div class="skeleton-line label"></div>
            <div class="skeleton-line value"></div>
          </div>
          <div class="skeleton-button"></div>
        </div>
      </div>
    {:else if nextMeetup}
      <div class="news-card">
        <div class="poster-col">
          <div class="poster">
            <img
              src={`${baseUrl}assets/${posterImage}`}
              alt="밋업 포스터"
              width="840"
              height="1187"
              fetchpriority="high"
            />
          </div>
        </div>

        <div class="news-body">
          <div class="eyebrow">{nextMeetup.meetup}번째 The VoDa</div>
          <div class="news-topic">{nextMeetup.subject}</div>
          <div class="news-meta">
            <div class="k">강연자</div>
            <div>{nextMeetup.speakers.join(", ")}</div>
            <div class="k">일시</div>
            <div>{nextMeetup.date}</div>
            <div class="k">장소</div>
            <div>{nextMeetup.location}</div>
          </div>
          {#if nextMeetup.type === "upcoming"}
            <a
              class="register"
              href={nextMeetup.link || "#"}
              target="_blank"
              rel="noopener"
            >
              신청하기 →
            </a>
          {:else}
            <button class="register" disabled>신청이 마감되었습니다.</button>
          {/if}
        </div>
      </div>
    {:else}
      <div class="not-announced">
        <div class="eyebrow muted">밋업 소식</div>
        <h2>다음 밋업을 준비 중이에요</h2>
        <p>일정이 정해지면 인스타그램과 이메일로 가장 먼저 알려드릴게요.</p>
      </div>
    {/if}
  </section>

  <!-- About -->
  <section id="about" class="about">
    <h2>
      ‘더보다(The VoDa)’는 2022년 서울에서 시작된 데이터 시각화 밋업입니다.
      강연과 워크샵 및 네트워킹으로 데이터 시각화의 지식과 경험을 나눕니다.
    </h2>
  </section>

  <!-- Subscribe -->
  <section id="subscribe" class="subscribe">
    <div class="subscribe-card">
      <div class="subscribe-title">
        <h2>
          <span class="badge" aria-hidden="true"><EyeIcon /></span>
          새로운 밋업 소식을 받아보세요!
        </h2>
      </div>
      <button class="subscribe-button" disabled>
        무료로 구독하기
        <span aria-hidden="true">→</span>
      </button>
    </div>
  </section>

  <SiteFooter {instagramUrl} />
</div>

<style>
  .page {
    width: 100%;
    background: #fff;
    color: #111;
    overflow-x: hidden;
  }

  /* HERO */
  .hero {
    padding: 88px clamp(20px, 5vw, 64px) 80px;
    max-width: var(--content-max-width);
    margin: 15px auto;

    @media (max-width: 780px) {
      padding: 52px clamp(20px, 5vw, 64px) 52px;
    }
  }
  h1 {
    font-family: "Archivo", "Noto Sans KR", sans-serif;
    font-size: clamp(36px, 6.4vw, 68px);
    font-weight: 500;
    /* line-height: 1.05; */
    line-height: 1.06;
    letter-spacing: -0.03em;
    margin: 0;
    /* text-wrap: balance; */

    @media (max-width: 780px) {
      line-height: 1.12;
    }
  }
  .ink {
    color: #111;
  }
  .grey {
    color: #b8b8b8;
  }
  .dot {
    display: inline-block;
    font-size: 0.5em;
    vertical-align: 0.12em;
  }
  .spin {
    display: inline-block;
    animation: voda-spin-3 2.4s cubic-bezier(0.4, 0, 0.2, 1) both;
  }
  .s2 {
    animation-delay: 2.7s;
    color: #111;
  }
  @keyframes voda-spin-3 {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  /* 밋업 소식 */
  .news {
    padding: 0 clamp(20px, 5vw, 64px) clamp(48px, 7vw, 72px);
    max-width: var(--content-max-width);
    margin: 10px auto;
  }
  .news-card {
    /* border: 1px solid #111; */
    border-radius: 20px;
    padding: clamp(28px, 3vw, 32px);
    display: flex;
    flex-wrap: wrap;
    gap: clamp(24px, 4vw, 48px);
    align-items: stretch;
    /* background-color: #f7f7f7; */
    background-color: #daf1e7;
    /* background-color: #D8D9FF; */
  }
  .poster-col {
    flex: 1 1 280px;
    min-width: 240px;
    max-width: 420px;
  }
  .poster {
    aspect-ratio: 3 / 4;
    border-radius: 8px;
    overflow: hidden;
    background: #f2f2f2;
  }
  .poster img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .skeleton-block,
  .skeleton-line,
  .skeleton-button {
    background: rgba(255, 255, 255, 0.55);
    animation: skeleton-pulse 1.2s ease-in-out infinite alternate;
  }
  .skeleton-line {
    height: 16px;
    border-radius: 8px;
  }
  .skeleton-line.short {
    width: 34%;
    margin-bottom: 18px;
  }
  .skeleton-line.title {
    width: 72%;
    height: 42px;
    margin-bottom: 24px;
  }
  .skeleton-meta {
    display: grid;
    grid-template-columns: 64px 1fr;
    gap: 12px 20px;
    padding-top: 24px;
    border-top: 1px solid rgba(17, 17, 17, 0.15);
  }
  .skeleton-line.label {
    width: 48px;
  }
  .skeleton-line.value {
    width: min(240px, 80%);
  }
  .skeleton-button {
    width: 190px;
    height: 50px;
    margin-top: 32px;
    border-radius: 100px;
  }
  @keyframes skeleton-pulse {
    from { opacity: 0.45; }
    to { opacity: 0.9; }
  }
  @media (prefers-reduced-motion: reduce) {
    .skeleton-block,
    .skeleton-line,
    .skeleton-button {
      animation: none;
    }
  }
  .news-body {
    flex: 1 1 380px;
    min-width: 280px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #111;
  }
  @media (max-width: 780px) {
    .poster-col,
    .news-body {
      min-width: 0;
      width: 100%;
      max-width: none;
    }
  }
  .eyebrow {
    font-size: 13.5px;
    font-weight: 700;
    margin-bottom: 16px;
    letter-spacing: 0.04em;
  }
  .news-topic {
    font-family: "Archivo", "Noto Sans KR", sans-serif;
    font-size: clamp(27px, 3.6vw, 37px);
    font-weight: 500;
    line-height: 1.25;
    letter-spacing: -0.02em;
    margin-bottom: 18px;
  }
  .news-meta {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 12px 20px;
    font-size: 15.5px;
    font-weight: 500;
    padding-top: 24px;
    border-top: 1px solid #111;
  }
  .news-meta .k {
    font-weight: 700;
  }
  .register {
    align-self: flex-start;
    margin-top: 32px;
    margin-bottom: 10px;
    padding: 14px 28px;
    border-radius: 100px;
    border: 1.5px solid #111;
    background: rgba(0, 0, 0, 0);
    color: #111;
    font-weight: 600;
    font-size: 17px;
    transition: background 0.15s ease;

    @media (max-width: 780px) {
      font-size: 16px;
    }
  }
  .register:hover {
    background: #111;
    color: #fff;
  }
  .register:disabled {
    border-color: #aaa;
    background: transparent;
    color: #888;
    cursor: not-allowed;
  }

  .not-announced {
    background: #f4f4f4;
    border-radius: 24px;
    padding: clamp(32px, 5vw, 56px);
    text-align: center;
  }
  .not-announced .muted {
    color: #666;
    text-transform: uppercase;
    margin-bottom: 12px;
  }
  .not-announced h2 {
    font-family: "Archivo", "Noto Sans KR", sans-serif;
    font-size: clamp(24px, 3.5vw, 32px);
    font-weight: 800;
    margin: 0 0 10px;
    letter-spacing: -0.02em;
    text-transform: uppercase;
  }
  .not-announced p {
    font-size: 16px;
    color: #555;
    margin: 0;
  }

  /* About */
  .about {
    padding: clamp(48px, 7vw, 80px) clamp(20px, 5vw, 64px)
      clamp(24px, 4vw, 40px);
    /* max-width: 1400px;
    margin: 0 auto; */
    max-width: var(--content-max-width);
    margin: 10px auto;
  }
  .about h2 {
    font-family: "Archivo", "Noto Sans KR", sans-serif;
    /* font-size: clamp(26px, 3.8vw, 42px); */
    font-size: clamp(26px, 3.8vw, 36px);
    font-weight: 400;
    margin: 0;
    letter-spacing: -0.03em;
    max-width: 720px;
    text-wrap: pretty;
    line-height: 1.35;

    margin-left: auto;
    margin-right: auto;

    @media (max-width: 780px) {
      line-height: 1.4;
    }
  }

  /* Subscribe */
  .subscribe {
    padding: 30px clamp(20px, 5vw, 64px);
    /* max-width: 1400px;
    margin: 0 auto; */

    max-width: var(--content-max-width);
    margin: 10px auto;
    /* background-color: red; */
  }
  .subscribe-card {
    /* border: 1px solid #111;  */
    /* background-color: #f7f7f7; */
    /* border-radius: 20px; */
    padding: clamp(28px, 4vw, 44px) clamp(28px, 4vw, 56px);
    display: flex;
    flex-wrap: wrap;
    gap: clamp(6px, 1.6vw, 8px);
    align-items: center;
    /* border-top: 1px solid #111;
    border-bottom: 1px solid #111; */

    @media (max-width: 780px) {
      padding: 5px 0px;
      margin-bottom: 40px;
    }
  }
  .badge {
    width: 1em;
    height: 1em;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    /* justify-content: center; */
    font-family: "Archivo", sans-serif;
    font-size: 41.6px;
    line-height: 1;
  }
  @media (max-width: 780px) {
    .badge {
      font-size: 32px;
    }
  }
  .subscribe-title {
    flex: 1 1 300px;
  }
  .subscribe-title h2 {
    font-family: "Archivo", "Noto Sans KR", sans-serif;
    font-size: clamp(21px, 2.8vw, 28px);
    font-weight: 500;
    margin: 0;
    letter-spacing: -0.02em;
    line-height: 1.15;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .subscribe-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 15px 24px;
    border: 1.5px solid #111;
    border-radius: 100px;
    font-size: 17px;
    font-weight: 600;
    color: #111;
    background: transparent;
    cursor: pointer;
    transition:
      background 0.15s ease,
      color 0.15s ease;

    @media (max-width: 780px) {
      font-size: 16px;
    }
  }
  .subscribe-button:hover:not(:disabled) {
    background: #111;
    color: #fff;
  }
  .subscribe-button:disabled {
    border-color: #aaa;
    color: #888;
    cursor: not-allowed;
  }
  .subscribe-button span {
    font-size: 20px;
    line-height: 1;
  }
</style>
