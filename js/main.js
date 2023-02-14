//elements
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const scoreText = document.getElementById("score");
const startGameButton = document.getElementById("startGame");
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
const enterButton = document.getElementById("enter");
const canvasContainer = document.getElementById("canvasContainer");

//variables
const song = new Audio("./Granvals.mp3");
song.addEventListener("ended",()=>{
    song.play();
});
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
let snakeHighScoreEasy = 0
let snakeHighScoreNormal = 0
let snakeHighScoreHard = 0
let snakeHighScoreImpossible = 0
let snakeHighScore = 0



class SnakePart{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

function getHighScore(){

    if(!localStorage.getItem("snakeHighScoreEasy")){
        snakeHighScoreEasy = 0;
        if(score > snakeHighScoreEasy && easy.classList.contains("selectedDifficulty")){
            snakeHighScoreEasy = score;
            localStorage.setItem("snakeHighScoreEasy",JSON.stringify(snakeHighScoreEasy));
            highScoreText.innerText = `Highscore: ${snakeHighScoreEasy}`;
        }
    }else{
        snakeHighScoreEasy = JSON.parse(localStorage.getItem("snakeHighScoreEasy"));
    }
    if(!localStorage.getItem("snakeHighScoreNormal")){
        snakeHighScoreNormal = 0;
        if(score > snakeHighScoreNormal && normal.classList.contains("selectedDifficulty")){
            snakeHighScoreNormal = score
            localStorage.setItem("snakeHighScoreNormal",JSON.stringify(snakeHighScoreNormal));
            highScoreText.innerText = `Highscore: ${snakeHighScoreNormal}`;
        }
    }else{
        snakeHighScoreNormal = JSON.parse(localStorage.getItem("snakeHighScoreNormal"));
    }
    if(!localStorage.getItem("snakeHighScoreHard")){
        snakeHighScoreHard = 0;
        if(score > snakeHighScoreHard && hard.classList.contains("selectedDifficulty")){
            snakeHighScoreHard = score;
            localStorage.setItem("snakeHighScoreHard",JSON.stringify(snakeHighScoreHard));
            highScoreText.innerText = `Highscore: ${snakeHighScoreHard}`;
        }
    }else{
        snakeHighScoreHard = JSON.parse(localStorage.getItem("snakeHighScoreHard"));
    }
    if(!localStorage.getItem("snakeHighScoreImpossible")){
        snakeHighScoreImpossible = 0;
        if(score > snakeHighScoreImpossible && impossible.classList.contains("selectedDifficulty")){
            snakeHighScoreImpossible = score;
            localStorage.setItem("snakeHighScoreImpossible",JSON.stringify(snakeHighScoreImpossible));
            highScoreText.innerText = `Highscore: ${snakeHighScoreImpossible}`;
        }
    }else{
        snakeHighScoreImpossible = JSON.parse(localStorage.getItem("snakeHighScoreImpossible"));
    }

    if(easy.classList.contains("selectedDifficulty")){
        highScoreText.innerText = `Highscore: ${snakeHighScoreEasy}`;
    }else if(normal.classList.contains("selectedDifficulty")){
        highScoreText.innerText = `Highscore: ${snakeHighScoreNormal}`;
    }else if(hard.classList.contains("selectedDifficulty")){
        highScoreText.innerText = `Highscore: ${snakeHighScoreHard}`;
    }else if(impossible.classList.contains("selectedDifficulty")){
        highScoreText.innerText = `Highscore: ${snakeHighScoreImpossible}`;
    }

}
getHighScore();

function keyDownMenu(e){
    //uparrow
    if(e.keyCode == 38 || e.keyCode == 87 || e == "up"){
        navigateUp();
    }
    //downarrow
    if(e.keyCode == 40 || e.keyCode == 83 || e == "down"){
        navigateDown();
    }
    //enter
    if(e.keyCode == 32){
        enterMenu();
    }
}

document.body.addEventListener("keydown",keyDownMenu);

function navigateUp(){
    if(impossible.classList.contains("selectedMenu")){
        impossible.classList.remove("selectedMenu");
        hard.classList.add("selectedMenu");
    }else
    if(hard.classList.contains("selectedMenu")){
        hard.classList.remove("selectedMenu");
        normal.classList.add("selectedMenu");
    }else
    if(normal.classList.contains("selectedMenu")){
        normal.classList.remove("selectedMenu");
        easy.classList.add("selectedMenu");
    }else
    if(easy.classList.contains("selectedMenu")){
        easy.classList.remove("selectedMenu");
        startGameButton.classList.add("selectedMenu");
    }
}

function navigateDown(){
    if(startGameButton.classList.contains("selectedMenu")){
        startGameButton.classList.remove("selectedMenu");
        easy.classList.add("selectedMenu");
    }else
    if(easy.classList.contains("selectedMenu")){
        easy.classList.remove("selectedMenu");
        normal.classList.add("selectedMenu");
    }else
    if(normal.classList.contains("selectedMenu")){
        normal.classList.remove("selectedMenu");
        hard.classList.add("selectedMenu");
    }else
    if(hard.classList.contains("selectedMenu")){
        hard.classList.remove("selectedMenu");
        impossible.classList.add("selectedMenu");
    }
}

upButton.addEventListener("click",navigateUp);
downButton.addEventListener("click",navigateDown);

enterButton.addEventListener("click",enterMenu);

function enterMenu(){
    if(startGameButton.classList.contains("selectedMenu")){
        startGame();
    }else
    if(easy.classList.contains("selectedMenu")){
        highScoreText.innerText = `Highscore: ${snakeHighScoreEasy}`;
        easy.classList.add("selectedDifficulty");
        normal.classList.remove("selectedDifficulty");
        hard.classList.remove("selectedDifficulty");
        impossible.classList.remove("selectedDifficulty");
    }else
    if(normal.classList.contains("selectedMenu")){
        highScoreText.innerText = `Highscore: ${snakeHighScoreNormal}`;
        easy.classList.remove("selectedDifficulty");
        normal.classList.add("selectedDifficulty");
        hard.classList.remove("selectedDifficulty");
        impossible.classList.remove("selectedDifficulty");
    } else
    if(hard.classList.contains("selectedMenu")){
        highScoreText.innerText = `Highscore: ${snakeHighScoreHard}`;
        easy.classList.remove("selectedDifficulty");
        normal.classList.remove("selectedDifficulty");
        hard.classList.add("selectedDifficulty");
        impossible.classList.remove("selectedDifficulty");
    } else
    if(impossible.classList.contains("selectedMenu")){
        highScoreText.innerText = `Highscore: ${snakeHighScoreImpossible}`;
        easy.classList.remove("selectedDifficulty");
        normal.classList.remove("selectedDifficulty");
        hard.classList.remove("selectedDifficulty");
        impossible.classList.add("selectedDifficulty");
    }
}


function startGame(){
    if(easy.classList.contains("selectedDifficulty")){speed=5;}
    if(normal.classList.contains("selectedDifficulty")){speed=10;}
    if(hard.classList.contains("selectedDifficulty")){speed=15;}
    if(impossible.classList.contains("selectedDifficulty")){speed=25;}
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
    canvasContainer.style.display = "flex";
    canvas.style.display ="inline-flex";
    enterButton.removeEventListener("click",enterMenu);
    document.body.removeEventListener("keydown",keyDownMenu);
    document.body.addEventListener('keydown',keyDownGame);

    upButton.addEventListener("click",()=>{
        keyDownGame("up");
    });
    downButton.addEventListener("click",()=>{
        keyDownGame("down");
    });
    leftButton.addEventListener("click",()=>{
        keyDownGame("left");
    });
    rightButton.addEventListener("click",()=>{
        keyDownGame("right");
    });


    drawGame();
}
startGameButton.addEventListener("click",startGame);

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

const scoreSound = new Audio("./score.mp3");

function changeSnakePosition(){
    headX += xVelocity;
    headY += yVelocity;
}
function clearScreen(){
    ctx.fillStyle ='#4e7d33';
    ctx.fillRect(0,0,canvas.width,canvas.height);
}


function generateNewApple(){
    appleX = Math.floor(Math.random()*tileCount);
    appleY = Math.floor(Math.random()*tileCount);

        for(let i = 0; i<snakeParts.length; i++){

            if(snakeParts[i].x == appleX && snakeParts[i].y == appleY){
                console.log("regenerated");
                generateNewApple();
            }
        }
}

function checkAppleCollision(){
    if(appleX === headX && appleY === headY){

        generateNewApple();
        tailLength++;
        score++;
        speed+=0.25;
        scoreSound.play();
    }
}

function drawApple(){
    ctx.fillStyle = '#15220e';
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
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
function drawScore(){
    scoreText.innerText = score;
}

function isGameOver(){
    let gameOver = false;

    if(yVelocity === 0 && xVelocity === 0){
        return false;
    }
    //walls
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
        //window.location = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
        getHighScore();
        gameOverText.style.opacity = 100;
        document.body.removeEventListener("keydown",keyDownGame);

        startGameButton.classList.add("selectedMenu")
        easy.classList.remove("selectedMenu")
        normal.classList.remove("selectedMenu")
        hard.classList.remove("selectedMenu")
        impossible.classList.remove("selectedMenu")


        upButton.removeEventListener("click",()=>{
            keyDownGame("up");
        });
        downButton.removeEventListener("click",()=>{
            keyDownGame("down");
        });
        leftButton.removeEventListener("click",()=>{
            keyDownGame("left");
        });
        rightButton.removeEventListener("click",()=>{
            keyDownGame("right");
        });

        enterButton.addEventListener("click",resetGame);
        document.body.addEventListener("keydown",(e)=>{
            if(e.code === "Space"){
                resetGame();
            }
        });
    }
    return gameOver;
}

function resetGame(){
    document.body.addEventListener("keydown",keyDownMenu);
    enterButton.addEventListener("click",enterMenu);
    enterButton.removeEventListener("click",resetGame);
    returnToMenu();
}


function returnToMenu(){
    
    canvas.style.display ="none";
    menu.style.display = "inline-flex";
    canvasContainer.style.display = "inline-flex"
    gameOverText.style.opacity = 0;
    document.body.removeEventListener("keydown",returnToMenu);
    enterButton.removeEventListener("click",returnToMenu);
    enterButton.addEventListener("click",enterMenu);
    
}

function keyDownGame(e){
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