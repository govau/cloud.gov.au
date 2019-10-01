$( document ).ready( function() {
    if ( $('#toc-container > ul').length > 0 ) {
        $('#sidebar > aside.au-side-nav > ul.au-link-list > li.active').append( $('div#toc-container > ul.au-link-list') );

        $('#back-to-top a').on( 'click', function() {
            $('html, body').animate({
                    scrollTop: 0
            }, 'fast');
        });
        $(window).scroll(function() {
            if ( window.scrollY > $(window).height() ) {
                    $('#back-to-top').addClass('visible');
            }
            else {
                    $('#back-to-top').removeClass('visible');
            }
        });

        /*
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
        */
    }
});