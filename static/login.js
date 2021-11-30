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
    if (homeAuthPicture.height > 0) {
        homeAuth.classList.add('active')
    } else {
        navbarToggleBtn.classList.remove("hide")
        navbarToggleBtn.classList.add("active")
    }
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
