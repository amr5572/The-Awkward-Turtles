
demo.state1 = function(){};
demo.state1.prototype ={
preload: function(){

  game.load.tilemap('dungeon','assets/tilemaps/test_room.json',null,Phaser.Tilemap.TILED_JSON);
  //game.load.tilemap('dungeon','assets/tilemaps/Floor_One.json',null,Phaser.Tilemap.TILED_JSON);
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


//door=map.createLayer('Door');
boarder=map.createLayer('Boarder');
floor=map.createLayer('Floor');



 map.setCollisionBetween(1,true,'Boarder');
/////////////


hero=new Hero(game,20,450);
wolf=new Wolf(game,750,30);



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



////////

enemyGroup=game.add.group();
enemyGroup.enableBody=true;
enemyGroup.physicsBodyType=Phaser.Physics.ARCADE;

for(var i=0;i<4; i++){

 enemyGroup.create(500,150*i+100,'wolf');

}
enemyGroup.setAll('anchor.y',0.5);
enemyGroup.setAll('anchor.x',0.5);
enemyGroup.setAll('scale.y',0.6);
enemyGroup.setAll('scale.x',0.6);
enemyGroup.callAll('animations.add','animations','wolf',[0,1],2,true);
enemyGroup.callAll('play',null,'wolf');




  game.world.setBounds(0,0,2700,1000);

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

  if(hero.x>1300&&score>11){

    game.state.start('state2');
  }


  //game.physics.arcade.collide(hero,rock, function(){console.log('wall hit');});
  //game.physics.arcade.collide(hero,wolf, function(){console.log('wall hit');});
  //game.physics.arcade.collide(boss,wolf, function(){console.log('wall hit');});
  //game.physics.arcade.collide(boss,rock, function(){console.log('wall hit');});
  //game.physics.arcade.collide(boss,hero, function(){console.log('wall hit');});
  game.physics.arcade.overlap(sword,wolf,this.hitEnemy);


  //game.physics.arcade.collide(adam,grass, function(){console.log('rock hit');});
  game.physics.arcade.overlap(sword,enemyGroup,this.hitEnemyGroup);
  //game.physics.arcade.collide(hero,enemyGroup,this.hitbyEnemyGroup);

  if (hero.damaged==false){
  hitbyEnemy(hero,wolf);

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
