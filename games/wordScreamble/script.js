const wordField = document.querySelector(".word");
const hintField = document.querySelector(".hint span");
const getNewWord = document.querySelector(".getNewWord");
const checkWord = document.querySelector(".checkWord");
const userInputField = document.querySelector(".userInputField");
const timerField = document.querySelector(".time span b");
let correctWord="";

let timer;

const startTimer = (maxTime)=>{
    clearInterval(timer);
    timer=setInterval(()=>{
        if(maxTime>0){
            maxTime--;
            return timerField.innerText=maxTime;
        }
        clearInterval(timer);
        alert(`Time off ${correctWord.toUpperCase()} is a correct word`);
        startGame();
    },1000);
}

const startGame = () => {
    startTimer(30)
    let randomWord = words[Math.floor(Math.random() * words.length)];

    let randomWordArray = randomWord.word.split("");

    for (let i = randomWordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [randomWordArray[i], randomWordArray[j]] = [randomWordArray[j], randomWordArray[i]];
    }

    wordField.innerText = randomWordArray.join('');
    correctWord=randomWord.word.toLowerCase();
    userInputField.setAttribute("maxlength",correctWord.length);
    hintField.innerText=randomWord.hint;
}
startGame();

const checkForWord = ()=>{
    let userWord=userInputField.value.toLocaleLowerCase();
    userInputField.value="";
    if(userWord===""){
        return alert("Please enter a word to check");
    }
    if(userWord===correctWord){
        alert(`Congratulations ${userWord.toUpperCase()} is a correct word`);
    }
    else{
        return alert(`Ooops ${userWord} is not the correct word`);
    }
    startGame();
}

getNewWord.addEventListener("click",()=>startGame());
checkWord.addEventListener("click",()=>checkForWord());
