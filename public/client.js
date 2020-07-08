// var canvas = document.getElementById("myCanvas");
// var ctx = canvas.getContext("2d");
// var ballRadius = 10;
// var x = canvas.width / 2;
// var y = canvas.height - 30;
// var dx = 1;
// var dy = -1;
// var paddleHeight = 10;
// var paddleWidth = 75;
// var paddleX = (canvas.width - paddleWidth) / 2;
// var rightPressed = false;
// var leftPressed = false;
// var brickRowCount = 3;
// var brickColumnCount = 5;
// var brickWidth = 75;
// var brickHeight = 20;
// var brickPadding = 10;
// var brickOffsetTop = 30;
// var brickOffsetLeft = 30;
// var score = 0;
// var lives = 3;
//
//
// var bricks = [];
// for (var c = 0; c < brickColumnCount; c++) {
//     bricks[c] = [];
//     for (var r = 0; r < brickRowCount; r++) {
//         bricks[c][r] = { x: 0, y: 0, status: 1 };
//     }
// }
//
// document.addEventListener("mousemove", mouseMoveHandler, false);
// document.addEventListener("keydown", keyDownHandler, false);
// document.addEventListener("keyup", keyUpHandler, false);
//
// function mouseMoveHandler(e) {
//     var relativeX = e.clientX - canvas.offsetLeft;
//     if(relativeX > 0 && relativeX < canvas.width) {
//         paddleX = relativeX - paddleWidth/2;
//     }
// }
//
// function keyDownHandler(e) {
//     if (e.key == "Right" || e.key == "ArrowRight") {
//         rightPressed = true;
//     }
//     else if (e.key == "Left" || e.key == "ArrowLeft") {
//         leftPressed = true;
//     }
// }
//
// function keyUpHandler(e) {
//     if (e.key == "Right" || e.key == "ArrowRight") {
//         rightPressed = false;
//     }
//     else if (e.key == "Left" || e.key == "ArrowLeft") {
//         leftPressed = false;
//     }
// }
// function collisionDetection() {
//     for(var c=0; c<brickColumnCount; c++) {
//         for(var r=0; r<brickRowCount; r++) {
//             var b = bricks[c][r];
//             if(b.status == 1) {
//                 if(x + ballRadius > b.x && x - ballRadius < b.x + brickWidth && y + ballRadius > b.y && y - ballRadius < b.y + brickHeight) {
//                     dy = -dy;
//                     b.status = 0;
//                     score++;
//                     if(score == brickRowCount*brickColumnCount) {
//                         alert("YOU WIN, CONGRATULATIONS!");
//                         document.location.reload();
//                         clearInterval(interval); // Needed for Chrome to end game
//                     }
//                 }
//             }
//         }
//     }
// }
// function drawLives() {
//     ctx.font = "16px Arial";
//     ctx.fillStyle = "#0095DD";
//     ctx.fillText("Lives: "+lives, canvas.width-65, 20);
// }
// function drawScore() {
//     ctx.font = "16px Arial";
//     ctx.fillStyle = "#0095DD";
//     ctx.fillText("Score: "+score, 8, 20);
// }
// function drawBall() {
//     ctx.beginPath();
//     ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
//     ctx.fillStyle = "#0095DD";
//     ctx.fill();
//     ctx.closePath();
// }
// function drawPaddle() {
//     ctx.beginPath();
//     ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
//     ctx.fillStyle = "#0095DD";
//     ctx.fill();
//     ctx.closePath();
// }
// function drawBricks() {
//     for (var c = 0; c < brickColumnCount; c++) {
//         for (var r = 0; r < brickRowCount; r++) {
//             if (bricks[c][r].status == 1) {
//                 var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
//                 var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
//                 bricks[c][r].x = brickX;
//                 bricks[c][r].y = brickY;
//                 ctx.beginPath();
//                 ctx.rect(brickX, brickY, brickWidth, brickHeight);
//                 ctx.fillStyle = "#0095dd";
//                 ctx.fill();
//                 ctx.closePath();
//             }
//         }
//     }
// }
//
// function draw() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     drawBricks();
//     drawBall();
//     drawPaddle();
//     collisionDetection();
//
//     if (x >= canvas.width - ballRadius || x <= ballRadius) {
//         dx = -dx;
//     }
//     if (y <= ballRadius) {
//         dy = -dy;
//     }
//     if (y + ballRadius >= canvas.height - paddleHeight && x - ballRadius >= paddleX  && x +  ballRadius <= paddleX + paddleWidth) {
//             dy = -dy;
//     }
//     else if (y + ballRadius >= canvas.height && (x - ballRadius < paddleX  && x +  ballRadius > paddleX + paddleWidth)){
//         lives--;
//         if(!lives) {
//             alert("GAME OVER");
//             document.location.reload();
//             clearInterval(interval); // Needed for Chrome to end game
//         }
//         else {
//             x = canvas.width/2;
//             y = canvas.height-30;
//             dx = 2;
//             dy = -2;
//             paddleX = (canvas.width-paddleWidth)/2;
//         }
//     }
//
//     if (rightPressed && paddleX < canvas.width - paddleWidth) {
//         paddleX += 7;
//     }
//     else if (leftPressed && paddleX > 0) {
//         paddleX -= 7;
//     }
//
//     x += dx;
//     y += dy;
//     drawScore();
//     drawLives();
//     requestAnimationFrame(draw);
// }

//draw();

const socket = io();



const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const direction = {
    UP: 1,
    DOWN: 2,
    LEFT: 3,
    RIGHT: 4,
    NONE: 0
}



let x = Math.random() * ((canvas.width - 0));
let y = 0;
let dx = 1;
let dy = 1;
let speed = 1;

let dir = direction.NONE

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    let keyCode = e.keyCode;

    switch (keyCode) {
        case 68: //d
            dir = direction.RIGHT;
            break;
        case 83: //s
            dir = direction.DOWN;
            break;
        case 65: //a
            dir = direction.LEFT;
            break;
        case 87: //w
            dir = direction.UP;
            break;
    }
}

function keyUpHandler(e) {
    dir = direction.NONE;
}


socket.emit("new user", {x, y}, speed);
socket.on("new user", (point, speed, id)=>{
    console.log("new player added");
    players[id] = ({x: point.x, y: point.y, speed: speed})
});

function move() {
    socket.emit('movement', (dir));
    console.log("direction = ", dir);
}


let players = {};
let id = 0;


function draw() {
  //  console.log("x = ", x, ", y = ", y);
  //  ctx.clearRect(0, 0, canvas.width, canvas.height);
    move();
    // console.log("player numbers: ", players.length);
    // for (let id in players) {
    //     ctx.beginPath();
    //     ctx.arc(players[id].x, players[id].y, 10, 0, 360);
    //     ctx.fillStyle = "#0095DD";
    //     ctx.fill();
    //     ctx.closePath();
    // }
    requestAnimationFrame(draw);
}
draw()

socket.on('state', (players)=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let id in players) {
        ctx.beginPath();
        ctx.arc(players[id].x, players[id].y, 10, 0, 360);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
})

socket.on('connect', ()=>{
   console.log("abcaba")
});



document.getElementById("form").addEventListener('submit', (e)=>{
    e.preventDefault();
    socket.emit('message', document.getElementById('input').value);
    return false;
});

socket.on("message", (data) => {
    console.log("message is: ", data)
    document.getElementById("chatWindow").value += "user:" + data + "\n"
})
