
Wolf=function(game,x,y){
Phaser.Sprite.call(this,game,x,y,'wolf');
this.scale.setTo(.75,.75);
this.anchor.setTo(0.5,0.5);
this.game.physics.enable(this);
this.body.collideWorldBounds=true;
this.animations.add('walk',[2,3,4,5]);
this.animations.add('idle',[6,7,8,9]);



this.life=2;

cursor=this.game.input.keyboard.createCursorKeys();
//this.addChild(this.weapon=game.add.sprite(10,20,-50,-100,'enemy'));

game.add.existing(this);
}


Wolf.prototype=Object.create(Phaser.Sprite.prototype);
Wolf.prototype.constructor=Wolf;



Wolf.prototype.update=function(){

this.animations.play('walk',6,true);
this.enemyTowardsPlayer(this,hero);
game.physics.arcade.collide(this,rock, function(){console.log('wall hit');});

}

Wolf.prototype.enemyTowardsPlayer= function(e,a){
  targetAngle=game.math.angleBetween(e.x,e.y,a.x,a.y);
  delta=targetAngle*(180/Math.PI)
  if(e.roation!=targetAngle){


    if(delta>-90&&delta<90){
      //console.log(delta);
      e.body.velocity.x = 150;
      if(delta<140&&delta>70){
        //bossSound.play('boss_sound');
        //onsole.log(delta);
        e.body.velocity.y = 150;
        e.scale.setTo(.75,.75);
      }
      else if(delta<-70&&delta>-140){
        //console.log(delta);
        //bossSound.play('boss_sound');
        e.body.velocity.y = -150;
        e.scale.setTo(-.75,.75);

      }
      else if(delta<20&&delta>-20){
        //console.log(delta);
        e.body.velocity.x = 150;
        e.scale.setTo(-.75,.75);

      }

    }

    else{
      e.body.velocity.x = -200;

    }

  }

}
