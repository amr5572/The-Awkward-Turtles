var sound,deathsound,bossSound,damagedSound;
var demo={},centerX=1500/2,centerY=1000/2,adam,speed=4;
var vel=400,rock,boarder,grass,enemy,enemyGroup,scoreText,lifeText;
var score=0,life=3,lifeString='',scoreString='',livingEnemies=[];
var hero,boss,wolf,floor;
demo.state0 = function(){};
demo.state0.prototype ={
preload: function(){

  //game.load.tilemap('dungeon','assets/tilemaps/dungeon.json',null,Phaser.Tilemap.TILED_JSON);
  game.load.tilemap('dungeon','assets/tilemaps/test_room.json',null,Phaser.Tilemap.TILED_JSON);

  //game.load.tilemap('dungeon','assets/tilemaps/Floor_One.json',null,Phaser.Tilemap.TILED_JSON);
  //game.load.image('LockedDoor','assets/tilemaps/LockedDoor.png');
  //game.load.image('grass','assets/background/back-ground.png');

    game.load.image('move_tutorial','assets/background/MoveDirections.png');
    game.load.image('attack_tutorial','assets/background/AttackDirections.png');

  game.load.spritesheet('hero','assets/spritesheets/demoCastleHero.png',320,320);
  game.load.spritesheet('boss','assets/spritesheets/demoBossSheet.png',320,320);
  game.load.spritesheet('wolf','assets/spritesheets/werewolfMob.png',350,315);
  game.load.spritesheet('slash','assets/spritesheets/heroSwordSlash.png',90,170);
  game.load.spritesheet('slashUp','assets/spritesheets/heroSwordSlashUP.png',170,90);
  game.load.spritesheet('slashDown','assets/spritesheets/heroSwordSlashDown.png',290,170);
  game.load.audio('end','assets/sounds/Dark_Dungeon_AMBIENT_LOOP.mp3');
  game.load.image('enemy','assets/spritesheets/enemy.png',240,302);
  game.load.image('wall_small','assets/tilemaps/wall_small.png');
  game.load.image('floor_blue','assets/tilemaps/floor_blue.png');

  game.load.audio('death_sound','assets/sounds/ANIMAL_Bird_Crow_01_mono.mp3');
  game.load.audio('slash_sound','assets/sounds/SWORD_Whoosh_Hit.mp3');
  game.load.audio('boss_sound','assets/sounds/MONSTER_Breath.mp3');
  game.load.audio('damaged_sound','assets/sounds/hero_damaged.mp3');

},
create: function(){

  game.physics.startSystem(Phaser.Physics.ARCADE);

  game.stage.backgroundColor='#DDDDDD';
  console.log('state0');
  addChangeStateEventListener();

////////map//////
  var map= game.add.tilemap('dungeon');
  //map.addTilesetImage('LockedDoor');
map.addTilesetImage('wall_small');
map.addTilesetImage('floor_blue');

floor=map.createLayer('Floor');
boarder=map.createLayer('Boarder');



map.setCollisionBetween(2,3,true,'Boarder');

/////////////


var dsd =game.add.sprite(250,centerY,'move_tutorial')
var sds =game.add.sprite(700,centerY,'attack_tutorial')



hero=new Hero(game,100,450);
//boss=new Boss(game,50,400);




////sound///

sound=game.add.audio('end');
sound.addMarker('end',0,240);
sound.play('end');
deathsound=game.add.audio('death_sound');
deathsound.addMarker('death_sound',0,2);

bossSound=game.add.audio('boss_sound');
bossSound.addMarker('boss_sound',0,7);


slashSound=game.add.audio('slash_sound');
slashSound.addMarker('slash_sound');

slashSound=game.add.audio('slash_sound');
slashSound.addMarker('slash_sound');

damagedSound=game.add.audio('damaged_sound');
damagedSound.addMarker('damaged_sound');

/////////////

/////enemy////

// enemy=game.add.sprite(100,200,'enemy');
// enemy.scale.setTo(0.5,0.5);
// game.physics.enable(enemy);

 enemyGroup=game.add.group();
 enemyGroup.enableBody=true;
 enemyGroup.physicsBodyType=Phaser.Physics.ARCADE;



for(var i=0;i<1; i++){

  //enemyGroup.create(500,150*i+100,'wolf');
  enemyGroup.create(1000,centerY,'wolf');

}
enemyGroup.setAll('anchor.y',0.5);
enemyGroup.setAll('anchor.x',0.5);
enemyGroup.setAll('scale.y',0.6);
enemyGroup.setAll('scale.x',0.6);
enemyGroup.callAll('animations.add','animations','wolf',[0,1],2,true);
enemyGroup.callAll('play',null,'wolf');


//game.add.tween(enemy).to({x:'+400'}, 2000,'Quad.easeOut',true,100,false,true).loop(true);
//ame.add.tween(enemyGroup).to({x:'+400'}, 2000,'Quad.easeOut',true,100,false,true).loop(true);


////////


  game.world.setBounds(0,0,1300,1000);

  game.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL;

   /////


//////
   ////score////
   scoreString=('Kills: ');
   scoreText = game.add.text(10, 10, scoreString + score, { font: '100px Arial', fill: '#fff' });
   lifeString=('Life: ');
   lifeText = game.add.text(10, 150, lifeString + hero.life, { font: '100px Arial', fill: '#fff' });

   /////

},
update: function(){



  if(hero.x>1300&&score==1){

    game.state.start('state1');
  }


  //game.physics.arcade.collide(hero,rock, function(){console.log('wall hit');});
  //game.physics.arcade.collide(hero,wolf, function(){console.log('wall hit');});
  //game.physics.arcade.collide(boss,wolf, function(){console.log('wall hit');});
  //game.physics.arcade.collide(boss,rock, function(){console.log('wall hit');});
  //game.physics.arcade.collide(boss,hero, function(){console.log('wall hit');});
  // game.physics.arcade.overlap(sword,boss,this.hitEnemy);
  //game.physics.arcade.collide(adam,grass, function(){console.log('rock hit');});
  game.physics.arcade.overlap(sword,enemyGroup,this.hitEnemyGroup);
  //game.physics.arcade.collide(hero,enemyGroup,this.hitbyEnemyGroup);

  if (hero.damaged==false){

  }

  livingen();
  //enemyTowardsPlayer(boss,hero);
  //console.log(boss.life);

},

render: function(){
///bug testing bounderis
  // game.debug.geom(hero.getBounds());
  // game.debug.geom(wolf.getBounds());
  //game.debug.geom(enemyGroup.getBounds());
}
,
hitEnemy: function(s,e){
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
},

hitEnemyGroup: function(b,e){
//console.log('hitgroup');

e.kill();
score+=1;
scoreText.text=scoreString+score;

deathsound.play('death_sound');

},

hitbyEnemyGroup: function(b,e){
//console.log('hitbygroup');

//life-=1;
lifeText.text=lifeString+hero.life;
scoreText.text=scoreString+score;
deathsound.play('death_sound');
},

camera_movements: function(){}


};

