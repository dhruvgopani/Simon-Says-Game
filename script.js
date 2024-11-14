let gameSeq = [];
let userSeq = [];
let btns = ["red", "green", "blue", "yellow"];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");
let hs = document.getElementById("highscore");
let h1=document.querySelector("h1");

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("game started");
        started = true;
        h2.style.color = "black";
        h2.style.fontWeight = 900;
        h2.style.backgroundColor = "#E9EED9";
        document.querySelector("body").style.backgroundColor = "#E9EED9";
        h2.style.width = "120px";
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level : ${level}`;
    h2.style.height = "";
    //random button choose
    let randomIdx = Math.floor(Math.random() * 4);
    let randomColor = btns[randomIdx];
    let randomBtn = document.querySelector(`.${randomColor}`);
    // console.log(randomIdx);
    // console.log(randomColor);
    //     console.log(randomBtn);
    gameSeq.push(randomColor);
    console.log(gameSeq);
    gameFlash(randomBtn);
}

function checkAns(idx) {

    // console.log(level);
    // if(level>=pastScore){
    // }
    // console.log(level);
    // let idx = level - 1;
    if (userSeq[idx] == gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
        // console.log("same value");
    } else {
        updateHighScore(level);
        h2.innerHTML = `<b>Game Over !</b>   Your Score: <b>${level}</br></b>Press<i> Any Key</i> OR <i>Simon Says </i>To<b> ReStart</b>`;
        h2.style.backgroundColor = "rgb(255, 0, 0)";
        h2.style.height = "55px";
        h2.style.color = "white";
        h2.style.width = "430px";
        
        h2.style.fontWeight = 100;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "#E9EED9";
        }, 250);
        reset();
    }
}

function btnPress() {
    // console.log(this);
    let btn = this;
    // btnFlash(btn);
    userFlash(btn);
    userColor = btn.getAttribute("id");
    // console.log(userColor);
    userSeq.push(userColor);
    console.log(userSeq);
    checkAns(userSeq.length - 1);

}
let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    displayHighScore();
}

function updateHighScore(score) {
    let highScore = localStorage.getItem('highScore') || 0; // Get existing high score or set to 0

    if (score > highScore) {
        localStorage.setItem('highScore', score); // Update high score in local storage
        return true; // Indicate that a new high score was achieved
    }
    return false; // No new high score
}

function displayHighScore() {
    let highScore = localStorage.getItem('highScore') || 0;
    hs.innerHTML = `Highest Score : <b>${highScore}</b>`; // Assuming you have an element with id 'highScore'
}
displayHighScore();

h1.addEventListener("click", function () {
    if (started == false) {
        console.log("game started");
        started = true;
        h2.style.color = "black";
        h2.style.fontWeight = 900;
        h2.style.backgroundColor = "#E9EED9";
        document.querySelector("body").style.backgroundColor = "#E9EED9";
        h2.style.width = "120px";
        levelUp();
    }
});