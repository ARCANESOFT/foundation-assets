module.exports = {
    // instantiate the object
    activate: function () {
        var _this   = this,                                     // Get the object
            options = $.Foundation.options.controlSidebarOptions, // Update options
            sidebar = $(options.selector),                      // Get the sidebar
            btn     = $(options.toggleBtnSelector);             // The toggle button

        // Listen to the click event
        btn.on('click', function (e) {
            e.preventDefault();
            // If the sidebar is not open
            if (
                ! sidebar.hasClass('control-sidebar-open') &&
                ! $('body').hasClass('control-sidebar-open')
            ) {
                // Open the sidebar
                _this.open(sidebar, options.slide);
            } else {
                _this.close(sidebar, options.slide);
            }
        });

        // If the body has a boxed layout, fix the sidebar bg position
        var bg = $('.control-sidebar-bg');

        _this._fix(bg);

        // If the body has a fixed layout, make the control sidebar fixed
        if ($('body').hasClass('fixed')) {
            _this._fixForFixed(sidebar);
        } else {
            // If the content height is less than the sidebar's height, force max height
            if ($('.content-wrapper, .right-side').height() < sidebar.height()) {
                _this._fixForContent(sidebar);
            }
        }
    },
    // Open the control sidebar
    open: function (sidebar, slide) {
        var control = (slide) ? sidebar : $('body');

        control.addClass('control-sidebar-open');
    },
    // Close the control sidebar
    close: function (sidebar, slide) {
        var control = (slide) ? sidebar : $('body');

        control.removeClass('control-sidebar-open');
    },
    _fix: function (sidebar) {
        var _this = this;

        if ($('body').hasClass('layout-boxed')) {
            sidebar.css('position', 'absolute').height($('.wrapper').height());
            $(window).resize(function () {
                _this._fix(sidebar);
            });
        } else {
            sidebar.css({
                'position': 'fixed',
                'height': 'auto'
            });
        }
    },
    _fixForFixed: function (sidebar) {
        sidebar.css({
            'position':       'fixed',
            'max-height':     '100%',
            'overflow':       'auto',
            'padding-bottom': '50px'
        });
    },
    _fixForContent: function (sidebar) {
        $('.content-wrapper, .right-side').css('min-height', sidebar.height());
    }
};
