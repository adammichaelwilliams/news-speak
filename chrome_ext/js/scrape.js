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

    words = new Array();
    
    var items = $("p").get();	
    for(var item in items) {
	item = items[item];
	if(item.tagName === 'P') {
	    var tag_words = item.innerHTML.split(" ");
	    tag_words = tag_words.map(stemmer);
	    tag_words = tag_words.map(function(element)
				      {
					  return element.toLowerCase();
				      }
				     );
	    for (var word in tag_words)
	    {
		words.push(tag_words[word]);
	    }
	}
    }

    
    for (var word in words)
    {
	for (var title in titles)
	{
	    if(words[word] == titles[title])
	    {
		if (res[words[word]])
		{
		    res[words[word]]++;
		}
		else
		{
		    res[words[word]] = 1;
		}
	    }
	}
    }

    var results = [];
    
    for (var title in res)
    {
	results.push({key:title, value:res[title]});
    }

    results.sort(function(a, b)
		 {
		     return b.value - a.value;
		 }
		);

    var keywords = [];
    for (var r in results)
    {
	keywords.push(results[r].key);
    }
    
    result = {}
    result.title = html;
    result.keywords = keywords;
    result.url = document.URL;
    
		join_room(result);
		console.log(result);

})();
