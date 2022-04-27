const ERROR_CODES = {
    wrong_password: 'Неверный пароль',
    auth: 'Пожалуйста войдите в систему',
    user_not_found: 'Такого пользователя нет',
    CREDENTIAL_TOO_OLD_LOGIN_AGAIN: 'Учетные данные устарели, перезайдите в систему',
    EMAIL_EXISTS: 'Такой Email уже существует',
    TOKEN_EXPIRED: 'Истек срок действия токена',
    INVALID_ID_TOKEN: 'Недопустимый идентификатор доступа',
    TOO_MANY_ATTEMPTS_TRY_LATER: 'Слишком много попыток, попробуйте позже'
}

export function error(code) {
    
    return ERROR_CODES[code] ? ERROR_CODES[code] : 'Неизвестная ошибка'
}