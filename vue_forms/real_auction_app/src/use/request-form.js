import {useField, useForm} from 'vee-validate'
import * as yup from 'yup'
export function useRequestForm(fn) {
    const {isSubmitting, handleSubmit} = useForm({
        initialValues: {
            status: 'active'
        }
    })
    //выбор значения по умолчанию

    const {value:amount, errorMessage: aError, handleBlur: aBlur} = useField(
        'amount',
        yup.number().required("Введите сумму").min(0, 'Сумма не может быть отрицательной')
    )
    const {value:date, errorMessage: dateError, handleBlur: dateBlur} = useField(
        'date',
        yup.date().required("Введите дату")
    )
    const {value: status} = useField('status')

    const onSubmit = handleSubmit(fn)
    return {
        isSubmitting, onSubmit,
        amount, aBlur, aError,
        date, dateError, dateBlur, status
    }
}