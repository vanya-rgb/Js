import {computed, watch} from 'vue'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

export function useLoginForm(time) {
    const store = useStore()
    const router = useRouter()

    const {handleSubmit, isSubmitting, submitCount} = useForm()

    const {value: email, errorMessage: eError, handleBlur: eBlur} = useField(
        'email',
        yup.string().trim().required('Введите email').email('очень интересно..')
    )

    const {value: password, errorMessage: pError, handleBlur: pBlur} = useField(
        'password',
        yup.string().trim().required('Не забудьте ввести пароль').matches(/[a-z]|[а-я]+/, {message: 'Требуется хотя бы 1 символ нижнего регистра'}).matches(/[A-Z]|[А-Я]+/, {message: 'Хотя бы 1 символ верхнего регистра'}).matches(/[0-9]+/, {message: 'Добавьте хотя-бы одну цифру'}).min(6, 'Хотя бы 6 символов')
    )

    const isTooManyAttempts = computed(()=> submitCount.value > 5)
    const leftTwo = computed(()=> submitCount.value == 4)
    const leftOne = computed(()=> submitCount.value == 5)

    watch(isTooManyAttempts, (val) => {
        if (val) {
            localStorage.setItem('isTooManyAttempts', true)
            localStorage.setItem('time', new Date())
            setTimeout(()=> {
                submitCount.value = 0
            }, time)
        }
    })
    const onSubmit = handleSubmit(async values => {
        try{
            submitCount.value = 0
            localStorage.removeItem('isTooManyAttempts')
            localStorage.removeItem('time')
            await store.dispatch('auth/login', values)
            router.push('/')
        } catch(e) {
            console.log(e)
        }
    })

    return {
        email, password, eError, pError, eBlur, pBlur,
        onSubmit, isSubmitting, isTooManyAttempts, leftTwo, leftOne
    }
}