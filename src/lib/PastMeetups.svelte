<script>
  import { onMount } from "svelte";
  import SiteHeader from "./SiteHeader.svelte";
  import SiteFooter from "./SiteFooter.svelte";
  import MeetupList from "./MeetupList.svelte";
  import { buildPastMeetups } from "./data/pastMeetups.js";
  import { fetchMeetupData } from "./data/googleSheet.js";

  const baseUrl = import.meta.env.BASE_URL;

  let meetups = $state(buildPastMeetups());

  onMount(() => {
    async function refreshMeetups() {
      try {
        const { past } = await fetchMeetupData();
        if (past.length) meetups = past;
      } catch (error) {
        console.warn("Google Sheet의 지난 밋업을 불러오지 못했습니다.", error);
      }
    }

    refreshMeetups();
    const refreshTimer = window.setInterval(refreshMeetups, 5 * 60 * 1000);

    return () => window.clearInterval(refreshTimer);
  });
</script>

<div class="page">
  <SiteHeader />

  <section class="hero">
    <h1>
      <!-- <span class="dot">●</span> -->
      <span class="grey"> 2022년 여름 시작되어 </span>
      <span class="speaker-line">
        <span class="spin s1">✷</span> 뉴욕타임즈 그래픽 에디터부터 미디어 아티스트,
        지도 제작자까지 다양한 연사들이 함께했습니다.
      </span>
    </h1>
    <img
      class="collage"
      src={`${baseUrl}assets/past-meetups-collage.png`}
      alt="지난 밋업 현장"
    />
  </section>

  <MeetupList {meetups} />

  <SiteFooter />
</div>

<style>
  .page {
    width: 100%;
    background: #fff;
    color: #111;
    overflow-x: hidden;
  }
  .hero {
    padding: clamp(22px, 4vw, 48px) clamp(20px, 5vw, 64px)
      clamp(24px, 4vw, 40px);
    /* max-width: 1400px; */
    max-width: var(--content-max-width);
    margin: 0 auto;
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
  @keyframes voda-spin-3 {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @media (max-width: 780px) {
    .speaker-line {
      display: block;
    }
  }
  h1 {
    font-family: "Archivo", "Noto Sans KR", sans-serif;
    font-size: clamp(28px, 3.8vw, 43px);
    font-weight: 400;
    line-height: 1.25;
    letter-spacing: -0.03em;
    margin: 0;
    max-width: 780px;
    padding: 46px 0px 68px;
    /* text-wrap: balance; */

    /* @media (max-width: 780px) {
      line-height: 1.25;
    } */
  }
  .collage {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 6px;
  }
</style>
