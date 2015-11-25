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
