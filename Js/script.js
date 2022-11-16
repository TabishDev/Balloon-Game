let colors = ['yellow','red','blue','violet','green']
let windowWidth = window.innerWidth;
let body = document.body;
let windowHeight = window.innerHeight;
let scores =document.querySelectorAll('.score')
let num = 0 ;
let total = 100;
let currentBalloon = 0;
let gameOver = false;
let totalShadow = document.querySelector('.total-shadow')
let startBtn = document.querySelector('.start-game')
function createBalloon(){
    let div = document.createElement('div');
    let rand = Math.floor(Math.random() * colors.length)
    div.className = 'balloon balloon-' + colors[rand]

rand = Math.floor(Math.random() * (windowWidth -100))
div.style.left = rand + 'px'
div.dataset.number = currentBalloon;
currentBalloon++

    body.appendChild(div)
    animateBalloon(div)
}

function animateBalloon(elem) {
    let pos = 0;
    let random = Math.floor(Math.random() * 6 - 3)
    let interval = setInterval(frame, 12 - Math.floor(num / 10) + random);   // this will help us to increase the difficulty as we get closer to the target to get integer number we have to add Math.floor function
    function frame() {
        // console.log(pos);
       if (pos >= (windowHeight + 200) && (document.querySelector('[data-number="'+elem.dataset.number+'"]') !==null)) {
         clearInterval(interval)
         gameOver = true
       }else{
        pos++;
        elem.style.top = windowHeight - pos + 'px'
       }
    }
}

function deleteBalloon (elem){
    elem.remove();
    num++;        
    updateScore();
    playBallSound();
}
function playBallSound() {
    let audio = document.createElement('audio')
    audio.src = 'sounds/pop.mp3'
    audio.play()
}

function updateScore(){
    for (let i = 0; i < scores.length; i++) {
        scores[i].textContent = num;
    }
}

function startGame (){
    restartGame();
    let timeout = 0;
    let loop = setInterval(function(){
        timeout = Math.floor(Math.random() * 600 - 100 )        //bcoz if we multiply the range from 0-1 by 600 we will get new range from 0 to 600  but we want the range from -100 to 500 to get it we rote -100  to get the number as an interger number we add math.floor() 
        if(!gameOver && num !== total){
            createBalloon()
        }else if(num !== total){
            clearInterval(loop)
            totalShadow.style.display = 'flex';
            totalShadow.querySelector('.lose').style.display = 'block';
        } else {
            clearInterval(loop)
            totalShadow.style.display = 'flex';
            totalShadow.querySelector('.win').style.display = 'block';
        }
    },800 + timeout)
}
function restartGame (){
    let forRemoving = document.querySelectorAll('.balloon') 
    for(let i = 0; i < forRemoving.length; i++){
        forRemoving[i].remove()
    }
    gameOver = false;
    num = 0
    updateScore()
}

//  event delegation in Js
document.addEventListener('click', function(event){
    if(event.target.classList.contains('balloon')){
        deleteBalloon(event.target);
    }
    // console.log(event);

})

document.querySelector('.restart').addEventListener('click' ,function(){
    totalShadow.style.display = 'none'
    totalShadow.querySelector('.win').style.display = 'none'
    totalShadow.querySelector('.lose').style.display = 'none'
    startGame()
})

document.querySelector('.cancel').addEventListener('click' ,function(){
    totalShadow.style.display = 'none'
})

startBtn.addEventListener('click',function(){
    startGame()
    document.querySelector('.bg-music').play()
    document.querySelector('.start-game-window').style.display = "none"
})