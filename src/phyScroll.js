/* global jQuery */
/**
 * phyScroll.js
 */

/* ==========================================================================
   phyScroll
   ========================================================================== */

/**
 * A more realistic smooth-scroll.
 *
 * Duration of journey changes based upon speed and distance to target,
 * just like in real life.
 *
 * time = distance / speed
 */

(function($) {
    $.fn.phyScroll = function (_options) {

        var defaults = {
            scrollingElements: 'html, body',
            speed: 5,
            easing: 'swing',
            maxDuration: 2000,
            delay: 0,
            offset: 0,
            enquire: $.noop,
            start: $.noop,
            complete: $.noop,
            fail: $.noop,
        };

        var options = $.extend(defaults, _options);

        function getDuration(targetPosition) {
            var currentPosition = $(options.scrollingElements).scrollTop();
            var distance = Math.abs(currentPosition - targetPosition);
            var speed = options.speed;
            var time = distance / speed;
            return time;
        }

        function scroll(position, time) {
            $(options.scrollingElements).animate({
                scrollTop: position
            }, {
                duration: time,
                easing: options.easing,
                start: options.start,
                complete: options.complete,
                fail: options.fail
            });
        }

        function init(trigger){
            $(trigger).click(function() {
                if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        setTimeout(function(){
                            var targetPosition = target.offset().top - options.offset;
                            var duration = getDuration(targetPosition);
                            if(duration > options.maxDuration){
                                duration = options.maxDuration;
                            }
                            scroll(targetPosition, duration);
                        }, options.delay);
                        return false;
                    }
                }
            });
        }

        $(this).each(function(){
            init($(this));
        });

        return this;
    };
})(jQuery);