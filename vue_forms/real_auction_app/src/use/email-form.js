import {useField, useForm} from 'vee-validate'
import * as yup from 'yup'
import {useStore} from 'vuex'



export default function useEmailForm() {
    const store = useStore()

    const {handleSubmit} = useForm()

    const {value: email, errorMessage: eError, handleBlur: eBlur} = useField(
        'email',
        yup.string().trim().required('Введите email').email('очень интересно..')
    )

    //values введенные параметры
    const changeEmail = handleSubmit(async values =>{
        try {
            await store.dispatch('update/changeEmail', values.email)
            await store.dispatch('update/updateUserData', {
                email: email.value
            })
        } catch (e) {
            console.log("ERROR with email",e);
        }
    })


    return {
        email, eError, eBlur,
        changeEmail
    }
}