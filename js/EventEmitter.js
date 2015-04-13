"use strict";

/**
 * EventEmitter
 * Par Valentin Maerten
 * License GPLv3
 */

function EventEmitter() {
  this._events = {};
  this.maxListener = 10;
}

EventEmitter.prototype.on = function (evt, listener) {
  if(typeof listener !== 'function')
    throw new Error("listener must be a function");

  if(!this._events[evt])
    this._events[evt] = [];

  if(this._events[evt].length > this.maxListener){
    console.warn("EventEmitter#%s has %d listeners, maybe a memory leak", evt, 
      this._events[evt].length);
  }

  this._events[evt].push(listener);

  return this;
};

EventEmitter.prototype.once = function (evt, listener){
  if(typeof listener !== 'function')
    throw new Error("listener must be a function");

  if(!this._events[evt])
    this._events[evt] = [];

  this._events[evt].push([listener]);
};

EventEmitter.prototype.emit = function (evt/*, args... */){
  if(!this._events[evt] || !this._events[evt].length === 0)
    return this;

  var args = new Array(arguments.length - 1);
  for (var i = 1; i < arguments.length; i++) {
    args[i - 1] = arguments[i];
  }

  var events = this._events[evt];
  for (var i = 0; i < events.length; i++) {
    var listener = events[i];
    if(typeof listener === 'object'){
      listener = listener[0];
      events.splice(i, 1);
    }

    listener.apply(this, args);
  }

  return this;
};

EventEmitter.prototype.removeListener = function (evt, listener){
  if(typeof listener !== 'function')
    throw new Error("listener must be a function");

  if(!this._events[evt])
    return this;

  for (var i = 0; i < this._events[evt].length; i++) {
    var fn = this._events[evt][i];
    if(typeof fn === 'object'){
      fn = fn[0];
    }

    if(fn === listener){
      this._events[evt].splice(i, 1);
      return true;
    }
  }

  return false;
};

EventEmitter.prototype.removeAllListeners = function (evt){
  if(!this._events[evt])
    return this;

  this._events[evt] = [];

  return this;
};
