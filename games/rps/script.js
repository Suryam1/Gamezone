let letsPlayButton = document.querySelector(".letsPlayButton");
let letsPlayDiv = document.querySelector(".letsPlayDiv");
let gameDiv = document.querySelector(".gameDiv");
let leftSide=document.querySelector(".leftSide");
let rightSide=document.querySelector(".rightSide");
let announcements = document.querySelector(".announcement");
let tieCounterDiv = document.querySelector(".tieCounterDiv");
let playerCounterDiv = document.querySelector(".playerCounterDiv");
let computerCounterDiv = document.querySelector(".computerCounterDiv");

let playerOption="";
let computerOption="";
let options=["Rock","Paper","Scissors"];
let playerCount=0;
let computerCount=0;
let tieCount=0;

let randomIndexGenerator = () => {
    let  randomIndex=Math.floor(Math.random()*3);
    return randomIndex;
}





let announcement = (type)=>{
    switch(type){
        case "Tie":
            announcements.innerHTML=`<p>It's a Tie</p>`;
            tieCount++;
            tieCounterDiv.innerText=tieCount;
            break;
        case "Player":
            announcements.innerHTML=`<p>Player Wins</p>`;
            playerCount++
            playerCounterDiv.innerText=playerCount;
            break;
        case "Computer":
            announcements.innerHTML=`<p>Computer Wins</p>`;
            computerCount++;
            computerCounterDiv.innerText=computerCount;
            break;
    }
}



let compareValues = ()=>{
    // console.log(playerOption);
    // console.log(computerOption);
    if(playerOption===computerOption){
        announcement("Tie");
    }
    else if(playerOption==="Rock"){
        if(computerOption==="Scissors"){
            announcement("Player");
        }
        else{
            announcement("Computer");
        }
    }
    else if(playerOption==="Paper"){
        if(computerOption==="Rock"){
            announcement("Player");
        }
        else{
            announcement("Computer");
        }
    }
    else if(playerOption==="Scissors"){
        if(computerOption==="Paper"){
            announcement("Player");
        }
        else{
            announcement("Computer");
        }
    }
}

let playGame = (button)=>{
    playerOption=button.innerText;
    
    let computerChoiceIndex=randomIndexGenerator();
    computerOption=options[computerChoiceIndex];

    leftSide.classList.add("playerAnimation");
    rightSide.classList.add("computerAnimation");

    setTimeout(() => {
        leftSide.classList.remove("playerAnimation");
        rightSide.classList.remove("computerAnimation");
        compareValues();
        leftSide.src=`./assets/${playerOption}.png`;
        rightSide.src=`./assets/${computerOption}.png`;
    }, 3000);

    
}


let startGame = ()=>{
    letsPlayDiv.classList.add("hidden");
    letsPlayDiv.classList.remove("flex");
    gameDiv.classList.remove("hidden");
    gameDiv.classList.add("flex");
}


window.onload = function(){
    letsPlayButton.addEventListener("click",()=>startGame());
}