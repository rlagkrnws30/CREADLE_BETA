//Navbar toggle button for small screen
const navbarMenu = document.querySelector('.navbar__menu');
const navbarToggleBtn = document.querySelector('.navbar__toggle--btn');
const navbarToggleCancleBtn = document.querySelector('.navbar__toggle--cancle--btn');
const body = document.querySelector('body')

navbarToggleBtn.addEventListener('click', () => {
    navbarMenu.classList.add("active");
    navbarToggleBtn.classList.add("hide")
    body.classList.add("disabledScroll")
})

navbarToggleCancleBtn.onclick = () => {
    navbarMenu.classList.remove("active")
    navbarToggleBtn.classList.remove("hide")
    body.classList.remove("disabledScroll")
}

//faq search function
const searchBar = document.getElementById('searchBar')
console.log(searchBar)
searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value;
    const qa = document.getElementsByClassName('question__answer--accordian')
    console.log(qa)
    for (i=0 ; i<qa.length; i++){
        const title = qa[i].childNodes[1].textContent
        if(title.toLowerCase().indexOf(searchString) != -1){
            qa[i].style.display = 'block'
        }else{
            qa[i].style.display = 'none'
        }
        console.log(title)
    }
})

//open accordian
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

//faq category drop down
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
for(let i=0; i<category.length; i++){
    category[i].addEventListener('click',
        filterPost.bind(this, category[i]));
}

function filterPost(item){
    for(let i=0; i<category.length; i++){
        category[i].classList.remove('selected')
    }
    item.classList.add('selected')
}

//faq category filter
const QAs = document.querySelector('#accordian__question')
const QA = document.querySelectorAll('.question__answer--accordian')


dropDown.addEventListener('click', (e) => {
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if(filter == null){
        return;
    }
    console.log(filter)
    QA.forEach((qa)=>{
        console.log(qa.dataset.type)
        if(filter ==='*' || filter === qa.dataset.type){
            qa.classList.remove('invisible');
            qa.style.display = 'block'
        }else{
            qa.classList.add('invisible');
            qa.style.display = 'none'
        }
    });
});



