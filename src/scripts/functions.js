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

    set name(value) {
        if (value) {
            this.setAttribute('name', value);
        } else {
            this.removeAttribute('name');
        }
    }

    get disabled() {
        return this.hasAttribute('disabled');
    }

    set disabled(value) {
        if (value) {
            this.type = 'disabled';
            this.setAttribute('disabled', '');
        } else {
            this.removeAttribute('disabled');
        }
    }

    get src() {
        if (this.hasAttribute('src'))
            return this.getAttribute('src');
            this.hasAttribute('src')
    }

    set src(value) {
        if (value) {
            this.style.backgroundImage = 'url("https://tubi-carrillo.github.io/src/buttons/{0}/{0}-{1}.svg")'.format(this.name, value);
            this.setAttribute('src', value);
        } else {
            this.removeAttribute('src');
        }
    }

    get type() {
        return this.hasAttribute('type');
    }

    set type(value) {
        if (this.disabled)
            return;

        if (value) {
            this.setAttribute('type', value);

            switch(value) {
                case 'mouseenter':
                    this.src = 'hover';
                    break;
                
                case 'mousedown':
                    this.src = 'click';
                    break;

                case 'mouseleave':
                    this.src = 'default';
                    break;
                
                default:
                    this.src = 'default';
            }
        } else {
            this.removeAttribute('type');
        }
    }

    constructor () {
        super(); 
        
        this.name = this.getAttribute('name');
        this.disabled = false;
        this.type = 'default';
        this.src = 'default';
        this.name;

        
        this.addEventListener('mouseenter', function(event) { this.type = 'mouseenter'; });

        this.addEventListener('mouseleave', function(event) { this.type = 'mouseleave'; });

        this.addEventListener('mousedown', function(event) { this.type = 'mousedown'; });

        this.addEventListener('mouseup', function(event) {
            //
        });
    }
});