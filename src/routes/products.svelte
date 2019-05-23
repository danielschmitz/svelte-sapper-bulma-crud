<script>
  import Card from "../components/Card.svelte";
  import { onMount } from "svelte";
  import http from "../http";

  let products = [];
  let product = {};

  let buttonSaveIsLoading = false;
  $: buttonSaveClass =
    buttonSaveIsLoading === true
      ? "button is-success is-loading"
      : "button is-success";

  let modalIsVisible = false;
  $: modalClass = modalIsVisible === true ? "modal is-active" : "modal";

  onMount(async () => {
    products = getProducts();
  });

  async function getProducts() {
    // a simple use of "fetch"
    const result = await fetch("https://northwind.now.sh/api/products/?_expand=category&_expand=supplier");

    if (result.ok) return result.json();

    throw new Error(
      `🚨 Catastrofic failure 🚨 ${result.status} ${result.statusText}`
    );
  }

  function onItemClick(item) {
    product = item;
    openModal();
  }

  async function onDeleteClick(item) {
    product = item;
    if (confirm(`Delete "${product.name}"?`)){
      await http.delete(`/products/${product.id}`)
      products = getProducts();
    }
  }

  function closeModal() {
    modalIsVisible = false;
  }

  function openModal() {
    modalIsVisible = true;
  }

  function onNewClick() {
    product = {
      name: '',
      description: ''
    }
    openModal()
  }

  async function save() {
    try {
      buttonSaveIsLoading = true;
      let result = await http({
        method: product.id ? "put" : "post",
        url: product.id ? `/products/${product.id}` : "/products",
        data: product
      });
      products = getProducts();
      closeModal();
    } catch (error) {
      console.log(error);
    } finally {
      buttonSaveIsLoading = false;
    }
  }
</script>

<svelte:head>
  <title>Products</title>
</svelte:head>

<Card title="products">
  <div>

    {#await products}
      <progress class="progress is-small is-primary" max="100">15%</progress>
    {:then list}

      <table class="table is-striped is-hoverable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Supplier</th>
            <th width="100px">Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each list as item}
            <tr>
              <td>{item.name}</td>
              <td>{item.category.name}</td>
              <td>{item.supplier.companyName}</td>
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
      <p class="modal-card-title">{product.name}</p>
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
            bind:value={product.name} />
        </div>
      </div>
      <div class="field">
        <label class="label">Description</label>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder=""
            bind:value={product.description} />
        </div>
      </div>
    </section>
    <footer class="modal-card-foot">
      <button class={buttonSaveClass} on:click={save}>Save changes</button>
      <button class="button" on:click={closeModal}>Cancel</button>
    </footer>
  </div>
</div>
