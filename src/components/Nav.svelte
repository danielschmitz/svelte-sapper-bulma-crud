<script>
  import { onMount } from "svelte";
  import menu from "../menu";

  export let segment;

  onMount(async () => {
    enableResponsibleMenu();
  });

  function enableResponsibleMenu() {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll(".navbar-burger"),
      0
    );

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
      // Add a click event on each of them
      $navbarBurgers.forEach(el => {
        el.addEventListener("click", () => {
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);

          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle("is-active");
          $target.classList.toggle("is-active");
        });
      });
    }
  }
</script>

<style>
  .navbar {
    background-color: #eeeeee;
  }

  .selected {
    background-color: white;
  }
</style>

<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="home">
      <img
        src="https://bulma.io/images/bulma-logo.png"
        width="112"
        alt="Bulma"
        height="28" />
      <img
        src="https://svelte.dev/svelte-logo-horizontal.svg"
        width="112"
        alt="Svelte"
        height="28" />
      <img
        src="https://sapper.svelte.dev/sapper-logo-horizontal.svg"
        width="112"
        alt="Sapper"
        height="28" />
    </a>


  

    <a
      href="javascript:;"
      role="button"
      class="navbar-burger burger"
      aria-label="menu"
      aria-expanded="false"
      data-target="navbarBasicExample">
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">

      {#each menu as item}
        <a
          class={segment === item[0] ? 'navbar-item selected' : 'navbar-item'}
          href={item[0]}>
           {item[1]}
        </a>
      {/each}

    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a
            href="https://github.com/danielschmitz/svelte-sapper-bulma-crud"
            target="_blank"
            class="button is-light">
            GitHub
          </a>
        </div>
      </div>
    </div>
  </div>
</nav>
