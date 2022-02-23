<template>
  <div class="container">
    <app-alert
      v-if="alert"
      :text = 'text'
      :title = 'title'
      @close = 'alert = false'
    ></app-alert>
    <div class="card">
      <button class="btn primary" @click= "toggleAlert">{{alert ? 'Close' : 'Show'}}</button>
    </div>
  </div>
</template>

<script>
import AppAlert from './AppAlert.vue'
import alertMixin from '../alertMixin'

export default {
    mixins: [alertMixin],
    components: {
        AppAlert
    }
}
</script>

