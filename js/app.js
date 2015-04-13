var turing;
window.addEventListener("load", function(){
	var items = {};
	for (var i = 0; i < Turing.Algorithms.length; i++) {
		items[i] = Turing.Algorithms[i].name;
	}

    var load_algorithm = new Widgets.Popup({
    	message: "Lancer un programme",

    	items: items,

    	callback: function(id, message){
    		if(!turing.load_algorithm(Turing.Algorithms[id])){
    			alert("Impossible de charger l'algorithme");
    		}
    	},

    	toggleButton: document.querySelector("#load-algorithm")
    });

    document.querySelector("#start-algorithm").addEventListener("click", function(){
    	if(!turing.start()){
    		alert("Impossible de démarrer");
    	}
    });

    document.querySelector("#turing-input").addEventListener("keydown", function(e){
        var value = document.querySelector("#turing-input input").value.split("");
        console.log(value);
    });

    turing = new Turing("#turing-ribbon");
});
