<script>
  import { onMount } from "svelte";

  let categories = [];
  export let selected;

  onMount(async () => {
    categories = getCategories();
  });

  async function getCategories() {
    const result = await fetch("https://northwind.now.sh/api/categories");
    if (result.ok) return result.json();
  }
</script>

<div class="select">
  {#await categories}
    <progress class="progress is-small is-primary" max="100">15%</progress>
  {:then list}
    <select bind:value={selected}>
      {#each list as item}
        <option value={item.id}>{item.name}</option>
      {/each}
    </select>
  {:catch}
    Error!
  {/await}
</div>
