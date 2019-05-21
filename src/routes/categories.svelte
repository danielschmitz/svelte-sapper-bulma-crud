<script>
  import Card from "../components/Card.svelte";
  import { onMount } from "svelte";
  import http from "../http";

  let categories = [];
  let category = {};

  let buttonSaveIsLoading = false;
  $: buttonSaveClass =
    buttonSaveIsLoading === true
      ? "button is-success is-loading"
      : "button is-success";

  let modalIsVisible = false;
  $: modalClass = modalIsVisible === true ? "modal is-active" : "modal";

  onMount(async () => {
    categories = getCategories();
  });

  async function getCategories() {
    // a simple use of "fetch"
    const result = await fetch("https://northwind.now.sh/api/categories");

    if (result.ok) return result.json();

    throw new Error(
      `🚨 Catastrofic failure 🚨 ${result.status} ${result.statusText}`
    );
  }

  function onItemClick(item) {
    category = item;
    openModal();
  }

  async function onDeleteClick(item) {
    category = item;
    if (confirm(`Delete "${category.name}"?`)){
      await http.delete(`/categories/${category.id}`)
      categories = getCategories();
    }
  }

  function closeModal() {
    modalIsVisible = false;
  }

  function openModal() {
    modalIsVisible = true;
  }

  function onNewClick() {
    category = {
      name: '',
      description: ''
    }
    openModal()
  }

  async function save() {
    try {
      buttonSaveIsLoading = true;
      let result = await http({
        method: category.id ? "put" : "post",
        url: category.id ? `/categories/${category.id}` : "/categories",
        data: category
      });
      categories = getCategories();
      closeModal();
    } catch (error) {
      console.log(error);
    } finally {
      buttonSaveIsLoading = false;
    }
  }
</script>

<svelte:head>
  <title>Categories</title>
</svelte:head>

<Card title="Categories">
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
                <a href="javascript:;" on:click={() => onItemClick(item)}>
                  <span class="icon is-small">
                    <i class="fas fa-edit" />
                  </span>
                </a>

                <a href="javascript:;" on:click={() => onDeleteClick(item)}>
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
    <a href="javascript:;" slot="footer" class="card-footer-item" on:click={onNewClick}>New</a>
</Card>

<div class={modalClass}>
  <div class="modal-background" />
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">{category.name}</p>
      <button class="delete" aria-label="close" on:click={closeModal} />
    </header>
    <section class="modal-card-body">
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder=""
            bind:value={category.name} />
        </div>
      </div>
      <div class="field">
        <label class="label">Description</label>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder=""
            bind:value={category.description} />
        </div>
      </div>
    </section>
    <footer class="modal-card-foot">
      <button class={buttonSaveClass} on:click={save}>Save changes</button>
      <button class="button" on:click={closeModal}>Cancel</button>
    </footer>
  </div>
</div>
