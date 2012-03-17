(function scrape()
 {
     console.log("parser started");
     var common = {};
     var res = {};

     CommonWords = CommonWords.map(stemmer);

     html = $("h1").html()
     try
     {
	 if(html) {
	     html = html.trim();
	     while (html[0] == "<")
	     {
		 html = html.split(">")[1];
		 html = html.split("<")[0];
	     }
	 } else {
	     html = window.document.title;
	 }
	 if(!html){
	     html = window.document.title;
	 }
     }
     catch(e)
     {
	 html = window.document.title;
     }

     console.log("Title:", html);

     var titles = html.split(" ");
     titles = titles.map(stemmer);
     titles = titles.map(function(element)
			 {
			     return element.toLowerCase();
			 }
			);
     titles = titles.map(function(element)
			 {
			     return element.replace(/[:,.]/g,"");
			 }
			);    
     titles = titles.filter(function(element)
			    {
				return !(CommonWords.indexOf(element) >= 0);
			    }
			   );

     result = {}
     result.title = html;
     result.keywords = titles;
     result.url = document.URL;
     
     store_room_data(result);
     console.log(JSON.stringify(result));
 })();
