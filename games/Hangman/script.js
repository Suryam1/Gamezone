//Fields Selection

let newGameButton=document.querySelector(".newGameButton");
let newgameWindow=document.querySelector(".newgameWindow");
let announcement=document.querySelector(".announcement");
let originalWord=document.querySelector(".originalWord");
let inputAreaDiv=document.querySelector(".inputAreaDiv");
let choiceButton=Array.from(document.querySelectorAll(".choiceButton"));
let canvas=document.querySelector(".canvas");
let user_input_area=document.querySelector(".user_input_area");
let boards=Array.from(document.querySelectorAll(".boards"));
let keyboardDiv=document.querySelector(".generateKeyboard");

//Variables decleration
let chosenWord="";
let isGame=true;
let count=0;
let attempts=0;
let dashes;
let charArray;

//Options for each category
let options = {
    Fruits: [
      "Apple",
      "Blueberry",
      "Mandarin",
      "Pineapple",
      "Pomegranate",
      "Watermelon",
    ],
    Animals: ["Hedgehog", "Rhinoceros", "Squirrel", "Panther", "Walrus", "Zebra"],
    Countries: [
      "India",
      "Hungary",
      "Kyrgyzstan",
      "Switzerland",
      "Zimbabwe",
      "Dominica",
    ],
    Languages: ["English", "Mandarin", "Hindi", "Spanish", "French", "Arabic", "Bengali", "Russian", "Portuguese", "Indonesian"],
  
    Colors: ["Red", "Blue", "Green", "White", "Black", "Violet", "Brown", "Grey", "Pink"],
    Sports: ["Football", "Badminton", "Cricket", "Hockey", "Tennis", "Baseball", "Golf"],
    Body: ["Eyes", "Ears", "Neck", "Hands", "Legs", "Nose", "Brain"],
    Days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
};

//Geeting random words from choose category
let getRandomElementFromArray=(choiceArray)=>{
    let randomIndex = Math.floor(Math.random() * choiceArray.length);
    return choiceArray[randomIndex];
}


let performAction = () =>{
    let len=chosenWord.length;
    for(let i=0;i<len;i++){
        user_input_area.innerHTML=user_input_area.innerHTML+`<span class="dashes text-2xl font-bold px-2">___</span>`;
    }
    dashes=Array.from(document.querySelectorAll(".dashes"));
}

const drawMan = (count) => {
    let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
    switch (count) {
      case 1:
        head();
        break;
      case 2:
        body();
        break;
      case 3:
        leftArm();
        break;
      case 4:
        rightArm();
        break;
      case 5:
        leftLeg();
        break;
      case 6:
        rightLeg();
        break;
      default:
        break;
    }
  };

let announcementFunction = (type)=>{
    newgameWindow.classList.remove("hidden");
    switch (type){
        case "WIN":
            announcement.innerHTML=`<p class="text-3xl greenDiv">YOU WIN</p>`
            break;
        case "LOSE":
            announcement.innerHTML=`<p class="text-3xl redDiv">YOU LOSE</p>`
            break;
    }
    originalWord.innerHTML=`<p class="text-3xl">The given word is <span class="font-bold">${chosenWord}</span></p>`
}

let insertValues = (board) => {
    board.disabled=true;
    board.classList.add("divOpacity");
    if(charArray.includes(board.innerText)){
        console.log("Yes?");
        charArray.forEach((char,index)=>{
            if(char===board.innerText){
                console.log("Yes?");
                dashes[index].innerText=char;
                count++;
                if(count===chosenWord.length){
                    console.log("You win");
                    announcementFunction("WIN")
                }
            }
        })
    }
    else{
        attempts++;
        drawMan(attempts);
        if(attempts==6){
            announcementFunction("LOSE");
        }
    }
}

  
let initialization = (choice,value) => {
    if(isGame){
        console.log("Hiiiiiii")
        inputAreaDiv.classList.remove("hidden");
        inputAreaDiv.classList.add("flex");
        choiceButton.forEach((choice)=>{
            choice.classList.add("divOpacity");
            choice.disabled=true;
        })
        let choiceArray=options[value];
        chosenWord=getRandomElementFromArray(choiceArray);
        chosenWord=chosenWord.toUpperCase();
        console.log(chosenWord);
        charArray=chosenWord.split("");
        console.log(charArray)
        performAction();
        isGame=false;
    }

}


const canvasCreator = () => {
    let context = canvas.getContext("2d");
    context.beginPath();
    context.strokeStyle = "#000";
    context.lineWidth = 2;

    //For drawing lines
    const drawLine = (fromX, fromY, toX, toY) => {
      context.moveTo(fromX, fromY);
      context.lineTo(toX, toY);
      context.stroke();
    };
  
    const head = () => {
      context.beginPath();
      context.arc(70, 30, 10, 0, Math.PI * 2, true);
      context.stroke();
    };
  
    const body = () => {
      drawLine(70, 40, 70, 80);
    };
    
    const leftArm = () => {
      drawLine(70, 50, 50, 70);
    };
  
    const rightArm = () => {
      drawLine(70, 50, 90, 70);
    };
  
    const leftLeg = () => {
      drawLine(70, 80, 50, 110);
    };
  
    const rightLeg = () => {
        drawLine(70, 80, 90, 110);
    };
  
    //initial frame
    const initialDrawing = () => {
        //clear canvas
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      //bottom line
      drawLine(10, 130, 130, 130);
      //left line
      drawLine(10, 10, 10, 131);
      //top line
      drawLine(10, 10, 70, 10);
      //small top line
      drawLine(70, 10, 70, 20);
    };
  
    return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
  };
  
  let startGame = () =>{
    newgameWindow.classList.add("hidden");
      choiceButton.forEach((choice,index)=>{
          choice.addEventListener("click",()=>initialization(choice,choice.value));
      })
      //Call to canvasCreator (for clearing previous canvas and creating initial canvas)
    let { initialDrawing } = canvasCreator();
    //initialDrawing would draw the frame
    initialDrawing();
  }
  
  
  let startResetGame = ()=>{
    isGame=true;
    count=0;
    attempts=0;
    chosenWord="";
    newgameWindow.classList.add("hidden");
    if(inputAreaDiv.classList.contains("hidden")===false){
        inputAreaDiv.classList.add("hidden");
    }
    while(user_input_area.children.length>0){
        user_input_area.children[0].remove();
    }
    boards.forEach((board)=>{
        if(board.classList.contains("divOpacity")){
            board.classList.remove("divOpacity");
            board.disabled=false;
        }
    })
    choiceButton.forEach((choice,index)=>{
        if(choice.classList.contains("divOpacity")){
            choice.classList.remove("divOpacity");
            choice.disabled=false;
        }
        choice.addEventListener("click",()=>initialization(choice,choice.value));
    })
    let { initialDrawing } = canvasCreator();
    //initialDrawing would draw the frame
    initialDrawing();
  }
    window.onload=startGame();
