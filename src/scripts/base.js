'use strict';

/**
 * This replaces the tag "build-navbar" and it's inner html with proper
 * navbar items. The structure must be (href attribute shall be omitted if
 * the navbar item in question is the current page's one):
 * 
 * <build-navbar>
 *         <navbar-item text="abc" icon="empty-file-o" href="#"></navbar-item>
 *         ...
 * </build-navbar>
 */
window.customElements.define('build-navbar', class extends HTMLElement {
    getNavbarItem(item) {
        var text = item.getAttribute('text');; // get string
        var icon = "tb tb-" + item.getAttribute('icon'); // get icon name
        var hasHref = item.hasAttribute('href');
    
        var element = (hasHref) ? document.createElement('a') : document.createElement('span');
    
        // <a class="navbar-link" href="index.html"><i class="tb tb-home-o"></i> home</a> > 
        if (hasHref) {
            element.setAttribute('class', 'navbar-link');
            element.setAttribute('href', item.getAttribute('href'));
    
        // <span class="navbar-link-current"><i class="tb tb-database-o"></i> data</span>
        } else {
            element.setAttribute('class', 'navbar-link navbar-link-current');
        }
    
        element.insertAdjacentHTML('afterbegin', '<i class="'+ icon + '"></i> ' + text);
        return element;
    }

    constructor () {
        super(); 

        /*var div = document.createElement('div');
        div.setAttribute('style', 'margin-bottom: 5rem;');*/

        var nav = document.createElement('nav');
        nav.setAttribute('class', 'navbar fixed-top d-print');
        nav.setAttribute('style', 'background-color: var(--light-bg-color);');

        var span = document.createElement('span');
        span.setAttribute('class', 'navbar-text');

        var items = document.getElementsByTagName('navbar-item');

        for (var i = 0; i < items.length; i++) {
            span.appendChild(this.getNavbarItem(items[i]));
        }

        nav.appendChild(span);
        /*div.appendChild(nav);*/
        this.replaceWith(nav);
    }
});


$(document).ready(function() {
    $('.navbar-text > .navbar-link').slice(1).each(function() {
        $(this).before(' > ');
    });
});