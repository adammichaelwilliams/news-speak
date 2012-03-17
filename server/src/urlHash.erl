-module(urlHash).

-export([start/0]).

start()->
    io:format("url hashing"),
    Tab = ets:new(table, [set]),
    loop(Tab).

loop(Tab)->
    receive
	{insert, URL, RoomID}->
	    ets:insert(Tab, {URL, RoomID}),
	    loop(Tab);
	{lookup, URL} ->
	    manager ! ets:lookup(Tab, URL),
	    loop(Tab)
    end.
    
