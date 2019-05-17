<script>
  import Card from "../components/Card.svelte";
  import { onMount } from "svelte";

  onMount(async () => {
	categories = getCategories()
  });

  let categories = []

  async function getCategories() {
    return await fetch("https://northwind.now.sh/api/categories").then(r => r.json());
  }
</script>

<svelte:head>
  <title>Categories</title>
</svelte:head>

<Card>
  <span slot="title">Categories</span>
  <div>

    {#await categories}
      <progress class="progress is-small is-primary" max="100">15%</progress>
    {:then list}
      <ul>
        {#each list as item}
          <li>{item.name}</li>
        {/each}
      </ul>
    {:catch error}
      <p style="color: red">{error.message}</p>
    {/await}

  </div>
</Card>
