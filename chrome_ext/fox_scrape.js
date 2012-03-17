function ()
{
	var title = document.getElementById("article-title").innerHTML;
	var items = document.getElementsByClassName("entry-content")[0].children;
	var words = {};
	
	for(var item in items) {
		item = items[item];
		if(item.tagName === 'P') {
			var tag_words = item.innerHTML.split(" ");
			for(var word in tag_words) {
				var word = tag_words[word].replace(/(['s]|[^A-Za-z0-9]|[ing$])/g, "")
				console.log(word);
			}
		}
	}
}
