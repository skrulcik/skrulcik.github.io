// Materialize drawer menu options
$('.button-collapse').sideNav({
    menuWidth: 400,
    closeOnClick: true
});

// Material css classes defining background colors
var backgroundColors = [
    "red",
    "pink",
    "purple",
    "deep-purple",
    "indigo",
    "blue",
    "light-blue",
    "cyan",
    "teal",
    "green",
    "light-green",
    "lime",
    "yellow",
    "amber",
    "orange",
    "deep-orange",
    "brown",
    "grey",
    "blue-grey",
    "black",
    "white"
];

// Sets the background of the given element to the given color
var setColor = function(elem, newColor) {
  // Appending color class will override any previous color classes
  elem.addClass(newColor);
  // Remove any other leftover classes so they don't build up
  for (var color of backgroundColors) {
    if (color != newColor) {
      elem.removeClass(color);
    }
  }
}

var setRandomBackground = function() {
  setColor($('body'),
    backgroundColors[Math.floor(Math.random()*backgroundColors.length)]);
}

/* Set initial color, change it every minute to keep things interesting. */
setRandomBackground();
setInterval(function(){
  setRandomBackground();
}, 60000 /* One minute */);

