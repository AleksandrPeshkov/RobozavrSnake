// Scene and Camera setup
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 15);
camera.lookAt(scene.position);

// Renderer setup
var renderer = new THREE.WebGLRenderer({antialias: true}); // TODO: test this
renderer.setClearColor('#e5e5e5');
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Adding responsiveness to render
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;

  /**
   * Updates the camera projection matrix. Must be called after any change of parameters.
   */
  camera.updateProjectionMatrix();
});


// axes helper
var axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// grid helper
var gridHelper = new THREE.GridHelper(20, 20);
scene.add(gridHelper);


// Adding raycaster
/**
 * Raycasting is used for mouse picking (working out what objects in the 3d space the mouse is over) amongst other things.
 */
// var raycaster = new THREE.Raycaster();
// var mouse = new THREE.Vector2();


// Adding light
var light = new THREE.PointLight(0xffffff, 1, 500);
light.position.set(10,0,25);
scene.add(light);

// World setup
// var gridSize = (tileSize = 20);
var nextX = nextZ = 0;


// Snake setup
var defaultTailSize = 3;
var tailSize = defaultTailSize;
// Creating group to control snake tail size
var snake = new THREE.Group();

var snakeBlockGeometry = new THREE.BoxGeometry(1, 1, 1);
var snakeBlockMaterial = new THREE.MeshLambertMaterial({color: 0x999999});
// snake head initial position
var initialX = -0.5;
var initialY = 0.5;
var initialZ = -0.5;

// Initial snake length setup
for(var i = 0; i < defaultTailSize; i++) {
  let snakeBlock = new THREE.Mesh(snakeBlockGeometry, snakeBlockMaterial);
  snakeBlock.position.set(
    initialX - i,
    initialY,
    initialZ
  );
 
  snake.add(snakeBlock);
}

scene.add(snake);

// Food setup
// var foodX = (foodY = 15); // TODO: var appleX = (appleY = 15)
var foodGeometry = new THREE.SphereGeometry(.5, 10, 10);
var foodMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
var food = new THREE.Mesh(foodGeometry, foodMaterial);
food.position.set(5.5, 0.5 , 5.5)
scene.add(food);


/**
 * This will create a loop that causes the renderer to draw the scene every time the screen is refreshed (on a typical screen this means 60 times per second). If you're new to writing games in the browser, you might say "why don't we just create a setInterval ?" The thing is - we could, but requestAnimationFrame has a number of advantages.
 */
var framesPerSecond = 8;

function animate() {

  setTimeout(function(){
    requestAnimationFrame(animate);
    draw();
  }, 1000 / framesPerSecond);
  
	renderer.render(scene, camera);
}

animate();

document.addEventListener('keydown', keyDownEvent);

// Input setup
function keyDownEvent(e) {
  switch (e.keyCode) {
    case 37:
      nextX = -1;
      nextZ = 0;
      break;
    case 38:
      nextX = 0;
      nextZ = -1;
      break;
    case 39:
      nextX = 1;
      nextZ = 0;
      break;
    case 40:
      nextX = 0;
      nextZ = 1;
      break;
  }
}


// Updating the game world
function draw() {
  // move snake in next position
  snake.position.x += nextX;
  snake.position.z += nextZ;

  // // snake over game world?
  // if (snakeX < 0) {
  //   snakeX = gridSize - 1;
  // }
  // if (snakeX > gridSize - 1) {
  //   snakeX = 0;
  // }
  // if (snakeY < 0) {
  //   snakeY = gridSize - 1;
  // }
  // if (snakeY > gridSize - 1) {
  //   snakeY = 0;
  // }

  // // snake bite food?
  // if (snakeX == foodX && snakeY == foodY) {
  //   tailSize++;
  //   foodX = Math.floor(Math.random() * gridSize);
  //   foodY = Math.floor(Math.random() * gridSize);
  // }

  // // paint snake
  //  for (var i = 0; i < snakeTrail.length; i++) {
  //   ctx.fillRect(
  //     snakeTrail[i].x * tileSize,
  //     snakeTrail[i].y * tileSize,
  //     tileSize,
  //     tileSize
  //   );

  //   // snake bites it's tail?
  //   if (snakeTrail[i].x == snakeX && snakeTrail[i].y == snakeY) {
  //     tailSize = defaultTailSize;
  //   }
  // }

  // // set snake trail
  // snakeTrail.push({ x: snakeX, y: snakeY });

  // while (snakeTrail.length > tailSize) {
  //   snakeTrail.shift();
  // }
}