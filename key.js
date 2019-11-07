class Key extends GameObject {
  constructor() {
    super("key");
    this.isInteractive = false;
    this.isWalkable = true;
    this.isPickable = true;

    this.isPicked = false;
  }

  pick(map) {
    if (this.isPicked) {
      return false;
    }
    map.player.hasKey = true;
    this.isPicked = true;
    this.isVisible = false;
    return true;
  }
}