// ============================================
// РЕГИСТРАЦИЯ ПОЛЬЗОВАТЕЛЯ
// Отправляет данные на сервер для регистрации
// ============================================
async function fetchData(name, username, email, phone, password) {
    // Формируем URL с данными для отправки
    let url = `http://localhost/myserver/?name=${encodeURIComponent(name)}&username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&password=${encodeURIComponent(password)}`

    try {
        // Отправляем запрос на сервер
        let response = await fetch(url, {
            method: 'GET',
            headers: { Accept: 'application/json' },
        })
        
        // Проверяем статус ответа
        if (!response.ok) {
            throw new Error('HTTP ошибка: ' + response.status)
        }
        
        let text = await response.text()
        console.log('Ответ сервера:', text)
        
        let data = JSON.parse(text)

        // Если регистрация успешна - сохраняем данные и переходим на главную
        if (data.status === 'success') {
            alert(data.message)
            localStorage.setItem('isLoggedIn', 'true')
            localStorage.setItem('username', username)
            window.location.href = 'salon_manicur.html'
        } else {
            alert(data.message)
        }
    } catch (error) {
        console.error('Ошибка:', error)
        alert('Ошибка соединения с сервером: ' + error.message)
    }
}

// ============================================
// ВХОД ПОЛЬЗОВАТЕЛЯ
// Проверяет логин и пароль
// ============================================
async function fetchLogin(username, password) {
    // Формируем URL с данными для входа
    let url = `http://localhost/myserver/?action=${encodeURIComponent('login')}&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`

    try {
        // Отправляем запрос на сервер
        let response = await fetch(url, {
            method: 'GET',
            headers: { Accept: 'application/json' },
        })
        let data = await response.json()

        // Если вход успешен - сохраняем данные и переходим на главную
        if (data.status === 'success') {
            alert(data.message)
            localStorage.setItem('isLoggedIn', 'true')
            localStorage.setItem('username', username)
            window.location.href = 'salon_manicur.html'
        } else {
            alert(data.message)
        }
    } catch (error) {
        console.error('Ошибка:', error)
        alert('Ошибка соединения с сервером')
    }
}

// ============================================
// ОТПРАВКА СООБЩЕНИЯ (СВЯЗАТЬСЯ С НАМИ)
// Отправляет сообщение администратору
// ============================================
async function fetchContact(name, phone, email, message) {
    // Формируем URL с данными сообщения
    let url = `http://localhost/myserver/?name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&email=${encodeURIComponent(email)}&message=${encodeURIComponent(message)}`

    try {
        // Отправляем запрос на сервер
        let response = await fetch(url, {
            method: 'GET',
            headers: {Accept: 'application/json'},
        })
        let data = await response.json()

        // Если успешно - очищаем форму
        if (data.status === 'success') {
            alert(data.message)
            const contactForm = document.querySelector('#contact-form')
            if (contactForm) {
                contactForm.reset()
            }
        } else {
            alert(data.message)
        }
    } catch (error) {
        console.error('Ошибка:', error)
        alert('Ошибка соединения с сервером')
    }
}

// ============================================
// ПОЛУЧЕНИЕ УСЛУГ ИЗ БАЗЫ ДАННЫХ
// Загружает список услуг для отображения
// ============================================
async function fetchServices() {
    let url = `http://localhost/myserver/?action=${encodeURIComponent('get_services')}`

    try {
        let response = await fetch(url, {
            method: 'GET',
            headers: { Accept: 'application/json' },
        })
        let data = await response.json()

        // Если успешно - отображаем услуги
        if (data.status === 'success') {
            renderServices(data.services)
        } else {
            console.error('Ошибка:', data.message)
        }
    } catch (error) {
        console.error('Ошибка:', error)
    }
}

// ============================================
// ОТРИСОВКА УСЛУГ НА СТРАНИЦЕ
// Создаёт карточки услуг из данных
// ============================================
function renderServices(services) {
    const container = document.querySelector('.services-grid')
    if (!container) return

    container.innerHTML = ''

    // Создаём карточку для каждой услуги
    services.forEach(service => {
        const serviceItem = document.createElement('div')
        serviceItem.className = 'service-item'
        serviceItem.innerHTML = `
            <img src="${service.image}" alt="${service.title}">
            <h3>${service.title}</h3>
            <p>${service.description}</p>
            <div class="price">от ${service.price} руб.</div>
        `
        container.appendChild(serviceItem)
    })
}

// ============================================
// ПОЛУЧЕНИЕ МАСТЕРОВ ИЗ БАЗЫ ДАННЫХ
// Загружает список мастеров для отображения
// ============================================
async function fetchMasters() {
    let url = `http://localhost/myserver/?action=${encodeURIComponent('get_masters')}`

    try {
        let response = await fetch(url, {
            method: 'GET',
            headers: { Accept: 'application/json' },
        })
        let data = await response.json()

        // Если успешно - отображаем мастеров
        if (data.status === 'success') {
            renderMasters(data.masters)
        } else {
            console.error('Ошибка:', data.message)
        }
    } catch (error) {
        console.error('Ошибка:', error)
    }
}

