-module(newspeak_app).

-behaviour(application).

%% Application callbacks
-export([start/2, stop/1]).

%% ===================================================================
%% Application callbacks
%% ===================================================================

start(_StartType, _StartArgs) ->
    Options = [
	       {port, 81},
	       {loop, fun(Req) -> newspeak:handle_http(Req, 81) end},
	       {ws_loop, fun(Ws) -> waiter:handle_websocket(Ws, 0) end},	       {ws_autoexit, false}
	      ],
    newspeak_sup:start_link(Options).

stop(_State) ->
    ok.
