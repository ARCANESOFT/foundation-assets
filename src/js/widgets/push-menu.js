module.exports = {
    activate: function (toggleBtn) {
        // Get the screen sizes
        var body        = $('body'),
            screenSizes = $.Foundation.options.screenSizes;

        //Enable sidebar toggle
        $(document).on('click', toggleBtn, function (e) {
            e.preventDefault();

            // Enable sidebar push menu
            if ($(window).width() > (screenSizes.sm - 1)) {
                if (body.hasClass('sidebar-collapse')) {
                    body.removeClass('sidebar-collapse').trigger('expanded.pushMenu');
                } else {
                    body.addClass('sidebar-collapse').trigger('collapsed.pushMenu');
                }
            }
            // Handle sidebar push menu for small screens
            else {
                if (body.hasClass('sidebar-open')) {
                    body.removeClass('sidebar-open').removeClass('sidebar-collapse').trigger('collapsed.pushMenu');
                } else {
                    body.addClass('sidebar-open').trigger('expanded.pushMenu');
                }
            }
        });

        $('.content-wrapper').click(function () {
            // Enable hide menu when clicking on the content-wrapper on small screens
            if (
                $(window).width() <= (screenSizes.sm - 1) &&
                body.hasClass('sidebar-open')
            ) {
                body.removeClass('sidebar-open');
            }
        });

        // Enable expand on hover for sidebar mini
        if (
            $.Foundation.options.sidebarExpandOnHover ||
            (body.hasClass('fixed') && body.hasClass('sidebar-mini'))
        ) {
            this.expandOnHover();
        }
    },
    expandOnHover: function () {
        var _this       = this,
            body        = $('body'),
            screenWidth = $.Foundation.options.screenSizes.sm - 1;

        // Expand sidebar on hover
        $('.main-sidebar').hover(function () {
            if (
                body.hasClass('sidebar-mini') &&
                body.hasClass('sidebar-collapse') &&
                $(window).width() > screenWidth
            ) {
                _this.expand();
            }
        }, function () {
            if (
                body.hasClass('sidebar-mini') &&
                body.hasClass('sidebar-expanded-on-hover') &&
                $(window).width() > screenWidth
            ) {
                _this.collapse();
            }
        });
    },
    expand: function () {
        $('body').removeClass('sidebar-collapse').addClass('sidebar-expanded-on-hover');
    },
    collapse: function () {
        var body = $('body');

        if (body.hasClass('sidebar-expanded-on-hover')) {
            body.removeClass('sidebar-expanded-on-hover').addClass('sidebar-collapse');
        }
    }
};
