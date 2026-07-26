<script>
  import { router } from './lib/router.svelte.js'
  import TheVoDa from './lib/TheVoDa.svelte'
  import PastMeetups from './lib/PastMeetups.svelte'
</script>

{#if router.path === '/talks'}
  <PastMeetups pastMeetupCount={12} />
{:else}
  <TheVoDa />
{/if}
