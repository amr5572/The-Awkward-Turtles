var sound,deathsound,bossSound,damagedSound;
var demo={},centerX=1500/2,centerY=1000/2,adam,speed=4;
var vel=400,rock,boarder,trap,grass,enemy,enemyGroup,scoreText,lifeText,wolfGroup;
var score=0,life=3,lifeString='',scoreString='',livingEnemies=[];
var hero,boss,wolf,floor,knockback=75;

var width=1376,height=1027,tween=false;
var cam_x=0,cam_y=0,tween=false;




demo.state0 = function(){};
demo.state0.prototype ={
preload: function(){


  //game.load.tilemap('dungeon','assets/tilemaps/dungeon.json',null,Phaser.Tilemap.TILED_JSON);
  game.load.tilemap('dungeon','assets/tilemaps/floorOne.json',null,Phaser.Tilemap.TILED_JSON);


  //game.load.image('move_tutorial','assets/background/MoveDirections.png');
  //game.load.image('attack_tutorial','assets/background/AttackDirections.png');
  ///add character sprite('any name','where the spritesheet is located',size of the individual sprite(x,y))
  //each need to have a variable created in above ex. hero, boss, or wolf for each instance of the enemy you would like to add
  //then create a .js file more information in the Boss_Demo.js
  // once created you will have to create it an instance of the enmey ex. [variable created]-->wolf=new [name of the functino/class]--->Hero(game,100,450);
  //for collision or overlap please look at update function in this file
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
  game.load.image('map_holder','assets/tilemaps/map_holder.png');
  game.load.image('tile_2','assets/tilemaps/tile_2.png');
  game.load.image('tile_3','assets/tilemaps/tile_3.png');
  game.load.image('grass','assets/tilemaps/grass.png');
  game.load.image('blood','assets/tilemaps/blood.png');









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
map.addTilesetImage('tile_2');
map.addTilesetImage('tile_3');
map.addTilesetImage('grass');
map.addTilesetImage('map_holder');
map.addTilesetImage('blood')

background=map.createLayer('Background');
floor=map.createLayer('Floor');
boarder=map.createLayer('Boarder');
traps=map.createLayer('Traps');




map.setCollisionBetween(2,3,true,'Boarder'); 
map.setCollisionBetween(7,10,true,'Traps'); 

/////////////


//var dsd =game.add.sprite(250,centerY,'move_tutorial')
//var sds =game.add.sprite(700,centerY,'attack_tutorial')

/// objectives ///
    tutorialStringMove = ('Use WASD to move.');
    tutorialStringAttack = ('Use SPACE to attack.');
    tutorialTextMove = game.add.text(17*32, 60, tutorialStringMove, {font: '40px Impact', fill: '#000'});
    tutorialTextMove = game.add.text(17*32, 110, tutorialStringAttack, {font: '40px Impact', fill: '#000'});
    
    tutorialRoomText = game.add.text(14*32, 160, 'Defeat the enemy and continue!', {font: '40px Impact', fill: '#000'});
    
    
    objectiveString=('Find and defeat the boss!');
    objectveText = game.add.text(420, 36*32, objectiveString, { font: '50px Impact', fill: '#000'});
    /////
    
    
//spawn locations
hero=new Hero(game,100,450);
//hero=new Hero(game, 90*32, 6*32);
boss=new Boss(game,107*32,146*32);

map.createFromObjects('wolfEnemy',12,'hero',0,true,false,wolfGroup,Wolf);



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


  wolfGroup=game.add.group();
  // wolfGroup.enableBody=true;
  // wolfGroup.physicsBodyType=Phaser.Physics.ARCADE;



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


  game.world.setBounds(0,0,6880,5120);

  game.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL;

   /////


//////
   ////score////
   scoreString=('Kills: ');
   scoreText = game.add.text(40, 100, scoreString + score, { font: '40px Impact', fill: '#fff' });
   scoreText.fixedToCamera=true;
   lifeString=('Life: ');
   lifeText = game.add.text(40, 40, lifeString + hero.life, { font: '40px Impact', fill: '#fff' });
   lifeText.fixedToCamera=true;
   /////
    
    
    
    /// hints ///
    /// To add text in different rooms --> coordinates (x,y) * 32
    hintString = ('HINT!');
    //hintText = game.add.text(49*32, 3*32, hintString, {font: '50px Impact', fill: '#fff'});
    
    grassString = ('Hint: foliage increases as you get closer to the boss !');
    grassText = game.add.text(58*32, 122.4*32, grassString, {font: '25px Impact', fill:'#000'});
    grassText = game.add.text(91*32, 13*32, grassString, {font: '30px Impact', fill:'#000'});
    
    trapString = ('DANGER !')
    trapText1 = game.add.text(6*32, 38*32, trapString, {font: '25px Impact', fill:'#000'});
    trapText2 = game.add.text(34.5*32, 38*32, trapString, {font: '25px Impact', fill:'#000'});
    trapText3 = game.add.text(6.5*32, 57.5*32, trapString, {font: '25px Impact', fill:'#000'});
    trapText4 = game.add.text(34*32, 57.5*32, trapString, {font: '25px Impact', fill:'#000'});
    ///
    
   cam_x=Math.floor(hero.x/width);
   cam_y=Math.floor(hero.y/height);

   game.camera.x=cam_x*width;
   game.camera.y=cam_y*height;




},
update: function(){

//game.camera.x=1376;

  this.camera_movements();





  ///for the enemy to collide with the player you will need to call game.phsics.arcade.overlap(object #1,object #2, function can be empty if you like) if you wish to overlap.
  //or game.phsics.arcade.collide(object #1,object #2, function can be empty if you like) if you wish for the objects to collide.

   game.physics.arcade.overlap(sword,boss,this.hitEnemy);
  //game.physics.arcade.overlap(sword,wolf,this.hitEnemy);
  //game.physics.arcade.collide(adam,grass, function(){console.log('rock hit');});
  game.physics.arcade.overlap(sword,enemyGroup,this.hitEnemyGroup);
  //game.physics.arcade.collide(hero,enemyGroup,this.hitbyEnemyGroup);

  if (hero.damaged==false){
    //have to turn dameged to true for them to work
    game.physics.arcade.collide(hero,traps, knockBackDirection(hero,traps));
    hitbyEnemy(hero,boss);
    //hitbyEnemy(hero,wolf);
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

camera_movements: function() {

  if (tween){
  return;
  }

  tween=true;
  var to_move=false;
  if(hero.y>(game.camera.y+height)){
  cam_y+=1;
  to_move=true;

  }else if(hero.y<game.camera.y){
  cam_y-=1;
  to_move=true;

  }else if(hero.x>(game.camera.x+width)){
  cam_x+=1;
  to_move=true;

  }else if(hero.x<game.camera.x){
  cam_x-=1;
  to_move=true;

  }

  if(to_move){

  var t=game.add.tween(game.camera).to({x:cam_x*width,y:cam_y*height},500,'Quad.easeOut');
  t.start()
  t.onComplete.add(function(){tween=false;},this)
  }
  else{
  tween=false;
  }



  }
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
function hitbyTrap(h){
game.physics.arcade.collide(h,traps,function(){
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
function knockBackDirection(h,t){
  game.physics.arcade.collide(h,t,function(){
    h.damaged=true;
    damagedSound.play('damaged_sound');

    lifeText.text=lifeString+h.life;
    if(direction==1){
      hero.body.y+=knockback;


    }else if(direction==2){
      hero.body.y+=knockback;
      hero.body.x-=knockback;

    }else if(direction==3){
      hero.body.x-=knockback;

    }else if(direction==4){
      hero.body.y-=knockback;
      hero.body.x-=knockback;

    }else if(direction==5){
      hero.body.y-=knockback;

    }else if(direction==6){
      hero.body.y-=knockback;
      hero.body.x+=knockback;

    }else if(direction==7){
      hero.body.x+=knockback;

    }else if(direction==8){
      hero.body.y+=knockback;
      hero.body.x+=knockback;

    }



  });
  if(h.damaged==true){
    h.alpha=0.2;

    damagedSound.play('damaged_sound');
    game.time.events.add(Phaser.Timer.SECOND*.15,function(){h.life-=1;h.damaged=false;h.alpha=1;},this);
    }


}
