/**
 *
 * Common Entry Point
 *
 * Copyright 2019, Author Name
 * Some information on the license.
 *
**/

/*
|--------------------------------------------------------------------------
| Config
|--------------------------------------------------------------------------
|
| JavaScript configuration and setup
|
*/
require('./config')

/*
|--------------------------------------------------------------------------
| jQuery
|--------------------------------------------------------------------------
|
| Loads jQuery and assigns to `jQuery` and `$` vars.
|
*/
window.jQuery = require('jquery')
window.$ = require('jquery')

/*
|--------------------------------------------------------------------------
| Lodash
|--------------------------------------------------------------------------
|
| Loads Lodash and assigns to `_` var.
|
*/
window._ = require('lodash')

/*
|--------------------------------------------------------------------------
| Vue
|--------------------------------------------------------------------------
|
| Loads Vue and assigns to `Vue` var.
|
*/
window.Vue = require('vue/dist/vue.common.js')

/*
|--------------------------------------------------------------------------
| Axios
|--------------------------------------------------------------------------
|
| Loads Axios and assigns to `Axios` var.
|
*/
require('es6-promise/auto')
window.Axios = require('axios')

/*
|--------------------------------------------------------------------------
| Events
|--------------------------------------------------------------------------
|
| Sets up the framework global events system.
|
*/
window.Events = require('./events')

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
|
| Loads various helper methods for use in the framework.
|
*/
window.Helpers = require('./helpers')