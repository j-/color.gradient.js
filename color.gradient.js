(function () {

/* global Color */

'use strict';

var Gradient = Color.Gradient = function (direction, stops) {
	if (!(typeof direction === 'string' || typeof direction === 'number')) {
		stops = direction;
		direction = null;
	}
	this.direction = direction;
	this.stops = stops || [];
};

/**
 * Format a stop as a color/position pair string.
 * @param {Color.Gradient.Stop} stop
 * @return {String} Formatted string e.g. "#fff 0%"
 */
Gradient.formatColorStop = function (stop) {
	var color = Color.formatRGBAString(stop.color);
	var position = stop.position * 100;
	return color + ' ' + position + '%';
};

/**
 * Get the string representation of a directional value.
 * @param {String|Number} direction Directional value e.g. "to right", 90 (deg)
 * @return {String} Formatted direction string
 */
Gradient.formatDirection = function (direction) {
	if (typeof direction === 'number') {
		direction += 'deg';
	}
	return direction;
};

/**
 * Determine if this gradient has a direction associated with it.
 * @return {Boolean} True if this gradient has a direction
 */
Gradient.prototype.hasDirection = function () {
	return Boolean(this.direction);
};

/**
 * Add a new color stop to this gradient. Color stops have a position and value.
 * @param {Number} position Position between 0 and 1 of this color stop
 * @param {Number|String|Color} color Value of the color at this stop
 */
Gradient.prototype.addColorStop = function (position, color) {
	var stop = new Stop(position, color);
	this.stops.push(stop);
};

/**
 * Converts the gradient to a CSS gradient string.
 * @return {String} String value
 */
Gradient.prototype.toString = function () {
	var result = 'linear-gradient(';
	if (this.hasDirection()) {
		result += Gradient.formatDirection(this.direction) + ', ';
	}
	result += this.stops.map(Gradient.formatColorStop).join(', ');
	result += ')';
	return result;
};

var Stop = Color.Gradient.Stop = function (position, color) {
	this.position = position;
	this.color = Color.parse(color);
};

})();
