var cursor,sword,direction=3;
Hero=function(game,x,y){
Phaser.Sprite.call(this,game,x,y,'hero');
this.scale.setTo(0.3,0.3);
this.anchor.setTo(0.5,0.5);
this.game.physics.enable(this);
this.body.collideWorldBounds=true;
this.animations.add('walk',[0,1,2,3,4,5,6,7,8,9,10,11,12]);
this.animations.add('walkUp',[13,14,15]);
this.animations.add('walkDown',[16,17,18]);


this.animations.add('attack',[19,20,21,22,23,24]);
this.animations.add('attackUp',[25,26,27,28]);
this.animations.add('attackDown',[29,30,31,32,33,34]);
this.life=100;

// this.game.camera.follow(this);
// this.game.camera.deadzone=new Phaser.Rectangle(0,0,1376,1027);

this.aKey=game.input.keyboard.addKey(Phaser.Keyboard.A);
this.wKey=game.input.keyboard.addKey(Phaser.Keyboard.W);
this.dKey=game.input.keyboard.addKey(Phaser.Keyboard.D);
this.sKey=game.input.keyboard.addKey(Phaser.Keyboard.S);
this.spaceKey=game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


this.attack=false;
this.damaged=false;

cursor=this.game.input.keyboard.createCursorKeys();


game.add.existing(this);
}
Hero.prototype=Object.create(Phaser.Sprite.prototype);
Hero.prototype.constructor=Hero;



Hero.prototype.update=function(){
if(this.damaged==true){
console.log(this.damaged);}
this.playerAttack();
this.playerMove();



// if(this.attack==true){
// console.log(this.attack);}
//game.physics.arcade.collide(this,rock, function(){console.log('wall hit');});
game.physics.arcade.collide(this,boarder, function(){console.log('wall hit');});
//game.physics.arcade.collide(this,traps, function(){this.body.x+=10;});
//game.physics.arcade.collide(this,traps,this.playerknockback);

}
//bug when pressing a w d at the same time while hitting the trap
Hero.prototype.playerMove = function(){




  if(this.wKey.isDown){
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
          sword.kill();

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
            sword.kill();

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
            sword.kill();

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
              sword.kill();

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
                      sword.kill();

                    },this);
                }


}

Hero.prototype.playerSword=function(){
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


}
Hero.prototype.playerknockback=function(){
  damagedSound.play('damaged_sound');


}
