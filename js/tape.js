function Tape(container, turing){
    this.container = container;
    this.turing = turing;
    this.tape = [];

    turing.on("action", this.fullUpdate.bind(this));
}

Tape.prototype.fullUpdate = function(){
    this.container.innerHTML = "";
    this.tape = [];

    var width = this.container.offsetWidth,
        number = Math.floor(width / 20);

    if(number % 2 === 0){
        number--;
    }

    var half = Math.floor(number / 2), td;
    for (var i = 0; i < number; i++) {
        td = document.createElement("td");
        p = i - half;
        this.tape[i] = td;
        if(this.turing.tape[this.turing.index + p] !== undefined){
            td.innerHTML = this.turing.tape[this.turing.index + p];
        }
        this.container.appendChild(td);
    }

    this.tape[half].className = "tapehead";
};