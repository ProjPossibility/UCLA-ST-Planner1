

	var clientId = '823704617519.apps.googleusercontent.com';
		var apiKey = 'AIzaSyD6B1gCukBc6Hudi0oNLXNZaCYSg1pU_MU';
		var scopes = 'https://www.googleapis.com/auth/calendar';
		var calid = 'g42kio0ms52em9nt39sjoulh7s@group.calendar.google.com';
    var evar = new Array();

    var eid = new Array();

    var edate = new Array();

		
		// due to the way the google API works, these access codes only work for me. replace with your own if you want to run off a local server


      // Load the API and make an API call.  Display the results on the screen.
      function makeApiCall(uid) {
  		gapi.client.load('calendar', 'v3', function() {
    	var request = gapi.client.calendar.events.list({ 'calendarId': calid, 'orderBy': 'startTime', 'singleEvents': true });

	    request.execute(function(resp) {
	      for (var i = 0; i < resp.items.length; i++) {
	        var li = document.createElement('li');
	        li.appendChild(document.createTextNode(resp.items[i].summary));
	        evar[i] = resp.items[i].summary;
	        console.log(evar[i]);
	        eid[i] = resp.items[i].id;
	        console.log(eid[i]);
	        var parsedDate = new Date(resp.items[i].end.date);
	        edate[i]=(parsedDate.getMonth()+1)+'-'+(parsedDate.getDate());
	      	$('#list_events').append("<li><h6>"+edate[i]+"</h6><span class='tooltip'><a href='#"+eid[i]+"' class='eventlinks' id='"+eid[i]+"'>"+evar[i]+"</a></span></li>");
	      }
	    });
	    var requestDesc = gapi.client.calendar.events.get({ 'calendarId': calid , 'eventId': uid});
		requestDesc.execute(function(resp) {window.description=resp.description;console.log(description);printInfo();});
	  })};

  	function printInfo() {
  		window.parsedWords=new Array;
		  var curWord="";
		  var i = 0;
		  while (i<window.description.length)
		  {
		  	if (i==window.description.length-1)
		  	{
		  		curWord=curWord+window.description.charAt(i);
		  		parsedWords.push(curWord);
		  		i++;
		  		continue;
		  	}
		  	if (window.description[i]=='&'&&window.description[i+1]=='t'&&window.description[i+2]=='_')
		  	{	
		  		parsedWords.push(curWord);
		  		curWord="";
		  		i=i+3;
		  		continue;
		  	}
		  	else 
		  		curWord=curWord+window.description.charAt(i);
		  	i++;
		  }
		  console.log(parsedWords[1]);
		  console.log(parsedWords[2]);
		  for(i=1;i<window.parsedWords.length;i++)
			{
				$('#list_tasks').append("<div class='miletask'><div class='check'><input type='checkbox' /><label>Done!</label></div><div class='taskdata'><div class='tasktitle'>"+parsedWords[i]+"</div></div></div>");
			}
  	};

  	$(document).on('click', '.eventlinks', function(){ 
    	alert('hello world');
    	var pathname = window.location.pathname;
    	alert(pathname);
	}); 