// ============================================
// ОТРИСОВКА МАСТЕРОВ НА СТРАНИЦЕ
// Создаёт карточки мастеров из данных
// ============================================
function renderMasters(masters) {
    const container = document.querySelector('.masters-grid')
    if (!container) return

    container.innerHTML = ''

    // Создаём карточку для каждого мастера
    masters.forEach(master => {
        const masterCard = document.createElement('div')
        masterCard.className = 'master-card'
        masterCard.innerHTML = `
            <img src="${master.image}" alt="${master.name}">
            <h3>${master.name}</h3>
            <p>${master.specialization}</p>
        `
        container.appendChild(masterCard)
    })
}

// ============================================
// ПОЛУЧЕНИЕ УСЛУГ ДЛЯ ФОРМЫ ЗАПИСИ
// Загружает услуги в выпадающий список
// ============================================
async function fetchAppointmentServices() {
    let url = `http://localhost/myserver/?action=${encodeURIComponent('get_appointment_services')}`

    try {
        let response = await fetch(url, {
            method: 'GET',
            headers: { Accept: 'application/json' },
        })
        let data = await response.json()

        // Если успешно - заполняем селект
        if (data.status === 'success') {
            fillServiceSelect(data.services)
        } else {
            console.error('Ошибка:', data.message)
        }
    } catch (error) {
        console.error('Ошибка:', error)
    }
}

// ============================================
// ЗАПОЛНЕНИЕ СЕЛЕКТА УСЛУГАМИ
// Добавляет опции в выпадающий список
// ============================================
function fillServiceSelect(services) {
    const select = document.querySelector('#service-select')
    if (!select) return

    select.innerHTML = '<option value="">Выберите услугу</option>'

    // Добавляем каждую услугу как опцию
    services.forEach(service => {
        const option = document.createElement('option')
        option.value = service.id
        option.textContent = `${service.title} — ${service.price} руб.`
        select.appendChild(option)
    })
}

// ============================================
// ПОЛУЧЕНИЕ МАСТЕРОВ ДЛЯ ФОРМЫ ЗАПИСИ
// Загружает мастеров в выпадающий список
// ============================================
async function fetchAppointmentMasters() {
    let url = `http://localhost/myserver/?action=${encodeURIComponent('get_appointment_masters')}`

    try {
        let response = await fetch(url, {
            method: 'GET',
            headers: { Accept: 'application/json' },
        })
        let data = await response.json()

        // Если успешно - заполняем селект
        if (data.status === 'success') {
            fillMasterSelect(data.masters)
        } else {
            console.error('Ошибка:', data.message)
        }
    } catch (error) {
        console.error('Ошибка:', error)
    }
}

// ============================================
// ЗАПОЛНЕНИЕ СЕЛЕКТА МАСТЕРАМИ
// Добавляет опции в выпадающий список
// ============================================
function fillMasterSelect(masters) {
    const select = document.querySelector('#master-select')
    if (!select) return

    select.innerHTML = '<option value="">Выберите мастера</option>'

    // Добавляем каждого мастера как опцию
    masters.forEach(master => {
        const option = document.createElement('option')
        option.value = master.id
        option.textContent = master.name
        select.appendChild(option)
    })
}

// ============================================
// ОТПРАВКА ЗАПИСИ НА УСЛУГУ
// Сохраняет запись в базу данных
// ============================================
async function submitAppointment(username, service_id, master_id, date, time, phone) {
    // Формируем URL с данными записи
    let url = `http://localhost/myserver/?action=${encodeURIComponent('submit_appointment')}&username=${encodeURIComponent(username)}&service_id=${encodeURIComponent(service_id)}&master_id=${encodeURIComponent(master_id)}&date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}&phone=${encodeURIComponent(phone)}`

    try {
        let response = await fetch(url, {
            method: 'GET',
            headers: { Accept: 'application/json' },
        })
        let data = await response.json()

        // Если запись успешна - очищаем форму
        if (data.status === 'success') {
            alert(data.message)
            const appointmentForm = document.querySelector('#appointment-form')
            if (appointmentForm) {
                appointmentForm.reset()
            }
        } else {
            alert(data.message)
        }
    } catch (error) {
        console.error('Ошибка:', error)
        alert('Ошибка соединения с сервером')
    }
}

// ============================================
// ОБРАБОТЧИКИ ФОРМ
// Навешивает обработчики на все формы
// ============================================

