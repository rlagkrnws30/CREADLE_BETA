'use strict';

$('.slick').slick({
    dots: true,
    infinite: true,
    speed: 1300,
    slidesToShow: 1,
    nextArrow: false,
    prevArrow: false,
    autoplay: true,
    autoplaySpeed: 2000,
    fade: true
});

function logOut() {
    $.ajax({
        type: "POST",
        url: "/",
        data: {
            'logout': 1,
            'signup': 0
        },
        success: function (response) {
            if (response["result"] == "success") {
                window.location.reload()
            }
        }
    })
}

function relaod() {
    login.classList.remove('remove')
    navbarToggleBtn.classList.remove('hide')
    navbarToggleBtn.classList.add('active')
    window.location.reload()
}

//Make navbar logo and color change on scroll position
const navbar = document.querySelector('#navbar')
const logo = document.querySelector('.navbar__logo')
// const navbarMenu = document.querySelector('.navbar__menu')
const navbarHeight = navbar.getBoundingClientRect().height;
const navbarWidth = navbar.getBoundingClientRect().width;

document.addEventListener('scroll', () => {
    // console.log(window.scrollY)
    // console.log(`navbarHeight : ${navbarHeight}`)
    if (window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
        logo.classList.add('active');
    } else {
        navbar.classList.remove('navbar--dark');
        logo.classList.remove('active');
    }
});


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
const homeAuthPicture = document.querySelector('.navbar__auth--picture')
// const mobileAuth = document.querySelector('.navbar__auth--mobile')
// const homeAuth = document.querySelector('.navbar__auth')
const logout = document.getElementById('#logout1')
const mobileLogout = document.getElementById('#logout')
const manage = document.getElementById('#manage')
const mychannel = document.getElementById('#mychannel')

navbarToggleBtn.addEventListener('click', () => {
    navbarMenu.classList.add("active");
    navbarToggleBtn.classList.remove("active")
    navbarToggleBtn.classList.add("hide")
    body.classList.add("disabledScroll")
})

navbarToggleCancleBtn.onclick = () => {
    navbarMenu.classList.remove("active")
    body.classList.remove("disabledScroll")
    // if (homeAuthPicture.height > 0) {
    //     homeAuth.classList.add('active')
    // } else {
    //     navbarToggleBtn.classList.remove("hide")
    //     navbarToggleBtn.classList.add("active")
    // }
    navbarToggleBtn.classList.remove("hide")
    navbarToggleBtn.classList.add("active")
}

function mobile() {
    if (homeAuthPicture.height > 0) {
        navbarToggleBtn.classList.remove("active")
        navbarToggleBtn.classList.add("hide")
        mobileAuth.classList.add("active")
    } else {
        navbarToggleBtn.classList.add("active")
    }
}

navbarToggleBtn.classList.add("active")

function refresh() {
    $.ajax({
        type: "POST",
        url: "/",
        data: {
            "refresh": 1
        },
        success: function (response) {
            if (response["result"] == "success") {
                window.location.reload()
            }
        }
    })
}

if (window.innerWidth < 1200) {
    console.log('not yet')
    // refresh()
    window.setTimeout(mobile, 500)

}


//show arrow up button when scrolling down
const home = document.querySelector('.home_container');
const homeHeight = home.getBoundingClientRect().height;
// console.log(homeHeight)
const arrowUp = document.querySelector('.arrow-up');
const buttonInvestor = document.querySelector('.home__button--investor')
const buttonInvestor2 = document.querySelector('.home__button--investor2')
const buttonInvestor3 = document.querySelector('.home__button--investor3')

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

//image active view
window.addEventListener('scroll', () => {
    let mainImage = document.querySelector('.IPO__iamge--content')
    let allocImage = document.querySelector('.IPO__iamge--content2')
    let transImage = document.querySelector('.IPO__iamge--content3')
    let mainImagePosition = mainImage.getBoundingClientRect().top;
    let allocImagePosition = allocImage.getBoundingClientRect().top;
    let transImagePosition = transImage.getBoundingClientRect().top;
    let screenPosition = window.innerHeight / 1.2;
    if (mainImagePosition < screenPosition) {
        mainImage.classList.add('active')
    } else {
        mainImage.classList.remove('active')
    }

    if (allocImagePosition < screenPosition) {
        allocImage.classList.add('active')
    } else {
        allocImage.classList.remove('active')
    }

    if (transImagePosition < screenPosition) {
        transImage.classList.add('active')
    } else {
        transImage.classList.remove('active')
    }

})

//로그인,회원가입,admin 동적제어
const login = document.getElementById('#login')
const signUp = document.getElementById('#signUp')

// homeAuth.classList.add('active')

if (self.name != 'reload') {
    self.name = 'reload';
    self.location.reload();
} else self.name = '';

function auth() {
    if (homeAuthPicture.height > 0) {
        homeAuthPicture.classList.add('active')
        login.classList.add('remove')
        buttonInvestor.classList.add('remove')
        buttonInvestor2.classList.add('remove')
        buttonInvestor3.classList.add('remove')
    }
}

window.setTimeout(auth, 300)

// //로그인 후 user_admin 버튼 클릭 시 드롭다운 메뉴 활성화
const homeMenu = document.querySelector('.navbar__auth--dropMenu')
//
homeAuth.onclick = () => {
    console.log('1st click')
    if (window.innerWidth > 760) {
        if (homeMenu.classList.contains('active')) {
            homeMenu.classList.remove('active')
        } else {
            console.log('2nd click')
            homeMenu.classList.add('active')
            logout.onclick = () => {
                console.log('logout')
                logOut()
                window.setTimeout(relaod, 500)
                buttonInvestor.classList.remove('remove')
                buttonInvestor2.classList.remove('remove')
                buttonInvestor3.classList.remove('remove')
            }
        }
    } else {
        console.log('error')
        homeAuth.classList.remove('active')
        navbarMenu.classList.add("active");
        navbarToggleBtn.classList.remove("active")
        navbarToggleBtn.classList.add("hide")
        body.classList.add("disabledScroll")
    }
}

mobileAuth.onclick = () => {
    navbarMenu.classList.add('active')
    body.classList.add("disabledScroll")
    homeAuth.classList.remove('active')
    manage.classList.remove('remove')
    mobileLogout.classList.remove('remove')
    mychannel.classList.remove('remove')
    mobileLogout.onclick = () => {
        logOut()
        window.setTimeout(relaod, 500)
    }
}


//모바일 로그인 시 왼쪽 창에 표시
const
MenuText = document.querySelector('.home__menu--1').innerHTML
console.log(AuthMenuText)

const src = jQuery('.home__auth--picture').attr("src");
console.log(src)

//singup 체크 박스
const allTrue = document.querySelector('.signup__all--true')
const check = document.querySelector('.signup__check')
// const selected = document.querySelector('.signup__select')
// allTrue.onclick = () => {
//
// }



