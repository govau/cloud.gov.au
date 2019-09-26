$( document ).ready( function() {
    if ( $('#sidebar-nav > ul').length > 0 ) {
        $('#sidebar-nav').append(
            '<h2 class="au-sidenav__title hidden">On this page</h2>',
            $('ul#markdown-toc').addClass('au-link-list')
        )
        .scrollspy({
            offset: -25
        })
        .affix({
            offset: {
                top: $('header.au-header').outerHeight(true) + 100,
            }
        });
    }
});