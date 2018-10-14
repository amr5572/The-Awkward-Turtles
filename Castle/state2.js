
demo.state2 = function(){};
demo.state2.prototype ={
preload: function(){

  game.load.tilemap('dungeon','assets/tilemaps/dungeon.json',null,Phaser.Tilemap.TILED_JSON);
  //game.load.tilemap('dungeon','assets/tilemaps/Floor_One.json',null,Phaser.Tilemap.TILED_JSON);
  game.load.image('grass','assets/tilemaps/grass.png');
  //game.load.image('grass','assets/background/back-ground.png');

  game.load.image('tile_1','assets/tilemaps/tile_1.png');
  game.load.image('tile_2','assets/tilemaps/tile_2.png');
  game.load.image('tile_3','assets/tilemaps/tile_3.png');
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
  map.addTilesetImage('tile_1');
  map.addTilesetImage('tile_2');
  map.addTilesetImage('grass');
  map.addTilesetImage('tile_3');

  grass=map.createLayer('tile_1');
  rock=map.createLayer('tile_3');



  map.setCollisionBetween(12,14,true,'tile_3');
  map.setCollisionBetween(1,true,'tile_1');
/////////////


hero=new Hero(game,750,900);
boss=new Boss(game,50,400);




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



  //game.physics.arcade.collide(hero,rock, function(){console.log('wall hit');});
  //game.physics.arcade.collide(hero,wolf, function(){console.log('wall hit');});
  //game.physics.arcade.collide(boss,wolf, function(){console.log('wall hit');});
  //game.physics.arcade.collide(boss,rock, function(){console.log('wall hit');});
  //game.physics.arcade.collide(boss,hero, function(){console.log('wall hit');});
  game.physics.arcade.overlap(sword,boss,this.hitEnemy);
  //game.physics.arcade.collide(adam,grass, function(){console.log('rock hit');});
  game.physics.arcade.overlap(sword,enemyGroup,this.hitEnemyGroup);
  game.physics.arcade.collide(hero,enemyGroup,this.hitbyEnemyGroup);

  if (hero.damaged==false){
  hitbyEnemy(hero,boss);

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
