<script>
  import { onMount } from "svelte";

  let suppliers = [];
  export let selected;

  onMount(async () => {
    suppliers = getSuppliers();
  });

  async function getSuppliers() {
    const result = await fetch("https://northwind.now.sh/api/suppliers");
    if (result.ok) return result.json();
  }
</script>

<div class="select">
  {#await suppliers}
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
