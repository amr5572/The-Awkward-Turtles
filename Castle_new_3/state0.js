var sound,deathsound,bossSound,damagedSound;
var demo={},centerX=1500/2,centerY=1000/2,adam,speed=4;
var vel=400,rock,boarder,trap,grass,lava,enemy,spikes,spikesGroup,enemyGroup,scoreText,lifeText,wolfGroup,skelGroup;
var score=0,life=3,lifeString='',scoreString='',livingEnemies=[],heroHealthBar;
var hero,boss,wolf,skeleton,mage,floor,knockback=75;

var width=1376,height=1027,tween=false;
var cam_x=0,cam_y=0,tween=false;


demo.state0 = function(){};
demo.state0.prototype ={
preload: function(){

// load tilemap //
  game.load.tilemap('dungeon','assets/tilemaps/floorOne1.json',null,Phaser.Tilemap.TILED_JSON);

    ///add character sprite('any name','where the spritesheet is located',size of the individual sprite(x,y))
  //each need to have a variable created in above ex. hero, boss, or wolf for each instance of the enemy you would like to add
  //then create a .js file more information in the Boss_Demo.js
  // once created you will have to create it an instance of the enmey ex. [variable created]-->wolf=new [name of the functino/class]--->Hero(game,100,450);
  //for collision or overlap please look at update function in this file

// load character sprites //
  game.load.spritesheet('hero','assets/spritesheets/demoCastleHero.png',320,320);
  game.load.spritesheet('boss','assets/spritesheets/werewolfBoss.png',350,320);
  game.load.spritesheet('wolf','assets/spritesheets/werewolfMob.png',350,315);
  game.load.spritesheet('skeleton','assets/spritesheets/skeletonRanged.png',320,320);
  game.load.spritesheet('mage','assets/spritesheets/HoodedFigure.png',320,320);
  game.load.image('heart','assets/images/heartFull.png');



// load attack assets //
  game.load.spritesheet('spikes_spsh','assets/spritesheets/spikes.png',32,32);
  game.load.spritesheet('fireballEnemy','assets/spritesheets/Fireball2.png');
  game.load.spritesheet('fireball','assets/spritesheets/Fireball.png');
  game.load.spritesheet('slash','assets/spritesheets/heroSwordSlash.png',90,170);
  game.load.spritesheet('slashUp','assets/spritesheets/heroSwordSlashUP.png',170,90);
  game.load.spritesheet('slashDown','assets/spritesheets/heroSwordSlashDown.png',290,170);
  game.load.audio('end','assets/sounds/Dark_Dungeon_AMBIENT_LOOP.mp3');


// load tile images //

  game.load.image('lava','assets/tilemaps/lava.png');
  //game.load.image('lava','assets/tilemaps/lavados.png');
  game.load.image('wall_small','assets/tilemaps/wall_small.png');
  game.load.image('floor_blue','assets/tilemaps/floor_blue.png');
  game.load.image('map_holder','assets/tilemaps/map_holder.png');
  game.load.image('tile_2','assets/tilemaps/tile_2.png');
  game.load.image('tile_3','assets/tilemaps/tile_3.png');
  game.load.image('grass','assets/tilemaps/grass.png');
  game.load.image('blood','assets/tilemaps/blood.png');


// load audio files //
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
map.addTilesetImage('lava')

background=map.createLayer('Background');
floor=map.createLayer('Floor');
boarder=map.createLayer('Boarder');
traps=map.createLayer('Traps');
lava=map.createLayer('Lava');




map.setCollisionBetween(2,3,true,'Boarder'); 
map.setCollisionBetween(7,10,true,'Traps'); 


/// objectives ///
    tutorialStringMove = ('Use WASD to move.');
    tutorialStringFireball = ('Use M for WEAK fireball.');
    tutorialStringAttack = ('Use SPACEBAR for STRONG sword.');
    tutorialTextMove = game.add.text(16*32, 15*32, tutorialStringMove, {font: '50px Impact', fill: '#000'});
    tutorialTextMove = game.add.text(13*32, 46*32, tutorialStringFireball, {font: '50px Impact', fill: '#000'});
    tutorialTextMove = game.add.text(11*32, 81*32, tutorialStringAttack, {font: '50px Impact', fill: '#000'});

//    tutorialRoomText = game.add.text(14*32, 160, 'Defeat the enemy and continue!', {font: '40px Impact', fill: '#000'});


    objectiveString=('Find and defeat the boss!');
    objectveText = game.add.text(57*32, 78*32, objectiveString, { font: '50px Impact', fill: '#000'});
    /////

map.createFromObjects('spikes',18,'',0,true,false,spikesGroup,Spikes);
//hero=new Hero(game,21.5*32,10*32);
hero=new Hero(game,10*32,10*32);

boss=new Boss(game,107*32,146*32);
mage=new Mage(game,91*32,135*32);



//name in the object layer, gid number, id of the image,frame,exists,
map.createFromObjects('wolfEnemy',11,'',0,true,false,wolfGroup,Wolf);

map.createFromObjects('skeletonEnemy',12,'',0,true,false,skelGroup,Skeleton);



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
 enemyGroup=game.add.group();
 enemyGroup.enableBody=true;
 enemyGroup.physicsBodyType=Phaser.Physics.ARCADE;


  wolfGroup=game.add.group();
  skelGroup=game.add.group();

////////

/////
  game.world.setBounds(0,0,6880,5120);

  game.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL;
/////

   ////score////
   scoreString=('Kills: ');
   scoreText = game.add.text(1130, 40, scoreString + score, { font: '70px Impact', fill: '#fff' });
   scoreText.fixedToCamera=true;
//   lifeString=('Life: ');
//   lifeText = game.add.text(45, 40, lifeString + hero.health, { font: '70px Impact', fill: '#fff' });
//   lifeText.fixedToCamera=true;
   /////

/// camera ///
   cam_x=Math.floor(hero.x/width);
   cam_y=Math.floor(hero.y/height);

   game.camera.x=cam_x*width;
   game.camera.y=cam_y*height;



    hpText=game.add.text(40,55,"HP",{font:'40px Impact', fill:'#fff'});
    hpText.fixedToCamera=true;

// setup boss health display //
    bossHealthBar = new HealthBar(this.game,{width:500,height:60});
    bossHealthBar.setPosition(108*32,158.5*32);
    bossHealthBar.setPercent(boss.health);

},
update: function(){

  this.camera_movements();


  ///for the enemy to collide with the player you will need to call game.phsics.arcade.overlap(object #1,object #2, function can be empty if you like) if you wish to overlap.
  //or game.phsics.arcade.collide(object #1,object #2, function can be empty if you like) if you wish for the objects to collide.

   game.physics.arcade.overlap(hero.sword,boss,this.hitEnemy);
  //game.physics.arcade.overlap(sword,wolf,this.hitEnemy);
  //game.physics.arcade.collide(adam,grass, function(){console.log('rock hit');});
  //game.physics.arcade.overlap(hero.sword,enemyGroup,this.hitEnemyGroup);
  //game.physics.arcade.collide(hero,enemyGroup,this.hitbyEnemyGroup);

  if (hero.damaged==false){
    //have to turn dameged to true for them to work

    game.physics.arcade.collide(hero,traps, knockBackDirection(hero,traps));
    hitbyEnemy(hero,boss);
  }

  livingen();
  //enemyTowardsPlayer(boss,hero);
  //console.log(boss.life);

},

render: function(){
///bug testing bounderis
    //
}
,
hitEnemy: function(s,e){
e.damage(1); if(e==boss){bossHealthBar.setPercent(boss.health);}

if(e.health<=0){bossSound.stop('boss_sound'); mage.kill(); mage.alive=false; score+=1; bossHealthBar.kill(); bossText = game.add.text(104*32, 157.4*32, "Cleared!", { font: '70px Impact', fill: '#fff' });
}

scoreText.text=scoreString+score;
deathsound.play('death_sound');
},

//hitEnemyGroup: function(b,e){
//console.log('hitgroup');
//
//e.kill();
//score+=1;
//scoreText.text=scoreString+score;
//
//deathsound.play('death_sound');
//
//},

//hitbyEnemyGroup: function(b,e){
////console.log('hitbygroup');
//hero.damage(5);
////life-=1;
//heroHealthBar.setPercent(hero.health/80 * 100);
//lifeText.text=lifeString+hero.health;
//scoreText.text=scoreString+score;
//deathsound.play('death_sound');
//},

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
  livingEnemies.length=0;
  enemyGroup.forEachAlive(function(enemy){
   livingEnemies.push(enemy);
 })

}


