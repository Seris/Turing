function Tape(container, turing){
    this.container = container;
    this.turing = turing;
    this.tape = [];

    this.fullUpdate = this.fullUpdate.bind(this);

    turing.on("action", this.fullUpdate);
    turing.on("new-tape", this.fullUpdate);
}

Tape.prototype.fullUpdate = function(){
    var width = this.container.offsetWidth,
        number = Math.floor(width / 20);

    if(number % 2 === 0){
        number--;
    }

    var half = Math.floor(number / 2);

    if(number !== this.tape.length){
        this.container.innerHTML = "";
        this.tape = [];

        var td;
        for (var i = 0; i < number; i++) {
            td = document.createElement("td");
            this.tape[i] = td;
            this.container.appendChild(td);
        }
        
        this.tape[half].className = "tapehead";
    }

    for (var i = 0; i < number; i++) {
        if(this.turing.tape[i - half + this.turing.index] !== undefined){
            this.tape[i].innerHTML = this.turing.tape[i - half + this.turing.index];
        } else {
            this.tape[i].innerHTML = "";
        }
    }
};

Tape.prototype.write = function(){

};