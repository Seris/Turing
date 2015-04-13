var Widgets = {};

/** message, items, callback, toggleButton, appendTo, disableCloseButton */
Widgets.Popup = function (opts){
	this.container = document.createElement("div");
	this.container.className = "widget-popup";

	if(!opts.disableCloseButton){
		this.close = document.createElement("span");
		this.close.innerHTML = "×";
		this.container.appendChild(this.close);
		this.close.addEventListener("click", this.hide.bind(this))
	}

	this.callback = opts.callback;
	
	this.message = document.createElement("h3");
	this.message.innerHTML = opts.message;
	this.container.appendChild(this.message);

	this.list = document.createElement("ul");
	this.container.appendChild(this.list);

	this._show = false;

	this.items = new Array(opts.items.length);
	for (var item in opts.items) {
		if(opts.items.hasOwnProperty(item)){
			this.items[item] = document.createElement("li");
			this.items[item].innerHTML = opts.items[item];
			this.list.appendChild(this.items[item]);
			this.bind(item, this.items[item]);
		}
	}

	if(opts.toggleButton){
		opts.toggleButton.addEventListener("click", this.toggle.bind(this));
	}

	var appendTo = opts.appendTo || document.body;
	appendTo.appendChild(this.container);
};


Widgets.Popup.prototype = {
	toggle: function(){
		if(this._show)
			this.hide();
		else
			this.show();
	},

	show: function(){
		var container = this.container;
		container.style.display = "block";
		this._show = !this._show;
        setTimeout(function(){
        	container.className = "widget-popup show";
        }, 50);
	},

	hide: function(){
		var container = this.container;
        container.className = "widget-popup";
		this._show = !this._show;
        setTimeout(function(){
			container.style.display = "none";
        }, 350);
	},

	bind: function(id, item){
		var self = this;
		item.addEventListener("click", function(){
			self.callback(id, item.innerHTML);
			self.hide();
		});
	}
};
