<template>
    <div>
        <form class="card" @submit.prevent = "onSubmit">
            <h1>Войти в систему</h1>

            <div :class="['form-control', { invalid: eError}]">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="email" @blur="eBlur">
                <small v-if="eError">{{ eError }}</small>
            </div>

            <div :class="['form-control', { invalid: pError}]">
                <label for="password">Password</label>
                <input type="password" id="password" v-model="password" @blur="pBlur">
                <small v-if="pError">{{ pError }}</small>
            </div>

            <button class="btn primary" type="submit" :disabled="isSubmitting">Войти</button>
        </form>
    </div>
</template>

<script>
import * as yup from 'yup'
import {useField, useForm} from 'vee-validate'

    export default {
        setup() {
            
            const {handleSubmit, isSubmitting} = useForm()

            const {value: email, errorMessage: eError, handleBlur: eBlur} = useField(
                'email',
                yup.string().trim().required('Введите email').email('Нужен коректный email')
            )
            const PASS_MIN_LEN = 6
            const {value: password, errorMessage: pError, handleBlur: pBlur} = useField(
                'password',
                yup.string().trim().required('Введите пароль').min(PASS_MIN_LEN, `Длина должна быть меньше ${PASS_MIN_LEN} символов`)
            )

            const onSubmit = handleSubmit((values)=> {
                console.log(values)
            })

            return {
                email, eError, eBlur, password, pError, pBlur, onSubmit, isSubmitting
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>