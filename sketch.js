var blob;

//Firebase Values
var position;
var database;

function setup() {
    //Firebase Database
    database = firebase.database();
    //Others
    createCanvas(500, 500);
    blob = createSprite(250, 250, 10, 10);
    blob.shapeColor = "red";
    var blobPos = database.ref('Ball/Positions');
    blobPos.on("value", readPosition, showError);
}

function draw() {
    background("white");
    if (position != undefined) {
    if (keyDown(LEFT_ARROW)) {
        changePosition(blob, -1, 0);
    } else if (keyDown(RIGHT_ARROW)) {
        changePosition(blob, 1, 0);
    } else if (keyDown(UP_ARROW)) {
        changePosition(blob, 0, -1);
    } else if (keyDown(DOWN_ARROW)) {
        changePosition(blob, 0, +1);
    }
}
    //console.log(Positions.x);
    writePosition();
    drawSprites();
}

function changePosition(obj, x, y) {
    obj.x = obj.x + x;
    obj.y = obj.y + y;
}

function readPosition(data) {
    position = data.val();
    blob.x = position.x;
    blob.y = position.y;
}

function writePosition() {
    database.ref('Ball/Positions').set({
    'x': Positions.X_Position + X_Position ,
    'y': Positions.Y_Position + Y_Position
    })
}
function showError() {
    console.log("Error In Writing To The Database");
}