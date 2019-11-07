class Door extends GameObject {
  constructor() {
    super("door");
    this.isInteractive = true;
    this.isWalkable = false;
    this.isPickable = false;
  }

  interact(map) {
    if (this.isInteractive && map.player.hasKey) {
      this.isInteractive = false;
      this.isWalkable = true;
      this.name = "opened";
      map.player.hasKey = false;
    }else{
      alert("Чтобы пройти через дверь тебе нужен ключ <3");
    }
  }
}