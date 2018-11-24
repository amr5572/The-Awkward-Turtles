var cursor,sword=0,direction=3;
Hero=function(game,x,y){
Phaser.Sprite.call(this,game,x,y,'hero');
this.scale.setTo(0.3,0.3);
this.anchor.setTo(0.5,0.5);
this.game.physics.enable(this);
this.body.immovable=true;
this.body.setSize(180,230,80,50);
this.body.collideWorldBounds=true;
this.animations.add('walk',[0,1,2,3,4,5,6,7,8,9,10,11,12]);
this.animations.add('walkUp',[13,14,15]);
this.animations.add('walkDown',[16,17,18]);

this.sword=0;

this.animations.add('attack',[19,20,21,22,23,24]);
this.animations.add('attackUp',[25,26,27,28]);
this.animations.add('attackDown',[29,30,31,32,33,34]);
this.life=80;
this.health=80;
this.maxHealth=80;

this.weapon=game.add.weapon(20,'fireball',5);
//this.weapon.setAll('body.setSize','',10,10,0,0);
this.weapon.bulletKillType=Phaser.Weapon.KILL_DISTANCE;
this.weapon.bulletKillDistance = 870;
this.weapon.bulletAngleOffset=180;
this.weapon.bulletSpeed=700;
this.weapon.bullets.setAll('scale.x', 7);
this.weapon.bullets.setAll('scale.y', 7);
this.weapon.bullets.setAll('setSize', 10,10,0,0);
this.weapon.fireAngle=0;
this.weapon.fireRate=800;

this.weapon.trackSprite(this,0,-15);
// this.game.camera.follow(this);
// this.game.camera.deadzone=new Phaser.Rectangle(0,0,1376,1027);

this.aKey=game.input.keyboard.addKey(Phaser.Keyboard.A);
this.wKey=game.input.keyboard.addKey(Phaser.Keyboard.W);
this.dKey=game.input.keyboard.addKey(Phaser.Keyboard.D);
this.sKey=game.input.keyboard.addKey(Phaser.Keyboard.S);
this.mKey=game.input.keyboard.addKey(Phaser.Keyboard.M);
this.spaceKey=game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


this.attack=false;
this.damaged=false;

cursor=this.game.input.keyboard.createCursorKeys();


game.add.existing(this);
}
Hero.prototype=Object.create(Phaser.Sprite.prototype);
Hero.prototype.constructor=Hero;



Hero.prototype.update=function(){
// if(this.damaged==true){
// console.log(this.damaged);}
this.playerAttack();
this.playerMove();
if(this.mKey.isDown){
this.weapon.fire();}


// if(this.attack==true){
// console.log(this.attack);}
//game.physics.arcade.collide(this,rock, function(){console.log('wall hit');});
game.physics.arcade.collide(this,boarder, function(){console.log('wall hit');});
//game.physics.arcade.collide(this,traps, function(){this.body.x+=10;});
//game.physics.arcade.collide(this,traps,this.playerknockback);

}
Hero.prototype.render=function(){


}

