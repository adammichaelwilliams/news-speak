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
	    urlHash ! {lookup, URL},
	    receive
		{urlHash, R} ->
		    case R of
			[] ->
			    {MatchValue, RoomPid} = checkRoomlist(RoomList, Title, Keywords, URL),
			    if
				MatchValue > 1 ->
				    RoomPid ! {askJoin, WaiterPid},
				    urlHash ! {insert, URL, RoomPid},
				    loop(RoomList);
				true ->
				    io:format("spawning a new room"),
				    NewRoomPid = spawn(fun() -> room:start(Title, Keywords, URL) end),
				    NewRoomPid ! {askJoin, WaiterPid},
				    urlHash ! {insert, URL, NewRoomPid},
				    loop([NewRoomPid|RoomList])
			    end;
			[{URL, RoomID}]->
			    RoomID ! {askJoin, WaiterPid},
			    loop(RoomList)
			end
	    end;
	{RoomPid, detach} ->
	    NewList = lists:delete(RoomList, RoomPid),
	    io:format("room detached:~p~n",[RoomPid]),
	    loop(NewList)
    end.



