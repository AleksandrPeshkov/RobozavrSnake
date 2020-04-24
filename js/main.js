// Scene and Camera setup
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Renderer setup
var renderer = new THREE.WebGLRenderer({antialias: true}); // TODO: test this
renderer.setClearColor('#e5e5e5');
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Adding responsiveness to render
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectMatrix();
});

// To show render clear color
renderer.render(scene, camera);






/**
 * Snake 2D logic here ▼
 */

// var canvas, ctx;

// window.onload = function () {
//   canvas = document.getElementById("canvas");
//   ctx = canvas.getContext("2d");

//   document.addEventListener("keydown", keyDownEvent);

//   // render X times per second
//   var x = 8;
//   setInterval(draw, 1000 / x);
// };

// // input
// function keyDownEvent(e) {
//   switch (e.keyCode) {
//     case 37:
//       nextX = -1;
//       nextY = 0;
//       break;
//     case 38:
//       nextX = 0;
//       nextY = -1;
//       break;
//     case 39:
//       nextX = 1;
//       nextY = 0;
//       break;
//     case 40:
//       nextX = 0;
//       nextY = 1;
//       break;
//   }
// }

// // snake
// var defaultTailSize = 3;
// var tailSize = defaultTailSize;
// var snakeTrail = [];
// var snakeX = (snakeY = 10);

// // game world
// var gridSize = (tileSize = 20);
// var nextX = (nextY = 0);

// // food
// var foodX = (foodY = 15); // TODO: var appleX = (appleY = 15)

// // updating the game world
// function draw() {
//   // move snake in next pos
//   snakeX += nextX;
//   snakeY += nextY;

//   // snake over game world?
//   if (snakeX < 0) {
//     snakeX = gridSize - 1;
//   }
//   if (snakeX > gridSize - 1) {
//     snakeX = 0;
//   }
//   if (snakeY < 0) {
//     snakeY = gridSize - 1;
//   }
//   if (snakeY > gridSize - 1) {
//     snakeY = 0;
//   }

//   // snake bite food?
//   if (snakeX == foodX && snakeY == foodY) {
//     tailSize++;
//     foodX = Math.floor(Math.random() * gridSize);
//     foodY = Math.floor(Math.random() * gridSize);
//   }

//   // paint background
//   ctx.fillStyle = "#333333";
//   ctx.fillRect(0, 0, canvas.width, canvas.height);

//   // paint snake
//   ctx.fillStyle = "green";
//   for (var i = 0; i < snakeTrail.length; i++) {
//     ctx.fillRect(
//       snakeTrail[i].x * tileSize,
//       snakeTrail[i].y * tileSize,
//       tileSize,
//       tileSize
//     );

//     // snake bites it's tail?
//     if (snakeTrail[i].x == snakeX && snakeTrail[i].y == snakeY) {
//       tailSize = defaultTailSize;
//     }
//   }

//   // paint food
//   ctx.fillStyle = "red";
//   ctx.fillRect(foodX * tileSize, foodY * tileSize, tileSize, tileSize);

//   // set snake trail
//   snakeTrail.push({ x: snakeX, y: snakeY });

//   while (snakeTrail.length > tailSize) {
//     snakeTrail.shift();
//   }
// }