class GameObject {
  constructor(name = "grass") {
    this.name = name;

    this.isInteractive = false;
    this.isWalkable = true;
    this.isPickable = false;
    this.isVisible = true;
  }

  getName() {
    return this.isVisible ? this.name : "invisible";
  }
}