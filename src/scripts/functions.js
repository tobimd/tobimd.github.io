
const dir = {
    'base' : 'https://tubi-carrillo.github.io/',
    'icon' : 'https://tubi-carrillo.github.io/src/icons/',
}

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
        return Math.floor(Math.random() * a);         //     return random [0..a).

    if (b == undefined && a == undefined)             // if no arguments are given, then
        return Math.floor(Math.random() * 2);         //     return random [0..1].

    return Math.floor(Math.random() * (b - a)) + a;   // return random [a..b).
}

/**
 * Generates a download file event in the browser
 * @param {string} fileName The name of the file including it's extention.
 * @param {string} fileData The content for that file.
 */
function saveFile(fileName, fileData) {
    var blob = new Blob([fileData], {type: 'text/csv'});

    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, fileName);

    } else {
        var elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = fileName;        
        document.body.appendChild(elem);
        elem.click();        
        document.body.removeChild(elem);
        URL.revokeObjectURL;
    }
}

/**
 * Generates a download file event for each file object, in order.
 * @param {...object} fileObjects These have to be with the file name first and then the data.
 */
function saveFiles() {
    var args = arguments;

    for (var i = 0; i < args.length; i++)
        saveFile(args[i][0], args[i][1]);
}

function isLeftClick(event) { return event.which == 1; }

function isRightClick(event) { return event.which == 3; }

$.fn.extend({

    /**
     * Returns an array of all the classes in that element
     * @returns {object}
     */
    classArray : function() {
        return this.attr('class').split(' ');
    },

    /**
     * Returns an array with arrays if there is a class within that has a separator (not a space character)
     * @param {...string} [separator] The one or more separators to look for, where even though more than one 
     * separator is allowed, only one is applied to a certain class if it has 2 or more. If argument is empty 
     * then "-" (dash) is used. 
     */
    deepClassArray : function() {
        var classes = this.classArray();
        var separators = (arguments.length > 0) ? Array.prototype.slice.call(arguments) : ["-"];

        for (var i = 0; i < classes.length; i++) {                        // iterate through all of the classes
            for (var j = 0; j < separators.length; j++){                  // iterate through all of the separators

                if (classes.includes(separators[j])) {                    // if the class has the first found separator, then
                    var splitClass = classes[i].split(separators[j]);     //     get the class split by that separator and
                    classes.splice(i, 1, splitClass);                     //     replace the original class with the new array

                    break;                                                // break to avoid problems with the new array
                }
            }
        }
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
                return this.insertClass(current);              //     append the new class to the end.

            if (current == '') {                               // if the second argument (new class) is '', then
                this.removeClass(old);                         //     remove the old class without adding a new one.
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
                return classes[index];                                      //     return that class.

            return undefined;

        // two indexes for a sub array from start to end indexes
        } else if (args.length == 2) {
            if (args[0] == args[1])                    // if both indexes are the same, then
                return this.classAtIndex(args[0]);     //     return with one index as start.

            var classes = this.classArray();

            var start = (args[0] < 0) ? classes.length + args[0] : args[0];        // parse both indexes
            var end = (args[1] < 0) ? classes.length + args[1] : args[1];          //

            if (start > end || start > classes.length || end + 1 > classes.length) // if any index is incorrect, then
                return undefined;                                                  //     return undefined.
            
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
                return false;                     //     return false.
            
            if (args[1] == '')                    // we know there *is* a data attribute, so if value = '', then
                return true;                      //     return true, because we just want to know that it exists.

            return this.data(args[0]) == args[1]; // return the boolean of that comparison.
        }
    },

    /**
     * Works the same as '$.attr('src')', by returning the src attribute
     * if no argument is given, or by setting the src attribute otherwise.
     * @param {string} [value] The value to change the src to.
     * @returns {string | boolean} Returns the current src if no argument is given. 
     * The boolean is returned if an value is correctly set for the source, true
     * if it worked, false otherwise.
     */
    src : function() {
        var args = arguments;

        if (args.length == 0) {
            // return current src
            return this.attr('src');

        } else if (args.length == 1) {
            var src = this.src();      // get current src
            this.attr('src', args[0]); // replace new src
            return src != this.src();  // evaluate if equal
        }
    }
});
