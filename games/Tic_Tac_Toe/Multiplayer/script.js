window.addEventListener("DOMContentLoaded",()=>{

    let box=Array.from(document.querySelectorAll(".blk"));
    let announcement=document.querySelector('.announcement');
    let displayName=document.querySelector('.displayName');
    let reset=document.querySelector('.btn');
    let winning;

    let board = ["","","","","","","","",""];
    let currentPlayer='X';
    let isGameActive=true;

    const PLAYER_X_WON="PLAYER_X_WON";
    const PLAYER_O_WON="PLAYER_O_WON";

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

    let isAnyoneWon = ()=>{
        let roundWon=false;
        for(let i=0;i<=7;i++){
            let condition = winningConditiions[i];
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
        if(roundWon){
            announceWinner(currentPlayer==='X'?PLAYER_X_WON:PLAYER_O_WON)
            isGameActive=false;
        }
        else if(board.includes('')===false){
            announcement.classList.remove("hidden");
            announcement.classList.add("flex");
            announceWinner("TIE");
        }
    }

    let announceWinner= (type)=>{
        switch(type){
            case PLAYER_X_WON:
                announcement.innerHTML=`<p class="absolute text-4xl font-bold top-[150px] left-[50px]">Player <span class="text-green-500 playerX">X</span> Won</p>`;
                break;
            case PLAYER_O_WON:
                announcement.innerHTML=`<p class="absolute text-4xl font-bold top-[150px] left-[50px]">Player <span class="text-green-500 playerO">O</span> Won</p>`;
                break;
            case "TIE":
                announcement.innerHTML=`<p class="absolute text-4xl font-bold top-[150px] left-[50px] text-green-500">TIE</p>`;
                break;
        }
    }   


    let isBlockEmpty=(blk)=>{
        if(blk.innerText==="X" || blk.innerText==="O"){
            return false;
        }
        return true;
    }

    let changeBoard = (index)=>{
        board[index]=currentPlayer;
    }

    let changePlayer = ()=>{
        currentPlayer = displayName.innerText;
        currentPlayer = currentPlayer==="X" ? "O" : "X";
        displayName.innerText=currentPlayer;
    }

    let performAction = (blk,index)=>{
        if(isGameActive&&isBlockEmpty(blk)){
            // console.log(currentPlayer);
            blk.innerText=currentPlayer;
            changeBoard(index);
            isAnyoneWon();
            changePlayer();
        }
    }

    let resetBoard = ()=>{

        board = ["","","","","","","","",""];
        isGameActive=true;

        box.forEach((blk,index)=>{
            blk.innerText="";
        })
        if(currentPlayer==="O"){
            currentPlayer="X";
        }
        displayName.innerText=currentPlayer;
        announcement.children[0].remove();
        winning.forEach((val,idx)=>{
            let x=document.querySelector(`#box${val}`);
            console.log(x)
            x.classList.remove(`hello`);
            console.log(x);
        })
        announcement.classList.add("hidden");
        announcement.classList.remove("flex")


    }

    box.forEach((blk,index)=>{
        blk.addEventListener("click",()=>performAction(blk,index));
    });


    reset.addEventListener("click",()=>resetBoard());
})