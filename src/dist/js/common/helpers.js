/**
 *
 * Helpers
 *
 * Copyright 2016, Author Name
 * Some information on the license.
 *
**/

;(function (Helpers, window) {
  'use strict'

  /**
  * log
  * Customised and cross browser console.log.
  *
  * @since 1.0.0
  * @version 1.0.0
  **/
  Helpers.log = function (message, type, alertlog) {
    if (process.env.NODE_ENV !== 'production') {
      alertlog = (typeof alertlog === 'undefined')
      if (typeof console === 'undefined' || typeof console.log === 'undefined') {
        if (alertlog) {
          window.alert(message)
        }
      } else {
        var color = (type === 'positive') ? '#097809' : (type === 'negative') ? '#c5211d' : (typeof type !== 'undefined') ? type : '#240ad0'
        console.log('%c-- DEBUG ---------------------------------------------------------', 'color:' + color + ';font-weight:bold;')
        if (message instanceof Array || message instanceof Object) {
          console.log(message)
        } else {
          console.log('%c' + message, 'color: ' + color)
        }
        console.log('%c-- DEBUG ---------------------------------------------------------', 'color:' + color + ';font-weight:bold;')
        console.log('')
      }
    }
  }

  /**
  * throw
  * Throws a custom error.
  *
  * @since 1.0.0
  * @version 1.0.0
  **/
  Helpers.throw = function (msg) {
    throw new Error(msg)
  }

  /**
  * breakpoint
  * Checks the window against a certain breakpoint.
  *
  * @since 1.0.0
  * @version 1.0.0
  **/
  Helpers.breakpoint = function (breakpoint) {
    return (window.innerWidth <= breakpoint)
  }

  /**
  * mhi
  * Measures a hidden element.
  *
  * @since 1.0.0
  * @version 1.0.0
  **/
  Helpers.mhi = function (el) {
    // Clone element.
    var clone = el.clone()
    // Add to DOM in place and measure height.
    var height = clone.addClass('mhi-clone-remove').css({'position': 'absolute', 'top': '-100%', 'display': 'block', 'max-height': 'none', 'height': 'auto', 'visibility': 'hidden'}).prependTo(el.parent()).outerHeight()
    // Destroy the clone.
    $('.mhi-clone-remove').remove()

    return height
  }

  /**
  * isEmpty
  * Checks if a value is empty, undefined or false.
  *
  * @since 1.0.0
  * @version 1.0.0
  **/
  Helpers.isEmpty = function (value) {
    return (value === undefined || value === null || value === '' || value.length === 0)
  }

  /**
  * debounce
  * Returns a function, that, as long as it continues to be invoked, will not
  * be triggered. The function will be called after it stops being called for
  * N milliseconds. If `immediate` is passed, trigger the function on the
  * leading edge, instead of the trailing.
  *
  * $(window).on('resize', Module.test)
  *
  * Module.test = global.Helpers.debounce(function () {
  *     console.log('This has been debounced')
  * }, 250)
  *
  * @since 1.0.0
  * @version 1.0.0
  **/
  Helpers.debounce = function (func, wait, immediate) {
    var timeout

    return function () {
      var _this = this
      var args = arguments

      var later = function () {
        timeout = null
        if (!immediate) {
          func.apply(_this, args)
        }
      }
      var callNow = immediate && !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
      if (callNow) {
        func.apply(_this, args)
      }
    }
  }

  /**
  * preloader
  * Generates a preloader.
  *
  * @since 1.0.0
  * @version 1.0.0
  **/
  Helpers.preloader = function (el, destroy) {
    destroy = (typeof destroy === 'undefined')
    el = (typeof el === 'undefined') ? $('body') : el
    var loader = $('<div class="spinner-wrapper"><svg class="spinner" width="35px" height="35px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg></div>')

    if (!destroy) {
      if (!$('.spinner-wrapper', el).length) {
        el.css({'position': 'relative'}).prepend(loader)
      }
    } else {
      $('.spinner-wrapper', el).fadeOut(500, function () {
        el.css({'position': ''})
        $(this).remove()
      })
    }
  }

  /**
  * ajax
  * Returns a simple Ajax request. Should use the result with a promise.
  * Will automatically parse any URL parameters and place them in the JSON
  * body instead.
  *
  * @since 1.0.0
  * @version 1.0.0
  */
  Helpers.ajax = function (url, data, type, dataType) {
    var _this = this

    return $.ajax({
      url: url,
      type: (!_this.isEmpty(type)) ? type : 'GET',
      dataType: (!_this.isEmpty(dataType)) ? dataType : 'JSON',
      data: $.extend({}, {ajaxrequest: true}, window.Helpers.parseURLParams(url), (data || {})),
      beforeSend: function (jqXHR, settings) {
        // Log full URL.
        window.Helpers.log((settings.data) ? settings.url + '?' + settings.data : settings.url)
      }
    })
  }

  /**
  * parseURLParams
  * Converts the URL parameters into an object.
  *
  * @since 1.0.0
  * @version 1.0.0
  **/
  Helpers.parseURLParams = function (url) {
    // Check if URL contains a ?.
    if (url.indexOf('?') !== -1) {
      // Split URL at ?
      var urlParsed = url.split('?')[1]
      var urlParams = (!global.Helpers.isEmpty(urlParsed)) ? urlParsed : false

      return (urlParams) ? JSON.parse('{"' + decodeURI(urlParams).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}') : false
    } else {
      return {}
    }
  }

  /**
  * decodeEntities
  * Decodes HTML entities.
  *
  * @since 1.0.0
  * @version 1.0.0
  **/
  Helpers.decodeEntities = function (string) {
    // Create pseudo element.
    var pseudo = document.createElement('textarea')
    // Decode.
    pseudo.innerHTML = string

    return pseudo.value
  }

  // Export
  module.exports = Helpers
}({}, window))
