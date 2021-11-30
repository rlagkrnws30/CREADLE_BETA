//Make navbar logo and color change on scroll position
const navbar = document.querySelector('#navbar')
const logo = document.querySelector('.navbar__logo')
// const navbarMenu = document.querySelector('.navbar__menu')
const navbarHeight = navbar.getBoundingClientRect().height;
const navbarWidth = navbar.getBoundingClientRect().width;

if (navbarWidth > 768) {
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

//faq search function
const searchBar = document.getElementById('searchBar')
const searchCancleBtn = document.querySelector('.searchBar__cancleBtn');
searchBar.addEventListener('keyup', (e) => {
    if (e.key == "Enter") {
        searchCancleBtn.style.display = 'block'
        const searchString = e.target.value;
        const reqexp = new RegExp("(" + searchString + ")", "gi")
        console.log(reqexp)
        const qa = document.getElementsByClassName('question__answer--accordian')
        for (i = 0; i < qa.length; i++) {

            const title = qa[i].childNodes[1].innerText
            var titleHtml = qa[i].childNodes[1].innerHTML
            var titleString = titleHtml.toString()

            const answer = qa[i].childNodes[3].innerText
            var answerHtml = qa[i].childNodes[3].innerHTML
            var answerString = answerHtml.toString()

            if (title.toLowerCase().indexOf(searchString) != -1) {
                qa[i].style.display = 'block'
                var tempText = titleString.replace(reqexp,
                    "<span class='faq__search--highlight'>" + searchString + "</span>")
                qa[i].childNodes[1].innerHTML = tempText
                var tempTextAnswer = answerString.replace(reqexp,
                    "<span class='faq__search--highlight'>" + searchString + "</span>")
                qa[i].childNodes[3].innerHTML = tempTextAnswer
            } else if (answer.toLowerCase().indexOf(searchString) != -1) {
                qa[i].style.display = 'block'
                var tempTextAnswer = answerString.replace(reqexp,
                    "<span class='faq__search--highlight'>" + searchString + "</span>")
                qa[i].childNodes[3].innerHTML = tempTextAnswer
            } else {
                qa[i].style.display = 'none'
            }
        }
        //전체 카테고리 박스 셀렉시키기
        category.forEach((ca) => {
            ca.classList.remove('selected')
            if (ca.dataset.filter === '*') {
                ca.classList.add('selected')
                selectedText.innerHTML = ca.innerHTML
            }
        })
    }
})
//cancle 버튼 클릭 시 입력 값 초기화 및 전체 Q&A 표시
searchCancleBtn.addEventListener('click', () => {
    const searchString = searchBar.value
    QA.forEach((qa) => {
        qa.style.display = 'block'
        var titleHtml = qa.childNodes[1].innerHTML
        var titleString = titleHtml.toString()
        const reqexp = new RegExp("(" + searchString + ")", "gi")
        var tempText = titleString.replace(reqexp,
            "<span class='faq__search--highlightNone'>" + searchString + "</span>")
        qa.childNodes[1].innerHTML = tempText

        var answerHtml = qa.childNodes[3].innerHTML
        var answerString = answerHtml.toString()
        var tempTextAnswer = answerString.replace(reqexp,
            "<span class='faq__search--highlightNone'>" + searchString + "</span>")
        qa.childNodes[3].innerHTML = tempTextAnswer
    })
    searchBar.value = null
    searchCancleBtn.style.display = 'none'
    //전체 카테고리 박스 셀렉시키기
    category.forEach((ca) => {
        ca.classList.remove('selected')
        if (ca.dataset.filter === '*') {
            ca.classList.add('selected')
            selectedText.innerHTML = ca.innerHTML
        }
    })
})

//open accordian Q&A
document.querySelectorAll('.question').forEach((question) =>
    question.addEventListener('click', () => {
        if (question.parentNode.classList.contains("active")) {
            question.parentNode.classList.toggle("active")
        } else {
            question.parentNode.classList.remove("active")
            question.parentNode.classList.add("active")
        }
    }))

const selected = document.querySelector(".faq__category--text-selected")
const selectedText = document.querySelector(".faq__category--text-selected-text")
const dropDown = document.querySelector(".faq__category--dropdown")
const category = document.querySelectorAll(".faq__category--text")

//faq category drop down when less than 768px
selected.addEventListener("click", () => {
    dropDown.classList.toggle("new");
})

category.forEach(o => {
    o.addEventListener("click", () => {
        selectedText.innerHTML = o.querySelector("label").innerHTML;
        o.querySelector("label").innerHTML = selectedText.innerHTML
        dropDown.classList.remove("new")
    })
})

//faq category box select
for (let i = 0; i < category.length; i++) {
    category[i].addEventListener('click',
        filterPost.bind(this, category[i]));
}

function filterPost(item) {
    for (let i = 0; i < category.length; i++) {
        category[i].classList.remove('selected')
    }
    item.classList.add('selected')
}

//faq category filter
const QAs = document.querySelector('#accordian__question')
const QA = document.querySelectorAll('.question__answer--accordian')


dropDown.addEventListener('click', (e) => {
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if (filter == null) {
        return;
    }
    console.log(filter)
    QA.forEach((qa) => {
        console.log(qa.dataset.type)
        if (filter === '*' || filter === qa.dataset.type) {
            qa.classList.remove('invisible');
            qa.style.display = 'block'
        } else {
            qa.classList.add('invisible');
            qa.style.display = 'none'
        }
    });
});

function relaod() {
    login.classList.remove('remove')
    navbarToggleBtn.classList.remove('hide')
    navbarToggleBtn.classList.add('active')
    window.location.reload()
}

//로그인,회원가입,admin 동적제어
const homeAuthPicture = document.querySelector('.navbar__auth--picture')
const homeAuth = document.querySelector('.navbar__auth')
const login = document.getElementById('#login')
const navbarToggleBtn = document.querySelector('.navbar__toggle--btn');
const navbarToggleCancleBtn = document.querySelector('.navbar__toggle--cancle--btn');
const body = document.querySelector('body')
const logout = document.getElementById('#logout1')
const mobileLogout = document.getElementById('#logout')
const mobileAuth = document.querySelector('.navbar__auth--mobile')
const manage = document.getElementById('#manage')
const mychannel = document.getElementById('#mychannel')


// homeAuth.classList.add('active')
//
// if (self.name != 'reload') {
//     self.name = 'reload';
//     self.location.reload();
// } else self.name = '';
//
// function auth() {
//     if (homeAuthPicture.height > 0) {
//         homeAuthPicture.classList.add('active')
//         login.classList.add('remove')
//     }
// }
//
// window.setTimeout(auth, 300)


navbarToggleBtn.classList.add("active")

if (window.innerWidth < 1200) {
    console.log('not yet')
    if (homeAuthPicture.height > 0) {
        console.log('yes')
        navbarToggleBtn.classList.remove("active")
        navbarToggleBtn.classList.add("hide")
        mobileAuth.classList.add("active")
    } else {
        navbarToggleBtn.classList.add("active")
    }
}

// window.setTimeout(auth, 1000)


navbarToggleBtn.addEventListener('click', () => {
    navbarMenu.classList.add("active");
    navbarToggleBtn.classList.remove("active")
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

//로그인 후 user_admin 버튼 클릭 시 드롭다운 메뉴 활성화
const homeMenu = document.querySelector('.navbar__auth--dropMenu')

function logOut() {
    $.ajax({
        type: "POST",
        url: "/faq",
        data: {
            'logout': 1
        },
        success: function (response) {
            if (response["result"] == "success") {
                window.location.reload()
            }
        }
    })
}


homeAuth.onclick = () => {
    if (window.innerWidth > 760) {
        if (homeMenu.classList.contains('active')) {
            homeMenu.classList.remove('active')
        } else {
            homeMenu.classList.add('active')
            logout.onclick = () => {
                logOut()
                window.setTimeout(relaod, 500)
            }
        }
    } else {
        homeAuth.classList.remove('active')
        navbarMenu.classList.add("active");
        navbarToggleBtn.classList.remove("active")
        navbarToggleBtn.classList.add("hide")
        body.classList.add("disabledScroll")
    }
}
//모바일 로그인 시 왼쪽 창에 표시
// const AuthMenuText = document.querySelector('.home__menu--1').innerHTML
// console.log(AuthMenuText)

// const src = jQuery('.home__auth--picture').attr("src");
// console.log(src)

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


