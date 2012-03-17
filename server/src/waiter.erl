-module(waiter).
-export([handle_websocket/2]).

handle_websocket(Ws, RoomID)->
    receive
	{browser, Data}->
	    JsonData = json_eep:json_to_term(Data),
	    {[{_,Method}|Rest]} = JsonData,
	    case binary_to_list(Method) of
		"join"->
		    [{_Data, { [{_Title,Title}, {_Keywords, Keywords}, {_URL, URL}] }}] = Rest,
		    manager!{self(), {join, {binary_to_list(Title),
					     list_binary_to_list(Keywords),
					     binary_to_list(URL)}}};
		"fb"->
		    [{_Data, { [{_FBID,FBID}, {_NAME, Name}] }}] = Rest,
		    RoomID ! {join, self(), {FBID, Name}};
		"list"->
		    RoomID ! {userList, self()};
		"say"->
		    [{_Data, { [{_FBID,FBID}, {_NAME, Name}, {_MSG, Msg}] }}] = Rest,
		    RoomID ! {say, FBID, Name, Msg}
	    end,
	    handle_websocket(Ws, RoomID);
	{assigned, NewRoomID, Title, URL}->
	    io:format("room assgiend~n"),
	    Result = {[{method,<<"join.return">>},{data, { [{ title, list_to_binary(Title) }, {url, list_to_binary(URL)}] } } ]},
	    Ws:send(json_eep:term_to_json(Result)),
	    handle_websocket(Ws,NewRoomID);
	{joined}->
	    io:format("joined success~n"),
	    Result = {[{method,<<"fb.return">>},{data, { [{ result, <<"ok">> } ] } } ]},
	    Ws:send(json_eep:term_to_json(Result)),
	    handle_websocket(Ws, RoomID);
	{sys, CMD, ARG}->
	    Result = {[{method,<<"sys">>}
		       ,{data,
			 {
			   [{ cmd, CMD }, {arg, {ARG} }]
			 }
			}
		      ]},
	    Ws:send(json_eep:term_to_json(Result)),
	    handle_websocket(Ws, RoomID);	
	{userList, UserList}->
	    io:format("display userlist success~n"),
	    BinaryUserList = turnToBinary(UserList),
	    Result = {[{method,<<"list.return">>},
		       {data,
			{
			  [{ userlist, BinaryUserList }]
			}
		       }
		      ]},
	    Ws:send(json_eep:term_to_json(Result)),
	    handle_websocket(Ws, RoomID);
	{say, FBID, Name, Msg}->
	    Result = {[
		       {method,<<"say.return">>},
		       {data,
			{
			  [
			   {fbid, FBID },
			   {name, Name },
			   {msg, Msg}
			  ]
			}
		       }
		      ]},
	    Ws:send(json_eep:term_to_json(Result)),
	    handle_websocket(Ws, RoomID);
	closed ->
	    RoomID ! {leave, self()},
	    io:format("closed~n"),
	    closed
    end.

turnToBinary(UserList)->
    turnToBinary(UserList, []).

turnToBinary([], Acc)->
    Acc;
turnToBinary([{_, FBID, Name}|UserList], Acc)->
    F = {fbid, FBID},
    N = {name, Name},
    turnToBinary(UserList, [{[F, N]} | Acc]).


list_binary_to_list(L)->
    list_binary_to_list(L, []).

list_binary_to_list([], Acc)->
    lists:reverse(Acc);
list_binary_to_list([H|R], Acc)->
    list_binary_to_list(R, [binary_to_list(H)|Acc]).


list_list_to_binary(L)->
    list_list_to_binary(L, []).

list_list_to_binary([], Acc)->
    lists:reverse(Acc);
list_list_to_binary([H|R], Acc)->
    list_list_to_binary(R, [list_to_binary(H)|Acc]).


