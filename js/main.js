// ============================================
// ПОЛУЧЕНИЕ УСЛУГ ИЗ БАЗЫ ДАННЫХ
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
// ============================================
function renderServices(services) {
    const container = document.querySelector('.services-grid')
    if (!container) return

    container.innerHTML = ''

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
// ============================================
function renderMasters(masters) {
    const container = document.querySelector('.masters-grid')
    if (!container) return

    container.innerHTML = ''

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
// СЛАЙДЕР ДЛЯ ГАЛЕРЕИ
// ============================================
function initGallerySlider() {
    const galleryGrid = document.querySelector('.gallery-grid')
    if (!galleryGrid) return

    const sliderWrapper = document.createElement('div')
    sliderWrapper.className = 'gallery-slider'
    galleryGrid.parentNode.insertBefore(sliderWrapper, galleryGrid)

    const slidesContainer = document.createElement('div')
    slidesContainer.className = 'gallery-slides'
    slidesContainer.appendChild(galleryGrid)

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
// ИНИЦИАЛИЗАЦИЯ СЛАЙДЕРА СО СКИДКАМИ
// ============================================
function initDiscountSlider() {
    const slider = document.querySelector('.discount-slider')
    if (!slider) return

    // CSS анимация делает всю работу - бесконечная плавная прокрутка
    // При наведении курсора анимация приостанавливается через :hover
}

// ============================================
// ИНИЦИАЛИЗАЦИЯ ГЛАВНОЙ СТРАНИЦЫ
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    fetchServices()
    fetchMasters()
    initGallerySlider()
    initDiscountSlider()
})
