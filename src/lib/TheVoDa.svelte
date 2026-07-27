<script>
  import { onMount } from "svelte";
  import SiteHeader from "./SiteHeader.svelte";
  import SiteFooter from "./SiteFooter.svelte";

  const baseUrl = import.meta.env.BASE_URL;

  // Editor props mirrored from the Claude Design `The VoDa.dc.html`.
  let {
    nextMeetupAnnounced = true,
    nextMeetupTopic = "데이터로 설득하기: 시각화의 힘",
    nextMeetupSpeaker = "이수민, 김지연",
    nextMeetupDate = "2026.08.20 (목) 19:00",
    nextMeetupPlace = "서울, 장소 추후 공지",
    registerUrl = "#",
    instagramHandle = "the__voda",
  } = $props();

  const instagramUrl = $derived(`https://instagram.com/${instagramHandle}`);

  let email = $state("");
  let subscribed = $state(false);
  let badgeElement;
  let isBadgeVisible = $state(false);

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isBadgeVisible = entry.intersectionRatio === 1;
      },
      { threshold: 1 },
    );

    observer.observe(badgeElement);

    return () => observer.disconnect();
  });

  function handleSubscribe(e) {
    e.preventDefault();
    subscribed = true;
  }
</script>

<div class="page">
  <SiteHeader />

  <!-- HERO -->
  <section class="hero">
    <h1>
      <span class="ink">데이터</span>
      <span class="ink"> 시각화 <span class="spin s1">✷</span> 밋업</span><br />
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
    {#if nextMeetupAnnounced}
      <div class="news-card">
        <div class="poster-col">
          <div class="poster">
            <img src={`${baseUrl}assets/poster-13.jpg`} alt="밋업 포스터" />
          </div>
        </div>

        <div class="news-body">
          <div class="eyebrow">13번째 The VoDa</div>
          <div class="news-topic">{nextMeetupTopic}</div>
          <div class="news-meta">
            <div class="k">강연자</div>
            <div>{nextMeetupSpeaker}</div>
            <div class="k">일시</div>
            <div>{nextMeetupDate}</div>
            <div class="k">장소</div>
            <div>{nextMeetupPlace}</div>
          </div>
          <a class="register" href={registerUrl} target="_blank" rel="noopener">
            신청하기 →
          </a>
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
      <div
        class="badge"
        class:rotate={isBadgeVisible}
        bind:this={badgeElement}
        aria-hidden="true"
      >
        <span class="badge-icon">✷</span>
      </div>
      <div class="subscribe-title">
        <h2>밋업 소식 받아보기</h2>
      </div>
      <form onsubmit={handleSubscribe}>
        <input
          type="email"
          required
          placeholder="Your email"
          bind:value={email}
        />
        <button type="submit" aria-label="구독하기">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="4" y1="12" x2="19" y2="12" />
            <polyline points="13 6 19 12 13 18" />
          </svg>
        </button>
      </form>
      {#if subscribed}
        <div class="subscribe-note">
          ✓ 구독 신청 화면이에요 (실제 발송은 서비스 연동 후 적용돼요)
        </div>
      {/if}
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
    padding: 90px clamp(20px, 5vw, 64px);
    max-width: var(--content-max-width);
    margin: 15px auto;

    @media (max-width: 780px) {
      padding: 70px clamp(20px, 5vw, 64px) 60px;
    }
  }
  h1 {
    font-family: "Archivo", "Noto Sans KR", sans-serif;
    font-size: clamp(40px, 6.4vw, 68px);
    font-weight: 500;
    line-height: 1.03;
    letter-spacing: -0.03em;
    margin: 0;
    /* text-wrap: balance; */
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
  .s1 {
    animation-delay: 0.3s;
  }
  .s2 {
    animation-delay: 3s;
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
    border: 1px solid #111;
    border-radius: 20px;
    padding: clamp(20px, 3vw, 32px);
    display: flex;
    flex-wrap: wrap;
    gap: clamp(24px, 4vw, 48px);
    align-items: stretch;
    background-color: #d8d9ff;
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
  .news-body {
    flex: 1 1 380px;
    min-width: 280px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #111;
  }
  .eyebrow {
    font-size: 13.5px;
    font-weight: 700;
    margin-bottom: 16px;
    letter-spacing: 0.04em;
  }
  .news-topic {
    font-family: "Archivo", "Noto Sans KR", sans-serif;
    font-size: clamp(28px, 3.6vw, 38px);
    font-weight: 500;
    line-height: 1.25;
    letter-spacing: -0.02em;
    margin-bottom: 28px;
  }
  .news-meta {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 12px 20px;
    font-size: 15.5px;
    font-weight: 500;
    padding-top: 20px;
    border-top: 1px solid #111;
  }
  .news-meta .k {
    font-weight: 700;
  }
  .register {
    align-self: flex-start;
    margin-top: 32px;
    padding: 14px 28px;
    border-radius: 100px;
    border: 1.5px solid #111;
    background: rgba(0, 0, 0, 0);
    color: #111;
    font-weight: 600;
    font-size: 17px;
    transition: background 0.15s ease;
  }
  .register:hover {
    background: #111;
    color: #fff;
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
    border-radius: 20px;
    padding: clamp(28px, 4vw, 44px) clamp(28px, 4vw, 56px);
    display: flex;
    flex-wrap: wrap;
    gap: clamp(6px, 1.6vw, 8px);
    align-items: center;

    @media (max-width: 780px) {
      padding: 5px 0px;
      margin-bottom: 40px;
    }
  }
  .badge {
    width: 56px;
    height: 56px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    /* justify-content: center; */
    font-family: "Archivo", sans-serif;
    font-size: 52px;
    line-height: 1;
  }
  .badge-icon {
    display: block;
    width: 1em;
    height: 1em;
    line-height: 1em;
    text-align: center;
    transform-origin: 50% 50%;
  }
  .badge.rotate .badge-icon {
    animation: badge-spin 5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  @keyframes badge-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .badge.rotate .badge-icon {
      animation: none;
    }
  }
  @media (max-width: 780px) {
    .badge {
      font-size: 40px;
    }
  }
  .subscribe-title {
    flex: 1 1 300px;
  }
  .subscribe-title h2 {
    font-family: "Archivo", "Noto Sans KR", sans-serif;
    font-size: clamp(24px, 2.8vw, 30px);
    font-weight: 500;
    margin: 0;
    letter-spacing: -0.02em;
    line-height: 1.15;
  }
  form {
    flex: 1 1 340px;
    display: flex;
    align-items: center;
    gap: 16px;
    border-bottom: 1px solid #bbb;
    padding-bottom: 10px;
  }
  input {
    flex: 1;
    min-width: 0;
    padding: 6px 0;
    border: none;
    font-size: clamp(19px, 2.2vw, 25px);
    color: #111;
    background: transparent;
    outline: none;
  }
  form button {
    flex-shrink: 0;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    cursor: pointer;
    color: #111;
    transition:
      background 0.15s ease,
      color 0.15s ease;
  }
  form button:hover {
    background: #111;
    color: #fff;
  }
  .subscribe-note {
    width: 100%;
    font-size: 14px;
    color: #555;
    font-weight: 600;
    text-align: center;
  }
</style>
