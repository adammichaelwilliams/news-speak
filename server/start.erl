#! /usr/bin/env escript
%%! -pa ./ebin ./erlang-json-eep-parser

-mode(compile).
-compile(export_all).


main(_)->
    appmon:start(),
    io:format("web server started~n"),
    application:start(sasl),
    application:start(newspeak),
    receive _ -> ok end.
