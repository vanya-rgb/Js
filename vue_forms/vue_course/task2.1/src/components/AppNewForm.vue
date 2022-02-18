<template>
        <form class="card card-w30" @submit.prevent="submit">
        <!-- 1. выбор типа -->
        <div class="form-control">
          <label for="type">Type</label>
          <!-- //модель отслеживает что введено -->
          <select name="type" id="type" v-model="type">
            <option value="title">Title</option>
            <option value="subtitle">Subtitle</option>
            <option value="avatar">Avatar</option>
            <option value="text">Text</option>
          </select>
        </div>

        <div class="form-control">
          <label for="value">Value</label>
          <textarea name="value" id="value" rows="3" v-model="value"></textarea>
        </div>

        <button class="btn primary" :disabled="this.value.length < 3">Send</button>
      </form>  
</template>

<script>
    export default {
        emits: ['block-added']
        ,
        data() {
            return {
            type: 'title',
            value: ''
            }
        },
        methods: {
            submit() {
                this.$emit('block-added', {
                    type: this.type,
                    value: this.value,
                    id: Date.now()
                })

                // Возвращаем в исходное положение
                this.type = 'title',
                this.value = ''
            }
        }
    }
</script>

