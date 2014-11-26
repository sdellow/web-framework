/**
 *
 * Equal Heights
 * jquery.equal-heights.js
 *
 * Copyright 2014, Stewart Dellow
 * Some information on the license.
 *
 * $('.js-eh').equalHeights();
 *
**/

;(function($, window, undefined){
    'use strict';

    // Set plugin.
    var Plugin = {};

    /* ======================================================== */
    /* Plugin Instance
    /* ======================================================== */
    /**
     * $.fn.equalHeights
     * Return a unique plugin instance.
    **/
    $.fn.equalHeights = function(options){
        return this.each(function(){
            new Plugin.init(this, options);
        });
    };

    /* ======================================================== */
    /* Plugin base methods
    /* ======================================================== */
    /**
     * Plugin.init
     * Init this plugin.
    **/
    Plugin.init = function(elem, options){
        // Global vars.
        Plugin.elem     = $(elem);
        // Global settings.
        Plugin.settings = Plugin.options(options);
        // Expose other vars to the party.
        Plugin.vars();
        // Do binds.
        Plugin.binds();
        // Run the plugin.
        Plugin.run();
    };

    /**
     * Plugin.vars
     * Plugin variables.
    **/
    Plugin.vars = function(){
    }

    /**
     * Plugin.options
     * Plugin settings and options.
    **/
    Plugin.options = function(options){
        // Our application defaults.
        var defaults = {
        };

        // Combine the defaults and custom settings.
        return $.extend({}, defaults, options);
    };

    /**
     * Plugin.binds
     * jQuery bind events.
    **/
    Plugin.binds = function(){
    }

    /* ======================================================== */
    /* Plugin specific methods
    /* ======================================================== */
    // Set helper.
    var Helper = {};

    /**
     * Helper.log
     * Returns a cross-browser safe message in the console.
    **/
    Helper.log = function(message, alertlog){
        alertlog = (typeof alertlog === 'undefined') ? false : true;
        if(typeof console === 'undefined' || typeof console.log === 'undefined'){
            if(alertlog){
                alert(message);
            }
        }
        else {
            console.log(message);
        }
    }

    /**
     * plugin.run
     * Our initial function.
    **/
    Plugin.run = function(){
        // Set the breakpoints
        var breakpoints = (Plugin.elem.data('eh-breakpoints')) ? Plugin.elem.data('eh-breakpoints').split('|') : [320, 9999];
        // Go!
        Plugin.watch_window(Plugin.elem, breakpoints[0], breakpoints[1]);
    }

    /**
     * Plugin.calculate
     * Calculate and apply the correct heights.
    **/
    Plugin.calculate = function(el){
        var boxes = $('[data-eh="true"]', el);
        // Reset the height attribute to `auto` (or nothing).
        Plugin.reset_heights(el);
        // Map all qualifying element heights to an array.
        var heights = boxes.map(function(){
            return $(this).outerHeight();
        }).get();
        // Get the largest value from the array.
        var large = Math.max.apply(Math, heights);
        // Apply the CSS height to all qualifying elements.
        boxes.each(function(){
            $(this).height(large);
        });
    }

    /**
     * Plugin.watch_window
     * Watches the window size and checks if breakpoints apply.
    **/
    Plugin.watch_window = function(el, breakpoint1, breakpoint2){
        $(window).on('load resize', function(){
            if($(window).width() > breakpoint1 && $(window).width() < breakpoint2){
                Plugin.calculate(el);
            }
            else{
                Plugin.reset_heights(el);
            }
        });
    }

    /**
     * Plugin.reset_heights
     * Reset all box heights.
    **/
    Plugin.reset_heights = function(el){
        var boxes = $('[data-eh="true"]', el);
        // Reset the height attribute to `auto` (or nothing).
        boxes.each(function(){
            $(this).css({'height': 'auto'});
        });
    }

})(jQuery, window);