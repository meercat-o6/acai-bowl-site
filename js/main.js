// Instagram Gallery Module
const InstagramGallery = {
    posts: [
        {
            image: "img/instagram/instagram-1.png",
            title: "Uber Eats始めました",
            description: "DAIKAKUMEIのアサイーボウルがUber Eatsで注文できるようになりました！",
            link: "https://www.instagram.com/p/DNZgWSapKyY/"
        },
        {
            image: "img/instagram/instagram-2.png",
            title: "新店舗OPENのお知らせ",
            description: "DAIKAKUMEIの新しい店舗がオープンしました！ぜひお立ち寄りください。",
            link: "https://www.instagram.com/p/DMkCBZJRoH0/"
        },
        {
            image: "img/instagram/instagram-3.png",
            title: "TOPPING無料キャンペーン開催中♪",
            description: "今ならトッピングが無料！この機会にぜひお試しください。詳しくはインスタをチェック！",
            link: "https://www.instagram.com/p/DLot5aXx000/"
        },
        {
            image: "img/instagram/instagram-4.png",
            title: "お手頃価格でアサイーボウルが楽しめます♪",
            description: "DAIKAKUMEIのアサイーボウルは手頃な価格で楽しめます！この機会にぜひお試しください。",
            link: "https://www.instagram.com/p/DLeEGxsJ4Tm/"
        },
        {
            image: "img/instagram/instagram-5.png",
            title: "DAIKAKUMEI ACAI BOWL専門店OPEN！",
            description: "新鮮なアサイーを使用した本格的なアサイーボウルをお手頃価格で提供します。ぜひお越しください！",
            link: "https://www.instagram.com/p/DK_zN3ZpslV/"
        }
    ],

    init() {
        this.renderPosts();
    },

    renderPosts() {
        const gallery = $("#instagramGallery");
        const postsHtml = this.posts.map((post, index) => `
            <div class="item">
                <div class="insta-card">
                    <div class="instagram-post">
                        <img src="${post.image}" alt="${post.title}" class="post-image" />
                        <div class="post-overlay">
                            <div class="post-description">
                                <h3>${post.title}</h3>
                                <p>${post.description}</p>
                            </div>
                            <a href="${post.link}" target="_blank" class="instagram-link">
                                <span class="more-view-text">投稿を見る</span>
                                <span class="arrow">></span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
        
        gallery.html(postsHtml);
    }
};

// Menu Carousel Module
const MenuCarousel = {
    current: 0,
    total: 0,
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    
    init() {
        this.total = $(".menu-item").length;
        this.setupBackgroundImages();
        this.bindEvents();
        this.updateCounter();
        
        // Re-setup images on window resize
        $(window).on("resize", () => {
            this.setupBackgroundImages();
        });
    },
    
    setupBackgroundImages() {
        $(".menu-item__image").each(function () {
            const bg = $(this).attr("data-bg");
            if (bg) {
                console.log("Setting background image:", bg);
                $(this).css({
                    "background-image": `url('${bg}')`,
                    "background-size": "contain",
                    "background-position": "center",
                    "background-repeat": "no-repeat"
                });
            } else {
                console.log("No data-bg attribute found");
            }
        });
    },
    
    bindEvents() {
        // Desktop navigation
        $("#menuMoveRight").on("click", () => this.next());
        $("#menuMoveLeft").on("click", () => this.prev());
        
        // Touch events for mobile
        const menuContent = $(".menu-content");
        
        menuContent.on("touchstart", (e) => {
            this.startX = e.originalEvent.touches[0].clientX;
            this.startY = e.originalEvent.touches[0].clientY;
        });
        
        menuContent.on("touchend", (e) => {
            this.endX = e.originalEvent.changedTouches[0].clientX;
            this.endY = e.originalEvent.changedTouches[0].clientY;
            this.handleSwipe();
        });
        
        // Mouse events for desktop (optional)
        menuContent.on("mousedown", (e) => {
            this.startX = e.clientX;
            this.startY = e.clientY;
        });
        
        menuContent.on("mouseup", (e) => {
            this.endX = e.clientX;
            this.endY = e.clientY;
            this.handleSwipe();
        });
    },
    
    handleSwipe() {
        const deltaX = this.endX - this.startX;
        const deltaY = this.endY - this.startY;
        const minSwipeDistance = 50;
        
        // Check if it's a horizontal swipe (not vertical scroll)
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
            if (deltaX > 0) {
                // Swipe right - go to previous
                this.prev();
            } else {
                // Swipe left - go to next
                this.next();
            }
        }
    },
    
    next() {
        this.current = (this.current + 1) % this.total;
        this.updateSlide();
    },
    
    prev() {
        this.current = this.current === 0 ? this.total - 1 : this.current - 1;
        this.updateSlide();
    },
    
    updateSlide() {
        $(".menu-item").removeClass("active");
        $(".menu-item").eq(this.current).addClass("active");
        this.updateCounter();
    },
    
    updateCounter() {
        $("#menuCurrentPage").text(this.current + 1);
    }
};

// Hamburger Menu Module
const HamburgerMenu = {
    init() {
        this.bindEvents();
    },
    
    bindEvents() {
        const hamburger = $("#hamburgerMenu");
        const navMenu = $("#navMenu");
        
        hamburger.on("click", () => {
            hamburger.toggleClass("active");
            navMenu.toggleClass("active");
        });
        
        // Close menu when clicking on a link
        navMenu.find("a").on("click", () => {
            hamburger.removeClass("active");
            navMenu.removeClass("active");
        });
        
        // Close menu when clicking outside
        $(document).on("click", (e) => {
            if (!$(e.target).closest("nav").length) {
                hamburger.removeClass("active");
                navMenu.removeClass("active");
            }
        });
    }
};

// AOS Animation Module
const AOSAnimation = {
    init() {
        if (window.AOS) {
            AOS.init({
                once: true,
                duration: 700,
                easing: "ease-out-cubic",
                offset: 60,
            });
        }
    }
};

// Main Application
$(function () {
    InstagramGallery.init();
    MenuCarousel.init();
    HamburgerMenu.init();
    AOSAnimation.init();
});