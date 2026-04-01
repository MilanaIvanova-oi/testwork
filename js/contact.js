// ============================================
// ОТПРАВКА СООБЩЕНИЯ (СВЯЗАТЬСЯ С НАМИ)
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
// ИНИЦИАЛИЗАЦИЯ ФОРМЫ КОНТАКТОВ
// ============================================
document.addEventListener('DOMContentLoaded', function() {
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
})
