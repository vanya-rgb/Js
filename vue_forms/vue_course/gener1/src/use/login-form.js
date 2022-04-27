import {computed, watch} from 'vue'
import {useField, useForm} from 'vee-validate'
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
        yup.string().trim().required().min(6)
    )
    //количество попыток входа
    const isToomanyAttempts = computed(()=>submitCount.value >= 3)
    //пример watch
    //вернуть кнопку через 1.5 секунды
    watch(isToomanyAttempts, val => {
        if (val) {
            setTimeout(()=> submitCount.value = 0, 1500)
        }
    })
    //values введенные параметры
    const onSubmit = handleSubmit(async values =>{
        try {
            await store.dispatch('auth/login', values)
            router.push('/')
        } catch (e) {
            console.log('В сабмите');
        }
    })
    

    return {
        email, password, eError, pError, eBlur, pBlur,
        onSubmit, isSubmitting, isToomanyAttempts
    }
}