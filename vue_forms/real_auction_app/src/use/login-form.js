import {computed, watch} from 'vue'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

export function useLoginForm() {
    const store = useStore()
    const router = useRouter()

    const {handleSubmit, isSubmitting, submitCount} = useForm()

    const {value: email, errorMessage: eError, handleBlur: eBlur} = useField(
        'email',
        yup.string().trim().required('Введите email').email()
    )

    const {value: password, errorMessage: pError, handleBlur: pBlur} = useField(
        'password',
        yup.string().trim().required('Введите email').min(6, 'Пароль должен быть не меньше 6 символов')
    )

    const isTooManyAttempts = computed(()=> submitCount.value > 5)

    watch(isTooManyAttempts, val => {
        if (val) {
            setTimeout(()=> submitCount.value = 0, 5000)
        }
    })
    const onSubmit = handleSubmit(async values => {
        try{
            await store.dispatch('auth/login', values)
            router.push('/')
        } catch(e) {
            console.log(e)
        }
    })

    return {
        email, password, eError, pError, eBlur, pBlur,
        onSubmit, isSubmitting, isTooManyAttempts
    }
}