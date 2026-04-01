// ============================================
// РЕГИСТРАЦИЯ ПОЛЬЗОВАТЕЛЯ
// Отправляет данные на сервер для регистрации
// ============================================
async function fetchData(name, username, email, phone, password) {
    let url = `http://localhost/myserver/`
    let d = { name, username, email, phone, password }

    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(d).toString(),
        })

        let result = await response.json()
        console.log('Ответ сервера:', result)

        if (result.status === 'success') {
            alert(result.message)
            localStorage.setItem('isLoggedIn', 'true')
            localStorage.setItem('username', username)
            window.location.href = 'index.html'
        } else {
            alert(result.message)
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
    let url = `http://localhost/myserver/`
    let d = { action: 'login', username, password }

    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(d).toString(),
        })
        let result = await response.json()

        if (result.status === 'success') {
            alert(result.message)
            localStorage.setItem('isLoggedIn', 'true')
            localStorage.setItem('username', username)
            window.location.href = 'index.html'
        } else {
            alert(result.message)
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
    let url = `http://localhost/myserver/`
    let d = { name, phone, email, message }

    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(d).toString(),
        })
        let result = await response.json()

        if (result.status === 'success') {
            alert(result.message)
            const contactForm = document.querySelector('#contact-form')
            if (contactForm) {
                contactForm.reset()
            }
        } else {
            alert(result.message)
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
    let url = `http://localhost/myserver/`
    let d = { action: 'get_services' }

    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(d).toString(),
        })
        let result = await response.json()

        if (result.status === 'success') {
            renderServices(result.services)
        } else {
            console.error('Ошибка:', result.message)
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
    let url = `http://localhost/myserver/`
    let d = { action: 'get_masters' }

    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(d).toString(),
        })
        let result = await response.json()

        if (result.status === 'success') {
            renderMasters(result.masters)
        } else {
            console.error('Ошибка:', result.message)
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
    let url = `http://localhost/myserver/`
    let d = { action: 'get_appointment_services' }

    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(d).toString(),
        })
        let result = await response.json()

        if (result.status === 'success') {
            fillServiceSelect(result.services)
        } else {
            console.error('Ошибка:', result.message)
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
    let url = `http://localhost/myserver/`
    let d = { action: 'get_appointment_masters' }

    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(d).toString(),
        })
        let result = await response.json()

        if (result.status === 'success') {
            fillMasterSelect(result.masters)
        } else {
            console.error('Ошибка:', result.message)
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
    let url = `http://localhost/myserver/`
    let d = {
        action: 'submit_appointment',
        username,
        service_id,
        master_id,
        date,
        time,
        phone
    }

    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(d).toString(),
        })
        let result = await response.json()

        if (result.status === 'success') {
            alert(result.message)
            const appointmentForm = document.querySelector('#appointment-form')
            if (appointmentForm) {
                appointmentForm.reset()
            }
        } else {
            alert(result.message)
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

// --- Простая валидация через validity API ---
function validateField(fieldId) {
    const field = document.querySelector('#' + fieldId)
    const errorDiv = document.querySelector('#' + fieldId + '-error')
    if (!field || !errorDiv) return true

    const value = field.value

    // Специальная проверка для имени (только русские буквы)
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

    // Специальная проверка для подтверждения пароля
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

    // Используем встроенную валидацию браузера
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

function get_data_form() {
    // --- Универсальная функция для навешивания обработчиков ---
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

    // --- Форма регистрации ---
    const regForm = document.querySelector('#registration-form')
    if (regForm) {
        attachValidationHandlers(['reg-name', 'reg-username', 'reg-email', 'reg-phone', 'reg-password', 'reg-password-confirm'])

        regForm.addEventListener('submit', function(event) {
            event.preventDefault()

            const fields = ['reg-name', 'reg-username', 'reg-email', 'reg-phone', 'reg-password', 'reg-password-confirm']
            let hasErrors = false

            fields.forEach(function(fieldId) {
                if (!validateField(fieldId)) {
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
                if (!validateField(fieldId)) {
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
                if (!validateField(fieldId)) {
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
                if (!validateField(fieldId)) {
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
// СЛАЙДЕР ДЛЯ ГАЛЕРЕИ
// ============================================
function initGallerySlider() {
    const galleryGrid = document.querySelector('.gallery-grid')
    if (!galleryGrid) return

    // Создаём обёртку слайдера
    const sliderWrapper = document.createElement('div')
    sliderWrapper.className = 'gallery-slider'
    galleryGrid.parentNode.insertBefore(sliderWrapper, galleryGrid)

    // Создаём контейнер для слайдов
    const slidesContainer = document.createElement('div')
    slidesContainer.className = 'gallery-slides'
    slidesContainer.appendChild(galleryGrid)

    // Создаём кнопки
    const prevBtn = document.createElement('button')
    prevBtn.className = 'gallery-btn prev'
    prevBtn.innerHTML = '&#10094;'
    prevBtn.setAttribute('aria-label', 'Предыдущее фото')

    const nextBtn = document.createElement('button')
    nextBtn.className = 'gallery-btn next'
    nextBtn.innerHTML = '&#10095;'
    nextBtn.setAttribute('aria-label', 'Следующее фото')

    sliderWrapper.appendChild(slidesContainer)
    sliderWrapper.appendChild(prevBtn)
    sliderWrapper.appendChild(nextBtn)

    const slides = document.querySelectorAll('.gallery-item')
    let currentIndex = 0

    function updateSlide() {
        slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length
        updateSlide()
    })

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length
        updateSlide()
    })

    // Стили
    galleryGrid.style.display = 'flex'
    galleryGrid.style.transition = 'transform 0.5s ease'
    galleryGrid.style.alignItems = 'center'
    slides.forEach(slide => {
        slide.style.minWidth = '100%'
        slide.style.boxSizing = 'border-box'
        slide.style.display = 'flex'
        slide.style.alignItems = 'center'
        slide.style.justifyContent = 'center'
        slide.style.padding = '20px'
    })
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

        // Закрытие меню при клике вне его
        document.addEventListener('click', function(e) {
            if (!headerMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active')
                headerMenu.classList.remove('active')
            }
        })

        // Закрытие меню при клике на ссылку
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
// ЗАГРУЗКА СТРАНИЦЫ
// Вызывается когда страница готова
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    get_data_form()           // Обработчики форм
    updateAuthButtons()       // Обновление кнопок
    fetchServices()           // Загрузка услуг
    fetchMasters()            // Загрузка мастеров
    initAppointmentForm()     // Загрузка для формы записи
    initGallerySlider()       // Инициализация слайдера галереи
    initHeaderMenu()          // Выпадающее меню
})
