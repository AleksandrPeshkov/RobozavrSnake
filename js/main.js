// Scene and Camera setup
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 15);
camera.lookAt(scene.position);

// Renderer setup
var renderer = new THREE.WebGLRenderer({antialias: true});
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
light.position.set(0,10,10);
scene.add(light);

// World setup
var gridSize = 20;
var nextX = nextZ = 0;

// Snake setup
var defaultTailSize = 3;
var tailSize = defaultTailSize;
var snakeTrail = [];

var snakeBlockGeometry = new THREE.BoxGeometry(1, 1, 1);
var snakeBlockMaterial = new THREE.MeshLambertMaterial({color: 0x999999});
// snake head initial position
var snakeX = -0.5;
var snakeY = 0.5;
var snakeZ = -0.5;

// Initial snake length setup
for(var i = 0; i < defaultTailSize; i++) {
  let snakeBlock = new THREE.Mesh(snakeBlockGeometry, snakeBlockMaterial);
  snakeBlock.position.set(
    snakeX - i,
    snakeY,
    snakeZ
  );
 
  snakeTrail.push(snakeBlock);
  scene.add(snakeBlock);
}

// Food setup
var foodGeometry = new THREE.TorusGeometry(0.3, 0.15, 16, 100);
var foodMaterial = new THREE.MeshLambertMaterial({color: 0xfa744f});
var food = new THREE.Mesh(foodGeometry, foodMaterial);
food.position.set(5.5, 0.5, 5.5);
scene.add(food);

/**
 * This will create a loop that causes the renderer to draw the scene every time the screen is refreshed (on a typical screen this means 60 times per second). If you're new to writing games in the browser, you might say "why don't we just create a setInterval ?" The thing is - we could, but requestAnimationFrame has a number of advantages.
 */
var framesPerSecond = 7;

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
  snakeX += nextX;
  snakeZ +=nextZ;

  // Snake over game world?
  if (snakeX < -9.5) {
    snakeX = gridSize - 10.5;
  }
  if (snakeX > gridSize - 10.5) {
    snakeX = -9.5;
  }
  if (snakeZ < -9.5) {
    snakeZ = gridSize - 10.5;
  }
  if (snakeZ > gridSize - 10.5) {
    snakeZ = -9.5;
  }

  // Snake bite food?
  if (snakeX == food.position.x && snakeZ == food.position.z) {
    tailSize++;
    let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    food.position.x = plusOrMinus * (Math.floor(Math.random() * gridSize / 2) - 0.5);
    food.position.z = plusOrMinus * (Math.floor(Math.random() * gridSize / 2) - 0.5);
  }

  /**
   * TODO: не гененировать еду на месте хвоста змеии
   */

  // snake bites it's tail?
  for(var i = 0; i < snakeTrail.length; i++) {
    if (snakeTrail[i].position.x == snakeX && snakeTrail[i].position.z == snakeZ) {
      tailSize = defaultTailSize;
    }
  }

  // Add snake next position and set snake trail
  let snakeBlock = new THREE.Mesh(snakeBlockGeometry, snakeBlockMaterial);
  snakeBlock.position.set(
    snakeX,
    snakeY,
    snakeZ
  );

  scene.add(snakeBlock);
  snakeTrail.unshift(snakeBlock);
  
  while (snakeTrail.length > tailSize) {
    scene.remove(snakeTrail[snakeTrail.length - 1]);
    snakeTrail.pop();
  }
}