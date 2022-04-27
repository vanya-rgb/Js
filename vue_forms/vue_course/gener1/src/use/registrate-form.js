import {useField, useForm} from 'vee-validate'
import * as yup from 'yup'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'


export function useRegistrationForm() {
    const store = useStore()
    const router = useRouter()

    const {handleSubmit, isSubmitting} = useForm()

    const {value: email, errorMessage: eError, handleBlur: eBlur} = useField(
        'email',
        yup.string().trim().required('Введите email').email()
    )

    const {value: password, errorMessage: pError, handleBlur: pBlur} = useField(
        'password',
        yup.string().trim().required().min(6)
    )

    const onSubmit = handleSubmit(async values =>{

        try {
            await store.dispatch('registrate/registrate', values)
            // await store.dispatch('registrate/createUser', data)
            console.log('где я?');
            router.push('/auth')
        } catch (e) {
            console.log();
        }
    
        
    })

    return {
        email, password, eError, pError, eBlur, pBlur,
        onSubmit, isSubmitting
    }
}