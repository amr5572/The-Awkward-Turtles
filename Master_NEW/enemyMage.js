Mage=function(game,x,y){
  this.mage_x=x;
  this.mage_y=y;
  this.fireballDisplay=false;
  this.vel=100;
  this.dead = false;

// this calls upon the sprite that you load in the create function
  Phaser.Sprite.call(this,game,x,y,'mage');
//this sets the size
  this.scale.setTo(-.5,.5);
//this center the hit box
  this.anchor.setTo(0.2,0.2);

//this makes physics are applied to the object
  this.game.physics.enable(this);
  this.body.immovable=true;
  this.body.setSize(100,190,100,90);
//this makes the object collide with the world bounds
  this.body.collideWorldBounds=true;
//set the animation frames
//sounds can be added but you would need to load then in the create function back in the state0 file
  this.hit_sound=this.game.add.audio('death_sound');
  this.hit_sound.addMarker('death_sound');
// number of lives
this.life=8;
this.weapon=game.add.weapon(20,'fireballEnemy');
this.weapon.bulletKillType=Phaser.Weapon.KILL_DISTANCE;
this.weapon.bullets.setAll('scale.x',10);
this.weapon.bullets.setAll('scale.y',10);
this.weapon.bulletKillDistance = 970;
this.weapon.bulletAngleOffset=180;
this.weapon.bulletSpeed=400;
this.weapon.fireAngle=0;
this.weapon.fireRate=800;

this.weapon.trackSprite(this,100,20);

//this adds keyboard input but it is not necessary
cursor=this.game.input.keyboard.createCursorKeys();

///THIS MUST BE ADDED!!!!!!!!!!!! in order for the function to work
game.add.existing(this);
}

///THIS MUST BE ADDED!!!!!!!!!!!!
Mage.prototype=Object.create(Phaser.Sprite.prototype);
Mage.prototype.constructor=Mage;


// any function like walk, damage, attack,animation needs to be added to the update function
Mage.prototype.update=function(){
//animation (name of the animation, speed, true)
this.move(this);

if(this.alive==true){this.weapon.fire()};
game.physics.arcade.collide(this,boarder, function(){});
game.physics.arcade.overlap(hero,this.weapon.bullets,this.playerHitByFireball);
if(hero.damaged==false){
   game.physics.arcade.collide(hero,this, knockBackDirection(hero,this));
}

}
///The way you create a function is different you will need to add it like below
//just change the first argument 'name of class'.prototype.enemyTowardsPlayer= function(e,a){}
Mage.prototype.move=function(s){

  s.body.velocity.y=s.vel;
  game.physics.arcade.collide(s,boarder,function(){s.vel=s.vel*-1; s.scale.setTo(-.5,.5);});

}

Mage.prototype.fireballAttack=function(m){
  weapon.fire();
if(m.fireballDisplay==false){
m.fireballDisplay=true;
//fireball=game.add.sprite(800,500,'fireball');

//fireball=this.addChild(this.game.add.sprite(-20,120,'fireball'));

//fireball.game.physics.enable(fireball);

// fireball.scale.setTo(1,1);
// fireball.body.setSize(70,70,100,100);
// fireball.anchor.setTo(.5,.5);
// fireball.body.velocity.x=-800;
// game.physics.arcade.collide(hero,weapon, knockBackDirection(hero,weapon));
// game.time.events.add(Phaser.Timer.SECOND*.6,function(){m.fireballDisplay=false;},this);
// game.time.events.add(Phaser.Timer.SECOND*2,function(){fireball.kill()},this);
}

}
// mage attacks hero //
Mage.prototype.playerHitByFireball=function(e,bullet){
  bullet.kill();
  hero.damage(5);
  hero.heroHealthBar.setPercent(hero.health/80 * 100);
  if(e.life<=0){

  }
  scoreText.text=scoreString+score;
  deathsound.play('death_sound');
}
