window.addEventListener("load", function(){
    window.turing = new Turing();
    window.tape = new Tape(document.querySelector("#turing-ribbon tr"), turing);
    window.states = new States(document.querySelector("#turing-states tbody"), turing);
    tape.fullUpdate();

    turing.loadAlgorithm(Turing.Algorithms[0]);

    turing.start();
});