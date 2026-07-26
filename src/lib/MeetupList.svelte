<script>
  let { meetups } = $props()

  // Matches the original: a single row open at a time (state.open).
  let openIdx = $state(null)

  function toggle(idx) {
    openIdx = openIdx === idx ? null : idx
  }
</script>

<div class="wrap">
  <div class="list">
    {#each meetups as m (m.idx)}
      <div class="item">
        <button
          type="button"
          class="row"
          aria-expanded={openIdx === m.idx}
          onclick={() => toggle(m.idx)}
        >
          <span class="label">{m.label}</span>
          <span class="title">{m.title}</span>
          <span class="kind">{m.kind}</span>
          <span class="sign">{openIdx === m.idx ? '−' : '+'}</span>
        </button>

        {#if openIdx === m.idx}
          <div class="detail">
            <div></div>
            <div class="detail-body">
              <p class="summary">{m.summary}</p>
              <p class="date">{m.date}</p>
            </div>
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>

<style>
  .wrap {
    background: #fff;
    padding: 60px clamp(20px, 5vw, 64px) clamp(64px, 9vw, 110px);
  }
  .list {
    max-width: 780px;
    margin: 0 auto;
    border-top: 1px solid #111;
  }
  .item {
    border-bottom: 1px solid #111;
  }
  .row {
    display: grid;
    grid-template-columns: 64px 1fr auto 28px;
    gap: clamp(12px, 3vw, 32px);
    align-items: baseline;
    padding: 20px 0;
    width: 100%;
    background: none;
    border: 0;
    font: inherit;
    text-align: left;
    cursor: pointer;
    color: #111;
    font-size: clamp(16px, 1.7vw, 20px);
    transition: opacity 0.15s ease;
  }
  .row:hover {
    opacity: 0.6;
  }
  .label,
  .title {
    color: #111;
  }
  .kind {
    color: #666;
    font-size: 15px;
    text-align: right;
  }
  .sign {
    font-size: 22px;
    line-height: 1;
    text-align: right;
    color: #111;
  }
  .detail {
    display: grid;
    grid-template-columns: 64px 1fr;
    gap: clamp(12px, 3vw, 32px);
    padding: 0 0 24px;
  }
  .detail-body {
    display: flex;
    flex-direction: column;
    gap: 14px;
    max-width: 600px;
  }
  .summary {
    margin: 0;
    font-size: 15px;
    line-height: 1.7;
    color: #555;
    text-wrap: pretty;
  }
  .date {
    margin: 0;
    font-size: 13px;
    color: #888;
  }
</style>
