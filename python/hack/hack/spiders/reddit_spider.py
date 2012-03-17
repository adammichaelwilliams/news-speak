from scrapy.spider import BaseSpider
from scrapy.selector import HtmlXPathSelector

from scrapy.spider import BaseSpider
from scrapy.selector import HtmlXPathSelector

from hack.items import DmozItem

from operator import *
from string import *
import re



class RedditSpider(BaseSpider):
    name = "reddit"
    allowed_domains = ["reddit.com"]
    start_urls = [
    "http://www.reddit.com/user/kainolophobia/",
    ]
    def parse(self, response):
        hxs = HtmlXPathSelector(response)
        sites = hxs.select('//p[contains(@class, "tagline")]')
        items = []
        for site in sites:
            item = userpost()
            #items.append(item)
            item['likes'] = site.select('//spam[contains(@class, "score_likes")]/text()').extract()
            item['dislikes'] = site.select('//spam[contains(@class, "score_dislikes")]/text()').extract()
            item['date_days'] = site.select('//time[contains(@datetime)]/text()').extract()
            item['comment'] = site.select('//div[contains(@class, "usertext-body")]/div[contains(@class, "md")]/p/text()').extract()
            item['username'] = "kainolophobia"
            items.append(item)
        return items

