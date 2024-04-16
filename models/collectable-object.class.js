// class CollectableObject extends MoveableObject {  
//     constructor() {
//       super();
//       checkCollectableBottle();
//     }
// world;
//     checkCollectableBottle() {
//       this.level.bottle.forEach((bottle) => {
//         if (this.character.isColliding(bottle)) {
//           this.bottleAmount += 1; 
//           console.log(this.bottleAmount);
//           this.bottleBar.setPercentage(this.bottleAmount);
//           const bottleIndex = this.level.bottle.indexOf(bottle);
//           this.level.bottle.splice(bottleIndex, 1);
//         }
//       }, 100);
//     }
//   }
  