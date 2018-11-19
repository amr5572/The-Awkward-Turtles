
var skel_x,skel_y;
//create a class [name]=function(game,x,y){}
Skeleton=function(game,x,y){
  //this.game.physics.enable(fireball);

  this.fireballDisplay=false;
  this.size=.5;
  skel_x=x;
  skel_y=y;
  this.vel=320;

// this calls upon the sprite that you load in the create function
  Phaser.Sprite.call(this,game,x,y,'skeleton');
//this sets the size
  this.scale.setTo(.5,.5);
//this center the hit box
  this.anchor.setTo(0.5,0.5);
//this makes physics are applied to the object
  this.game.physics.enable(this);
  this.body.immovable=true;
  this.body.setSize(100,250,125,50);
//this makes the object collide with the world bounds
  this.body.collideWorldBounds=true;
//set the animation frames
  this.animations.add('walk',[1,2,3,4,5,6,7]);
  this.animations.add('idle',[0]);
//sounds can be added but you would need to load then in the create function back in the state0 file
  this.hit_sound=this.game.add.audio('death_sound');
  this.hit_sound.addMarker('death_sound');
// number of lives
this.life=2;

//this adds keyboard input but it is not necessary
cursor=this.game.input.keyboard.createCursorKeys();
//this.addChild(this.weapon=game.add.sprite(10,20,-50,-100,'enemy'));

///THIS MUST BE ADDED!!!!!!!!!!!! in order for the function to work
game.add.existing(this);
}

///THIS MUST BE ADDED!!!!!!!!!!!!
Skeleton.prototype=Object.create(Phaser.Sprite.prototype);
Skeleton.prototype.constructor=Skeleton;


// any function like walk, damage, attack,animation needs to be added to the update function
Skeleton.prototype.update=function(){
//animation (name of the animation, speed, true)
this.animations.play('walk',5,true);
this.move(this);

game.physics.arcade.overlap(this,hero.weapon.bullets,hero.hitbyFireball);

game.physics.arcade.overlap(hero.sword,this,this.hitEnemy);
if(hero.damaged==false){

   game.physics.arcade.collide(hero,this, knockBackDirection(hero,this));
}


}
///The way you create a function is different you will need to add it like below
//just change the first argument 'name of class'.prototype.enemyTowardsPlayer= function(e,a){}
Skeleton.prototype.move= function(s){
   s.body.velocity.x=s.vel;
   game.physics.arcade.collide(s,boarder,function(){s.vel=s.vel*-1; s.scale.setTo(s.size*-1,.5);
   s.size=s.size*-1 });


}
Skeleton.prototype.hitEnemy= function(s,e){
  game.physics.arcade.collide (s,e,function(){

    lifeText.text=lifeString+hero.life;})
    if(e.life==-20){
      bossSound.stop('boss_sound');
      e.kill();
      score+=10;
    }
    else{e.life-=1;}

    scoreText.text=scoreString+score;
    deathsound.play('death_sound');

    }
