
-module(newspeak_sup).

-behaviour(supervisor).

%% API
-export([start_link/1]).

%% Supervisor callbacks
-export([init/1]).

%% Helper macro for declaring children of supervisor
-define(CHILD(I, Type), {I, {I, start_link, []}, permanent, 5000, Type, [I]}).

%% ===================================================================
%% API functions
%% ===================================================================

start_link(Options) ->
    supervisor:start_link(?MODULE, [Options]).

%% ===================================================================
%% Supervisor callbacks
%% ===================================================================

init([Options]) ->
    io:format("supervisor initialized~n"),
    MisultinSpecs = {misultin,
		     {misultin, start_link, [Options]},
		     permanent, infinity, supervisor, [newspeak]
		    },
    ServerSpecs = {utility_server,
		   {utility_server, start_link, []},
		   permanent, 60000, worker, [utility_server]
		  },
    {ok, {{one_for_one, 5, 30}, [MisultinSpecs, ServerSpecs]}}.    

