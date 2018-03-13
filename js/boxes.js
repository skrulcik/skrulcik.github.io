/*******************************************************************************
 * Colors & Fills - set in setup() b/c P5
 ******************************************************************************/
var TOP_COLOR;
var FRONT_COLOR;
var SIDE_COLOR;

/*******************************************************************************
 * Constants
 ******************************************************************************/
var horizontalBoxCount = 15;
var verticalBoxCount = 15;
var boxWidth;
var boxHeight;

function computeBoxSize() {
    // - 1 makes sure the boxes go just beyond the screen
    boxWidth = ceil(windowWidth / (horizontalBoxCount - 1));
    boxHeight = ceil(windowHeight / (verticalBoxCount - 1));
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    computeBoxSize();

    TOP_COLOR = color(255, 0, 200);
    FRONT_COLOR = color(20, 200, 200);
    SIDE_COLOR = color(10, 125, 125);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    computeBoxSize();
}

function drawInRect(x, y, w, h) {
    var m = 20;
    noStroke();
    // Side
    fill(SIDE_COLOR);
    quad(x + w, y,
        x + w - m, y + h,
        x + w - m, y + 3 * h,
        x + w, y + 2 * h);
    // Add shadow for the top
    // drawingContext.shadowOffsetX = -5;
    // drawingContext.shadowOffsetY = -5;
    // drawingContext.shadowBlur = 10;
    // drawingContext.shadowColor = "black";
    // Front
    fill(FRONT_COLOR);
    quad(x - m, y + 3 * h,
        x + w - m, y + 3 * h,
        x + w - m, y + h,
        x - m, y + h);
    // Top
    fill(TOP_COLOR);
    quad(x, y,
        x + w, y,
        x + w - m, y + h,
        x - m, y + h);
    // Turn off shadow
    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 0;
    drawingContext.shadowBlur = 0;
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
            y -= min(boxHeight * 1.5, boxHeight / d**1.5);

            drawInRect(x, y, boxWidth, boxHeight);
        }
    }
}