//bug when pressing a w d at the same time while hitting the trap
Hero.prototype.playerMove = function(){

  if(this.wKey.isDown){
    /////weapon//////////
    this.weapon.bulletSpeed=-700;
    this.weapon.fireAngle=90;
    this.weapon.bullets.setAll('scale.x', -7);
    this.weapon.trackSprite(this,20,0);
    ///////////////////////
    //needs velocity for collision 
     if(this.dKey.isDown){

       this.animations.play('walk',20,false);
       this.body.velocity.x=vel;
       this.scale.setTo(0.3,0.3);
       direction=2;
     }
     else if(this.aKey.isDown){
       this.animations.play('walk',20,false);
       this.body.velocity.x=-vel;
       this.scale.setTo(-0.3,0.3);
       //this.playerAttack();
       direction=8;
     }

     else{this.animations.play('walkUp',10,false);
     this.body.velocity.y=-vel;
     direction=1;}

    }
    else if(this.sKey.isDown){
    ////weapon///////
    this.weapon.bulletSpeed=700;
    this.weapon.fireAngle=90;
    this.weapon.bullets.setAll('scale.x',7);
    this.weapon.trackSprite(this,20,0);
    //////////////////

     if(this.aKey.isDown){
       this.animations.play('walk',20,false);
       this.body.velocity.x=-vel;
       this.scale.setTo(-0.3,0.3);
       //this.playerAttack();
       direction=6;

     }     else if(this.dKey.isDown){
            this.animations.play('walk',20,false);
            this.body.velocity.x=vel;
            this.scale.setTo(0.3,0.3);
            direction=4;
          }
     else{
     this.body.velocity.y=vel;
     this.animations.play('walkDown',10,false);
     direction=5;}

    }
    else{
     this.body.velocity.y=0

    }

    if(this.aKey.isDown){
      ///////weapon///////
      this.weapon.bulletSpeed=-700;
      this.weapon.bullets.setAll('scale.x', -7);
      this.weapon.fireAngle=0;
      this.weapon.trackSprite(this,0,-20);
      ///////////
      if(this.wKey.isDown){
        //console.log('stuff');
        this.animations.play('walk',20,false);
        this.body.velocity.y=-vel;
        this.scale.setTo(-0.3,0.3);
        direction=8;
      }

     else if(this.sKey.isDown){
       this.animations.play('walk',20,false);
       this.body.velocity.y=vel;
       this.scale.setTo(-0.3,0.3);
       direction=6;

     }
     else{
     this.animations.play('walk',20,false);
     this.body.velocity.x=-vel;
     this.scale.setTo(-0.3,0.3);
     //this.playerAttack();
     direction=7;}

    }
    else if(this.dKey.isDown){
      ////weapon/////
      this.weapon.bulletSpeed=700;
      this.weapon.bullets.setAll('scale.x', 7);
      this.weapon.fireAngle=0;
      this.weapon.trackSprite(this,0,-20);
      ////////////////////
      if(this.wKey.isDown){
        //console.log('stuff');
        this.animations.play('walk',20,false);
        this.body.velocity.y=-vel;
        this.scale.setTo(0.3,0.3);
        direction=2;
      }

     else if(this.sKey.isDown){
       this.animations.play('walk',20,false);
       this.body.velocity.y=vel;
       this.scale.setTo(0.3,0.3);
       direction=4;

     }
      else{
     this.animations.play('walk',20,false);
     this.body.velocity.x=vel;
     this.scale.setTo(0.3,0.3);
     direction=3;}
    }

    else{
     this.body.velocity.x=0;
     this.animations.stop('walk',1);
     //couldn't find a way to set the frame to 0
    }


}
Hero.prototype.playerAttack=function(){
  if(this.spaceKey.isDown&&this.attack==false&&direction==5){
     this.animations.play('attackDown',70,false);
      this.attack=true;
      this.playerSword();
      slashSound.play('slash_sound');
      game.time.events.add(Phaser.Timer.SECOND*.45,function(){this.attack=false;},this);
        game.time.events.add(Phaser.Timer.SECOND*.2,function(){
          this.animations.stop('attackDown',1);
          this.sword.kill();

        },this)
    }
    else if(this.spaceKey.isDown&&this.attack==false&&direction==1){
       this.animations.play('attackUp',70,false);
        this.attack=true;
        this.playerSword();
        slashSound.play('slash_sound');
        //cooldown for the attack
        game.time.events.add(Phaser.Timer.SECOND*.45,function(){this.attack=false;},this);
          //how long it will take for the attack to be visable
          game.time.events.add(Phaser.Timer.SECOND*.2,function(){
            this.animations.stop('attackUp',1);
            this.sword.kill();

          },this);
      }
    else if(this.spaceKey.isDown&&this.attack==false&&direction==3){
       this.animations.play('attack',70,false);
        this.attack=true;
        this.playerSword();
        slashSound.play('slash_sound');
        game.time.events.add(Phaser.Timer.SECOND*.45,function(){this.attack=false;},this);
          game.time.events.add(Phaser.Timer.SECOND*.2,function(){
            this.animations.stop('attack',1);
            this.sword.kill();

          },this);
      }
      else if(this.spaceKey.isDown&&this.attack==false&&direction==7){
         this.animations.play('attack',70,false);
          this.attack=true;
          this.playerSword();
          slashSound.play('slash_sound');
          game.time.events.add(Phaser.Timer.SECOND*.45,function(){this.attack=false;},this);
          game.time.events.add(Phaser.Timer.SECOND*.2,function(){
              this.animations.stop('attack',1);
              this.sword.kill();

            },this);
        }
      else if(this.spaceKey.isDown&&this.attack==false){
                 this.animations.play('attack',70,false);
                  this.attack=true;
                  this.playerSword();
                  slashSound.play('slash_sound');
                  game.time.events.add(Phaser.Timer.SECOND*.45,function(){this.attack=false;},this);
                  game.time.events.add(Phaser.Timer.SECOND*.2,function(){
                      this.animations.stop('attack',1);
                      this.sword.destroy();

                    },this);
                }


}

