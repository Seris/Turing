function Turing(){
	this.index = 0;

	this.algorithm = null;
	this.alphabets = null;
	this.runningAlgorithm = false;

	this.tape = [];

	this.currentInstruction = null;
	this.currentStateID = null;
	this.currentSymbolID = null;
	
	this.nextAction = null;

	this.execNextAction = this.execNextAction.bind(this);
	this.do_write = this.do_write.bind(this);
	this.do_move = this.do_move.bind(this);
	this.do_next = this.do_next.bind(this);

	this._events = {};

	this.paused = false;
	this.breakpoints = [];
	this.execNextTimeout = 500;
}

/*===============================
=            Control            =
===============================*/

Turing.prototype.start = function(){
	if(!this.algorithm || this.algorithmRunning){
		return false;
	}

	this.index = 0;

	this.nextAction = Turing.WRITE;
	this.alphabets.push(undefined);
	this.algorithmRunning = true;

	this.currentStateID = this.algorithm.defaultState;
	this.currentSymbolID = this.alphabets.indexOf(this.tape[this.index]);
	this.currentInstruction = this.algorithm.states[this.currentStateID][this.currentSymbolID];

	setTimeout(this.execNextAction, 0);
	this.emit("algorithm-started");
	return true;
};

Turing.prototype.end = function(){
	if(!this.algorithmRunning){
		return false;
	}

	this.nextAction = null;
	this.alphabets.pop();
	this.algorithmRunning = false;

	this.emit("algorithm-ended");
};

/*-----  End of Control  ------*/


/*=================================
=            Algorithm            =
=================================*/

Turing.prototype.loadAlgorithm = function(algorithm, force){
	if(this.algorithmRunning){
		return false;
	}

	if(!force && !this.checkAlgorithmAlphabetCompatibility(algorithm.alphabets)){
		this.emit("alphabet-incompatibility", algorithm.alphabets);
		return false;
	}

	this.algorithm = algorithm;
	this.alphabets = algorithm.alphabets;

	this.emit("algorithm-loaded", this.algorithm);

	return true;
};

Turing.prototype.checkAlgorithmAlphabetCompatibility = function(alphabets){
	if(this.alphabets !== null && alphabets.length !== this.alphabets.length){
		for (var i = 0; i < alphabets.length; i++) {
			if(alphabets[i] !== this.alphabets.length[i]){
				return false;
			}
		}
	}

	return true;
};

Turing.prototype.setTape = function(tape){
	if(this.algorithmRunning){
		return false;
	}

	if(this.alphabets !== null){
		for (var i = 0; i < tape.length; i++) {
			if(this.alphabets.indexOf(tape[i]) === -1){
				this.emit("invalid-char-in-tape", tape);
				return false;
			}
		}
	}

	this.tape = tape;
	this.emit("new-tape", tape);

	return true;
};

/*-----  End of Algorithm  ------*/


/*===============================
=            Actions            =
===============================*/

Turing.prototype.execNextAction = function(ignoreBreakpoint){
	var action = this.nextAction;
	if(action === Turing.WRITE){
		this.emit("state", this.currentStateID);
	}
	this.emit("action", action);

	if(!ignoreBreakpoint && this.checkBreakpoint()){
		return;
	}

	switch(action){
		case Turing.WRITE:
			this.do_write();
			break;

		case Turing.MOVE:
			this.do_move();
			break;

		case Turing.NEXT:
			this.do_next();
			break;

		default:
			this.end();
			return;
	}

	setTimeout(this.execNextAction, this.execNextTimeout);
};

Turing.prototype.do_write = function(){
	if(this.currentInstruction.write !== null){
		this.tape[this.index] = this.alphabets[this.currentInstruction.write];
	}

	this.emit("write", this.alphabets[this.currentInstruction.write]);
	this.nextAction = Turing.MOVE;
};

Turing.prototype.do_move = function(){
	switch(this.currentInstruction.move){
		case "left":
			this.index--;
			break;

		case "right":
			this.index++;
			break;
	}

	this.emit("move");
	this.nextAction = Turing.NEXT;
};

