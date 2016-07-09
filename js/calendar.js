/* Handles Google Calendar integration. */

// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com
var CLIENT_ID = '458234709197-s3sq6fp1274o0shuekm64585hj2i4u3g.apps.googleusercontent.com';

var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

/**
* Check if current user has authorized this application.
*/
function checkAuth() {
	gapi.auth.authorize(
	{
		'client_id': CLIENT_ID,
		'scope': SCOPES,
		'immediate': true
	}, handleAuthResult);
}

/**
* Handle response from authorization server.
*
* @param {Object} authResult Authorization result.
*/
function handleAuthResult(authResult) {
	var authorizeDiv = document.getElementById('authorize-div');
	if (authResult && !authResult.error) {
		// Hide auth UI, then load client library.
		authorizeDiv.style.display = 'none';
		loadCalendarApi();
	} else {
		// Show auth UI, allowing the user to initiate authorization by
		// clicking authorize button.
		authorizeDiv.style.display = 'inline';
	}
}

/**
* Initiate auth flow in response to user clicking authorize button.
*
* @param {Event} event Button click event.
*/
function handleAuthClick(event) {
	gapi.auth.authorize(
	{client_id: CLIENT_ID, scope: SCOPES, immediate: false},
	handleAuthResult);
	return false;
}

/**
* Load Google Calendar client library. List upcoming events
* once client library is loaded.
*/
function loadCalendarApi() {
	gapi.client.load('calendar', 'v3', listUpcomingEvents);
}

/**
* Print the summary and start datetime/date of the next ten events in
* the authorized user's calendar. If no events are found an
* appropriate message is printed.
*/
function listUpcomingEvents() {
	var request = gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
	});


    
    request.execute(function(resp) {
        var events = resp.items;
        clearPre();
        if (events.length > 0) {
            appendPre(htmlForCalendarEventList(events));
        } else {
            appendPre('No upcoming events found.');
        }
    });
}

/**
 * Clear existing events from the calendar.
 */
function clearPre() {
    $('#output').empty();
}

/**
* Append a pre element to the body containing the given message
* as its text node.
*
* @param {string} message Text to be placed in pre element.
*/
function appendPre(message) {
    var currentHTML = $('#output').html();
    $('#output').html(currentHTML + message);
}

function htmlForCalendarEventList(events) {
    html = '<ul class="collection">';
    for (i = 0; i < events.length; i++) {
        html += htmlForCalendarEvent(events[i]);
    }
    html += '</ul>';
    return html;
}


/**
* Render a decent looking Event Box for Google Calendar event
* Assumes Materialize.css is loaded
*/
function htmlForCalendarEvent(event) {
    var startTime = event.start.dateTime;
    if (!startTime) {
        startTime = event.start.date;
    }
    var startTimeString = moment(startTime).fromNow();
    return '<li class="collection-item"><h5>' + event.summary
                + '</h5><p>' + startTimeString + '</p></li>';
}

// Refresh the calendar every 5 minutes
setInterval(loadCalendarApi, 300000 /* 5 minutes */);
