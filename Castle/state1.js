var sound,deathsound;
var demo={},centerX=1500/2,centerY=1000/2,adam,speed=4;
var vel=400,rock,grass,enemy,enemyGroup,scoreText,lifeText;
var score=0,life=3,lifeString='',scoreString='',livingEnemies=[];
var hero,boss;
demo.state1 = function(){};
demo.state1.prototype ={
preload: function(){

  game.load.tilemap('dungeon','assets/tilemaps/dungeon.json',null,Phaser.Tilemap.TILED_JSON);
  game.load.image('grass','assets/tilemaps/grass.png');
  game.load.spritesheet('hero','assets/spritesheets/demoCastleHero.png',320,320);
  game.load.spritesheet('boss','assets/spritesheets/demoBossSheet.png',320,320);
  game.load.audio('end','assets/sounds/Dark_Dungeon_AMBIENT_LOOP.mp3');
  game.load.image('enemy','assets/spritesheets/enemy.png',240,302);
  game.load.image('tile_1','assets/tilemaps/tile_1.png');
  game.load.image('tile_2','assets/tilemaps/tile_2.png');
  game.load.image('tile_3','assets/tilemaps/tile_3.png');
  game.load.audio('death_sound','assets/sounds/ANIMAL_Bird_Crow_01_mono.mp3');

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
//boss=new Boss(game,50,400);



////sound///

sound=game.add.audio('end');
sound.addMarker('end',0,240);
sound.play('end');
deathsound=game.add.audio('death_sound');
deathsound.addMarker('death_sound',0,2);
/////////////



/////enemy////

enemy=game.add.sprite(100,200,'enemy');
enemy.scale.setTo(0.5,0.5);
game.physics.enable(enemy);

 enemyGroup=game.add.group();
 enemyGroup.enableBody=true;
 enemyGroup.physicsBodyType=Phaser.Physics.ARCADE;

for(var i=0;i<5; i++){

  enemyGroup.create(500,150*i+100,'enemy');
}
enemyGroup.setAll('anchor.y',0.5);
enemyGroup.setAll('anchor.x',0.5);
enemyGroup.setAll('scale.y',0.15);
enemyGroup.setAll('scale.x',0.15);


//game.add.tween(enemy).to({x:'+400'}, 2000,'Quad.easeOut',true,100,false,true).loop(true);
game.add.tween(enemyGroup).to({x:'+400'}, 2000,'Quad.easeOut',true,100,false,true).loop(true);


////////


  game.world.setBounds(0,0,2813,1000);

  game.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL;


   /////


//////
   ////score////
   scoreString=('Kills: ');
   scoreText = game.add.text(10, 10, scoreString + score, { font: '100px Arial', fill: '#fff' });
   lifeString=('Life: ');
   lifeText = game.add.text(10, 150, lifeString + life, { font: '100px Arial', fill: '#fff' });

   /////

},
update: function(){
  game.physics.arcade.collide(hero,rock, function(){console.log('wall hit');});
  game.physics.arcade.collide(enemy,rock, function(){console.log('wall hit');});
  game.physics.arcade.overlap(hero,enemy,this.hitEnemy);
  //game.physics.arcade.collide(adam,grass, function(){console.log('rock hit');});
  game.physics.arcade.overlap(hero,enemyGroup,this.hitEnemyGroup);
  livingen();
  enemyTowardsPlayer(enemy,hero);





},
hitEnemy: function(){
game.physics.arcade.collide (hero,enemy,function(){enemy.kill(); life-=1
lifeText.text=lifeString+life;})

score+=1;
scoreText.text=scoreString+score;
 deathsound.play('death_sound');
},

hitEnemyGroup: function(b,e){
console.log('hitgroup');

e.kill();
score+=1;
scoreText.text=scoreString+score;
deathsound.play('death_sound');
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
        console.log(delta);
        e.body.velocity.x = 200;

      }

    }

    else{
      e.body.velocity.x = -200;

    }

  }

}
