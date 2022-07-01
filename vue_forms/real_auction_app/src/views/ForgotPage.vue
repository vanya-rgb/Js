<template>
    <div>
        <title-component title="Восстановление пароля"></title-component>
        <form class="card" @submit.prevent="restorePassword">
            <div class="breadcrumbs">
                <router-link to="/auth" class="text">К авторизации</router-link>
            </div>
            <h1>Восстановление пароля</h1>

            <div :class="['form-control', {invalid: eError}]">
                <label for="id">Email</label>
                <input type="Email" id="Email" v-model="email" @blur="eBlur">
                <small v-if="eError">{{eError}}</small>
            </div>

            <button class="btn primary" type="submit" :disabled="eError">Отправить</button>
        </form>

    </div>
</template>

<script>
import useEmailForm from '../use/email-form'
import titleComponent from '@/components/ui/titleComponent.vue'

    export default {
        components: {
          titleComponent
        },
        setup(){
            return {...useEmailForm()}
        }
    }
</script>

<style lang="scss" scoped>

</style>