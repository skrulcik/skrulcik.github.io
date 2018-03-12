/*******************************************************************************
 * Colors & Fills
 ******************************************************************************/
var blueMaterial = function() { specularMaterial(0, 94, 140); };
var environmentLight = function() {
    //move your mouse to change light position
    var locX = mouseX - width / 2;
    var locY = height - mouseY * 2;
    // to set the light position,
    // think of the world's coordinate as:
    // -width/2,-height/2 -------- width/2,-height/2
    //                |            |
    //                |     0,0    |
    //                |            |
    // -width/2,height/2--------width/2,height/2
    pointLight(255, 255, 255, locX, locY, 0);
    pointLight(255, 255, 255, locX, locY, 0);
    pointLight(255, 255, 255, locX, locY, 0);
    pointLight(255, 255, 255, locX, locY, 0);
};

/*******************************************************************************
 * Constants
 ******************************************************************************/
var horizontalBoxCount = 10;
var verticalBoxCount = 10;
var boxSize;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    background(255, 0, 200);
    windowResized();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    boxSize = max(windowWidth / horizontalBoxCount, windowHeight / verticalBoxCount);
}

function draw() {
    rotateX(radians(120));
    rotateZ(radians(-30));
    // Set up environment
    environmentLight();
    // translate(-width / 2, -height / 2, 0);
    xOffset = -horizontalBoxCount * boxSize / 2;
    xOffset *= sqrt(3) / 2;
    translate(xOffset, 0, 0);

    // Define box-drawing characterstics
    blueMaterial();
    specularMaterial(255, 0, 0);
    // Draw box grid
    var boxX = 0;
    var boxY = 0;
    for (var r = 0; r < verticalBoxCount; r++) {
        for (var c = 0; c < horizontalBoxCount; c++) {
            box(boxSize * 0.75);
            translate(boxSize, 0, 0);
        }
        translate(0, boxSize, 0);
        translate(-boxSize * horizontalBoxCount, 0, 0);
    }
}

