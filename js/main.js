// Scene and Camera setup
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Renderer setup
var renderer = new THREE.WebGLRenderer({antialias: true}); // TODO: test this
renderer.setClearColor('#e5e5e5');
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Adding responsiveness to render
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();
});

// Adding raycaster
/**
 * Raycasting is used for mouse picking (working out what objects in the 3d space the mouse is over) amongst other things.
 */
// var raycaster = new THREE.Raycaster();
// var mouse = new THREE.Vector2();


// Adding geometry (snake)
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshLambertMaterial({color: 0x999999});
var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Adding light
var light = new THREE.PointLight(0xffffff, 1, 500);
light.position.set(10,0,25);
scene.add(light);

// Adding axes helper
var axesHelper = new THREE.AxesHelper(1);
scene.add(axesHelper);

/**
 * This will create a loop that causes the renderer to draw the scene every time the screen is refreshed (on a typical screen this means 60 times per second). If you're new to writing games in the browser, you might say "why don't we just create a setInterval ?" The thing is - we could, but requestAnimationFrame has a number of advantages.
 */
function animate() {
  requestAnimationFrame(animate);
  
  // mesh.rotation.x += 0.01;
  // mesh.rotation.y += 0.01;

	renderer.render(scene, camera);
}

// function onMouseMove(event) {
//   event.preventDefault();

//   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//   mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
  
//   // update the picking ray with the camera and mouse position
//   raycaster.setFromCamera(mouse, camera);
  
//   // calculate objects intersecting the picking ray
//   var intersects = raycaster.intersectObjects(scene.children, true);
  
//   for(var i = 0; i < intersects.length; i++) {

//     this.tl = new TimelineMax();
//     this.tl.to(intersects[i].object.scale, 1, {x: 2, ease: Expo.easeOut});
//     this.tl.to(intersects[i].object.scale, .5, {x: .5, ease: Expo.easeOut});
//     this.tl.to(intersects[i].object.position, .5, {x: 2, ease: Expo.easeOut});
//     this.tl.to(intersects[i].object.rotation, .5, {y: Math.PI*.5, ease: Expo.easeOut}, '=-1.5');

//   }
// }

animate();

// window.addEventListener('mousemove', onMouseMove);

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