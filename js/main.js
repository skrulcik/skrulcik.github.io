$('.button-collapse').sideNav({
      menuWidth: 400,
      closeOnClick: true
    });


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

$('body').addClass(backgroundColors[Math.floor(Math.random()*backgroundColors.length)]);
