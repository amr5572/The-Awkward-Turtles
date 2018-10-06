
Boss=function(game,x,y){
Phaser.Sprite.call(this,game,x,y,'boss');
this.scale.setTo(1,1);
this.anchor.setTo(0.5,0.5);
this.game.physics.enable(this);
this.body.collideWorldBounds=true;
this.animations.add('walk',[0,1,2,3,4,5,6,7,8,9,10,11,12]);
this.animations.add('idle',[13,14,15,16]);

this.life=4;

cursor=this.game.input.keyboard.createCursorKeys();
//this.addChild(this.weapon=game.add.sprite(10,20,-50,-100,'enemy'));

game.add.existing(this);
}


Boss.prototype=Object.create(Phaser.Sprite.prototype);
Boss.prototype.constructor=Boss;



Boss.prototype.update=function(){

this.animations.play('walk',5,true);
this.enemyTowardsPlayer(this,hero);
game.physics.arcade.collide(this,rock, function(){console.log('wall hit');});

}

Boss.prototype.enemyTowardsPlayer= function(e,a){
  targetAngle=game.math.angleBetween(e.x,e.y,a.x,a.y);
  delta=targetAngle*(180/Math.PI)
  if(e.roation!=targetAngle){


    if(delta>-90&&delta<90){
      //console.log(delta);
      e.body.velocity.x = 200;
      if(delta<140&&delta>70){
        //onsole.log(delta);
        e.body.velocity.y = 200;
        e.scale.setTo(-1,1);
      }
      else if(delta<-70&&delta>-140){
        //console.log(delta);
        e.body.velocity.y = -200;
        e.scale.setTo(1,1);

      }
      else if(delta<20&&delta>-20){
        console.log(delta);
        e.body.velocity.x = 200;
        e.scale.setTo(1,1);

      }

    }

    else{
      e.body.velocity.x = -200;

    }

  }

}
