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
