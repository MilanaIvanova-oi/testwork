// ============================================
// ОБЩИЕ ФУНКЦИИ
// ============================================

// ============================================
// ПРОВЕРКА АВТОРИЗАЦИИ
// Возвращает true если пользователь вошёл
// ============================================
function isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true'
}

// ============================================
// ОБНОВЛЕНИЕ КНОПОК АВТОРИЗАЦИИ
// Показывает/скрывает кнопки Вход/Выход
// ============================================
function updateAuthButtons() {
    const authLink = document.querySelector('#authLink')
    const regLink = document.querySelector('#regLink')
    const logoutLink = document.querySelector('#logoutLink')

    if (isLoggedIn()) {
        if (authLink) authLink.style.display = 'none'
        if (regLink) regLink.style.display = 'none'
        if (logoutLink) logoutLink.style.display = 'inline-block'

        const username = localStorage.getItem('username')
        if (logoutLink && username) {
            logoutLink.textContent = username + ' (Выход)'
        }
    } else {
        if (authLink) authLink.style.display = 'inline-block'
        if (regLink) regLink.style.display = 'inline-block'
        if (logoutLink) logoutLink.style.display = 'none'
    }

    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault()
            localStorage.removeItem('isLoggedIn')
            localStorage.removeItem('username')
            window.location.reload()
        })
    }
}

// ============================================
// ВЫПАДАЮЩЕЕ МЕНЮ В ШАПКЕ
// ============================================
function initHeaderMenu() {
    const menuToggle = document.querySelector('#menuToggle')
    const headerMenu = document.querySelector('#headerMenu')

    if (menuToggle && headerMenu) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation()
            menuToggle.classList.toggle('active')
            headerMenu.classList.toggle('active')
        })

        document.addEventListener('click', function(e) {
            if (!headerMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active')
                headerMenu.classList.remove('active')
            }
        })

        const menuLinks = headerMenu.querySelectorAll('a')
        menuLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active')
                headerMenu.classList.remove('active')
            })
        })
    }
}

// ============================================
// ВАЛИДАЦИЯ ПОЛЕЙ
// ============================================
function validateField(fieldId) {
    const field = document.querySelector('#' + fieldId)
    const errorDiv = document.querySelector('#' + fieldId + '-error')
    if (!field || !errorDiv) return true

    const value = field.value

    if (fieldId === 'reg-name' || fieldId === 'name') {
        const nameRegex = /^[а-яА-ЯёЁ\s]{2,50}$/
        if (!nameRegex.test(value)) {
            errorDiv.textContent = 'Имя должно содержать только русские буквы (2-50 символов)'
            errorDiv.style.display = 'block'
            field.classList.add('input-error')
            return false
        } else {
            errorDiv.textContent = ''
            errorDiv.style.display = 'none'
            field.classList.remove('input-error')
            return true
        }
    }

    if (fieldId === 'email') {
        const emailRegex = /^[a-zA-Z0-9._-]+@(gmail|mail|yandex)\.(ru|com)$/
        if (!emailRegex.test(value)) {
            errorDiv.textContent = 'Email должен быть @gmail, @mail или @yandex (.ru или .com)'
            errorDiv.style.display = 'block'
            field.classList.add('input-error')
            return false
        } else {
            errorDiv.textContent = ''
            errorDiv.style.display = 'none'
            field.classList.remove('input-error')
            return true
        }
    }

    if (fieldId === 'phone') {
        const phoneRegex = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/
        if (!phoneRegex.test(value)) {
            errorDiv.textContent = 'Введите номер в формате +7 (___) ___-__-__'
            errorDiv.style.display = 'block'
            field.classList.add('input-error')
            return false
        } else {
            errorDiv.textContent = ''
            errorDiv.style.display = 'none'
            field.classList.remove('input-error')
            return true
        }
    }

    if (fieldId === 'reg-phone') {
        const phoneRegex = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/
        if (!phoneRegex.test(value)) {
            errorDiv.textContent = 'Введите номер в формате +7 (___) ___-__-__'
            errorDiv.style.display = 'block'
            field.classList.add('input-error')
            return false
        } else {
            errorDiv.textContent = ''
            errorDiv.style.display = 'none'
            field.classList.remove('input-error')
            return true
        }
    }

    if (fieldId === 'reg-email') {
        const emailRegex = /^[a-zA-Z0-9._-]+@(gmail|mail|yandex)\.(ru|com)$/
        if (!emailRegex.test(value)) {
            errorDiv.textContent = 'Email должен быть @gmail, @mail или @yandex (.ru или .com)'
            errorDiv.style.display = 'block'
            field.classList.add('input-error')
            return false
        } else {
            errorDiv.textContent = ''
            errorDiv.style.display = 'none'
            field.classList.remove('input-error')
            return true
        }
    }

    if (fieldId === 'reg-password') {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_@#$%^&*(),.?!:;])[a-zA-Z\d_@#$%^&*(),.?!:;]{8,}$/
        if (!passwordRegex.test(value)) {
            errorDiv.textContent = 'Пароль должен содержать минимум 8 символов, 1 заглавную букву, 1 строчную букву, 1 цифру и 1 спецсимвол (_, @, #, $ и т.д.)'
            errorDiv.style.display = 'block'
            field.classList.add('input-error')
            return false
        } else {
            errorDiv.textContent = ''
            errorDiv.style.display = 'none'
            field.classList.remove('input-error')
            return true
        }
    }

    if (fieldId === 'reg-password-confirm') {
        const password = document.querySelector('#reg-password').value
        if (field.value !== password) {
            errorDiv.textContent = 'Пароли не совпадают'
            errorDiv.style.display = 'block'
            field.classList.add('input-error')
            return false
        } else {
            errorDiv.textContent = ''
            errorDiv.style.display = 'none'
            field.classList.remove('input-error')
            return true
        }
    }

    if (!field.validity.valid) {
        errorDiv.textContent = field.validationMessage
        errorDiv.style.display = 'block'
        field.classList.add('input-error')
        return false
    } else {
        errorDiv.textContent = ''
        errorDiv.style.display = 'none'
        field.classList.remove('input-error')
        return true
    }
}

// ============================================
// НАВЕШИВАНИЕ ОБРАБОТЧИКОВ ВАЛИДАЦИИ
// ============================================
function attachValidationHandlers(fieldIds) {
    fieldIds.forEach(function(fieldId) {
        const field = document.querySelector('#' + fieldId)
        if (field) {
            const eventType = field.tagName === 'SELECT' ? 'change' : 'input'
            field.addEventListener(eventType, function() {
                validateField(fieldId)
            })
            field.addEventListener('blur', function() {
                validateField(fieldId)
            })
        }
    })
}

// ============================================
// ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    updateAuthButtons()
    initHeaderMenu()
})
