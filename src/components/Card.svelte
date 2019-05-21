<script>
export let title=""
</script>

<div class="card">
  <header class="card-header">
    <p class="card-header-title">
      {title}
    </p>
  </header>
  <div class="card-content">
    <div class="content">
      <slot />
    </div>
  </div>
  <footer class="card-footer">
    <slot name="footer" />
  </footer>
</div>


<style>
.card {
  margin: 10px
}
</style>
