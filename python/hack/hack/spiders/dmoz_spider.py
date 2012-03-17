from scrapy.spider import BaseSpider
from scrapy.selector import HtmlXPathSelector

from scrapy.spider import BaseSpider
from scrapy.selector import HtmlXPathSelector

from hack.items import DmozItem

from operator import *
from string import *
import re



class DmozSpider(BaseSpider):
    name = "dmoz"
    allowed_domains = ["cnn.com"]
    start_urls = [
    "http://www.cnn.com/2012/03/16/travel/irish-travel-story/index.html",
    ]

    stop_list = dict()
    
    def parse(self, response):
        stop_list = dict()
        with open("common.in") as fstop:
            for line in fstop:
                line = line.encode('ascii', 'ignore')
                line = line.replace("\n", "")  
                regex = re.compile(r"[^\w\s]")
                line = regex.sub('', line)
                stop_list[line] = 1            
    
        hxs = HtmlXPathSelector(response)
        sites = hxs.select('//div[contains(@id, "cnnContentContainer")]')
        items = []
        all_words = dict()
        title_words = dict()
        count = 0
        for site in sites:
            item = DmozItem()
            if count == 0:
                #item['title'] = site.select('//head/title/text()').extract()
                title_uni = site.select('//head/title/text()').extract()
                item['title'] = title_uni
                for title_str in title_uni:
                    title_str = title_str.encode('ascii', 'ignore')
                    title_str = title_str.rsplit()  
                    for word in title_str:
                        regex = re.compile(r"[^\w\s]")
                        word = regex.sub('', word)
                       #word = word.translate(string.maketrans("",""), string.punctuation)
                        if word not in title_words:
                            if word not in stop_list:
                                if word != "":
                                    title_words[word] = 1 
            count = count + 1
            #items.append(item)
            par_string = site.select('//p[contains(@class, "cnn_storypgraph")]/text()').extract()
            for word_string in par_string:
                word_string = word_string.encode('ascii', 'ignore') 
                word_string = word_string.rsplit()
                for word in word_string:
                    #word = word.translate(string.maketrans("",""), string.punctuation)
                    regex = re.compile(r"[^\w\s]")
                    word = regex.sub('', word)
                    if word in title_words:
                        if word not in stop_list:
                            title_words[word] = title_words[word] + 1
        rev_list = []
        final_list = sorted(title_words.items(), key=itemgetter(1))
        for word in final_list:
            if word not in stop_list:
                rev_list.append(word[0])
        #final_list = rev_list.reverse()
        item['first'] = rev_list[len(rev_list)-1] 
        item['second'] = rev_list[len(rev_list)-2] 
        item['third'] = rev_list[len(rev_list)-3] 
        item['fourth'] = rev_list[len(rev_list)-4] 
        item['fifth'] = rev_list[len(rev_list)-5] 
        items.append(item)
        return items

