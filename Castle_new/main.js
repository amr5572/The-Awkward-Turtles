var game = new Phaser.Game(1376, 1027, Phaser.CANVAS);
game.state.add('state1', demo.state1);
game.state.add('state2', demo.state2);
game.state.add('state0', demo.state0);
game.state.start('state0');


if(direction==1){
sword=this.addChild(this.game.add.sprite(0,-140,'slashUp'));
sword.scale.setTo(2.05,2.05);}
else if (direction==5){
sword=this.addChild(this.game.add.sprite(0,140,'slashDown'));
sword.scale.setTo(1.25,1.25);}
else{
  sword=this.addChild(this.game.add.sprite(140,0,'slash'));
  sword.scale.setTo(1.7,1.7);

}
sword.game.physics.enable(sword);
sword.anchor.setTo(0.5,0.5);
sword.animations.add('slashAttack',[0,1,2,3,4]);
sword.animations.play('slashAttack',70,false);
