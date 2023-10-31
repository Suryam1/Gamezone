const typingTextArea = document.querySelector(".typingText p");
const inputArea = document.querySelector(".inputArea");
const mistakesArea = document.querySelector(".mistakes span");
const timeArea = document.querySelector(".time span b");
const wpmArea = document.querySelector(".wpm span");
const cpmArea = document.querySelector(".cpm span");
const tryAgainButton=document.querySelector(".tryAgainButton");

let isTypingStarted=false;
let charIndex=0;
let mistakes=0;
let timer;
let maxTime = 60;
let timeLeft = maxTime;


let getRandomPragraph = ()=>{
    let getRandomIndex=Math.floor(Math.random()*paragraphs.length);
    typingTextArea.innerHTML="";
    paragraphs[getRandomIndex].split("").forEach(span =>{
        let spanElement= `<span>${span}</span>`;
        typingTextArea.innerHTML+=spanElement;
    })
    typingTextArea.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown",()=>inputArea.focus());
    typingTextArea.addEventListener("click",()=>inputArea.focus());
}

let initTimer = ()=>{
    if(timeLeft > 0){
        timeLeft--;
        timeArea.innerText=timeLeft;
    }
    else{
        clearInterval(timer);
        alert("Time Ups");
    }
}

let startGame = ()=>{
    const allCharacters=document.querySelectorAll("span");
    let typedCharacter = inputArea.value.split("")[charIndex];
    if(charIndex<allCharacters.length && timeLeft > 0){
        if(!isTypingStarted){
            timer = setInterval(initTimer,1000);
            isTypingStarted=true;
        }
        if(typedCharacter==null){
            charIndex--;
            if(allCharacters[charIndex].classList.contains("incorrect")){
                mistakes--;
            }
            allCharacters[charIndex].classList.remove("correct","incorrect");
        }
        else{
            if(allCharacters[charIndex].innerText===typedCharacter){
                allCharacters[charIndex].classList.add("correct");
            }
            else{
                allCharacters[charIndex].classList.add("incorrect");
                mistakes++;
            }
            charIndex++;
        }
        allCharacters.forEach(span=>{
            span.classList.remove("active");
        })
        allCharacters[charIndex].classList.add("active");
    
        let wpm=Math.round((((charIndex - mistakes)/5)/(maxTime - timeLeft))*60)
        wpm= wpm<0 || !wpm || wpm === Infinity ? 0 : wpm;
        mistakesArea.innerText=mistakes;
        wpmArea.innerText=wpm;
        cpmArea.innerText=charIndex-mistakes;
    }
    else{
        inputArea.value="";
        clearInterval(timer);
        alert("Time Ups")
    }
}

let resetGame = ()=>{
    console.log("Hello");
    getRandomPragraph();
    inputArea.value="";
    clearInterval(timer);
    timeLeft=maxTime;
    charIndex=0;
    mistakes=0;
    isTypingStarted=false;
    mistakesArea.innerText=0;
    wpmArea.innerText=0;
    cpmArea.innerText=0;
    timeArea.innerText=maxTime;
}

getRandomPragraph();
inputArea.addEventListener("input",()=>startGame());
tryAgainButton.addEventListener("click",()=>resetGame());