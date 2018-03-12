/*******************************************************************************
 * Colors & Fills
 ******************************************************************************/

/*******************************************************************************
 * Constants
 ******************************************************************************/
var horizontalBoxCount = 10;
var verticalBoxCount = 10;
var boxWidth;
var boxHeight;

function computeBoxSize() {
    boxWidth = ceil(windowWidth / horizontalBoxCount);
    boxHeight = ceil(windowHeight / verticalBoxCount);
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    computeBoxSize();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    computeBoxSize;
}

function drawInRect(x, y, w, h) {
    var m = 5;
    noStroke();
    fill(255, 0, 200);
    // Top
    quad(x + m, y + m,
        x + w - m, y + m,
        x + w - m, y + h - m,
        x + m, y + h - m);
    fill(20, 200, 200);
}

/* Gives the distance between two points scaled to "boxs" instead of standard
 * pixels. */
function boxDist(x1, y1, x2, y2) {
    return sqrt(((x1 - x2) / boxWidth) ** 2 +  ((y1 - y2) / boxHeight) ** 2);
}

function draw() {
    clear();
    for (var r = 0; r < verticalBoxCount; r++) {
        for (var c = 0; c < horizontalBoxCount; c++) {
            // Top left
            x = c * boxWidth;
            y = r * boxHeight;

            // Center
            cx = x + boxWidth / 2;
            cy = y + boxHeight / 2;

            // Distance between center and mouse from mouse, never 0!
            d = boxDist(cx, cy, mouseX, mouseY) + 0.0000000001;

            // Pop up boxes that are within ~4 of the mouse
            y -= min(boxHeight, boxHeight / d);

            drawInRect(x, y, boxWidth, boxHeight);
        }
    }
}

