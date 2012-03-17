(function scrape()
{
    console.log("parser started");
    var common = {};
    var res = {};

    CommonWords = CommonWords.map(stemmer);

    

    html = $("h1").html()
    html = html.trim();
    while (html[0] == "<")
	html = html.split(">")[1];
    
    var titles = html.split(" ");
    titles = titles.map(stemmer);
    titles = titles.map(function(element)
			{
			    return element.toLowerCase();
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
		console.log(result);

})();
