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
