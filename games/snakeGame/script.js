const playBoard = document.querySelector(".playBoard");
const scoreBoard=document.querySelector(".scoreBoard");
const highScoreBoard=document.querySelector(".highScoreBoard");
const controls = document.querySelectorAll(".controls i");

let gameOver = false;
let foodX, foodY;
let snakeX=5,snakeY=10;
let snakeFullBody=[];
let xSpeed=0,ySpeed=0;
let setIntervalId;
let score=0;

let highestScore=localStorage.getItem("highScore") || 0;
highScoreBoard.innerText=`High Score : ${highestScore}`;

const changePostionFood = ()=>{
    foodX=Math.floor(Math.random()*30)+1;
    foodY=Math.floor(Math.random()*30)+1;
}

const onGameOver = ()=>{
    clearInterval(setIntervalId);
    alert("Game over Press Ok to replay..")
    location.reload();
}

const changeDirectionOfSnake = (e)=>{
    if(e.key==="ArrowUp" &&ySpeed!==1){
        xSpeed=0;
        ySpeed=-1;
    }
    else if(e.key==="ArrowDown"&&ySpeed!==-1){
        xSpeed=0;
        ySpeed=1;
    }
    else if(e.key==="ArrowLeft"&&xSpeed!==1){
        xSpeed=-1;
        ySpeed=0;
    }
    else if(e.key==="ArrowRight"&&xSpeed!==-1){
        xSpeed=1;
        ySpeed=0;
    }
}

controls.forEach(key =>{
    key.addEventListener("click",()=>changeDirectionOfSnake({key:key.dataset.key}))
})


const startGame = ()=>{

    if(gameOver){
        return onGameOver();
    }

    let snakeFoodHtml = `<div class="food" style="grid-area : ${foodY}/${foodX}"></div>`;

    if(snakeX===foodX && snakeY===foodY){
        changePostionFood();
        snakeFullBody.push([snakeX,snakeY]);
        score++;

        highestScore=score>=highestScore?score:highestScore;
        localStorage.setItem("highScore",highestScore);
        highScoreBoard.innerText=`High Score : ${highestScore}`;
        scoreBoard.innerText=`Score : ${score}`;
    }

    for (let i = snakeFullBody.length-1; i >0; i--){
        snakeFullBody[i]=snakeFullBody[i-1];
    }

    snakeFullBody[0]=[snakeX,snakeY];

    snakeX += xSpeed;
    snakeY += ySpeed;

    if(snakeX<=0 || snakeX>30 || snakeY<=0 || snakeY>30){
        gameOver=true;
    }

    for (let i = 0; i < snakeFullBody.length; i++) {
        snakeFoodHtml += `<div class="snakeHead" style="grid-area : ${snakeFullBody[i][1]}/${snakeFullBody[i][0]}"></div>`;
        if(i!==0 && snakeFullBody[0][1]===snakeFullBody[i][1] && snakeFullBody[0][0]===snakeFullBody[i][0]){
            gameOver=true;
        }
    }
    playBoard.innerHTML=snakeFoodHtml;
}
changePostionFood();
setIntervalId= setInterval(startGame,125);


document.addEventListener("keydown",changeDirectionOfSnake);