Turing.prototype.do_next = function(){
	if(this.currentInstruction.next >= 0){
		this.currentStateID = this.currentInstruction.next;
		this.currentSymbolID = this.alphabets.indexOf(this.tape[this.index]);
		this.currentInstruction = this.algorithm.states[this.currentStateID][this.currentSymbolID];

		this.nextAction = Turing.WRITE;
	} else {
		this.nextAction = null;
	}
	this.emit("next");
};

/*-----  End of Actions  ------*/


Turing.prototype.addBreakpoint = function(brkpt){
	if(!brkpt.action){
		brkpt.action = Turing.WRITE;
	}
	this.breakpoints.push(brkpt);
};

Turing.prototype.checkBreakpoint = function(){
	var brkpt;
	for (var i = 0; i < this.breakpoints.length; i++) {
		brkpt = this.breakpoints[i];
		if(brkpt.state === this.currentStateID
			&& (brkpt.symbol === undefined || brkpt.symbol === this.currentSymbolID)
			&& brkpt.action === this.nextAction){

			this.emit("breakpoint", brkpt);
			this.paused = true;
			if(brkpt.once){
				this.breakpoints.splice(i, 1);
			}

			return true;
		}
	}

	return false;
};

Turing.prototype.resumeFromBreakpoint = function(){
	if(this.algorithmRunning && this.paused){
		this.emit("resume-breakpoint");
		this.execNextAction(true);
		this.paused = false;
		return true;
	} else {
		return false;
	}
};

Turing.prototype.resumeFromBreakpointToNextAction = function(){
	if(this.algorithmRunning && this.paused){
		var brkpt = {once: true, state: this.currentStateID};
		switch(this.nextAction){
			case Turing.WRITE:
				brkpt.action = Turing.MOVE;
				break;
			case Turing.MOVE:
				brkpt.action = Turing.NEXT;
				break;
			case Turing.NEXT:
				brkpt.action = Turing.WRITE;
				brkpt.state = this.currentInstruction.next;
				break;
		}
		this.addBreakpoint(brkpt);
		this.resumeFromBreakpoint();
		return true;
	} else {
		return false;
	}
};

Turing.prototype.resumeFromBreakpointToNextState = function(){
	if(this.algorithmRunning && this.paused){
		this.addBreakpoint({once: true, state: this.currentInstruction.next, action: Turing.WRITE});
		this.resumeFromBreakpoint();
		return true;
	} else {
		return false;
	}
};

Turing.prototype.removeBreakpoint = function(brkpt){
	for (var i = 0; i < this.breakpoints.length; i++) {
		if(this.breakpoints[i].state === brkpt.state
			&& this.breakpoints[i].symbol === brkpt.symbol
			&& this.breakpoints[i].action === brkpt.action){
			this.breakpoints.splice(i, 1);
		}
	}
};

Turing.prototype.removeAllBreapoints = function(){
	this.breakpoints = [];
};


/*=============================
=            Event            =
=============================*/

Turing.prototype.on = function(event, listener){
	if(!this._events[event]){
		this._events[event] = [listener];
	} else {
		this._events[event].push(listener);
	}
};

Turing.prototype.once = function(){
	if(!this._events[event]){
		this._events[event] = [[listener]];
	} else {
		this._events[event].push([listener]);
	}
};

Turing.prototype.emit = function(event/**, arg1, arg2...**/){
	if(this._events[event]){
		var args = [], listener;
		for (var i = 1; i < arguments.length; i++) {
			args.push(arguments[i]);
		}

		for (var i = 0; i < this._events[event].length; i++) {
			listener = this._events[event][i];
			if(typeof listener !== "function"){
				listener = listener[0];
				this._events[event].splice(i, 1);
			}
			listener.apply(this, args);
		}
	}
};

Turing.prototype.removeListener = function(event, toDelete){
	if(this._events[event]){
		var listener;
		for (var i = 0; i < this._events[event].length; i++) {
			listener = this._events[event][i];
			if(typeof this._events[event][i] !== "function"){
				listener = listener[0];
			}
			if(listener === toDelete){
				this._events[event].splice(i, 1);
			}
		}
	}
};

Turing.prototype.removeAllListeners = function(event){
	if(typeof event === "string"){
		delete this._events[event];
	} else {
		this._events = {};
	}
};

/*-----  End of Event  ------*/


Turing.WRITE = 0;
Turing.MOVE = 1;
Turing.NEXT = 2;
