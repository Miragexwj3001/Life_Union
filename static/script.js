// ========================= 封面 =========================
// 封装的轮播图控制器
class FengmianCarousel {
    constructor() {
        this.carousel = document.querySelector('.fengmian-carousel');
        this.init();
    }

    init() {
        this.inner = this.carousel.querySelector('.fengmian-carousel-inner');
        this.items = this.carousel.querySelectorAll('.fengmian-carousel-item');
        this.prevBtn = this.carousel.querySelector('.fengmian-carousel-prev');
        this.nextBtn = this.carousel.querySelector('.fengmian-carousel-next');
        this.indicators = this.carousel.querySelectorAll('.fengmian-indicator');

        this.currentIndex = 0;
        this.itemCount = this.items.length;
        this.interval = 2500; // 2.5秒自动切换
        this.intervalId = null;
        this.isAnimating = false;

        this.setupEvents();
        this.startAutoPlay();
    }

    updateCarousel() {
        this.isAnimating = true;
        this.inner.style.transform = `translateX(-${this.currentIndex * 100}%)`;

        // 更新指示器状态
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });

        // 动画结束后重置标志
        this.inner.addEventListener('transitionend', () => {
            this.isAnimating = false;
        }, { once: true });
    }

    nextSlide() {
        if (this.isAnimating) return;
        this.currentIndex = (this.currentIndex + 1) % this.itemCount;
        this.updateCarousel();
    }

    prevSlide() {
        if (this.isAnimating) return;
        this.currentIndex = (this.currentIndex - 1 + this.itemCount) % this.itemCount;
        this.updateCarousel();
    }

    goToSlide(index) {
        if (this.isAnimating) return;
        this.currentIndex = index;
        this.updateCarousel();
    }

    startAutoPlay() {
        this.stopAutoPlay();
        this.intervalId = setInterval(() => this.nextSlide(), this.interval);
    }

    stopAutoPlay() {
        if (this.intervalId) clearInterval(this.intervalId);
    }

    setupEvents() {
        // 按钮控制
        this.prevBtn.addEventListener('click', () => {
            this.stopAutoPlay();
            this.prevSlide();
            this.startAutoPlay();
        });

        this.nextBtn.addEventListener('click', () => {
            this.stopAutoPlay();
            this.nextSlide();
            this.startAutoPlay();
        });

        // 指示器点击
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.stopAutoPlay();
                this.goToSlide(index);
                this.startAutoPlay();
            });
        });

        // 鼠标悬停暂停
        this.carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());

        // 触摸滑动支持
        let startX, moveX;
        this.carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            this.stopAutoPlay();
        }, { passive: true });

        this.carousel.addEventListener('touchmove', (e) => {
            moveX = e.touches[0].clientX;
        }, { passive: true });

        this.carousel.addEventListener('touchend', () => {
            if (startX - moveX > 50) this.nextSlide();
            else if (moveX - startX > 50) this.prevSlide();
            this.startAutoPlay();
        });
    }
}

// 初始化轮播图
document.addEventListener('DOMContentLoaded', () => {
    new FengmianCarousel();
});





// ========================= 调研 ==============================

document.addEventListener('DOMContentLoaded', function () {
    // 获取所有需要动画的元素
    const sections = document.querySelectorAll('.research-section');
    const cards = document.querySelectorAll('.research-card');

    // 检查元素是否进入视口的函数
    function checkScroll() {
        const triggerBottom = window.innerHeight / 5 * 4;

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;

            // 当板块顶部距离视口顶部400px时触发
            if (sectionTop < 400) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';

                // 触发卡片动画
                const sectionCards = section.querySelectorAll('.research-card');
                sectionCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateX(0)';
                    }, index * 200);
                });
            }
        });
    }

    // 初始化检查
    checkScroll();

    // 滚动时持续检查
    window.addEventListener('scroll', function () {
        // 重置所有卡片状态（为了重复触发动画）
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            if (rect.top > 500 || rect.bottom < 0) {
                card.style.opacity = '0';
                if (card.classList.contains('card-left')) {
                    card.style.transform = 'translateX(-100px)';
                } else {
                    card.style.transform = 'translateX(100px)';
                }
            }
        });

        checkScroll();
    });
});











// ============================ 支教 ==============================
// 轮播图功能实现
document.addEventListener('DOMContentLoaded', function () {
    // 初始化所有轮播图
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        const inner = carousel.querySelector('.carousel-inner');
        const items = carousel.querySelectorAll('.carousel-item');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        let currentIndex = 0;
        const itemCount = items.length;

        // 自动轮播
        let interval = setInterval(() => {
            nextSlide();
        }, 5000);

        // 鼠标悬停暂停
        carousel.addEventListener('mouseenter', () => {
            clearInterval(interval);
        });

        carousel.addEventListener('mouseleave', () => {
            interval = setInterval(() => {
                nextSlide();
            }, 5000);
        });

        // 下一张
        function nextSlide() {
            currentIndex = (currentIndex + 1) % itemCount;
            updateCarousel();
        }

        // 上一张
        function prevSlide() {
            currentIndex = (currentIndex - 1 + itemCount) % itemCount;
            updateCarousel();
        }

        // 更新轮播图位置
        function updateCarousel() {
            inner.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        // 按钮事件
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        // 触摸滑动支持
        let startX, moveX;
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        carousel.addEventListener('touchmove', (e) => {
            moveX = e.touches[0].clientX;
        });

        carousel.addEventListener('touchend', () => {
            if (startX - moveX > 50) {
                nextSlide();
            } else if (moveX - startX > 50) {
                prevSlide();
            }
        });
    });

    // 图片放大查看功能
    const zoomableImages = document.querySelectorAll('.zoomable');
    zoomableImages.forEach(img => {
        img.addEventListener('click', function () {
            // 创建放大视图
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(0,0,0,0.9)';
            overlay.style.display = 'flex';
            overlay.style.justifyContent = 'center';
            overlay.style.alignItems = 'center';
            overlay.style.zIndex = '1000';
            overlay.style.cursor = 'zoom-out';

            const enlargedImg = document.createElement('img');
            enlargedImg.src = this.src;
            enlargedImg.alt = this.alt;
            enlargedImg.style.maxWidth = '90%';
            enlargedImg.style.maxHeight = '90%';
            enlargedImg.style.objectFit = 'contain';

            overlay.appendChild(enlargedImg);
            document.body.appendChild(overlay);

            // 点击关闭
            overlay.addEventListener('click', function () {
                document.body.removeChild(overlay);
            });
        });
    });
});




// ============================ 关于我们 ===============================
// 下拉栏交互功能
document.querySelectorAll('.feeling-toggle').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.closest('.feeling-item');
        const isExpanded = button.getAttribute('aria-expanded') === 'true';

        // 切换状态
        button.setAttribute('aria-expanded', !isExpanded);
        item.classList.toggle('active');

        // 可选：关闭其他打开的条目
        document.querySelectorAll('.feeling-item').forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
                otherItem.querySelector('.feeling-toggle').setAttribute('aria-expanded', 'false');
            }
        });
    });
});