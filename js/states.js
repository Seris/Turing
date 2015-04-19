function States(container, turing){
    this.container = container;
    this.turing = turing;

    this.states = null;
    this.current = [];
    this.currentInstruction = null;

    turing.on("algorithm-loaded", this.display.bind(this));

    turing.on("action", this.on_action.bind(this));
    turing.on("state", this.on_state.bind(this));
    turing.on("breakpoint", this.on_breakpoint.bind(this));
    turing.on("resume-breakpoint", this.on_resume.bind(this));
}

States.prototype.on_state = function(state){
    for (var i = 0; i < this.current.length; i++) {
        this.current[i].className = "";
    };

    this.currentInstruction = this.states[state].instructions[this.turing.currentSymbolID];

    this.states[state].state.className = "current";
    var read = this.currentInstruction.read;
    read.className = "current";

    this.current = [this.states[state].state, read];
};

States.prototype.on_action = function(action){
    var element;
    switch(action){
        case Turing.WRITE:
            element = this.currentInstruction.write;
            break;
        case Turing.MOVE:
            element = this.currentInstruction.move;
            break;
        case Turing.NEXT:
            element = this.currentInstruction.next;
            break;

        default:
            return;
    }

    element.className = "current";
    this.current.push(element);
};

States.prototype.on_breakpoint = function(brkpt){
    this.container.className = "paused";
};

States.prototype.on_resume = function(brkpt){
    this.container.className = "";
};


States.prototype.display = function(){
    this.container.innerHTML = "";
    this.states = [];

    var states = this.turing.algorithm.states,
        alphabets = this.turing.alphabets, instruction;

    for (var i = 0; i < states.length; i++) {
        this.states[i] = {state: document.createElement("td"), instructions: []};
        this.states[i].state.setAttribute("rowspan", states[i].length);
        this.states[i].state.innerHTML = "E" + i;

        for(var j = 0; j < states[i].length; j++){
            instruction = this.states[i].instructions[j] = {
                tr: document.createElement("tr"),
                read: document.createElement("td"),
                write: document.createElement("td"),
                move: document.createElement("td"),
                next: document.createElement("td")
            };

            if(alphabets[j] !== undefined){
                instruction.read.innerHTML = alphabets[j];
            }
            instruction.tr.appendChild(instruction.read);

            if(states[i][j].write !== null){
                instruction.write.innerHTML = alphabets[states[i][j].write];
            }
            instruction.tr.appendChild(instruction.write);

            if(states[i][j].move === "left"){
                instruction.move.innerHTML = "Gauche";
            } else {
                instruction.move.innerHTML = "Droite";
            }
            instruction.tr.appendChild(instruction.move);

            if(states[i][j].next < 0){
                instruction.next.innerHTML = "Arrêt";
            } else {
                instruction.next.innerHTML = states[i][j].next;
            }
            instruction.tr.appendChild(instruction.next);
            this.container.appendChild(instruction.tr);
        }

        this.states[i].instructions[0].tr.insertBefore(this.states[i].state,
            this.states[i].instructions[0].read);
    }
};
