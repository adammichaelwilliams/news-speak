
$(document).ready(

function ()
{

    var common = {};

    $.get('common.in', function(data) {
        var lines = data.split("\n");
        for(var line in lines) {
                //common[elem] = 1;
            console.log(line);
        }
    });


    var titles = $("h1").html();
	//var title = document.getElementById("article-title").innerHTML;
    //var items = document.getElementsByClassName("article-print")[0].children;
    console.log("From title: ", titles);
    
    var items = $("p").get();
	var words = {};
	for(var item in items) {
		item = items[item];
		if(item.tagName === 'P') {
			var tag_words = item.innerHTML.split(" ");
			for(var word in tag_words) {
				var word = tag_words[word].replace(/[^A-Za-z0-9]/g, "")
                if((word.indexOf("href", 0) == -1) 
                    && (word.indexOf("www", 0) == -1)) {
                    //console.log(word);
                    if(words[word]) {
                        words[word]++;
                    } else { 
                        words[word] = 1;
                    }
                }
			}
		}
	}
    var num = 1;
    while(num < 100) {
        for(var word in words) {
            if(words[word] == num) {
              if(!common[word]) {
                //console.log(word, words[word]);
              }
            } 
        }
        num++;
    }
}
);
