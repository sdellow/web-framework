/**
 *
 * Module
 *
 * Copyright 2016, Author Name
 * Some information on the license.
 *
**/

;(function(Module, window, undefined){
	'use strict';

    /**
     * Module
     * Constructor for this module.
     *
     * @since 1.0.0
     * @version 1.0.0
    **/
    Module = function(){
    	var _this = this;

        // Document ready.
        $(function(){
			// Set active flag.
			_this.menu_active = false;
			_this.sub_menu_active = false;

			// Vars.
			_this.$button    = $('.js-mobile-button');
			_this.$menu      = $('.js-mobile-menu');
			_this.$content   = $('.js-mobile-content');
			_this.$close     = $('.js-close-mobile-menu');
			_this.$sub_close = $('.js-sub-menu-close');

			// Start binds on window load / resize.
			$(window).on('load resize', $.proxy(_this.init, _this));
        });
    }

	/**
	 * init
	 * Init method for this module.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Module.prototype.init = function(){
    	// Check screen is below mobile breakpoint.
		if(Breakpoint.current == 'mobile'){
        	return this.binds();
        }
        else{
			// Reset flag.
			this.setMenuFlag(false);
        	// Reset any menus.
        	return this.hidePrimaryMenu();
        }
	}

	/**
	 * binds
	 * jQuery event binds for this module.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Module.prototype.binds = function(){
		var _this = this;

		// Click on the mobile menu.
		this.$button.on('click', function(){
			var _self = $(this);

			// Check sub menu is active first.
			if(_this.sub_menu_active){
				// Hide mobile menu.
				_this.hideSubMenu();
				// Set flag.
				_this.sub_menu_active = false;
			}
			// Run hide operations.
			else if(_this.menu_active){
				// Hide mobile menu.
				_this.hidePrimaryMenu(_self);
				// Set flag.
				_this.setMenuFlag(false);
			}
			// Run show operations.
			else{
				// Show mobile menu.
				_this.showPrimaryMenu(_self);
				// Set flag.
				_this.setMenuFlag(true);
			}
		});

		// Sub Menu Click.
		$(_this.$menu).on('click', 'a', function(e){
			var _self = $(this);

			if(_self.next('ul').length){
				e.preventDefault();
				// Init sub menu.
				_this.showSubMenu(_self.next('ul'));
			}
		});

		// Escape key pressed.
		$(document).on('keyup', function(e){
			// Check key type & menu is active.
			if(e.keyCode == 27){
				// Hide mobile menu.
				_this.$close.trigger('click');
			}
		});

		// Sub Menu Close.
		this.$sub_close.on('click', function(){
			// Check sub menu is active first.
			if(_this.sub_menu_active){
				// Hide mobile menu.
				_this.hideSubMenu();
				// Set flag.
				_this.sub_menu_active = false;
			}
		});

		// Close menu.
		this.$close.on('click', function(){
			// Check sub menu is active first.
			if(_this.sub_menu_active){
				// Hide mobile menu.
				_this.hideSubMenu();
				// Set flag.
				_this.sub_menu_active = false;
			}
			// Check menu is active.
			else if(_this.menu_active){
				// Hide mobile menu.
				_this.hidePrimaryMenu();
				// Set flag.
				_this.setMenuFlag(false);
			}
		});
	}

	/**
	 * showPrimaryMenu
	 * Show menu.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Module.prototype.showPrimaryMenu = function(){
		// Vars.
		var doc_width  = $(document).width(),
			doc_85     = (doc_width / 100) * 85;

		// Add 85% width to menu.
		this.$menu.css({'width': doc_85});
		// Move page content 85% left.
		this.$content.addClass('active-menu').css({'left': doc_85});
		// Add active class to menu button.
		this.$button.addClass('active-menu');
		// Restrict body height.
		$('body').addClass('u-noscroll');
	}

	/**
	 * hidePrimaryMenu
	 * Hide menu.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Module.prototype.hidePrimaryMenu = function(){
		var _this = this;

		// Remove the active class.
		this.$content.removeClass('active-menu');
		// Remove active class from menu button.
		this.$button.removeClass('active-menu');
		// Remove the active class.
		this.$content.css({'left': ''});

		// Wait 10ms.
		setTimeout(function(){
			// Remove 90% width to menu.
			_this.$menu.css({'width': ''});
			// Restrict body height.
			$('body').removeClass('u-noscroll');
		}, 500); // Needs to be the same as the animation speed in the CSS.
	}

	/**
	 * showSubMenu
	 * Show sub menu.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Module.prototype.showSubMenu = function(el){
		var _this = this;

		// Vars.
		var menu_width = _this.$menu.width(),
			menu_95    = (menu_width / 100) * 95;

		// Add 95% width to sub menu.
		el.addClass('active-sub-menu').css({'width': menu_95});
		// Wait 10ms.
		setTimeout(function(){
			_this.$menu.addClass('sub-menu-active');
			_this.sub_menu_active = true;
		}, 100);
	}

	/**
	 * hideSubMenu
	 * Hides sub menu.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Module.prototype.hideSubMenu = function(el){
		var _this = this;

		// Set close button text.
		this.$close.html('X');
		// Remove 80% width from sub menus.
		$('.active-sub-menu').css({'width': ''});
		// Wait 10ms.
		setTimeout(function(){
			_this.sub_menu_active = false;
		}, 100);
		// Wait 20ms.
		setTimeout(function(){
			_this.$menu.removeClass('sub-menu-active');
			// Remove active class from sub menus.
			$('.active-sub-menu').removeClass('active-sub-menu');
		}, 200);
	}

	/**
	 * setMenuFlag
	 * Set flag after 10ms
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Module.prototype.setMenuFlag = function(state){
		var _this = this;

		// Wait 10ms.
		setTimeout(function(){
			// Set flag.
			_this.menu_active = state;
		}, 100);
	}

	// Export
	module.exports = new Module();

}(function(){}, window));