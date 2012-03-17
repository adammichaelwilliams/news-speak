-module(newspeak).

-export([handle_http/2]).


handle_http(Req, _Port)->
    Req:ok([{"Content_Type", "test/html"}],
    ["hello"]).
