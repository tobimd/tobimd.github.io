var baseDir = 'file:///D:/Documents/Github/tubi-carrillo.github.io/';
var buttonDir = baseDir + 'src/buttons/';

/**
 * Replaces parts of the string with "{<number>}" where <number> is the order of the element to be replaced (must be greater or equal than 0) 
 */
String.prototype.format = function (values) {
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
    if (b == undefined && a != undefined)             // if only one argument is given (a and not b), then
        return Math.floor(Math.random() * a);         // return random [0..a).

    if (b == undefined && a == undefined)             // if no arguments are given, then
        return Math.floor(Math.random() * 2);         // return random [0..1].

    return Math.floor(Math.random() * (b - a)) + a;   // return random [a..b).
}

$.fn.extend({

    /**
     * Returns an array of all the classes in that element
     * @returns {object}
     */
    classArray : function() {
        return this.attr('class').split(' ');
    },

    /**
     * Replaces the classes or given class with another one. If one argument is given, then 
     * all classes will be replaced with that argument, in the case that there are two 
     * arguments, then the first class will be the one to replace with the second class given.
     * @param {string} [class] The class to be searched and then replaced.
     * @param {string} repl The class to use as replacement of the old one.
     * @returns {boolean} Return true if the replacement was successful, false otherwise.
     */
    replaceClass : function() {
        var args = arguments;

        // replace all the class attribute with the only argument given
        if (args.length == 1) {
            this.attr('class', args[0]);
            return true;

        // replace first argument class with the second argument class
        } else if (args.length == 2) {
            var classes = this.classArray();

            var old = args[0];                                 // the class to be replaced.
            var current = args[1];                             // the new class to be added.

            if (old == '')                                     // if the first argument (old class) is '', then
                return this.insertClass(current);              // append the new class to the end.

            if (current == '') {                               // if the second argument (new class) is '', then
                this.removeClass(old);                         // remove the old class without adding a new one.
                if (classes.join(' ') == this.attr('class'))
                    return true;

                return false;
            }

            classes[classes.indexOf(old)] = current;           // replace old class with new class (current).
            this.attr('class', classes.join(' '));

            if (classes.join(' ') == this.attr('class'))
                return true;

            return false;
        }
    },

    /**
     * Inserts a new class at given index, if the index is -1 or there is no index presented, 
     * then it's appended to the end. Negative indexes are allowed.
     * @param {string} newClass
     * @param {number} [index]
     * @returns {boolean | undefined} If index argument is correct, then returns true if the 
     * class was inserted, false otherwise; if it's not correct, then undefined is returned.
     */
    insertClass : function() {
        var args = arguments;

        // append class to the end if no index is given (index = -1).
        if (args.length == 1) {
            this.insertClass(args[0], -1);

        // insert class at index
        } else if (args.length == 2) {
            var classes = this.classArray();

            var current = args[0];                                               // the new class (current).
            var index = (args[1] < 0) ? classes.length + args[1] : args[1];      // parse index if it is negative, ignore otherwise.

            if (index < 0 || index > classes.length)                             // if index is still negative, return undefined.
                return undefined;

            classes.splice(index, 0, current);                                   // use splice: at index, remove 0 elements, and add new class.

            this.attr('class', classes.join(' '));

            if (classes.join(' ') == this.attr('class'))
                return true;
            return false;
        }
    },
    
    /**
     * Returns the class at given index. The last class is returned if no index is
     * given. Negative indexes are allowed. If there are two arguments, then an array
     * containing all classes within those indexes will be returned. endIndex is not
     * inclusive.
     * @param {number} start
     * @param {number} [end]
     * @returns {string | undefined} Returns the class at given index or indexes, if 
     * the arguments are incorrect or none is found, then undefined is returned.
     */
    classAtIndex : function() {
        var args = arguments;

        // common case, with only start index
        if (args.length == 1) {
            var classes = this.classArray();

            var index = (args[0] < 0) ? classes.length + args[0] : args[0]; // parse index if it is negative, ignore otherwise.

            if (index < classes.length && index >= 0)                       // if index within normal boundaries, then
                return classes[index];                                      // return that class.

            return undefined;

        // two indexes for a sub array from start to end indexes
        } else if (args.length == 2) {
            if (args[0] == args[1])                    // if both indexes are the same, then
                return this.classAtIndex(args[0]);     // return with one index as start.

            var classes = this.classArray();

            var start = (args[0] < 0) ? classes.length + args[0] : args[0];        // parse both indexes
            var end = (args[1] < 0) ? classes.length + args[1] : args[1];          //

            if (start > end || start > classes.length || end + 1 > classes.length) // if any index is incorrect, then
                return undefined;                                                  // return undefined.
            
            var tmp = classes.splice(0);           // copy classes array.
            classes.splice(0, start);              // classes = [0, ..., start]
            tmp.splice(end, tmp.length - end);     // tmp = [end, ..., length]

            return classes.filter(value => tmp.includes(value)); // return the intersection of tmp and classes arrays.
        }
    },

    /**
     * Returns the index of the given class.
     * @param {string} class
     * @returns {number} Returns the index of said class, if it's not found, then returns -1.
     */
    indexOfClass : function() {
        var args = arguments;

        if (args.length == 1)
            return this.classArray().indexOf(args[0]);
    },

    /**
     * Return the value of a data attribute.
     * @param {string} data The name of that data attribute.
     * @param {string} [value] The value to compare the current data's attribute ('' is the default value).
     * @returns {boolean | undefined} Returns true if that data exists and if the comparison with the value
     * returns true, otherwise false is returned.
     */
    cmpData : function() {
        var args = arguments;

        // if only the data's name is given, default the value with ''
        if (args.length == 1) {
            return this.cmpData(args[0], '');

        // compare values of that data's attribute
        } else if (args.length == 2) {
            if (this.data(args[0]) == undefined)  // if there is no data attribute initialized (undefined), then
                return false;                     // return false.
            
            if (args[1] == '')                    // we know there *is* a data attribute, so if value = '', then
                return true;                      // return true, because we just want to know that it exists.

            return this.data(args[0]) == args[1]; // return the boolean of that comparison.
        }
    },

    /**
     * Returns if the element is a button.
     * @returns Returns true if it is a button, false otherwise.
     */
    isButton : function() {
        return this.classAtIndex(0) == 'pxicon';
    },

    /**
     * Changes the src attribute for buttons.
     * @param {string} [src] The new src for that element, 'default' is used if this parameter is 
     * empty if it is a button.
     * @returns {boolean | undefined} If the element has the src attribute, then returns true
     * if the value has been successfully changed, false if not and undefined if it doesn't have
     * that attribute.
     */
    src : function() {
        var args = arguments;

        // returns false if no arguments are given and if it's not a button.
        if (args.length == 0) {
            if (this.isButton())
                return this.src('default');
            return false;

        } else if (args.length == 1) {
            if (this.attr('src') == undefined) // if there is no 'src' attribute, then 
                return undefined;              // return undefined.

            var old = this.attr('src');        // the old src.

            // if it is a button, change the type only.
            if (this.isButton()) {
                this.attr('src', buttonDir + '{0}/{0}-'.format(this.classAtIndex(1)) + args[0] + '.svg');
                this.data('type', args[1]);    // also change the data-type attribute

            // if it is *not* a button, change all the src string.
            } else {
                this.attr('src', args[0]);
            }

            if (old == this.attr('src'))
                return false;

            return true;

        } 
    },

    /**
     * Toggles the button being disabled.
     * @param {boolean} [visible] If true, makes the change visible by also changing the src (default is true).
     * @returns {boolean} Returns the value of it's disabled state after the toggle.
     */
    toggleDisabled : function() {

        // button-only functionallity
        if (this.isButton()) {
            var visible = (arguments[0] == undefined) ? true : arguments[0];

            if (this.data('disabled') == undefined) { // if button is not disabled, then
                this.data('disabled', '');            // add data-disabled=''.

                if (visible)
                    this.src('disabled');
                
                return true;

            } else {                                  // if button is disabled, then
                this.removeData('disabled');          // remove the data from data-disabled
                this.removeAttr('data-disabled');     // and remove the attribute 'data-disabled'

                if (visible)
                    this.src();

                return false;
            }
        }
    },
});


