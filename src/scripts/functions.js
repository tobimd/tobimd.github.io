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
    if (b == undefined && a != undefined)
        return Math.floor(Math.random() * a);
    if (b == undefined && a == undefined)
        return Math.floor(Math.random() * 2);
    return Math.floor(Math.random() * (b - a)) + a;
}


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


window.customElements.define('pixel-btn', class extends HTMLElement {
    get name() {
        return this.getAttribute('name');
    }

    get disabled() {
        return this.hasAttribute('disabled');
    }

    get type() {
        return this.getAttribute('type');
    }

    get click() {
        return this.getAttribute('click');
    }

    get rclick() {
        return this.getAttribute('rclick');
    }

    has(name) {
        return this.hasAttribute(name);
    }
    
    load() {
        // class
        this.img.setAttribute('class', 'pxicon {0}'.format(this.name));

        // type
        if (this.has('type')) 
            this.img.setAttribute('type', this.type);
        else
            this.img.setAttribute('type', 'default');

        // src
            this.img.setAttribute('src', buttonDir + '{0}/{0}-{1}.svg'.format(this.name, this.img.getAttribute('type')));

        // disabled
        if (this.disabled) {
            this.img.setAttribute('disabled', '');
            this.img.setAttribute('type', 'disabled');
        }


    }
    constructor () {
        super(); 
        
        // image element
        this.img = document.createElement('img');
        this.load();
        this.replaceWith(this.img);
    }
});