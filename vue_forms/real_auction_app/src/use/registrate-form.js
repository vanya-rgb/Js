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
        yup.string().trim().required('Введите email').max(30, 'Максимально 30 символов').email('очень интересно..').matches(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i, {message: 'email выглядит не так'})
    )

    const {value: password, errorMessage: pError, handleBlur: pBlur} = useField(
        'password',
        yup.string().trim().required('Нужен хороший пароль').matches(/[a-z]|[а-я]+/, {message: 'Требуется хотя бы 1 символ нижнего регистра'}).matches(/[A-Z]|[А-Я]+/, {message: 'Хотя бы 1 символ верхнего регистра'}).matches(/[0-9]+/, {message: 'Добавьте хотя-бы одну цифру'}).min(6, 'Хотя бы 6 символов')
    )

    // const regexPass = /(?=.*[!#$%&?^*@~() "])(?=.{8,})/; 

    const {value: password_repit, errorMessage: prError, handleBlur: prBlur} = useField(
        'password_repit',
        yup.string().trim().required('Попытайтесь повторить это еще раз').matches(/[a-z]|[а-я]+/, {message: 'Забыли символ нижнего регистра'}).matches(/[A-Z]|[А-Я]+/, {message: 'Забыли символ верхнего регистра'}).matches(/[0-9]+/, {message: 'Не забудьте цифры'}).min(6, 'Так же не менее 6 символов, пожалуйста')
    )

    const onSubmit = handleSubmit(async values =>{

        try {
            await store.dispatch('auth/registrate', values)
            // await store.dispatch('registrate/createUser', data);
            router.push('/auth?message=auth')
        } catch (e) {
            console.log();
        }
    
        
    })

    return {
        email, password, eError, pError, eBlur, pBlur,
        onSubmit, isSubmitting, password_repit, prError, prBlur
    }
}