// --- Функции валидации полей ---
function validateName(name) {
    const nameRegex = /^[a-zA-Zа-яА-ЯёЁ]{2,50}$/
    return nameRegex.test(name)
}

function validateUsername(username) {
    const usernameRegex = /^[a-zA-Zа-яА-ЯёЁ0-9]{3,20}$/
    return usernameRegex.test(username)
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

function validatePhone(phone) {
    const phoneRegex = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/
    return phoneRegex.test(phone)
}

function validatePassword(password) {
    const passwordRegex = /^[a-zA-Zа-яА-ЯёЁ0-9]{6,}$/
    const hasLetter = /[a-zA-Zа-яА-ЯёЁ]/.test(password)
    const hasDigit = /[0-9]/.test(password)
    return passwordRegex.test(password) && hasLetter && hasDigit
}

// --- Показ/скрытие ошибок ---
function showError(fieldId, message) {
    const field = document.querySelector('#' + fieldId)
    const errorDiv = document.querySelector('#' + fieldId + '-error')
    if (field && errorDiv) {
        field.classList.add('input-error')
        errorDiv.textContent = message
        errorDiv.classList.add('visible')
    }
}

function hideError(fieldId) {
    const field = document.querySelector('#' + fieldId)
    const errorDiv = document.querySelector('#' + fieldId + '-error')
    if (field && errorDiv) {
        field.classList.remove('input-error')
        if (field.tagName !== 'TEXTAREA') {
            field.classList.add('input-valid')
        }
        errorDiv.textContent = ''
        errorDiv.classList.remove('visible')
    }
}

// --- Универсальная функция валидации поля ---
function validateFieldWithRules(fieldId, rules) {
    const field = document.querySelector('#' + fieldId)
    if (!field) return

    const value = field.value
    let isValid = true
    let errorMessage = ''

    if (rules.name && !validateName(value)) {
        isValid = false
        errorMessage = 'Имя должно содержать только буквы (2-50 символов)'
    } else if (rules.username && !validateUsername(value)) {
        isValid = false
        errorMessage = 'Логин должен содержать только буквы и цифры (3-20 символов)'
    } else if (rules.email && !validateEmail(value)) {
        isValid = false
        errorMessage = 'Введите корректный email'
    } else if (rules.phone && !validatePhone(value)) {
        isValid = false
        errorMessage = 'Телефон должен быть в формате +7 (XXX) XXX-XX-XX'
    } else if (rules.password && !validatePassword(value)) {
        isValid = false
        errorMessage = 'Пароль должен содержать минимум 6 символов (буквы и цифры)'
    } else if (rules.required && !value) {
        isValid = false
        errorMessage = rules.required
    } else if (rules.confirmPassword) {
        const password = document.querySelector('#' + rules.confirmPassword).value
        if (value !== password) {
            isValid = false
            errorMessage = 'Пароли не совпадают'
        }
    }

    if (!isValid) {
        showError(fieldId, errorMessage)
    } else {
        hideError(fieldId)
    }
    return isValid
}

// --- Настройки валидации для полей ---
const validationRules = {
    'reg-name': { name: true },
    'reg-username': { username: true },
    'reg-email': { email: true },
    'reg-phone': { phone: true },
    'reg-password': { password: true },
    'reg-password-confirm': { confirmPassword: 'reg-password' },
    'username': { username: true },
    'password': { password: true },
    'name': { name: true },
    'phone': { phone: true },
    'email': { email: true },
    'message': { required: 'Введите сообщение' },
    'service-select': { required: 'Выберите услугу' },
    'master-select': { required: 'Выберите мастера' },
    'appointment-date': { required: 'Выберите дату' },
    'appointment-time': { required: 'Выберите время' },
    'appointment-phone': { phone: true }
}

// --- Универсальная функция для поля формы ---
function validateGenericField(fieldId) {
    const rules = validationRules[fieldId]
    if (rules) {
        validateFieldWithRules(fieldId, rules)
    }
}

function get_data_form() {
    // --- Универсальная функция для навешивания обработчиков ---
    function attachValidationHandlers(fieldIds) {
        fieldIds.forEach(function(fieldId) {
            const field = document.querySelector('#' + fieldId)
            if (field) {
                const eventType = field.tagName === 'SELECT' ? 'change' : 'input'
                field.addEventListener(eventType, function() {
                    validateGenericField(fieldId)
                })
                field.addEventListener('blur', function() {
                    validateGenericField(fieldId)
                })
            }
        })
    }

    // --- Форма регистрации ---
    const regForm = document.querySelector('#registration-form')
    if (regForm) {
        attachValidationHandlers(['reg-name', 'reg-username', 'reg-email', 'reg-phone', 'reg-password', 'reg-password-confirm'])

        regForm.addEventListener('submit', function(event) {
            event.preventDefault()

            const fields = ['reg-name', 'reg-username', 'reg-email', 'reg-phone', 'reg-password', 'reg-password-confirm']
            let hasErrors = false

            fields.forEach(function(fieldId) {
                if (!validateFieldWithRules(fieldId, validationRules[fieldId])) {
                    hasErrors = true
                }
            })

            if (hasErrors) return

            const name = document.querySelector('#reg-name').value
            const username = document.querySelector('#reg-username').value
            const email = document.querySelector('#reg-email').value
            const phone = document.querySelector('#reg-phone').value
            const password = document.querySelector('#reg-password').value

            console.log('Отправка данных:', { name, username, email, phone })
            fetchData(name, username, email, phone, password)
        })
    }

    // --- Форма входа ---
    const loginForm = document.querySelector('#login-form')
    if (loginForm) {
        attachValidationHandlers(['username', 'password'])

        loginForm.addEventListener('submit', function(event) {
            event.preventDefault()

            let hasErrors = false
            ['username', 'password'].forEach(function(fieldId) {
                if (!validateFieldWithRules(fieldId, validationRules[fieldId])) {
                    hasErrors = true
                }
            })

            if (hasErrors) return

            const username = document.querySelector('#username').value
            const password = document.querySelector('#password').value

            console.log('Вход:', { username })
            fetchLogin(username, password)
        })
    }

    // --- Форма связи ---
    const contactForm = document.querySelector('#contact-form')
    if (contactForm) {
        attachValidationHandlers(['name', 'phone', 'email', 'message'])

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault()

            let hasErrors = false
            ['name', 'phone', 'email', 'message'].forEach(function(fieldId) {
                if (!validateFieldWithRules(fieldId, validationRules[fieldId])) {
                    hasErrors = true
                }
            })

            if (hasErrors) return

            const name = document.querySelector('#name').value
            const phone = document.querySelector('#phone').value
            const email = document.querySelector('#email').value
            const message = document.querySelector('#message').value

            console.log('Отправка сообщения:', { name, phone, email, message })
            fetchContact(name, phone, email, message)
        })
    }

    // --- Форма записи ---
    const appointmentForm = document.querySelector('#appointment-form')
    if (appointmentForm) {
        attachValidationHandlers(['service-select', 'master-select', 'appointment-date', 'appointment-time', 'appointment-phone'])

        appointmentForm.addEventListener('submit', function(event) {
            event.preventDefault()

            let hasErrors = false
            ['service-select', 'master-select', 'appointment-date', 'appointment-time', 'appointment-phone'].forEach(function(fieldId) {
                if (!validateFieldWithRules(fieldId, validationRules[fieldId])) {
                    hasErrors = true
                }
            })

            if (hasErrors) return

            const service_id = document.querySelector('#service-select').value
            const master_id = document.querySelector('#master-select').value
            const date = document.querySelector('#appointment-date').value
            const time = document.querySelector('#appointment-time').value
            const phone = document.querySelector('#appointment-phone').value
            const username = localStorage.getItem('username') || 'Гость'

            console.log('Запись на услугу:', { username, service_id, master_id, date, time, phone })
            submitAppointment(username, service_id, master_id, date, time, phone)
        })
    }
}

