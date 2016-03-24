$('.button-collapse').sideNav({
      menuWidth: 400,
      closeOnClick: true
    });

/* Reload page periodically to update calendar. */
setTimeout(function(){
   window.location.reload(1);
}, 50000);


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
