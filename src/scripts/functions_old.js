/**
 * Replaces parts of the string with "{<number>}" where <number> is the order of the element to be replaced (must be greater or equal than 0)
 */
String.prototype.format = function () {
    var args = arguments;
    return this.replace(/\{(\d+)\}/g, function (m, n) { return args[n]; });
};

/**
 * Returns a random integer between "a" (inclusive) and "b" (not inclusive).
 * @param {Number} a 
 * @param {Number} b 
 * @return {Number}
 */
function random(a, b) {
    if (b == undefined && a != undefined)
        return Math.floor(Math.random() * a);
    if (b == undefined && a == undefined)
        return Math.floor(Math.random() * 2);
    return Math.floor(Math.random() * (b - a)) + a;
}

/**
 * Changes the source of the "button" to the "type" given
 * @param {HTMLElement} button The element to change it's "src" attribute from.
 * @param {String=} [type] The new source type: "hover", "click", "disabled" or "default" if nothing is given.
 * @return {Boolean} Returns true if replacement was succesfull, false otherwise.
 */
function setButtonType(button, type) {
    if (type == undefined)
        type = 'default';

    if (type == getButtonType(button))
        return true;

    var oldSrc = this.attr('src');
    var oldType = getButtonType(button);

    this.attr('src', oldSrc.replace(oldType, type + '.svg'));

    return oldSrc == this.attr('src');
}

/**
 * Returns the current type the button is in.
 * @param {HTMLElement} button 
 */
function getButtonType(button) {
    var type = this.attr('src').split('-')[this.attr('src').split('-').length - 1];
    return type.substring(0, type.length - 4);
}

/**
 * 
 * @param {HTMLElement} button 
 * @param {String} event 
 */
function pixelButton(button, event) {

    if (button.disabled) {
        setButtonType(button, 'disabled');
        return;
    }

    switch(event) {
        case 'mouseenter':
            setButtonType(button, 'hover');
            break;

        case 'mousedown':
            setButtonType(button, 'click');
            break;

        case 'mouseup':
            if (button.filter(':hover').length != 0)
                setButtonType(button, 'hover');
            else
                setButtonType(button);

            console.info(button.href);
            break;

        default: // 'mouseleave'
            setButtonType(button);
    }
}

window.customElements.define('pixel-button', class extends HTMLElement {
    get name() {
        return this.hasAttribute('name');
    }

    set name(val) {
        // Reflect the value of the open property as an HTML attribute.
        if (val) {
            this.setAttribute('name', '');
        } else {
            this.removeAttribute('name');
        }
    }

    get disabled() {
        return this.hasAttribute('disabled');
    }

    set disabled(val) {
        // Reflect the value of the open property as an HTML attribute.
        if (val) {
            this.setAttribute('disabled', '');
        } else {
            this.removeAttribute('disabled');
        }
    }

    get href() {
        return this.hasAttribute('href');
    }

    set href(val) {
        // Reflect the value of the open property as an HTML attribute.
        if (val) {
            this.setAttribute('href', '');
        } else {
            this.removeAttribute('href');
        }
    }

    get width() {
        return this.hasAttribute('width');
    }

    set width(val) {
        // Reflect the value of the open property as an HTML attribute.
        if (val) {
            this.setAttribute('width', '');
        } else {
            this.removeAttribute('width');
        }
    }

    constructor () {
        super();
        
        this.replaceWith('<img src="../buttons/{0}/{0}-default.svg" width="{1}">'.format(this.name, this.width));

        this.addEventListener('mouseenter', pixelButton(this, 'mouseenter'));
        this.addEventListener('mouseleave', pixelButton(this, 'mouseleave'));
        this.addEventListener('mousedown', pixelButton(this, 'mousedown'));
        this.addEventListener('mouseup', pixelButton(this, 'mouseup'));
    }
});

/**
 * The jQuery plugin namespace.
 * @external "jQuery.fn"
 * @see {@link http://docs.jquery.com/Plugins/Authoring The jQuery Plugin Guide}
 */

/**
 * Show comments
 * @function external:"jQuery.fn".extend
 */
$.fn.extend({
    classArray : function() {
        return this.attr('class').split(' ');
    },

    replaceClass : function() {
        var args = arguments;

        if (args.length == 1) {
            this.attr('class', args[0]);
            return true;

        } else if (args.length == 2) {
            var currClasses = this.classArray();

            var oldClass = args[0];
            var newClass = args[1];

            if (oldClass == '') {
                return this.insertClass(newClass);
            }

            if (newClass == '') {
                this.removeClass(oldClass);
                if (currClasses.join(' ') == this.attr('class'))
                    return true;
                return false;
            }

            currClasses[currClasses.indexOf(oldClass)] = newClass;
            this.attr('class', currClasses.join(' '));

            if (currClasses.join(' ') == this.attr('class'))
                return true;
            return false;
        }
    },

    insertClass : function() {
        var args = arguments;

        if (args.length == 1) {
            this.insertClass(args[0], -1);

        } else if (args.length == 2) {
            var currClasses = this.classArray();

            var newClass = args[0];
            var index = (args[1] < 0) ? currClasses.length + args[1]: args[1];

            if (index < 0)
                index = 0;

            currClasses.splice(index, 0, newClass);

            this.attr('class', currClasses.join(' '));

            if (currClasses.join(' ') == this.attr('class'))
                return true;
            return false;
        }
    }
});