/*
 * Creates a link farm by inserting nicely formatted elements into an unordered
 * list along with header rows to define sections. Assumes usage of
 * Materialize.js.
 *
 * Section object fields:
 *
 * sectionTitle: Title displayed at the top of the section
 * sectionLinks: Array of link objects (see below) describing the links in the
 * given section.
 *
 * Link object fields:
 *
 * targetUrl: URL to go to
 * primaryText: Large title to display
 * secondaryText: More subtle, smaller text
 */

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
 * Loads a JSON file with an array of section objects, and adds both the
 * headers and links that it defines into the specified unordered list element.
 */
var addLinks = function (ulElement, linkFilename) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status == 200) {
            // Load JSON resource
            var sectionJsonArray = JSON.parse(this.responseText);
            // For each section in the loaded json, add the title and section
            for (var sectionJson of sectionJsonArray) {
                var titleText = sectionJson["sectionTitle"];
                var linkArray = sectionJson["sectionLinks"];
                // TODO: Null checks and default values for optional parameters
                insertLinkItems(ulElement, titleText, linkArray);
            }
        } else {
            console.log("Could not load links for filename " + linkFilename);
        }
    };
    req.open("GET", linkFilename, true /* asynchronous */);
    req.send();
}

// ID of the unordered list that links will be insterted into
var ulElementId = "#linkfarm";
// File containing array of "section" objects
var linksFilename = "rsc/links.json";

addLinks(ulElementId, linksFilename);

