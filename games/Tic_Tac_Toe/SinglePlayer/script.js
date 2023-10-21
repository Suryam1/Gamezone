window.addEventListener("DOMContentLoaded",()=>{

    let tiles=Array.from(document.querySelectorAll(".blk"));
    let announcement=document.querySelector(".announcement");
    let xSelect=document.querySelector(".xSelect");
    let oSelect=document.querySelector(".oSelect");
    let selectScreen=document.querySelector('.selectScreen');
    let board = ['','','','','','','','',''];
    let winning;
    let counter=0;
    let reset=document.querySelector(".btn");
    let winningConditiions=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    let userPlayer="";
    let computerPlayer="";
    let isGameActive=true;

    let setValues = (val)=>{
        userPlayer=val;
        computerPlayer=userPlayer==="X"?"O":"X";
        selectScreen.classList.add("hidden");
    }

    let checkTiles = (tile) => {
        if(tile.innerText==="O"||tile.innerText==="X"){
            return false;
        }
        return true;
    }

    let changeBoard = (index)=>{
        board[index]=userPlayer;
    }

    let isAnyoneWon = () => {
        counter++;
        let roundWon = false;
        for(let i=0;i<=7;i++){
            let condition=winningConditiions[i];
            const a=board[condition[0]];
            const b=board[condition[1]];
            const c=board[condition[2]];
            if(a===''||b===''||c===''){
                continue;
            }
            else if(a===b&&b===c){
                winning=condition;
                roundWon=true;
                condition.forEach((val,idx)=>{
                    let x=document.querySelector(`#box${val}`);
                    console.log(x)
                    x.classList.add(`hello`);
                    console.log(x);
                })
                announcement.classList.remove("hidden");
                announcement.classList.add("flex")
                break;
            }
        }
        console.log(board);
        console.log(counter);
        if(roundWon&&counter%2==1){
            isGameActive=false;
            announceWinner("YOU WON");
            return false;
        }
        else if(roundWon&&counter%2==0){
            isGameActive=false;
            announceWinner("COMPUTER WON");
        }
        else if(board.includes('')===false){
            announcement.classList.remove("hidden");
            announcement.classList.add("flex");
            announceWinner("TIE");
            return false;
        }
        return true;
    }

    let announceWinner = (type)=>{
        switch(type){
            case "YOU WON":
                announcement.innerHTML=`<p class="absolute text-4xl font-bold top-[150px] left-[50px] text-green-500">${type}</p>`;
                break;
            case "COMPUTER WON":
                announcement.innerHTML=`<p class="absolute text-4xl font-bold top-[150px] left-[50px] text-green-500">${type}</p>`;
                break;
            case "TIE":
                announcement.innerHTML=`<p class="absolute text-4xl font-bold top-[150px] left-[50px] text-green-500">${type}</p>`;
                break;
        }
    }

    let getRandomNumber = ()=>{
        return Math.floor(Math.random() * 9);
    }

    let checkBoard = (index)=>{
        if(board[index]===''){
            return true;
        }
    }

    let computerPlayerBoard = () =>{
        let randomNumber;
        while(true){
            randomNumber = getRandomNumber();
            if(checkBoard(randomNumber)){
                break;
            }
        }
        tiles[randomNumber].innerText=computerPlayer;
        board[randomNumber]=computerPlayer;
        isAnyoneWon();
    }

    let userAction = (tile,index)=>{
        if(isGameActive&&checkTiles(tile)){
            tile.innerText=userPlayer;
            changeBoard(index);
            if(isAnyoneWon()){
                computerPlayerBoard();
            }
        }
    }


    let resetBoard = ()=>{
        board = ["","","","","","","","",""];
        isGameActive=true;
        tiles.forEach((tile,index)=>{
            tile.innerText="";
        })
        userPlayer="";
        computerPlayer="";
        if(announcement.children[0].innerText!=="TIE"){
            winning.forEach((val,idx)=>{
                let x=document.querySelector(`#box${val}`);
                console.log(x)
                x.classList.remove(`hello`);
                console.log(x);
            })
        }
        announcement.children[0].remove();
        announcement.classList.add("hidden");
        announcement.classList.remove("flex");
        selectScreen.classList.remove("hidden");
        counter=0;
    }

    tiles.forEach((tile,index)=>{
        tile.addEventListener("click",()=>userAction(tile,index));
    })
    xSelect.addEventListener("click",()=>setValues("X"));
    oSelect.addEventListener("click",()=>setValues("O"));

    reset.addEventListener("click",()=>resetBoard());
});