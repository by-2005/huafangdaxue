// 插入导航栏和页脚
function insertNavbarAndFooter() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;
        })
        .catch(error => {
            console.error('加载导航栏时出错:', error);
        });

    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        })
        .catch(error => {
            console.error('加载页脚时出错:', error);
        });
}

// 平滑滚动
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 返回顶部按钮
function setupBackToTopButton() {
    const backToTopButton = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.remove('opacity-0', 'invisible');
            backToTopButton.classList.add('opacity-100', 'visible');
        } else {
            backToTopButton.classList.add('opacity-0', 'invisible');
            backToTopButton.classList.remove('opacity-100', 'visible');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 轮播图功能
function setupCarousel() {
    const carouselItems = document.querySelectorAll('.carousel-item');
    const carouselDots = document.querySelectorAll('.carousel-dot');
    const carouselControls = document.querySelectorAll('.carousel-control');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        carouselItems.forEach(item => {
            item.classList.add('opacity-0');
            item.classList.remove('opacity-100');
        });
        carouselDots.forEach(dot => {
            dot.classList.add('opacity-50');
            dot.classList.remove('opacity-100');
        });

        carouselItems[index].classList.add('opacity-100');
        carouselItems[index].classList.remove('opacity-0');
        carouselDots[index].classList.add('opacity-100');
        carouselDots[index].classList.remove('opacity-50');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % carouselItems.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + carouselItems.length) % carouselItems.length;
        showSlide(currentSlide);
    }

    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 3000);
    }

    carouselDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            clearInterval(slideInterval);
            startSlideInterval();
        });
    });

    carouselControls[0].addEventListener('click', () => {
        prevSlide();
        clearInterval(slideInterval);
        startSlideInterval();
    });

    carouselControls[1].addEventListener('click', () => {
        nextSlide();
        clearInterval(slideInterval);
        startSlideInterval();
    });

    // 初始化
    showSlide(currentSlide);
    startSlideInterval();
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    insertNavbarAndFooter();
    setupSmoothScroll();
    setupBackToTopButton();
    setupCarousel(); // 确保调用了轮播图函数
});

