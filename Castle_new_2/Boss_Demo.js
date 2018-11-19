
//create a class [name]=function(game,x,y){}
Boss=function(game,x,y){
// this calls upon the sprite that you load in the create function
Phaser.Sprite.call(this,game,x,y,'boss');
//this sets the size
this.scale.setTo(1,1);
//this center the hit box
this.anchor.setTo(0.5,0.5);
//this makes physics are applied to the object
this.game.physics.enable(this);
//this makes the object collide with the world bounds
this.body.collideWorldBounds=true;
//set the animation frames
this.animations.add('walk',[0,1,2,3,4,5,6,7,8,9]);
this.animations.add('idle',[0,1]);
//sounds can be added but you would need to load then in the create function back in the state0 file
this.hit_sound=this.game.add.audio('death_sound');
this.hit_sound.addMarker('death_sound');
// number of lives
this.life=30;

//this adds keyboard input but it is not necessary
cursor=this.game.input.keyboard.createCursorKeys();
//this.addChild(this.weapon=game.add.sprite(10,20,-50,-100,'enemy'));

///THIS MUST BE ADDED!!!!!!!!!!!! in order for the function to work
game.add.existing(this);
}

///THIS MUST BE ADDED!!!!!!!!!!!!
Boss.prototype=Object.create(Phaser.Sprite.prototype);
Boss.prototype.constructor=Boss;


// any function like walk, damage, attack,animation needs to be added to the update function
Boss.prototype.update=function(){
//animation (name of the animation, speed, true)
this.animations.play('walk',5,true);
this.enemyTowardsPlayer(this,hero);
game.physics.arcade.collide(this,boarder, function(){});
game.physics.arcade.overlap(this,hero.weapon.bullets,hero.hitbyFireball);


if(hero.damaged==false){
game.physics.arcade.collide(hero,this, knockBackDirection(hero,this));
}

}
///The way you create a function is different you will need to add it like below
//just change the first argument 'name of class'.prototype.enemyTowardsPlayer= function(e,a){}
Boss.prototype.enemyTowardsPlayer= function(e,a){
  targetAngle=game.math.angleBetween(e.x,e.y,a.x,a.y);
  delta=targetAngle*(180/Math.PI)
  if(e.roation!=targetAngle){


    if(delta>-90&&delta<90){
      //console.log(delta);
      e.body.velocity.x = 100;
      if(delta<140&&delta>70){
        //bossSound.play('boss_sound');
        //console.log(delta);
        e.body.velocity.y = 100;
        e.scale.setTo(-1,1);
      }
      else if(delta<-70&&delta>-140){
        //console.log(delta);
        //bossSound.play('boss_sound');
        e.body.velocity.y = -100;
        e.scale.setTo(1,1);

      }
      else if(delta<20&&delta>-20){
        //console.log(delta);
        e.body.velocity.x = 100;
        e.scale.setTo(1,1);

      }

    }

    else{
      e.body.velocity.x = -100;

    }

  }

}
