var NewsSpeakTransport = window.NewsSpeakTransport = function(address)
{
	// Silly Javascript
	var self = this;
	
	// Route table for message listeners
	var route_table = this._route_table = {};

	// Initialize the WS object
	var ws = null;
	if(window.WebSocket) {
		this._ws = ws = new WebSocket("ws://"+address);
	} else if(window.MozWebSocket) {
		this._ws = ws = new MozWebSocket("ws://"+address);
	} else {
		throw Error("No WebSockets are available");
	}	

	ws.onopen = function()
	{
	}

	ws.onmessage = function(msg) 
	{
		var data = JSON.parse(msg.data);
		
		if(!route_table[data.method]) {
		} else {
			route_table[data.method].call(self, data.data);
		}
	}

	ws.onerror = function(err)
	{
	}

	ws.onclose = function()
	{
	}

	// Make sure that we're connected
	setTimeout(function()
	{
		if(ws.readyState != 1) {
			ws.close();
			throw Error("Error connecting to the ws://"+address+" endpoint");
		}
	}, 400);
}

NewsSpeakTransport.prototype._retry = function(method_, data_)
{
	var self = this;
	setTimeout(function() {self.emit(method_, data_);}, 50);
}

NewsSpeakTransport.prototype.emit = function(method_, data_)
{
	// Incase we send before we know the result of the connect
	if(this._ws.readyState === 0) {return this._retry(method_, data_);}
	else if(this._ws.readyState !== 1) return false;

	if(data_ === undefined) { data_ = {} };
	try {
		var msg = {method: method_, data: data_};
		this._ws.send(JSON.stringify(msg));
	} catch(e) {
	}
}

NewsSpeakTransport.prototype.on = function(path, fn)
{
	if(this._route_table[path]) {
		throw Error("Listener already exists for path '"+path+"'");
	} else {
		this._route_table[path] = fn;
	}
}

NewsSpeakTransport.prototype.get_state = function()
{
	var state_strings = ["CONNECTING", "OPEN", "CLOSING", "CLOSED"];

	return {
			"val": this._ws.readyState
		, "txt": state_strings[this._ws.readyState]
	}
}

NewsSpeakTransport.prototype.close = function() 
{
	this._ws.close();
}
