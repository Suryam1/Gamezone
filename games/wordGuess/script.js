const inputs = document.querySelector(".inputs");
const resetGame = document.querySelector(".resetGame");
const hintField=document.querySelector(".hint span");
const typingInput = document.querySelector(".typing-input");
const wrongWords=document.querySelector(".wrongWords span");
const guessRemainingField = document.querySelector(".guessRemaining span");

let word;
let incorrectWords=[];
let corrects=[];
let maxGuesses;


const randomWordGenerator =()=>{
    let randomWordObject=wordList[Math.floor(Math.random()*wordList.length)];
    word=randomWordObject.word;
    let inputHtml="";
    maxGuesses=8;
    corrects=[];
    incorrectWords=[];
    hintField.innerText=randomWordObject.hint;
    guessRemainingField.innerText=maxGuesses;
    for (let i = 0; i < word.length; i++) {
        inputHtml +=`<input type="text" disabled class="letterInputs">`;
    }
    inputs.innerHTML=inputHtml;
}

const startGame = (e)=>{
    let key = e.target.value;
    if(key.match(/^[A-za-z]+$/) && !incorrectWords.includes(` ${key}`) && !corrects.includes(key)){
        if(word.includes(key)){
            for (let i = 0; i < word.length; i++) {
                  if(word[i]===key){
                    corrects.push(key);
                    inputs.querySelectorAll("input")[i].value=key;
                  }              
            }
        }
        else{
            maxGuesses--;
            incorrectWords.push(` ${key}`);
        }
        wrongWords.innerText=incorrectWords;
        guessRemainingField.innerText=maxGuesses;
    }
    typingInput.value="";

    setTimeout(()=>{
        if(corrects.length==word.length){
            alert(`Congratulations! You found the word ${word.toUpperCase()}`);
            randomWordGenerator();
        }
        else if(maxGuesses<1){
            alert("Game over! You don't have remaining guesses");
            for (let i = 0; i < word.length; i++) {
                  corrects.push(key);
                  inputs.querySelectorAll("input")[i].value=word[i];           
          }
        }
    })
}

randomWordGenerator();
resetGame.addEventListener("click",()=>randomWordGenerator());
typingInput.addEventListener("input",startGame);
inputs.addEventListener("click",()=>typingInput.focus());
document.addEventListener("keydown",()=>typingInput.focus())