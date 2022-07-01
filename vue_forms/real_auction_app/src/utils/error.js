const ERROR_CODES = {
    EMAIL_NOT_FOUND: 'Несуществующий пользователь',
    CREDENTIAL_TOO_OLD_LOGIN_AGAIN: 'Учетные данные устарели, перезайдите в систему',
    EMAIL_EXISTS: 'Такой Email уже существует',
    TOKEN_EXPIRED: 'Истек срок действия токена',
    INVALID_ID_TOKEN: 'Недопустимый идентификатор доступа',
    TOO_MANY_ATTEMPTS_TRY_LATER: 'Слишком много попыток, попробуйте позже',
    auth: 'Пожалуйста войдите в систему',
    INVALID_PASSWORD: 'Неверный пароль',
    Unauthorized: 'Закончилось время действия токена'
}

export function error(code) {
    
    return ERROR_CODES[code] ? ERROR_CODES[code] : 'Неизвестная ошибка'
}