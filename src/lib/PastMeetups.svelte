<script>
  import SiteHeader from './SiteHeader.svelte'
  import SiteFooter from './SiteFooter.svelte'
  import MeetupList from './MeetupList.svelte'
  import { buildPastMeetups } from './data/pastMeetups.js'

  const baseUrl = import.meta.env.BASE_URL

  // `pastMeetupCount` prop mirrors the original design's editor prop (default 12).
  let { pastMeetupCount = 12 } = $props()

  const meetups = $derived(buildPastMeetups(pastMeetupCount))
</script>

<div class="page">
  <SiteHeader />

  <section class="hero">
    <h1>
      ‘더보다(The VoDa)'는 2022년 여름부터 진행되었어요. 지금까지의 밋업을 만나보세요!
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
    padding: clamp(24px, 4vw, 48px) clamp(20px, 5vw, 64px) clamp(24px, 4vw, 40px);
    max-width: 1400px;
    margin: 0 auto;
  }
  h1 {
    font-family: 'Archivo', 'Noto Sans KR', sans-serif;
    font-size: clamp(26px, 3.8vw, 42px);
    font-weight: 400;
    line-height: 1.25;
    letter-spacing: -0.03em;
    margin: 0;
    max-width: 820px;
    padding: 40px 0;
  }
  .collage {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 6px;
  }
</style>
