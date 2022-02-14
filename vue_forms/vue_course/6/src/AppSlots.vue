<template>
  <div class="container pt-1">
    <div class="card">
      <h2>Slots</h2>
    </div>

    <app-list>
      <template #default = "{ idx, iter }">
        <span style="color: #c25205">
          <strong>{{idx + 1}}</strong>
          Item: {{iter}}
        </span>
      </template>
      
    </app-list>

    <app-block>
      <p>Most important content for new block</p>

      <template #header>
        <h3>The header!</h3>
      </template>

      <template #footer>
        <hr />
        <small>The footer!</small>
      </template>
    </app-block>
  </div>
</template>

<script>
  import AppBlock from './AppBlock.vue'
  import AppList from './AppLIst.vue'
  export default {
    components: {
      AppBlock, AppList
    }
  }
</script>

<style lang="scss" scoped>

</style>