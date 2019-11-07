class Player {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.hasKey = false;
    this.hasFlower = false;
  }
  getName(){
    return this.hasFlower ? "rose" : "girl";
  }
}