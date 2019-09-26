$( document ).ready( function() {
    if ( $('#toc-container > ul').length > 0 ) {
        $('#toc-container').append(
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