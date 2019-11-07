const SIZE = 64;
const scale = 1;

let sprites;
let mapImage;
let map;
let stone;
let grass;


function setup() {
  createCanvas(400, 400);
  stone = new Stone();
  grass = new GameObject();
  loadMap();
  imageMode(CENTER);
}

function draw() {
  translate(200, 200);
  background(0);
  map.drawRegion(4);
  map.drawPlayer();
  filter(POSTERIZE, 5);
}

function keyReleased(){
  if (keyCode === LEFT_ARROW) {
    map.move(-1, 0);
  } else if (keyCode === RIGHT_ARROW) {
    map.move(1, 0);
  } else if (keyCode === UP_ARROW) {
    map.move(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    map.move(0, 1);
  }
}

function preload() {
  loadSprites();
}

function loadSprites() {
  sprites = loadImage("sprites.png");
  mapImage = loadImage("map.png");
}

function loadMap() {
  map = new Map(mapImage);
}

class Map {
  constructor(mapImg) {
    mapImg.loadPixels();
    // this.player = new Player(13, 23);
    this.player = new Player(2, 29);
    this.objects = [];
    this.w = 32;
    this.h = 32;
    for (let i = 0; i < this.h; i++) {
      this.objects[i] = [];
      for (let j = 0; j < this.w; j++) {
        const pixel = 4 * (i * this.w + j);
        this.objects[i][j] = this.getObjectsInSource(
          mapImg.pixels[pixel], mapImg.pixels[pixel + 1], mapImg.pixels[pixel + 2]
        );
      }
    }
  }

  getObjectsInSource( r, g, b) {
    if(r + g + b == 0){
      return [stone];
    }
    if(r + g + b == 172 + 50 + 50){
      return [grass, new Door()];
    }
    if(r + g + b == 251 + 242 + 54){
      return [grass, new Key(), new Chest()];  
    }
    if(r + g + b == 95 + 205 + 228){
      return [grass, new Flower(), new Chest()];  
    }
    return [grass];
  }
  
  drawPlayer() {
    drawTile(map.player.getName());
    
    if(this.player.hasKey){
        drawSprite("key", 10, 4, 0.3);
    }
    if(this.player.hasFlower){
        drawSprite("flower", -10, 4, 0.3);
    }
  }

  drawRegion(s = 3) {
    const x = this.player.x;
    const y = this.player.y;
    for (let i = 1 - s; i < s; i++) {
      for (let j = 1 - s; j < s; j++) {
        let objects = this.getObjects(x + j, y + i);
        for (let k = 0; k < objects.length; k++) {
          drawTile(this.getName(x + j, y + i, k), j, i);
        }
      }
    }
  }

  getName(x, y, z = 0) {
    return this.getObjects(x, y)[z].getName();
  }

  getObjects(x, y) {
    if (x < 0 || x > this.w - 1 || y < 0 || y > this.h - 1) {
      return [stone];
    }
    return this.objects[y][x];
  }

  move(dx, dy) {
    let objects = this.getObjects(this.player.x + dx, this.player.y + dy);
    for(let i = objects.length - 1 ; i >= 0 ; i--){
      if(objects[i].isInteractive){
        objects[i].interact(map);
        return;
      }
    }
    let isWalkable = true;
    for(const obj of objects){
      isWalkable = isWalkable && obj.isWalkable;
    }
    if(isWalkable){
      this.player.x += dx;
      this.player.y += dy;
    }
    for(let i = objects.length - 1 ; i >= 0 ; i--){
      if(objects[i].isPickable){
        objects[i].pick(map);
        return;
      }
    }
  }
}

function drawTile(name, dx = 0, dy = 0){
  drawSprite(name,
    dx * SIZE * scale, dy * SIZE * scale);
}

function drawSprite(name, xpos, ypos, spriteScale = 1) {
  let x = 0;
  let y = 0;
  switch (name) {
    case "grass":
      x = 0;
      y = 0;
      break;
    case "stone":
      x = 1;
      y = 0;
      break;
    case "door":
      x = 2;
      y = 0;
      break;
    case "opened":
      x = 0;
      y = 1;
      break;
    case "key":
      x = 1;
      y = 1;
      break;
    case "chest":
      x = 2;
      y = 1;
      break;
    case "flower":
      x = 0;
      y = 2;
      break;
    case "rose":
      x = 1;
      y = 2;
      break;
    case "girl":
      x = 2;
      y = 2;
      break;
    case "invisible":
      return;
    default:
      x = 0;
      y = 0;
      break;
  }
  image(
    sprites.resizeNN(SIZE * 3, SIZE * 3),
    xpos * scale, ypos * scale,
    SIZE * scale * spriteScale, SIZE * scale * spriteScale,
    x * SIZE, y * SIZE,
    SIZE, SIZE
  );
}