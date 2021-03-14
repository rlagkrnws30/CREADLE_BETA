'use strict';

$('.slick').slick({
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    nextArrow: false,
    prevArrow: false,
    autoplay : false,
    autoplaySpeed : 1000,
    fade: true
});

//Make navbar logo and color change on scroll position
const navbar = document.querySelector('#navbar')
// const navbarMenu = document.querySelector('.navbar__menu')
const navbarHeight = navbar.getBoundingClientRect().height;
const navbarWidth = navbar.getBoundingClientRect().width;

if (navbarWidth > 768) {
    document.addEventListener('scroll', () => {
        // console.log(window.scrollY)
        // console.log(`navbarHeight : ${navbarHeight}`)
        if (window.scrollY > navbarHeight) {
            navbar.classList.add('navbar--dark');
            $("#navbar a img").attr("src", "../static/images/logo_blue_v1.png")
        } else {
            navbar.classList.remove('navbar--dark');
            $("#navbar a img").attr("src", "../static/images/logo_white_v1.png")
        }
    });
}

//Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
    const target = event.target;
    const link = target.dataset.link;
    if (link == null) {
        return;
    }
    scrollIntoView(link)
});

//Handle click on "자세히 보기" button on home
// const homeContactBtn = document.querySelector('.home__contact');
// homeContactBtn.addEventListener('click', () => {
//     scrollIntoView('#contact')
// })

function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: 'smooth'})
}

//Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle--btn');
const navbarToggleCancleBtn = document.querySelector('.navbar__toggle--cancle--btn');
const body = document.querySelector('body')

navbarToggleBtn.addEventListener('click', () => {
    navbarMenu.classList.add("active");
    navbarToggleBtn.classList.add("hide")
    body.classList.add("disabledScroll")
    // if (navbarMenu.classList.toggle('open')) {
    //     // navbar.classList.add('navbar--toggle')
    //     navbarMenu.classList.add("active");
    //     // $("#navbar a img").attr("src", "images/logo_Ver2.png")
    //     //햄버거 버튼 이미지 x   이미지로 수정
    // } else {
    //     // navbar.classList.remove('navbar--toggle')
    //     navbarMenu.classList.remove("active")
    //     // $("#navbar a img").attr("src", "images/logo_Ver1.png")
    // }
})

navbarToggleCancleBtn.onclick = () => {
    navbarMenu.classList.remove("active")
    navbarToggleBtn.classList.remove("hide")
    body.classList.remove("disabledScroll")
}


//show arrow up button when scrolling down
const home = document.querySelector('.home_container');
const homeHeight = home.getBoundingClientRect().height;
// console.log(homeHeight)
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
    if (window.scrollY > homeHeight / 2) {
        arrowUp.classList.add('visible');
    } else {
        arrowUp.classList.remove('visible')
    }
})

arrowUp.addEventListener('click', () => {
    scrollIntoView('.slick')
})




