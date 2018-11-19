
Wolf=function(game,x,y){
Phaser.Sprite.call(this,game,x,y,'wolf');
this.scale.setTo(.5,.5);
this.anchor.setTo(0.5,0.5);
this.game.physics.enable(this);
this.body.immovable=true;
this.body.setSize(200,200,50,60);
this.body.collideWorldBounds=true;
this.animations.add('walk',[2,3,4,5]);
this.animations.add('idle',[6,7,8,9]);


console.log(hero.weapon.bullets);
this.life=3;

cursor=this.game.input.keyboard.createCursorKeys();
//this.addChild(this.weapon=game.add.sprite(10,20,-50,-100,'enemy'));

game.add.existing(this);

}


Wolf.prototype=Object.create(Phaser.Sprite.prototype);
Wolf.prototype.constructor=Wolf;


Wolf.prototype.update=function(){

this.animations.play('walk',6,true);
this.enemyTowardsPlayer(this,hero);
game.physics.arcade.collide(this,boarder, function(){});
game.physics.arcade.overlap(hero.sword,this,this.hitEnemy);
game.physics.arcade.overlap(this,hero.weapon.bullets,hero.hitbyFireball);


if(hero.damaged==false){
game.physics.arcade.collide(hero,this, knockBackDirection(hero,this));
}
game.physics.arcade.collide(boarder,this,function(){});
game.physics.arcade.collide(traps,this,function(){});
}

Wolf.prototype.enemyTowardsPlayer= function(e,a){

  var dx=e.x-a.x;
  var dy=e.y-a.y;
  var distance = Math.sqrt((dx*dx)+(dy*dy));
  if(distance<500){
  e.scale.setTo(.5,.5);
  game.physics.arcade.moveToObject(e,a,60,3000);}
  if(e.body.velocity.x>0){
    e.scale.set(-.5,.5)
  }
  else{}
  // targetAngle=game.math.angleBetween(e.x,e.y,a.x,a.y);
  // delta=targetAngle*(180/Math.PI)
  // if(distance<750){
  // console.log(delta);}
  // if((e.roation!=targetAngle) && (Phaser.Math.distance(this.x,hero.x,this.y,hero.y)>750)){
  //
  //
  //   if(delta>-10&&delta<10){
  //     e.body.velocity.x=150;
  //     e.scale.setTo(.5,.5);
  //
  //   }
  //   else if(delta<-80&&delta>-100){
  //     e.body.velocity.y=-150;
  //     e.scale.setTo(.5,.5);
  //   }
  //   else if(delta<-170&&delta>-180){
  //     e.body.velocity.x=-150;
  //     e.scale.setTo(.5,.5);
  //   }
  //   else if(delta<180&&delta>170){
  //     e.body.velocity.x=-150;
  //     e.scale.setTo(.5,.5);
  //   }
  //   else if(delta<100&&delta>80){
  //     e.body.velocity.y=150;
  //     e.scale.setTo(.5,.5);
  //   }
  //
  //
  //
  //
  //   // if(delta>-90&&delta<90){
  //   //   //console.log(delta);
  //   //   e.body.velocity.x = 150;
  //   //   if(delta<140&&delta>70){
  //   //     //bossSound.play('boss_sound');
  //   //     //console.log(delta);
  //   //     e.body.velocity.y = 150;
  //   //     e.scale.setTo(.5,.5);
  //   //   }
  //   //   else if(delta<-70&&delta>-140){
  //   //     //console.log(delta);
  //   //     //bossSound.play('boss_sound');
  //   //     e.body.velocity.y = -150;
  //   //     e.scale.setTo(-.5,.5);
  //   //
  //   //   }
  //   //   else if(delta<20&&delta>-20){
  //   //     //console.log(delta);
  //   //     e.body.velocity.x = 150;
  //   //     e.scale.setTo(-.5,.5);
  //   //
  //   //   }
  //   //
  //   // }
  //
  //   else{
  //     e.body.velocity.x = 0;
  //     e.body.velocity.y=0;
  //
  //   }
  //
  // }

}
Wolf.prototype.hitEnemy= function(s,e){
  game.physics.arcade.collide (s,e,function(){

    lifeText.text=lifeString+hero.life;})
    if(e.life==0){
      bossSound.stop('boss_sound');
      e.kill();
      score+=10;
    }
    else{e.life-=1;}

    scoreText.text=scoreString+score;
    deathsound.play('death_sound');

    }