Hero.prototype.playerSword=function(){
  if(direction==1){
  this.sword=this.addChild(this.game.add.sprite(0,-140,'slashUp'));
  this.sword.scale.setTo(2.05,2.05);
  this.sword.game.physics.enable(this.sword);
  this.sword.body.setSize(50,20,60,25);

}
else if (direction==2){
  this.sword=this.addChild(this.game.add.sprite(140,0,'slash'));
  this.sword.scale.setTo(1.7,1.7);
  this.sword.game.physics.enable(this.sword);
  this.sword.body.setSize(20,55,40,55);

}
else if (direction==4){
  this.sword=this.addChild(this.game.add.sprite(140,0,'slash'));
  this.sword.scale.setTo(1.7,1.7);
  this.sword.game.physics.enable(this.sword);
  this.sword.body.setSize(20,55,40,55);

}
  else if (direction==5){
    this.sword=this.addChild(this.game.add.sprite(0,140,'slashDown'));
    this.sword.scale.setTo(1.25,1.25);
    this.sword.game.physics.enable(this.sword);
    this.sword.body.setSize(95,30,100,65);

  }
  else if (direction==3){
    this.sword=this.addChild(this.game.add.sprite(140,0,'slash'));
    this.sword.scale.setTo(1.7,1.7);
    this.sword.game.physics.enable(this.sword);
    this.sword.body.setSize(20,55,40,55);

  }
  else if(direction==7){
    this.sword=this.addChild(this.game.add.sprite(140,0,'slash'));
    this.sword.scale.setTo(1.7,1.7);
    this.sword.game.physics.enable(this.sword);
    this.sword.body.setSize(20,55,30,55);

  }
  else if(direction==6){
    this.sword=this.addChild(this.game.add.sprite(140,0,'slash'));
    this.sword.scale.setTo(1.7,1.7);
    this.sword.game.physics.enable(this.sword);
    this.sword.body.setSize(20,55,30,55);

  }
  else if(direction==8){
    this.sword=this.addChild(this.game.add.sprite(140,0,'slash'));
    this.sword.scale.setTo(1.7,1.7);
    this.sword.game.physics.enable(this.sword);
    this.sword.body.setSize(20,55,30,55);

  }


  this.sword.body.immovable=true;
  this.sword.anchor.setTo(0.5,0.5);
  this.sword.animations.add('slashAttack',[0,1,2,3,4]);
  this.sword.animations.play('slashAttack',70,false);


}
Hero.prototype.playerknockback=function(){
  damagedSound.play('damaged_sound');


}

// player fireball attacks enemy // 
Hero.prototype.hitbyFireball=function(e,bullet){
  bullet.kill();
  if(e==boss){e.damage(1);};
    
  e.damage(1);
    
  if(e.health<=0){score+=1;}  
    
if(e==boss){bossHealthBar.setPercent(boss.health);}
    
else{scoreText.text=scoreString+score;}
  deathsound.play('death_sound');
}
