var cursor,sword;
Hero=function(game,x,y){
Phaser.Sprite.call(this,game,x,y,'hero');
this.scale.setTo(0.3,0.3);
this.anchor.setTo(0.5,0.5);
this.game.physics.enable(this);
this.body.collideWorldBounds=true;
this.animations.add('walk',[0,1,2,3,4,5,6,7,8,9,10,11,12]);
this.animations.add('attack',[13,14,15,16,17,18]);
this.life=100;
this.aKey=game.input.keyboard.addKey(Phaser.Keyboard.A);
this.attack=false;

cursor=this.game.input.keyboard.createCursorKeys();


game.add.existing(this);
}
Hero.prototype=Object.create(Phaser.Sprite.prototype);
Hero.prototype.constructor=Hero;



Hero.prototype.update=function(){

this.playerMove();
if(this.attack==true){
console.log(this.attack);}
game.physics.arcade.collide(this,rock, function(){console.log('wall hit');});
this.playerAttack();

}

Hero.prototype.playerMove = function(){

  if(cursor.up.isDown){//needs velocity to collision 
     this.body.velocity.y=-vel;
     this.animations.play('walk',20,false);
    }
    else if(cursor.down.isDown){
     this.body.velocity.y=vel;
     this.animations.play('walk',20,false);


    }
    else{
     this.body.velocity.y=0

    }

    if(cursor.left.isDown){
     this.animations.play('walk',20,false);
     this.body.velocity.x=-vel;
     this.scale.setTo(-0.3,0.3);
     this.playerAttack();


    }
    else if(cursor.right.isDown){
     this.animations.play('walk',20,false);
     this.body.velocity.x=vel;
     this.scale.setTo(0.3,0.3);


    }

    else{
     this.body.velocity.x=0;
     this.animations.stop('walk',1);
     //couldn't find a way to set the frame to 0

    }


}
Hero.prototype.playerAttack=function(){
  if(this.aKey.isDown&&this.attack==false){
     this.animations.play('attack',70,false);
      this.attack=true;
      this.playerSword();
      game.time.events.add(Phaser.Timer.SECOND*.3,function(){this.attack=false;},this)
        game.time.events.add(Phaser.Timer.SECOND*.2,function(){
          this.animations.stop('attack',1);
          sword.kill();

        },this)
    }

}

Hero.prototype.playerSword=function(){
  sword=this.addChild(this.game.add.sprite(140,0,'slash'));
  sword.game.physics.enable(sword);
  sword.anchor.setTo(0.5,0.5);
  sword.animations.add('slashAttack',[0,1,2,3,4]);
  sword.animations.play('slashAttack',70,false);


}
