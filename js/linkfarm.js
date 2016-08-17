/*
 * Creates a link farm by inserting nicely formatted elements into an unordered
 * list along with header rows to define sections. Assumes usage of
 * Materialize.js.
 *
 * Link object fields:
 *
 * targetUrl: URL to go to
 * primaryText: Large title to display
 * secondaryText: More subtle, smaller text
 */

// ID of the unordered list that links will be insterted into
var ulElementId = "#linkfarm";

/*
 * Adds a list of link items to the given list.
 */
var insertLinkItems = function (ulElement, titleText, linkArray) {
    // Accumulate entire string, rather than appending individually, to allow
    // multiple sections to be added concurrently
    var elemString = "";

    // Title for this section of links
    elemString += "<li><h4>";
    elemString += titleText;
    elemString += "</h4></li>\n<hr>\n";

    // Add links individually
    for (var linkObject of linkArray) {
        var targetUrl = linkObject["targetUrl"];
        var primaryText = linkObject["primaryText"];
        var secondaryText = linkObject["secondaryText"];

        elemString += "<li><a class=\"waves-effect\" href=\"";
        elemString += targetUrl;
        elemString += "\"><span>";
        elemString += primaryText;
        if (secondaryText != null && secondaryText != "") {
            // If there is secondary text to show, add it after a delay
            elemString += "  "; // Spacing to separate primary and secondary
            elemString += "<em class=\"light\">";
            elemString += secondaryText;
            elemString += "</em></span>";
        }
        elemString += "</a></li>";
        console.log("Adding " + primaryText)
    }
    $(ulElement).append(elemString);
}

/*
 * Add a section of links to the list. Requires a name for the section and
 * a filename that contains link objects.
 */
var addSection = function (ulElement, linkFilename, titleText) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status == 200) {
            var linkArray = JSON.parse(this.responseText);
            insertLinkItems(ulElement, titleText, linkArray);
        } else {
            console.log("Could not load links for filename " + linkFilename);
        }
    };
    req.open("GET", linkFilename, false /* Synchronous to preserve order */);
    req.send();
}

// Link import information
var classTitle = "Course Pages";
var classFilename = "rsc/classLinks.json";
var resourceTitle = "Resources";
var resourceFilename = "rsc/resourceLinks.json";
var mailTitle = "Mail";
var mailFilename = "rsc/mailLinks.json";

// Add sections
addSection(ulElementId, classFilename, classTitle);
addSection(ulElementId, resourceFilename, resourceTitle);
addSection(ulElementId, mailFilename, mailTitle);

