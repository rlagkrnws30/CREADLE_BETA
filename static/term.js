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

//Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle--btn');
const navbarToggleCancleBtn = document.querySelector('.navbar__toggle--cancle--btn');
const body = document.querySelector('body')
const homeAuthPicture = document.querySelector('.navbar__auth--picture')
const mobileAuth = document.querySelector('.navbar__auth--mobile')
const homeAuth = document.querySelector('.navbar__auth')
const logout = document.getElementById('#logout1')
const mobileLogout = document.getElementById('#logout')
const manage = document.getElementById('#manage')
const mychannel = document.getElementById('#mychannel')
const navbarMenu = document.querySelector('.navbar__menu');

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


if (window.innerWidth < 1200) {
    console.log('not yet')
    // refresh()
    window.setTimeout(mobile, 500)

}

//show arrow up button when scrolling down
const home = document.querySelector('.home_container');
// console.log(homeHeight)
const arrowUp = document.querySelector('.arrow-up');
const buttonInvestor = document.querySelector('.home__button--investor')
const buttonInvestor2 = document.querySelector('.home__button--investor2')
const buttonInvestor3 = document.querySelector('.home__button--investor3')

//로그인,회원가입,admin 동적제어
const login = document.getElementById('#login')
const signUp = document.getElementById('#signUp')

// homeAuth.classList.add('active')

function auth() {
    if (homeAuthPicture.height > 0) {
        homeAuthPicture.classList.add('active')
        login.classList.add('remove')
        buttonInvestor.classList.add('remove')
        buttonInvestor2.classList.add('remove')
        buttonInvestor3.classList.add('remove')
    }
}

window.setTimeout(auth, 500)
if (self.name != 'reload') {
    self.name = 'reload';
    self.location.reload();
} else self.name = '';


//로그인 후 user_admin 버튼 클릭 시 드롭다운 메뉴 활성화
const homeMenu = document.querySelector('.navbar__auth--dropMenu')

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