class Stone extends GameObject{
  constructor(){
    super("stone"); 
    this.isInteractive = false;
    this.isWalkable = false;
    this.isPickable = false;
  }
}