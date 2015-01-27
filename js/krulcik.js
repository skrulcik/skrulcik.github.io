var Quote = Backbone.Model.extend({
   defaults: {
     quote: "Clever.",
     author: "unattributed"
   }
});

var QuoteView = Backbone.View.extend({
	initialize: function(){
		this.render();
	},
    render: function() {
        // Compile the template using underscore
        var template = _.template( $("#quote_template").html(), this.model.toJSON() );
        // Load the compiled HTML into the Backbone "el"
        this.$el.html( template );
    }
});


var quotes = [new Quote({author:"Mark Twain",
					quote:"I never let my schooling interfere with my education."}),
				new Quote({author:"Henry Ford",
					quote:"If I had asked people what they wanted, they would have said faster horses."}),
				new Quote({author:"Leah Woods",
					quote:"Someday I'm going to change the world, but right now I think I'll just catch some snowflakes."}),
				new Quote({author:"Elon Musk",
					quote:"If something is important enough, you should try it, even if the most possible outcome is failure."}),
				new Quote({author:"Walt Disney",
					quote:"It's kind of fun to do the impossible"}),
				new Quote({author:"Aristotle",
					quote:"We are what repeatedly do. Excellence then, is not an act, but a habit."}),
				new Quote({author:"Sir Ken Robinson",
					quote:"If you are not prepared to be wrong you will not come up with anything original."}),
				new Quote({author:"Ralph Waldo Emerson",
					quote:"Do not go where the path may lead, go instead to where there is no path and leave a trail."}),
				new Quote({author:"Winston Churchill",
					quote:"You have enemies? Good. That means you've stood up for something, sometime in you life."}),
				new Quote({author:"Nikola Tesla",
					quote:"The future, for which I have really worked, is mine."}),
				new Quote({author:"Winnie the Pooh",
					quote:"How lucky am I to have something that makes saying goodbye so hard?"}),
				new Quote({author:"Rumi",
					quote:"Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself."}),
				new Quote({author:"Abraham Lincoln",
					quote:"I don&#39;t know who my grandfather was. I am much more concerned with who his grandson will be."}),
				new Quote({author:"Groucho Marx",
					quote:"Politics is the art of looking for trouble, finding it everywhere, diagnosing it incorrectly and applying the wrong remedies."}),
				new Quote({author:"Winston Churchill",
					quote:"However beautiful the strategy, you should occasionally look at the results."}),
				new Quote({author:"Picasso",
					quote:"All children are born artists, the trouble is to remain an artist as we grow up."}),
				new Quote({author:"Picasso",
					quote:"When I was a child my mother said to me, 'If you become a soldier, you'll be a general. If you become a monk, you'll be the pope.' Instead I became a painter and wound up as Picasso."}),
				new Quote({author:"John Hughes (via Ferris Beuller)",
					quote:"Life moves pretty fast... If you don't stop and look around every once in awhile, you might miss it."})];
var idx = Math.floor(Math.random() * quotes.length);

var qotd = new QuoteView({model: quotes[idx], el: $("#quote-container")});
