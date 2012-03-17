-module(room).
-export([start/3]).

start(Topic, Keywords, URL)->
    io:format("room started~n"),
    put(topic, Topic),
    put(keywords, Keywords),
    put(url, URL),
    loop([]).

sysToAll([], _, _)->
    ok;
sysToAll([{Pid, _, _}|UserList], CMD, ARG) ->
    Pid ! {sys, CMD, ARG},
    sysToAll(UserList, CMD, ARG).

sayToAll([], _, _, _)->
    ok;
sayToAll([{Pid, _, _}|UserList], FBID, Name, Msg)->
    Pid ! {say, FBID, Name, Msg},
    sayToAll(UserList, FBID, Name, Msg).

loop(UserList)->
    receive
	{getMatchValue, _Title, Keywords}->
	    S1 = sets:from_list(get(keywords)),
	    S2 = sets:from_list(Keywords),
	    S3 = sets:intersection(S1, S2),
	    manager ! {self(), sets:size(S3)},
	    loop(UserList);
	{askJoin, WaiterPid}->
	    WaiterPid ! {assigned, self(), get(topic), get(url)},
	    loop(UserList);
	{join, WaiterPid, {FBID, Name}}->
	    WaiterPid ! {joined},
	    sysToAll(UserList, <<"join">>, [{fbid, FBID}, {name, Name}]),
	    loop([{WaiterPid, FBID, Name}|UserList]);
	{userList, WaiterPid} ->
	    WaiterPid ! {userList, UserList},
	    loop(UserList);
	{say, WaiterPid, Msg} ->
	    {WaiterPid, FBID, Name} = proplists:lookup(WaiterPid, UserList),
	    sayToAll(UserList, FBID, Name, Msg),
	    loop(UserList);
	{leave, WaiterPid} ->
	    {WaiterPid, FBID, Name} = proplists:lookup(WaiterPid, UserList),
	    NewUserList = proplists:delete(WaiterPid, UserList),
	    sysToAll(NewUserList, <<"leave">>, [{fbid, FBID}, {name, Name}]),
	    loop(NewUserList)
    end.
