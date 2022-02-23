<template>
  <div class="contaner">
    <div class="card" v-if="show">
      <h2 v-color:[type].blink.hover= "mycolor">Derictives</h2>

      <div class="form-control">
        <label for="imp">Active</label>
        <input v-focus type="text" id="imp">
      </div>

      <button class="btn" @click= "mycolor = 'darkblue'">Change color on blue</button>
      <button class="btn" @click= "type = type == 'color' ?'backgroundColor' : 'color'">Change type!</button>
      {{type}}
    </div>
  </div>
</template>

<script>
import focusDirective from './components/focusDirective'
import colorDerective from './components/colorDerective'

  export default {
    data() {
      return {
        mycolor: 'darkred',
        type: 'color',
        show: true
      }
    },
    directives: {
      focus: focusDirective,
      color: colorDerective,
    },
    // mounted() {
    //   setTimeout(()=> {
    //     this.show = false
    //   }, 2000)
    // }
  }
</script>

<style lang="scss" scoped>

</style>