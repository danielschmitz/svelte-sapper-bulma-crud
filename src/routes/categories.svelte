<script>
  import Card from "../components/Card.svelte";
  import { onMount } from "svelte";

  let categories = [];

  onMount(async () => {
    categories = getCategories();
  });

  async function getCategories() {
    const result = await fetch("https://northwind.now.sh/api/categories");

    if (result.ok) return result.json();

    throw new Error(
      `🚨 Catastrofic failure 🚨 ${result.status} ${result.statusText}`
    );
  }

  function onItemClick(item) {
    console.log("onItemClick", item);
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

      <table class="table is-striped is-hoverable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th width="100px">Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each list as item}
            <tr>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>
                <a href="javascript;" on:click={()=>onItemClick(item)}>
                  <span class="icon is-small">
                    <i class="fas fa-edit" />
                  </span>
                </a>
                &nbsp;
                 <a href="javascript;" on:click={()=>onDeleteClick(item)}>
                  <span class="icon is-small">
                    <i class="fas fa-trash" />
                  </span>
                </a>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    {:catch error}
      <p style="color: red">{error.message}</p>
    {/await}

  </div>
</Card>