function changeState(i,stateNum){
  console.log('state'+stateNum);
  game.state.start('state'+stateNum);

}
function addKeyCallback(key,fn,args){

  game.input.keyboard.addKey(key).onDown.add(fn,null,null,args);

}

function addChangeStateEventListener(){

  addKeyCallback(Phaser.Keyboard.ZERO,changeState,0);
  addKeyCallback(Phaser.Keyboard.ONE,changeState,1);


}
function livingen(){
  //console.log('working?');
  livingEnemies.length=0;
  enemyGroup.forEachAlive(function(enemy){
   livingEnemies.push(enemy);
 })

}
function enemyTowardsPlayer(e,a){
  targetAngle=game.math.angleBetween(e.x,e.y,a.x,a.y);
  delta=targetAngle*(180/Math.PI)
  if(e.roation!=targetAngle){


    if(delta>-90&&delta<90){
      //console.log(delta);
      e.body.velocity.x = 200;
      if(delta<140&&delta>70){
        //onsole.log(delta);
        e.body.velocity.y = 200;
      }
      else if(delta<-70&&delta>-140){
        //console.log(delta);
        e.body.velocity.y = -200;

      }
      else if(delta<20&&delta>-20){
        //console.log(delta);
        e.body.velocity.x = 200;

      }

    }

    else{
      e.body.velocity.x = -200;

    }

  }

}

function hitbyEnemy(h,e){
game.physics.arcade.collide(h,e,function(){
  h.damaged=true;
  console.log('hitbyboss');
  if(h.damaged==true){
  h.alpha=0.2;
  h.life-=1;
  damagedSound.play('damaged_sound');
  game.time.events.add(Phaser.Timer.SECOND*.3,function(){h.damaged=false;h.alpha=1;},this);
  }
  lifeText.text=lifeString+h.life;
  scoreText.text=scoreString+score;
  deathsound.play('death_sound');


})

}
