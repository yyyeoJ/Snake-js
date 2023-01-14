const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const scoreText = document.getElementById("score");
const startGame = document.getElementById("startGame");
const menu = document.getElementById("menu");
const gameOverText = document.getElementById("gameOverText");
const easy = document.getElementById("easy");
const normal = document.getElementById("normal");
const hard = document.getElementById("hard");
const impossible = document.getElementById("impossible");
const highScoreText = document.getElementById("highScore");

const upButton = document.getElementById("up");
const downButton = document.getElementById("down");
const leftButton = document.getElementById("left");
const rightButton = document.getElementById("right");

let snakeHighScore = 0;

function getHighScore(){
    if(!localStorage.getItem("snakeHighScore")){
        let snakeHighScore = 0;
    }else{
        snakeHighScore = JSON.parse(localStorage.getItem("snakeHighScore"));
    }
    highScoreText.innerText = `Highscore: ${snakeHighScore}`;
}
const song = new Audio("./Granvals.mp3");
song.addEventListener("ended",()=>{
    song.play();
});

getHighScore();

let speed = 7;

let tileCount = 20;
let tileSize = 18;
let headX = 10;
let headY = 10;
let snakeParts = [];
let tailLength = 1;

let appleX = 5;
let appleY = 5;

let xVelocity =0;
let yVelocity =0;

let score = 0;

class SnakePart{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}


startGame.addEventListener("click",()=>{
    if(easy.classList.contains("selected")){speed=5;}
    if(normal.classList.contains("selected")){speed=10;}
    if(hard.classList.contains("selected")){speed=15;}
    if(impossible.classList.contains("selected")){speed=25;}
    song.play();


    score = 0;
    headX = 10;
    headY = 10;
    snakeParts = [];
    tailLength = 1;
    appleX = 5;
    appleY = 5;
    xVelocity = 0;
    yVelocity = 0;
    menu.style.display = "none";
    canvas.style.display ="inline-flex";
    document.body.addEventListener('keydown',keyDown);

    upButton.addEventListener("click",()=>{
        keyDown("up");
    });
    downButton.addEventListener("click",()=>{
        keyDown("down");
    });
    leftButton.addEventListener("click",()=>{
        keyDown("left");
    });
    rightButton.addEventListener("click",()=>{
        keyDown("right");
    });


    drawGame();
})

easy.addEventListener("click",()=>{
    easy.classList.add("selected");
    normal.classList.remove("selected");
    hard.classList.remove("selected");
    impossible.classList.remove("selected");
})

normal.addEventListener("click",()=>{
    easy.classList.remove("selected");
    normal.classList.add("selected");
    hard.classList.remove("selected");
    impossible.classList.remove("selected");
})
hard.addEventListener("click",()=>{
    easy.classList.remove("selected");
    normal.classList.remove("selected");
    hard.classList.add("selected");
    impossible.classList.remove("selected");
})
impossible.addEventListener("click",()=>{
    easy.classList.remove("selected");
    normal.classList.remove("selected");
    hard.classList.remove("selected");
    impossible.classList.add("selected");
})


const scoreSound = new Audio("./score.mp3");


function drawGame(){
    changeSnakePosition();
    let result = isGameOver();
    if(result){return;}

    clearScreen();
    checkAppleCollision();
    drawApple();
    drawSnake();
    drawScore();

    setTimeout(drawGame,1000/speed)
}

function clearScreen(){
    ctx.fillStyle ='#4e7d33';
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function drawSnake(){
    ctx.fillStyle = '##15220e';
    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }
    snakeParts.push(new SnakePart(headX, headY));
    while(snakeParts.length > tailLength){
        snakeParts.shift();
    }

    ctx.fillStyle = '##15220e';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
    ctx.fillStyle = '#4e7d33';
    ctx.fillRect(headX * tileCount +3.6, headY * tileCount+3.6, tileSize*0.6, tileSize*0.6);

}

function drawApple(){
    ctx.fillStyle = '#15220e';
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function changeSnakePosition(){
    headX += xVelocity;
    headY += yVelocity;
}

function checkAppleCollision(){
    if(appleX === headX && appleY === headY){

        appleX = Math.floor(Math.random()*tileCount);
        appleY = Math.floor(Math.random()*tileCount);
        let valid = false;
        do{
            for(let i = 0; i<snakeParts.length; i++){
                let contains = false;
                if(snakeParts[i].x == appleX && snakeParts[i].y == appleY){
                    appleX = Math.floor(Math.random()*tileCount);
                    appleY = Math.floor(Math.random()*tileCount);
                    contains = true;
                    console.log("regenerated")
                }
                if(!contains){valid = true;}
            }
        }while(!valid)

        tailLength++;
        score++;
        speed+=0.25;
        scoreSound.play();
    }
}

function drawScore(){
    scoreText.innerText = score;
}

function isGameOver(){
    let gameOver = false;

    if(yVelocity === 0 && xVelocity === 0){
        return false;
    }

    //walls
    /*
    if(headX < 0 || headX === tileCount || headY < 0 || headY === tileCount){
        gameOver = true;
    }
    */
    if(headX < 0){
        headX = tileCount-1;
    }
    if(headX > tileCount-1){
        headX = 0;
    }
    if(headY < 0){
        headY = tileCount-1;
    }
    if(headY > tileCount-1){
        headY = 0;
   }



    //tail
    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        if(part.x === headX && part.y === headY){
            gameOver = true;
            break;
        }
    }


    if(gameOver){

        window.location = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

        gameOverText.style.opacity = 100;
        document.body.removeEventListener("keydown",keyDown);

        upButton.removeEventListener("click",()=>{
            keyDown("up");
        });
        downButton.removeEventListener("click",()=>{
            keyDown("down");
        });
        leftButton.removeEventListener("click",()=>{
            keyDown("left");
        });
        rightButton.removeEventListener("click",()=>{
            keyDown("right");
        });

        if(score > snakeHighScore){
            snakeHighScore = score;
            localStorage.setItem("snakeHighScore",JSON.stringify(snakeHighScore));
            highScoreText.innerText = `Highscore: ${snakeHighScore}`;
        }

        document.body.addEventListener("keydown",(e)=>{
            if(e.keyCode == 32){
                returnToMenu();
            }
        });
    }
    return gameOver;
}

function returnToMenu(){
    
    canvas.style.display ="none";
    menu.style.display = "inline-flex";
    gameOverText.style.opacity = 0;
    document.body.removeEventListener("keydown",returnToMenu);
    
}

function keyDown(e){
    //uparrow
    if(e.keyCode == 38 || e.keyCode == 87 || e == "up"){
        if(yVelocity == 1){return;}
        yVelocity = -1;
        xVelocity = 0;
    }
    //downarrow
    if(e.keyCode == 40 || e.keyCode == 83 || e == "down"){
        if(yVelocity == -1){return;}
        yVelocity = 1;
        xVelocity = 0;
    }
    //leftarrow
    if(e.keyCode == 37 || e.keyCode == 65 || e =="left"){
        if(xVelocity == 1){return;}
        yVelocity = 0;
        xVelocity = -1;
    }
    //rightarrow
    if(e.keyCode == 39 || e.keyCode == 68 || e == "right"){
        if(xVelocity == -1){return;}
        yVelocity = 0;
        xVelocity = 1;
    }
}