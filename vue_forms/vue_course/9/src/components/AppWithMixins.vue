<template>
  <div class="container">
    <app-alert
      v-if="alert"
      :text = 'text'
      :title = 'title'
      type = 'danger'
      closable
      @close = 'alert = false'
    ></app-alert>
    <div class="card">
      <button class="btn primary" @click= "toggleAlert">{{alert ? 'Close' : 'Show'}}</button>
    </div>

    <app-block></app-block>
  </div>
</template>

<script>
import AppAlert from './components/AppAlert.vue'
import AppBlock from './components/AppBlock.vue'
import alertMixin from './alertMixin'

export default {
  mixins: [alertMixin],
  components: {
    AppAlert,
    AppBlock
  }
}
</script>

