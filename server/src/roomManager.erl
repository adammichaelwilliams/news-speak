-module(roomManager).
-export([start/0]).

start()->
    io:format("roomManager started"),
    loop([]).

checkRoomlist(RoomList, Title, Keywords, URL)->
    checkRoomlist(RoomList, Title, Keywords, URL, {0, 0}).

checkRoomlist([], _Title, _Keywords, _URL, {Acc1, Acc2})->{Acc1, Acc2};
checkRoomlist([Room|RoomList], Title, Keywords, URL, {Acc1, Acc2}) ->
    Room ! {getMatchValue, Title, Keywords},
    receive
	{Room, MatchValue} ->
	    if
		MatchValue > Acc1 ->
		    checkRoomlist(RoomList,
				  Title, Keywords, URL,
				  {MatchValue, Room});
		true ->
		    checkRoomlist(RoomList,
				  Title, Keywords, URL,
				  {Acc1, Acc2})
	    end
    end.

loop(RoomList)->
    receive
	{WaiterPid, {join, {Title, Keywords, URL}}}->
	    {MatchValue, RoomPid} = checkRoomlist(RoomList, Title, Keywords, URL),
	    if
		MatchValue > 0 ->
		    RoomPid ! {askJoin, WaiterPid},
		    loop(RoomList);
		true ->
		    %%spawn new room
		    io:format("spawning a new room"),
		    NewRoomPid = spawn(fun() -> room:start(Title, Keywords, URL) end),
		    NewRoomPid ! {askJoin, WaiterPid},
		    loop([NewRoomPid|RoomList])
	    end;
	{RoomPid, detach} ->
	    NewList = lists:delete(RoomList, RoomPid),
	    io:format("room detached:~p~n",[RoomPid]),
	    loop(NewList)
    end.



