// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;( function( $, window, document, undefined ) {

	"use strict";

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variables rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var pluginName = "phyScroll",
			defaults = {
				scrollingElements: "html, body",
	            speed: 5,
	            easing: "swing",
	            maxDuration: 2000,
	            delay: 0,
	            offset: 0,
	            enquire: "",
	            start: $.noop,
	            complete: $.noop,
	            fail: $.noop,
				enableClick: true
			};

		// The actual plugin constructor
		function Plugin ( element, options ) {
			this.element = element;

			// jQuery has an extend method which merges the contents of two or
			// more objects, storing the result in the first object. The first object
			// is generally empty as we don't want to alter the default options for
			// future instances of the plugin
			this.settings = $.extend( {}, defaults, options );
			this._defaults = defaults;
			this._name = pluginName;
			this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend( Plugin.prototype, {
			init: function() {
				var phyScroll = this;
				// Place initialization logic here
				// You already have access to the DOM element and
				// the options via the instance, e.g. this.element
				// and this.settings
				// you can add more functions like the one below and
				// call them like the example below
				if(this.settings.enableClick === true){
					$(phyScroll.element).each(function(){
						$(this).on("click", function(event){
							event.preventDefault();
							phyScroll.run($(this));
						});
					});
				}
			},
			getDuration: function(targetPosition){
				var phyScroll = this;
	            var currentPosition = $(phyScroll.settings.scrollingElements).scrollTop();
	            var distance = Math.abs(currentPosition - targetPosition);
	            var speed = phyScroll.settings.speed;
	            var time = distance / speed;
	            return time;
	        },
			scroll: function(position, time) {
				var phyScroll = this;
				var settings = phyScroll.settings;
	            $(settings.scrollingElements).animate({
	                scrollTop: position
	            }, {
	                duration: time,
	                easing: settings.easing,
	                start: settings.start,
	                complete: settings.complete,
	                fail: settings.fail
	            });
	        },
			run: function(element) {
				var phyScroll = this;
				var settings = phyScroll.settings;
				if (location.pathname.replace(/^\//, "") === element[0].pathname.replace(/^\//, "") && location.hostname === element[0].hostname) {
                    var target = $(element[0].hash);
                    target = target.length ? target : $("[name=" + element[0].hash.slice(1) + "]");
                    if (target.length) {
                        setTimeout(function(){
							var targetPosition = target.offset().top - settings.offset;
							var duration = phyScroll.getDuration(targetPosition);

                            if(duration > settings.maxDuration){
                                duration = settings.maxDuration;
                            }
                            if(settings.enquire === ""){
                                phyScroll.scroll(targetPosition, duration);
                            }
                            else {
                                enquire.register(settings.enquire, {
                                    match : function() {
                                        phyScroll.scroll(targetPosition, duration);
                                    }
                                });
                            }
                        }, settings.delay);
                    }
                }
			}
		} );

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function( options ) {
			return this.each( function() {
				if ( !$.data( this, "plugin_" + pluginName ) ) {
					$.data( this, "plugin_" +
						pluginName, new Plugin( this, options ) );
				}
			} );
		};

} )( jQuery, window, document );
