'use strict';

window.customElements.define('c-icon', class extends HTMLElement {
    get name() { return this.getAttribute('name'); }   // icon name (e.g. "rubik")

    get type() { return this.getAttribute('type'); }   // icon type (e.g. "filled")

    get size() { return this.getAttribute('size'); }   // icon size (e.g. "md")

    get filters() { return this.getAttribute('filters'); } // icon filters

    get style() { return this.getAttribute('style'); } // style

    get classes() { return this.getAttribute('class'); } // class

    get id() { return this.getAttribute('id'); }       // id

    has(name) { return this.hasAttribute(name); }
    
    load() {
        var name = this.name;
        var type = 'regular';
        var size = 'md';
        var classes = 'c-icon {0}'.format(this.name);

        // class
        if (this.has('class'))
            classes += ' ' + this.classes;
        this.img.setAttribute('class', classes);

        if (this.has('id'))
            this.img.setAttribute('id', this.id);

        // type
        if (this.has('type'))
            type = this.type;
        this.img.setAttribute('data-type', type);
        
        // size
        if (this.has('size'))
            size = this.size;
        this.img.setAttribute('data-size', size);
        this.img.setAttribute('height', iconSizes[size]);
        this.img.setAttribute('width', iconSizes[size]);

        // src
        this.img.setAttribute('src', '{0}{1}/{2}.svg'.format(dir['icon'], name, type));

        // style
        if (this.has('style')) {
            var f = '';
            if (this.has('filters'))
                f = ' ' + this.filters + ';';
            this.img.setAttribute('style', this.style + f);
        }
    }

    constructor () {
        super(); 
        
        this.img = document.createElement('img'); // image element
        this.load();                              // loading info onto image tag
        this.replaceWith(this.img);               // replacing "c-icon" with "img"
    }
});

$.fn.extend({
    icon : function() {
        var args = arguments;

        switch(args[0]) {
            case 'toggle-type': 
                var old = this.data('type'); // get the type data
                var curr;
                
                // invert the type
                if (old == 'regular')
                    curr = 'filled';
                else
                    curr = 'regular';

                // replace the type
                this.data('type', curr); 
                this.src(this.src().replace(old, curr));
                break;
            
            case 'size':
                if (args.length == 1) {
                    return this.data('size');

                } else if (args.length == 2) {
                    var old = this.data('size');
                    var curr = args[1];
                    
                    this.data('size', curr);
                    this.attr('height', iconSizes[curr]);
                    this.attr('width', iconSizes[curr]);

                    return (this.attr('height') != iconSizes[old] && this.attr('width') != iconSizes[old])
                }
                break;            
        }
    },
});