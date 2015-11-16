(function ($, undefined) {
    var DPGlobal = $.fn.datepicker.DPGlobal;

    $.fn.datepicker.DPGlobal.template = '<div class="datepicker">' +
        '<div class="datepicker-days">' +
            '<table class="table table-condensed">' +
                DPGlobal.headTemplate +
                '<tbody></tbody>' +
                DPGlobal.footTemplate +
            '</table>' +
        '</div>' +
        '<div class="datepicker-months">' +
            '<table class="table table-condensed">' +
                DPGlobal.headTemplate +
                DPGlobal.contTemplate +
                DPGlobal.footTemplate +
            '</table>' +
        '</div>' +
        '<div class="datepicker-years">' +
            '<table class="table table-condensed">' +
                DPGlobal.headTemplate +
                DPGlobal.contTemplate +
                DPGlobal.footTemplate +
            '</table>' +
        '</div>' +
    '</div>';
}(window.jQuery));
