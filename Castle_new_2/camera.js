camera_movements: function() {

       if ( this.tween ) {
           return;
       }

       this.tween = true;
       var speed = 400;
       var to_move = false;

       if ( this.player.y > game.camera.y + this.height ) {

           this.camera.y += 1;
           to_move = true;

       } else if ( this.player.y < game.camera.y ) {

           this.camera.y -= 1;
           to_move = true;

       } else if ( this.player.x > game.camera.x + this.width ) {

           this.camera.x += 1;
           to_move = true;

       } else if ( this.player.x < game.camera.x ) {

           this.camera.x -= 1;
           to_move = true;

       }

       // if the camera should move then run the tween
       if ( to_move ) {

           var t = game.add.tween( game.camera ).to(
               {
                   x: this.camera.x * this.width,
                   y: this.camera.y * this.height
               },
               speed
           );

           t.start();

           t.onComplete.add(
               function() {
                   this.tween = false;
               },
               this
           );

       } else {

           this.tween = false;

       }

   },
