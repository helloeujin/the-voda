<script>
  import { slide } from "svelte/transition";

  let { meetups } = $props();

  // Matches the original: a single row open at a time (state.open).
  let openIdx = $state(null);

  function toggle(idx) {
    openIdx = openIdx === idx ? null : idx;
  }

  function bulletItems(content) {
    const lines = content
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    if (lines.length < 2 || !lines.every((line) => line.startsWith("- "))) {
      return null;
    }

    return lines.map((line) => line.slice(2).trim());
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
          <span class="sign">{openIdx === m.idx ? "−" : "+"}</span>
        </button>

        {#if openIdx === m.idx}
          <div class="detail" transition:slide={{ duration: 280 }}>
            <div></div>
            <div class="detail-body">
              <div class="meta">
                <span>{m.date}</span>
                <span>{m.type === "online" ? "온라인" : "오프라인"}</span>
              </div>
              {#each m.sessions as session}
                <div class="session">
                  <p class="speaker">
                    {session.speaker}
                    {#if session.title}
                      <span>{session.title}</span>
                    {/if}
                  </p>
                  {#if session.content}
                    {@const items = bulletItems(session.content)}
                    {#if items}
                      <ul class="summary-list">
                        {#each items as item}
                          <li>{item}</li>
                        {/each}
                      </ul>
                    {:else}
                      <p class="summary">{session.content}</p>
                    {/if}
                  {/if}
                </div>
              {/each}
              {#if m.link}
                <a
                  class="detail-link"
                  href={m.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >자세히 보기 →</a>
              {/if}
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
    max-width: 720px;
    margin: 0 auto;
    border-top: 1px solid #111;
  }
  .item {
    border-bottom: 1px solid #111;
  }
  .row {
    display: grid;
    grid-template-columns: 64px minmax(0, 1fr) 28px;
    gap: clamp(12px, 3vw, 32px);
    align-items: baseline;
    padding: 22px 0;
    width: 100%;
    background: none;
    border: 0;
    font: inherit;
    text-align: left;
    cursor: pointer;
    color: #111;
    font-size: clamp(16px, 1.7vw, 17px);
    transition: opacity 0.15s ease;
  }
  .row:hover {
    opacity: 0.6;
  }
  .label,
  .title {
    color: #111;
  }
  .title {
    width: 80%;
    min-width: 0;
    overflow-wrap: anywhere;
    font-size: clamp(17px, calc(1.7vw + 1px), 18px);
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
    gap: 18px;
    max-width: 600px;
  }
  .meta {
    display: flex;
    gap: 10px;
    font-size: 13px;
    color: #888;
  }
  .meta span + span::before {
    content: "·";
    margin-right: 10px;
  }
  .session {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }
  .speaker {
    margin: 0;
    font-size: 15px;
    font-weight: 700;
  }
  .speaker span {
    margin-left: 7px;
    color: #777;
    font-size: 13px;
    font-weight: 400;
  }
  .summary {
    margin: 0;
    font-size: 15px;
    line-height: 1.7;
    color: #555;
    text-wrap: pretty;
  }
  .summary-list {
    margin: 0;
    padding-left: 1.25em;
    color: #555;
    font-size: 15px;
    line-height: 1.7;
  }
  .summary-list li + li {
    margin-top: 7px;
  }
  .detail-link {
    align-self: flex-start;
    padding-bottom: 2px;
    border-bottom: 1px solid currentColor;
    font-size: 13px;
    font-weight: 600;
  }
  .detail-link:hover {
    opacity: 0.6;
  }
  @media (max-width: 780px) {
    .row {
      grid-template-columns: 44px minmax(0, 1fr) 24px;
      gap: 8px;
    }
    .detail {
      grid-template-columns: 44px minmax(0, 1fr);
      gap: 8px;
    }
  }
</style>