// boss attacks hero //
function hitbyEnemy(h,e){
  game.physics.arcade.collide(h,e,function(){
  h.damaged=true;
  console.log('hitbyboss');
  if(h.damaged==true){
  h.alpha=0.2;
  h.damage(5);
  h.heroHealthBar.setPercent(h.health/80 * 100);
  damagedSound.play('damaged_sound');
  game.time.events.add(Phaser.Timer.SECOND*.3,function(){h.damaged=false;h.alpha=1;},this);
  }
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
  h.life-=5;
  h.damage(5);
  h.heroHealthBar.setPercent(h.health/80 * 100);
  damagedSound.play('damaged_sound');
  game.time.events.add(Phaser.Timer.SECOND*.3,function(){h.damaged=false;h.alpha=1;},this);
  }
  lifeText.text=lifeString+h.life;
  scoreText.text=scoreString+score;
  deathsound.play('death_sound');


})

}
// enemyGroup attacks player //
function knockBackDirection(h,t){
  game.physics.arcade.collide(h,t,function(){
    h.damaged=true;
    damagedSound.play('damaged_sound');

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
    game.time.events.add(Phaser.Timer.SECOND*.15,function(){
        h.damage(3);
        h.heroHealthBar.setPercent(hero.health/80 * 100);
        h.damaged=false;
        h.alpha=1;
    },this);
    }


}
