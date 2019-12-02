/*!
 * An jQuery | jquery plugin for easy init select or select to input
 * author -> wangyan
 * see https://github.com/humorwang
 */
;
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory)
    } else { // Global
        factory(window.jQuery)
    }
})(function ($, undefined) {
    var w = window,
        $window = $(w),
        defaultOptions = {
            data: {},
            url: "",
            addEmpty: false
        },
        type


    type = (function(){
        var object_prototype_toString = Object.prototype.toString
        return function(obj){
            return object_prototype_toString.call(obj).replace('[object ','').replace(']','')
        }
    })()

    function initData($elements, options) {
        $elements.each(function (i, e) {
            var $element = $elements.eq(i)
            $element.trigger('_load_options')
        })
    }

    function getDataByUrl(url) {
        var dataJson;
        $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            async: false,
            success: function(data){
                dataJson = data
            }
        });
        return dataJson;
    }

    if (!$.fn.hasOwnProperty('easySelect')) {
        $.fn.easySelect = function (options) {
            var $elements = this
            if (!$.isPlainObject(options)) {
                options = {}
            }
            $.each(defaultOptions, function (k, v) {
                var typeK = type(options[k])
                if($.inArray(k,['data']) != -1){

                }else if (k == 'url') {
                    if (options.hasOwnProperty(k)) {
                        options['data'] = getDataByUrl(options[k])
                    }
                } else if (defaultOptions.hasOwnProperty(k) && (!options.hasOwnProperty(k) || (typeK != type(defaultOptions[k])))) {
                    options[k] = v
                } 
            })
            $elements.each(function (i, e) {
                var element = this,
                    $element = $elements.eq(i),
                    isSelect = $element.is('select'),
                    isInput = $element.is('input'),
                    key = $element.attr('key'),
                    value = $element.attr('val'),
                    addEmpty = $element.attr('addEmpty')

                if (isSelect||isInput) {
                }else{
                    return
                }

                $element.one('_load_options', function () {
                    var options_data = options.data[key]
                    if (isSelect&&options_data){
                        $element.empty();
                        var option = []
                        if (addEmpty&&addEmpty=='true'){
                            option.push(['<option value="">', "请选择", '</option>'].join(''))
                        } else if (!addEmpty&&options.addEmpty){
                            option.push(['<option value="">', "请选择", '</option>'].join(''))
                        }
                        for (var i in options_data) {
                            var flag = false;
                            if ((typeof(value) != "undefined") && (value == options_data[i].code)){
                                flag = true;
                            }
                            option.push(['<option value="', options_data[i].code, '" ', (flag ?'selected="selected"':' '),'>', options_data[i].value, '</option>'].join(''))
                        }
                        $element.append(option.join(''))
                    } else if (isInput&&options_data) {
                        if ((typeof(value) != "undefined") && $.trim(value) != ''){
                            var real_value = "";
                            for (var i in options_data) {
                                if ($.trim(value) == options_data[i].code){
                                    real_value = options_data[i].value;
                                    break;
                                }
                            }
                            $element.attr("value", real_value);
                        }
                    }
                })
            })
            $(function () {
                initData($elements, options)
            })
            return this
        }
    }
})