window.customElements.define('pixel-btn', class extends HTMLElement {
    get name() { return this.getAttribute('name'); }

    get disabled() { return this.hasAttribute('disabled'); }

    get type() { return this.getAttribute('type'); }

    get lclick() { return this.getAttribute('lclick'); }

    get rclick() { return this.getAttribute('rclick'); }

    get blockLeftClick() { return this.hasAttribute('block-lclick'); }

    get blockRightClick() { return this.hasAttribute('block-rclick'); }

    has(name) { return this.hasAttribute(name); }
    
    load() {
        // class
        this.img.setAttribute('class', 'pxicon {0}'.format(this.name));

        // type
        if (this.has('type')) 
            this.img.setAttribute('data-type', this.type);
        else
            this.img.setAttribute('data-type', 'default');

        // disabled
        if (this.disabled) {
            this.img.setAttribute('data-disabled', '');
            this.img.setAttribute('data-type', 'disabled');
        }

        // src
        this.img.setAttribute('src', buttonDir + '{0}/{0}-{1}.svg'.format(this.name.split(' ')[0], this.img.getAttribute('data-type')));

        // block clicks
        if (this.blockLeftClick)
            this.img.setAttribute('data-block', 'left');
        else if (this.blockRightClick)
            this.img.setAttribute('data-block', 'right');

        // lclick
        if (this.has('lclick'))
            this.img.setAttribute('data-lclick', this.lclick);

        // rclick
        if (this.has('rclick'))
            this.img.setAttribute('data-rclick', this.rclick);
    }

    constructor () {
        super(); 
        
        this.img = document.createElement('img'); // image element
        this.load();                              // loading info onto image tag
        this.replaceWith(this.img);               // replacing "pixel-btn" with "img"
    }
});

function isLeftClick(event) { return event.which == 1; }

function isRightClick(event) { return event.which == 3; }

$(document).ready(function() {
    $('img.pxicon').each(function() {
        var btn = $(this);
        btn.bind("contextmenu", function(e) { e.preventDefault(); });

        btn.on({
            'mouseenter' : function() {
                if (!btn.cmpData('disabled'))
                    btn.src('hover');
            },

            'mouseleave' : function() {
                if (!btn.cmpData('disabled'))
                    btn.src();
            },

            'mousedown' : function(event) {
                if (!btn.cmpData('disabled')) {
                    if ((!btn.cmpData('block', 'left') && isLeftClick(event)) || (!btn.cmpData('block', 'right') && isRightClick(event)))
                        btn.src('click');
                }
            },
            
            'mouseup' : function(event) {
                if (!btn.cmpData('disabled')) {
                    btn.src('hover');
                    
                    window.setTimeout(function() {  
                        if (btn.cmpData('lclick') && isLeftClick(event))
                            window.location.assign(baseDir + btn.data('lclick'));
                        
                        if (btn.cmpData('rclick') && isRightClick(event))
                            window.location.assign(baseDir + btn.data('rclick'));
                    }, 300);
                }
            },

            'mouseleave' : function(event) {
                if (!btn.cmpData('disabled'))
                    btn.src();
            },
        });
    });
});