var ball;
var database;
var position;

function setup(){
    database = firebase.database();
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    var ballposition = database.ref('Ball/Position');
    ballposition.on("value",readop,showerror);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        WritePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        WritePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        WritePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        WritePosition(0,+1);
    }
    drawSprites();
}

function WritePosition(x,y){

    database.ref('Ball/Position').set({
        'x':position.x+x,
        'y':position.y+y
    })
}

function readop(data){
    position = data.val();
    console.log(position.x);
    ball.x = position.x;
    ball.y = position.y;
}

function showerror (){
    console.log("error in writing to the database");
}