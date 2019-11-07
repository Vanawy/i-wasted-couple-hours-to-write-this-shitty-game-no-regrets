class Flower extends GameObject {
  constructor() {
    super("flower");
    this.isInteractive = false;
    this.isWalkable = true;
    this.isPickable = true;

    this.isPicked = false;
  }

  pick(map) {
    if (this.isPicked) {
      return false;
    }
    this.isPicked = true;
    this.isVisible = false;
    map.player.hasFlower = true;
    return true;
  }
}