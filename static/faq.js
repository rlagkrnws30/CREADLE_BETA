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
searchBar.addEventListener('keyup',(e) => {
    console.log(e.target.value);
})

//open accordian
document.querySelectorAll('.question').forEach((question) =>
    question.addEventListener('click', ()=>{

    if(question.parentNode.classList.contains("active")) {
        question.parentNode.classList.toggle("active")
    }
    else {
        question.parentNode.classList.remove("active")
        question.parentNode.classList.add("active")
    }
}))

//faq category drop down
const selected = document.querySelector(".faq__category--text-selected")
const selectedText = document.querySelector(".faq__category--text-selected-text")
const dropDown = document.querySelector(".faq__category--dropdown")
const category = document.querySelectorAll(".faq__category--text")

selected.addEventListener("click", () => {
    dropDown.classList.toggle("new");
})

category.forEach( o => {
    o.addEventListener("click", ()=>{
        selectedText.innerHTML = o.querySelector("label").innerHTML;
        o.querySelector("label").classList.add("selected")
        dropDown.classList.remove("new")
    })
})

//선택 후 PC환경에서는



