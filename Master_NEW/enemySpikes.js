
Spikes=function(game,x,y){
Phaser.Sprite.call(this,game,x,y,'spikes_spsh');
this.scale.setTo(1,1);
this.anchor.setTo(0.5,0.5);
this.game.physics.enable(this);
this.body.immovable=true;
this.body.setSize(32,32,0,0);
this.body.collideWorldBounds=true;
this.animations.add('look',[0,1]);



cursor=this.game.input.keyboard.createCursorKeys();
//this.addChild(this.weapon=game.add.sprite(10,20,-50,-100,'enemy'));

game.add.existing(this);

}


Spikes.prototype=Object.create(Phaser.Sprite.prototype);
Spikes.prototype.constructor=Spikes;


Spikes.prototype.update=function(){
this.animations.play('look',1,true);

if(hero.damaged==false&&this.animations.currentFrame.index==0){

   game.physics.arcade.collide(hero,this, knockBackDirection(hero,this));
}

}



// Player hits Spikes //
Spikes.prototype.hitEnemy= function(s,e){
   e.damage(1); if(e.health<=0){console.log('dead'); bossSound.stop('boss_sound'); score+=1;}
    scoreText.text=scoreString+score; deathsound.play('death_sound');
    }
Spikes.prototype.render=function(){
    game.debug.body(this);

    }
