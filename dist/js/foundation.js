(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function (options) {
    // Render options
    var settings = $.extend({
        //When the user checks the input
        onCheck: function (ele) {
            return ele;
        },
        //When the user unchecks the input
        onUncheck: function (ele) {
            return ele;
        }
    }, options);

    return this.each(function () {
        //if (typeof $.fn.iCheck != 'undefined') {
        //    $('input', this).on('ifChecked', function () {
        //        var ele = $(this).parents('li').first();
        //        ele.toggleClass('done');
        //        settings.onCheck.call(ele);
        //    });
        //
        //    $('input', this).on('ifUnchecked', function () {
        //        var ele = $(this).parents('li').first();
        //        ele.toggleClass('done');
        //        settings.onUncheck.call(ele);
        //    });
        //} else {
        $('input', this).on('change', function () {
            var ele = $(this).parents('li').first();
            ele.toggleClass('done');
            if ($('input', ele).is(':checked')) {
                settings.onCheck.call(ele);
            } else {
                settings.onUncheck.call(ele);
            }
        });
        //}
    });
};

},{}],2:[function(require,module,exports){
module.exports = {
    selectors:      $.Foundation.options.boxWidgetOptions.boxWidgetSelectors,
    icons:          $.Foundation.options.boxWidgetOptions.boxWidgetIcons,
    animationSpeed: $.Foundation.options.animationSpeed,
    activate: function (_box) {
        var _this = this;

        if ( ! _box) {
            _box = document; // activate all boxes per default
        }

        //Listen for collapse event triggers
        $(_box).on('click', _this.selectors.collapse, function (e) {
            e.preventDefault();
            _this.collapse($(this));
        });

        //Listen for remove event triggers
        $(_box).on('click', _this.selectors.remove, function (e) {
            e.preventDefault();
            _this.remove($(this));
        });
    },
    collapse: function (element) {
        var _this = this,
        // Find the box parent
            box         = element.parents('.box').first(),
        // Find the body and the footer
            box_content = box.find('> .box-body, > .box-footer, > form  >.box-body, > form > .box-footer');

        if ( ! box.hasClass('collapsed-box')) {
            // Convert minus into plus
            element.children(':first').removeClass(_this.icons.collapse).addClass(_this.icons.open);

            // Hide the content
            box_content.slideUp(_this.animationSpeed, function () {
                box.addClass('collapsed-box');
            });
        } else {
            // Convert plus into minus
            element.children(':first').removeClass(_this.icons.open).addClass(_this.icons.collapse);

            // Show the content
            box_content.slideDown(_this.animationSpeed, function () {
                box.removeClass('collapsed-box');
            });
        }
    },
    remove: function (element) {
        // Find the box parent
        var box = element.parents('.box').first();

        box.slideUp(this.animationSpeed, function() {
            $(this).remove();
        });
    }
};

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
module.exports = function (menu) {
    var _this          = this;
    var animationSpeed = $.Foundation.options.animationSpeed;

    $(menu).on('click', 'li a', function (e) {
        // Get the clicked link and the next element
        var $this        = $(this);
        var checkElement = $this.next();

        // Check if the next element is a menu and is visible
        if (
            (checkElement.is('.treeview-menu')) &&
            (checkElement.is(':visible')) &&
            ( ! $('body').hasClass('sidebar-collapse'))
        ) {
            // Close the menu
            checkElement.slideUp(animationSpeed, function () {
                checkElement.removeClass('menu-open');
                // Fix the layout in case the sidebar stretches over the height of the window
                // _this.layout.fix();
            });

            checkElement.parent('li').removeClass('open');
        }
        // If the menu is not visible
        else if (
            (checkElement.is('.treeview-menu')) &&
            ( ! checkElement.is(':visible'))
        ) {
            // Get the parent menu
            var parent = $this.parents('ul').first();
            // Close all open menus within the parent
            var ul = parent.find('ul:visible').slideUp(animationSpeed);
            // Remove the menu-open class from the parent

            ul.removeClass('menu-open');

            // Get the parent li
            var parent_li = $this.parent('li');

            // Open the target menu and add the menu-open class
            checkElement.slideDown(animationSpeed, function () {
                // Add the class active to the parent li
                checkElement.addClass('menu-open');
                parent.find('li.open').removeClass('open');
                parent_li.addClass('open');

                // Fix the layout in case the sidebar stretches over the height of the window
                _this.layout.fix();
            });
        }

        // if this isn't a link, prevent the page from being redirected
        if (checkElement.is('.treeview-menu')) {
            e.preventDefault();
        }
    });
};

},{}],7:[function(require,module,exports){
/*! Foundation app.js
 * ================
 * Main JS application file for Foundation v2. This file
 * should be included in all pages. It controls some layout
 * options and implements exclusive Foundation plugins.
 *
 * @Author  Almsaeed Studio
 * @Support <http://www.almsaeedstudio.com>
 * @Email   <support@almsaeedstudio.com>
 * @version 2.3.2
 * @license MIT <http://opensource.org/licenses/MIT>
 */

// Make sure jQuery has been loaded before app.js
if (typeof jQuery === 'undefined') {
    throw new Error('Foundation requires jQuery');
}

/* Foundation
 *
 * @type Object
 * @description $.Foundation is the main object for the template's app.
 *              It's used for implementing functions and options related
 *              to the template. Keeping everything wrapped in an object
 *              prevents conflict with other plugins and is a better
 *              way to organize our code.
 */
$.Foundation = {};

/* --------------------
 * - Foundation Options -
 * --------------------
 * Modify these options to suit your implementation
 */
$.Foundation.options = {
    // Add slimscroll to navbar menus
    // This requires you to load the slimscroll plugin in every page before app.js
    navbarMenuSlimscroll: true,
    navbarMenuSlimscrollWidth: '3px', // The width of the scroll bar
    navbarMenuHeight: '200px', // The height of the inner menu
    // General animation speed for JS animated elements such as box collapse/expand and sidebar treeview slide up/down.
    // This options accepts an integer as milliseconds, 'fast', 'normal', or 'slow'
    animationSpeed: 500,
    // Sidebar push menu toggle button selector
    sidebarToggleSelector: '[data-toggle="offcanvas"]',
    // Activate sidebar push menu
    sidebarPushMenu: true,
    // Activate sidebar slimscroll if the fixed layout is set (requires SlimScroll Plugin)
    sidebarSlimScroll: true,
    // Enable sidebar expand on hover effect for sidebar mini
    // This option is forced to true if both the fixed layout and sidebar mini are used together
    sidebarExpandOnHover: false,
    // BoxRefresh Plugin
    enableBoxRefresh: true,
    // Bootstrap.js tooltip
    enableBSToppltip: true,
    BSTooltipSelector: '[data-toggle="tooltip"]',
    // Enable Fast Click. Fastclick.js creates a more native touch experience with touch devices.
    // If you choose to enable the plugin, make sure you load the script before Foundation's app.js
    enableFastclick: true,
    // Control Sidebar Options
    enableControlSidebar: true,
    controlSidebarOptions: {
        // Which button should trigger the open/close event
        toggleBtnSelector: '[data-toggle="control-sidebar"]',
        // The sidebar selector
        selector: '.control-sidebar',
        // Enable slide over content
        slide: true
    },
    // Box Widget Plugin. Enable this plugin to allow boxes to be collapsed and/or removed
    enableBoxWidget: true,
    // Box Widget plugin options
    boxWidgetOptions: {
        boxWidgetIcons: {
            //Collapse icon
            collapse: 'fa-minus',
            //Open icon
            open: 'fa-plus',
            //Remove icon
            remove: 'fa-times'
        },
        boxWidgetSelectors: {
            //Remove button selector
            remove: '[data-widget="remove"]',
            //Collapse button selector
            collapse: '[data-widget="collapse"]'
        }
    },
    // Direct Chat plugin options
    directChat: {
        // Enable direct chat by default
        enable: true,
        // The button to open and close the chat contacts pane
        contactToggleSelector: '[data-widget="chat-pane-toggle"]'
    },
    // Define the set of colors to use globally around the website
    colors: {
        lightBlue: '#3C8DBC',
        red:       '#F56954',
        green:     '#00A65A',
        aqua:      '#00C0EF',
        yellow:    '#F39C12',
        blue:      '#0073B7',
        navy:      '#001F3F',
        teal:      '#39CCCC',
        olive:     '#3D9970',
        lime:      '#01FF70',
        orange:    '#FF851B',
        fuchsia:   '#F012BE',
        purple:    '#8E24AA',
        maroon:    '#D81B60',
        black:     '#222222',
        gray:      '#D2D6DE'
    },

    // The standard screen sizes that bootstrap uses.
    // If you change these in the variables.less file, change them here too.
    screenSizes: {
        xs: 480,
        sm: 768,
        md: 992,
        lg: 1200
    }
};

/* ------------------
 * - Implementation -
 * ------------------
 * The next block of code implements Foundation's functions and plugins as specified by the options above.
 */
$(function () {
    'use strict';

    // Fix for IE page transitions
    $('body').removeClass('hold-transition');

    // Extend options if external options exist
    if (typeof FoundationOptions !== 'undefined') {
        $.extend(true, $.Foundation.options, FoundationOptions);
    }

    // Easy access to options
    var options = $.Foundation.options;

    // Set up the object
    _init();

    // Activate the layout maker
    $.Foundation.layout.activate();

    // Enable sidebar tree view controls
    $.Foundation.tree('.sidebar');

    // Enable control sidebar
    if (options.enableControlSidebar) {
        $.Foundation.controlSidebar.activate();
    }

    // Add slimscroll to navbar dropdown
    if (options.navbarMenuSlimscroll && typeof $.fn.slimscroll != 'undefined') {
        $('.navbar .menu').slimscroll({
            height: options.navbarMenuHeight,
            alwaysVisible: false,
            size: options.navbarMenuSlimscrollWidth
        }).css('width', '100%');
    }

    // Activate sidebar push menu
    if (options.sidebarPushMenu) {
        $.Foundation.pushMenu.activate(options.sidebarToggleSelector);
    }

    // Activate Bootstrap tooltip
    if (options.enableBSToppltip) {
        $('body').tooltip({
            selector: options.BSTooltipSelector
        });
    }

    // Activate box widget
    if (options.enableBoxWidget) {
        $.Foundation.boxWidget.activate();
    }

    // Activate fast click
    if (options.enableFastclick && typeof FastClick != 'undefined') {
        FastClick.attach(document.body);
    }

    //Activate direct chat widget
    if (options.directChat.enable) {
        $(document).on('click', options.directChat.contactToggleSelector, function () {
            var box = $(this).parents('.direct-chat').first();
            box.toggleClass('direct-chat-contacts-open');
        });
    }

    /*
     * INITIALIZE BUTTON TOGGLE
     * ------------------------
     */
    $('.btn-group[data-toggle="btn-toggle"]').each(function () {
        var group = $(this);

        group.find('.btn').on('click', function (e) {
            e.preventDefault();
            group.find('.btn.active').removeClass('active');
            $(this).addClass('active');
        });
    });
});

/* ----------------------------------
 * - Initialize the Foundation Object -
 * ----------------------------------
 * All Foundation functions are implemented below.
 */
function _init() {
    'use strict';
    /* Layout
     * ======
     * Fixes the layout height in case min-height fails.
     *
     * @type Object
     * @usage $.Foundation.layout.activate()
     *        $.Foundation.layout.fix()
     *        $.Foundation.layout.fixSidebar()
     */
    $.Foundation.layout = require('./widgets/layout');

    /* PushMenu()
     * ==========
     * Adds the push menu functionality to the sidebar.
     *
     * @type Function
     * @usage: $.Foundation.pushMenu("[data-toggle='offcanvas']")
     */
    $.Foundation.pushMenu = require('./widgets/push-menu');

    /* Tree()
     * ======
     * Converts the sidebar into a multilevel tree view menu.
     *
     * @type Function
     * @Usage: $.Foundation.tree('.sidebar')
     */
    $.Foundation.tree = require('./widgets/sidebar');

    /* ControlSidebar
     * ==============
     * Adds functionality to the right sidebar
     *
     * @type Object
     * @usage $.Foundation.controlSidebar.activate(options)
     */
    $.Foundation.controlSidebar = require('./widgets/control-sidebar');

    /* BoxWidget
     * =========
     * BoxWidget is a plugin to handle collapsing and removing boxes from the screen.
     *
     * @type Object
     * @usage $.Foundation.boxWidget.activate()
     *        Set all your options in the main $.Foundation.options object
     */
    $.Foundation.boxWidget = require('./widgets/box-widget');
}

/* ------------------
 * - Custom Plugins -
 * ------------------
 * All custom plugins are defined below.
 */

/*
 * BOX REFRESH BUTTON
 * ------------------
 * This is a custom plugin to use with the component BOX. It allows you to add
 * a refresh button to the box. It converts the box's state to a loading state.
 *
 * @type plugin
 * @usage $("#box-widget").boxRefresh( options );
 */
$(function () {
    'use strict';

    $.fn.boxRefresh = function (options) {

        // Render options
        var settings = $.extend({
            // Refresh button selector
            trigger: '.refresh-btn',
            // File source to be loaded (e.g: ajax/src.php)
            source: '',
            // Callbacks
            onLoadStart: function (box) {
                return box;
            }, // Right after the button has been clicked
            onLoadDone: function (box) {
                return box;
            } // When the source has been loaded
        }, options);

        // The overlay
        var overlay = $('<div class="overlay"><div class="fa fa-refresh fa-spin"></div></div>');

        return this.each(function () {
            // if a source is specified
            if (settings.source === '') {
                if (window.console) {
                    window.console.log('Please specify a source first - boxRefresh()');
                }

                return;
            }

            // the box
            var box  = $(this),
                rBtn = box.find(settings.trigger).first(); // the Button

            // On trigger click
            rBtn.on('click', function (e) {
                e.preventDefault();
                // Add loading overlay
                start(box);

                // Perform ajax call
                box.find('.box-body').load(settings.source, function () {
                    done(box);
                });
            });
        });

        function start(box) {
            // Add overlay and loading img
            box.append(overlay);

            settings.onLoadStart.call(box);
        }

        function done(box) {
            // Remove overlay and loading img
            box.find(overlay).remove();

            settings.onLoadDone.call(box);
        }

    };
});

/*
 * EXPLICIT BOX CONTROLS
 * -----------------------
 * This is a custom plugin to use with the component BOX. It allows you to activate
 * a box inserted in the DOM after the app.js was loaded, toggle and remove box.
 *
 * @type plugin
 * @usage $("#box-widget").activateBox();
 * @usage $("#box-widget").toggleBox();
 * @usage $("#box-widget").removeBox();
 */
$(function () {
    'use strict';

    $.fn.activateBox = function () {
        $.Foundation.boxWidget.activate(this);
    };

    $.fn.toggleBox = function(){
        var button = $($.Foundation.boxWidget.selectors.collapse, this);
        $.Foundation.boxWidget.collapse(button);
    };

    $.fn.removeBox = function(){
        var button = $($.Foundation.boxWidget.selectors.remove, this);
        $.Foundation.boxWidget.remove(button);
    };
});


$(function () {
    'use strict';

    /*
     * TODO LIST CUSTOM PLUGIN
     * -----------------------
     * This plugin depends on iCheck plugin for checkbox and radio inputs
     *
     * @type plugin
     * @usage $("#todo-widget").todolist( options );
     */
    $.fn.todolist = require('./plugins/todo-list');

    /*
     * User menu animation
     * -----------------------
     */
    var userMenu     = $('.dropdown.user.user-menu'),
        userDropMenu = userMenu.find('.dropdown-menu');

    userDropMenu.addClass('animated');
    userMenu.on('show.bs.dropdown', function () {
        userDropMenu.addClass('flipInY');
    });

    userMenu.on('hide.bs.dropdown', function () {
        userDropMenu.removeClass('flipInY');
    })
});

},{"./plugins/todo-list":1,"./widgets/box-widget":2,"./widgets/control-sidebar":3,"./widgets/layout":4,"./widgets/push-menu":5,"./widgets/sidebar":6}]},{},[7]);