// ============================================
// ЗАГРУЗКА ДАННЫХ ДЛЯ ФОРМЫ ЗАПИСИ
// Вызывается при загрузке страницы
// ============================================
function initAppointmentForm() {
    fetchAppointmentServices()
    fetchAppointmentMasters()
}

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
        // Пользователь авторизован - показываем кнопку выхода
        if (authLink) authLink.style.display = 'none'
        if (regLink) regLink.style.display = 'none'
        if (logoutLink) logoutLink.style.display = 'inline-block'

        const username = localStorage.getItem('username')
        if (logoutLink && username) {
            logoutLink.textContent = username + ' (Выход)'
        }
    } else {
        // Пользователь не авторизован - показываем вход и регистрацию
        if (authLink) authLink.style.display = 'inline-block'
        if (regLink) regLink.style.display = 'inline-block'
        if (logoutLink) logoutLink.style.display = 'none'
    }

    // Обработчик кнопки выхода
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
// ПРОВЕРКА ПЕРЕД ЗАПИСЬЮ
// Перенаправляет на вход если не авторизован
// ============================================
function initAppointmentPage() {
    if (!isLoggedIn()) {
        alert('Для записи на услугу необходимо войти в систему или зарегистрироваться.')
        window.location.href = 'login.html'
        return false
    }
    return true
}

// ============================================
// ЗАГРУЗКА СТРАНИЦЫ
// Вызывается когда страница готова
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    get_data_form()           // Обработчики форм
    updateAuthButtons()       // Обновление кнопок
    fetchServices()           // Загрузка услуг
    fetchMasters()            // Загрузка мастеров
    initAppointmentForm()     // Загрузка для формы записи
})
