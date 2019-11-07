class Chest extends GameObject{
  constructor(){
    super("chest"); 
    this.isInteractive = true;
    this.isWalkable = false;
    this.isPickable = false;
  }
  
  interact(map){
    if (this.isInteractive) {
      this.isInteractive = false;
      this.isWalkable = true;
      this.isVisible = false;
      map.player.hasKey = false;
    }
  }
}