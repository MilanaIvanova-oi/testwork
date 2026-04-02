// ============================================
// ОТПРАВКА ЗАПИСИ НА УСЛУГУ
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
// ПОЛУЧЕНИЕ УСЛУГ ДЛЯ ФОРМЫ ЗАПИСИ
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
// ============================================
function fillServiceSelect(services) {
    const select = document.querySelector('#service-select')
    if (!select) return

    select.innerHTML = '<option value="">Выберите услугу</option>'

    services.forEach(service => {
        const option = document.createElement('option')
        option.value = service.id
        option.textContent = `${service.title} — ${service.price} руб.`
        select.appendChild(option)
    })
}

// ============================================
// ПОЛУЧЕНИЕ МАСТЕРОВ ДЛЯ ФОРМЫ ЗАПИСИ
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
// ============================================
function fillMasterSelect(masters) {
    const select = document.querySelector('#master-select')
    if (!select) return

    select.innerHTML = '<option value="">Выберите мастера</option>'

    masters.forEach(master => {
        const option = document.createElement('option')
        option.value = master.id
        option.textContent = master.name
        select.appendChild(option)
    })
}

// ============================================
// ПРОВЕРКА ПЕРЕД ЗАПИСЬЮ
// ============================================
// function checkAppointmentAuth() {
//     if (!isLoggedIn()) {
//         alert('Для записи на услугу необходимо войти в систему или зарегистрироваться.')
//         window.location.href = 'login.html'
//         return false
//     }
//     return true
// }

// ============================================
// ИНИЦИАЛИЗАЦИЯ ФОРМЫ ЗАПИСИ
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Проверка авторизации
    // checkAppointmentAuth()

    // Загрузка данных для формы
    fetchAppointmentServices()
    fetchAppointmentMasters()

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
})
