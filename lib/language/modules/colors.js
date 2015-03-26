var Color = require('color');

/*
 * Colors language module
 * Collection of color commands
 */

/*
 * Is a dark color (Below 50% brightness)
 * @param {String} color
 * @return {Boolean}
 */
function dark(color) {
    return Color(color).dark();
}

/*
 * Is a light color (Above 50% brightness)
 * @param {String} color
 * @return {Boolean}
 */
function light(color) {
    return Color(color).light();
}

/*
 * Darken a color by given percentage
 * @param {String} color
 * @param {Number} amount
 * @return {String}
 */
function darken(color, amount) {
    return brightness(color, brightness(color) - amount);
}

/*
 * Lighten a color by given percentage
 * @param {String} color
 * @param {Number} amount
 * @return {String}
 */
function lighten(color, amount) {
    return brightness(color, brightness(color) + amount);
}

/*
 * Get color brightness or set it to value if it's passed
 * @param {String} color
 * @param {Number}* amount
 * @return {String|Number}
 */
function brightness(color, amount) {
    return getOrSet('hsl', 2, color, amount);
}

/*
 * Saturate a color by given amount (0 to 100)
 * @param {String} color
 * @param {Number} amount
 * @return {String}
 */
function saturate(color, amount) {
    return saturation(color, saturation(color) + amount);
}

/*
 * Desaturate a color by given amount (0 to 100)
 * @param {String} color
 * @param {Number} amount
 * @return {String}
 */
function desaturate(color, amount) {
    return saturation(color, saturation(color) - amount);
}

/*
 * Get color satuation or set it to value if it's passed
 * @param {String} color
 * @param {Number}* amount
 * @return {String|Number}
 */
function saturation(color, amount) {
    return getOrSet('hsl', 1, color, amount);
}

/*
 * Get color hue or set it to value if it's passed
 * @param {String} color
 * @param {Number}* amount
 * @return {String|Number}
 */
function hue(color, amount) {
    return getOrSet('hsl', 0, color, amount);
}

/*
 * Rotate color hue by given amount
 * @param {String} color
 * @param {Number} amount
 * @return {String}
 */
function rotate(color, amount) {
    return Color(color).rotate(amount).rgbaString();
}

/*
 * Get color opacity or set it to value if it's passed
 * @param {String} color
 * @param {Number}* amount
 * @return {String|Number}
 */
function opacity(color, amount) {
    return getOrSet(null, 'alpha', color, amount);
}

/*
 * Increase opacity by given amount
 * @param {String} color
 * @param {Number} amount
 * @return {String}
 */
function opacize(color, amount) {
    return opacity(color, opacity(color) + amount);
}

/*
 * Decrease color opacity by given amount
 * @param {String} color
 * @param {Number} amount
 * @return {String}
 */
function transparentize(color, amount) {
    return opacity(color, opacity(color) - amount);
}

/*
 * Mix given colors balancing on given percentage
 * @param {String} a
 * @param {String} b
 * @param {Number} amount
 * @return {String}
 */
function mix(a, b, amount) {
    amount = amount || 50;
    return Color(a).mix(Color(b), amount / 100).rgbaString();
}

/*
 * Get or set utility re-used by methods in this module
 * @param {String|void} mode
 * @param {String} key
 * @param {String} color
 * @param {Number} amount
 * @return {String|Number}
 */
function getOrSet(mode, key, color, amount) {
    color = Color(color);

    if (typeof amount === 'undefined') {
        return mode ? color.values[mode][key] : color.values[key];
    }

    if (key === 'alpha') {
        return color.alpha(amount).rgbaString();
    }

    var values = color.values[mode];

    values[key] = amount;

    return Color().hsl(values).rgbaString();
}

module.exports = {
    dark           : dark,
    light          : light,
    lighten        : lighten,
    darken         : darken,
    brightness     : brightness,
    mix            : mix,
    saturation     : saturation,
    saturate       : saturate,
    desaturate     : desaturate,
    hue            : hue,
    rotate         : rotate,
    opacity        : opacity,
    opacize        : opacize,
    transparentize : transparentize
};