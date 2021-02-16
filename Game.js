class Game{
    constructor(){
        this.score = 0;
    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }
    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
    player1 = createSprite(200,500);
    player1.addImage("player1",player_img);
    
    player2 = createSprite(800,500);
    player2.addImage("player2", player_img);
    players=[player1,player2];

    score = 0 ;

        }
    
    play(){
        
        form.hide();

        Player.getPlayerInfo();
        image(back_img, 0, 0, 1000, 800);
        var x =100;
        var y=200;
        var index =0;

        if(player.index !== undefined){
            for(var i = 0 ; i < fruitGroup.length ; i++){
                if(fruitGroup.get(i).isTouching(player1)){
                   fruitGroup.get(i).destroy();
                   player1.score++
                   player1.update();
                }
            }
            for(var i = 0 ; i < fruitGroup.length ; i++){
                if(fruitGroup.get(i).isTouching(player2)){
                   fruitGroup.get(i).destroy();
                   player2.score++
                   player2.update();
                }
            }
        }

        for(var plr in allPlayers){
            index = index+1;
            x = 500-allPlayers[plr].distance;
            y=500;
            
            players[index -1].x = x;
            players[index - 1].y = y;

            // Differentiate the main player by printing
            // the name of the player on the basket. 
            if(index === player.index){
                fill("black");
                textSize(30);
                text(allPlayers[plr].name,x - 25 , y + 25)
            }
        textSize(25);
        fill("white");
        text("Player 1 : " + player1.score,50,50);
        text("Player 2 : " + player2.score,50,100);

        }


        // Give movements for the players using arrow keys
        if(keyIsDown(LEFT_ARROW)&& player.index !==null){
            player.distance += 10 ;
            player.update();
        }
        else if(keyDown(RIGHT_ARROW)&& player.index !==null){
            player.distance -= 10 ;
            player.update();
        }
        if(player.score >= 10){
            this.end();
        }
        drawSprites();
    }
    
    end(){
        game.update(2);
        clear();
        fill("blue");
        textSize(40);
        text("Game Over" , 350,300);
        player1.destroy();
        player2.destroy();
        fruitGroup.destroy();
        fruitGroup.veloctiyY = 0;
        console.log("Game Ended");
    }
    
}