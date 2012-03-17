# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/topics/items.html

from scrapy.item import Item, Field

#class HackItem(Item):
    # define the fields for your item here like:
    # name = Field()
#    pass


class userpost(Item):
    username = Field()
    comment = Field()
    likes = Field()
    dislikes = Field()
    date_days = Field()


class DmozItem(Item):
    title = Field()
    first = Field()
    second = Field()
    third = Field()
    fourth = Field()
    fifth = Field()
