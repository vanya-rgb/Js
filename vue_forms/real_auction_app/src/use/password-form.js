import {useField, useForm} from 'vee-validate'
import * as yup from 'yup'
import {useStore} from 'vuex'



export default function usePasswordForm() {
    const store = useStore()

    const {handleSubmit} = useForm()

    const {value: password, errorMessage: pError, handleBlur: pBlur} = useField(
        'password',
        yup.string().trim().required('Нужен хороший пароль').matches(/[a-z]|[а-я]+/, {message: 'Требуется хотя бы 1 символ нижнего регистра'}).matches(/[A-Z]|[А-Я]+/, {message: 'Хотя бы 1 символ верхнего регистра'}).matches(/[0-9]+/, {message: 'Добавьте хотя-бы одну цифру'}).min(6, 'Хотя бы 6 символов')
    )

    const {value: password_repit, errorMessage: prError, handleBlur: prBlur} = useField(
        'password_repit',
        yup.string().trim().required('Попытайтесь повторить это еще раз').matches(/[a-z]|[а-я]+/, {message: 'Забыли символ нижнего регистра'}).matches(/[A-Z]|[А-Я]+/, {message: 'Забыли символ верхнего регистра'}).matches(/[0-9]+/, {message: 'Не забудьте цифры'}).min(6, 'Так же не менее 6 символов, пожалуйста')
    )

    //values введенные параметры
    const changePassword = handleSubmit(async values =>{
        try {
            await store.dispatch('update/changePassword', values.password)
        } catch (e) {
            console.log("ERROR with password",e);
        }
    })
    

    return {
        password, pError, pBlur, password_repit, prError, prBlur, changePassword
    }
}