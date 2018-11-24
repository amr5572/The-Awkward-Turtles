
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
this.health=3;

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
  game.physics.arcade.moveToObject(e,a,20,4000);}
  if(e.body.velocity.x>0){
    e.scale.set(-.5,.5)
  }
  else{}
  
}

// Player hits wolf //
Wolf.prototype.hitEnemy= function(s,e){
   e.damage(1); if(e.health<=0){console.log('dead'); bossSound.stop('boss_sound'); score+=1;}  
    scoreText.text=scoreString+score; deathsound.play('death_sound');
    }
