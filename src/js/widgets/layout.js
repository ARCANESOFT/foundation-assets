module.exports = {
    activate: function () {
        var _this = this;

        _this.fix();
        _this.fixSidebar();
        $(window, '.wrapper').resize(function () {
            _this.fix();
            _this.fixSidebar();
        });
    },
    fix: function () {
        // Get window height and the wrapper height
        var neg            = $('.main-header').outerHeight() + $('.main-footer').outerHeight(),
            window_height  = $(window).height(),
            sidebar_height = $('.sidebar').height(),
            postSetWidth;

        // Set the min-height of the content and sidebar based on the the height of the document.
        if ($('body').hasClass('fixed')) {
            postSetWidth = window_height - $('.main-footer').outerHeight();
        } else {
            postSetWidth = window_height >= sidebar_height ? (window_height - neg) : sidebar_height;

            // Fix for the control sidebar height
            var controlSidebar = $($.Foundation.options.controlSidebarOptions.selector);

            if (
                typeof controlSidebar !== 'undefined' &&
                controlSidebar.height() > postSetWidth
            ) {
                postSetWidth = controlSidebar.height();
            }
        }

        $('.content-wrapper, .right-side').css('min-height', postSetWidth);
    },
    fixSidebar: function () {
        var sidebar = $('.sidebar');

        // Make sure the body tag has the .fixed class
        if ( ! $('body').hasClass('fixed')) {
            if (typeof $.fn.slimScroll != 'undefined') {
                sidebar.slimScroll({destroy: true}).height('auto');
            }

            return;
        } else if (typeof $.fn.slimScroll == 'undefined' && window.console) {
            window.console.error('Error: the fixed layout requires the slimscroll plugin!');
        }

        // Enable slimscroll for fixed layout
        if ($.Foundation.options.sidebarSlimScroll) {
            if (typeof $.fn.slimScroll != 'undefined') {
                // Destroy if it exists
                sidebar.slimScroll({destroy: true}).height('auto');

                // Add slimscroll
                sidebar.slimscroll({
                    height: ($(window).height() - $('.main-header').height()) + 'px',
                    color:  'rgba(0,0,0,0.2)',
                    size:   '3px'
                });
            }
        }
    }
};
