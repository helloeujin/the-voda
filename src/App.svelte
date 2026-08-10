<script>
  import { router } from './lib/router.svelte.js'
  import TheVoDa from './lib/TheVoDa.svelte'
  import PastMeetups from './lib/PastMeetups.svelte'
  import About from './lib/About.svelte'
</script>

{#if router.path === '/talks'}
  <PastMeetups />
{:else if router.path === '/about'}
  <About />
{:else}
  <TheVoDa />
{/if}
