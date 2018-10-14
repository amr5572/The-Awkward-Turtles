var game = new Phaser.Game(1500, 1000, Phaser.CANVAS);
game.state.add('state1', demo.state1);
game.state.add('state2', demo.state2);
game.state.start('state1');
