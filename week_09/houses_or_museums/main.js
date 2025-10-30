console.log('this works')

const en_btn = document.querySelector(".en");
const pt_btn = document.querySelector(".pt");


const english_text = document.querySelector(".english");
const portugese_text = document.querySelector(".portuguese");

function translateToPortugese(){
    let h1=document.querySelector("h1");
    h1.textContent=("Casas ou Museus?");
    english_text.style.display="none";
    portugese_text.style.display="block";
}

function translateToEnglish(){
    let h1=document.querySelector("h1");
    h1.textContent=("Houses or Museums?");
    english_text.style.display="block";
    portugese_text.style.display="none";
}

en_btn.addEventListener('click',translateToEnglish);
pt_btn.addEventListener('click',translateToPortugese);

