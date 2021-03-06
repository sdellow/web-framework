# Web Framework Changelog

__5.0.0__:
* Reduces the base framework to just mixins as it's rarely used properly.
* Updates to a flexbox based layout.
* Encourages a joint functional and component based workflow.
* Adds responsive type.
* Many fixes and improvements.

__4.0.1__:
* Added margin and padding utilities.

__4.0.0__:
* Removed Gulp completely. Now uses Webpack for JS and CSS compilation.
* Added a new CSS framework based on Tailwind.
* Many fixes and improvements.

__3.9.0__:
* Fixed Gulp Watch for images.
* Fixed issue with Modal closing when clicked on.
* Swapped Turbolink for Pjax.
* Improved form buttons, containers and added some new sub elements.
* Various fixes and improvements.
* Moved Grids to Components in Base.
* Made form validation classes not just JavaScript specific. Now a namespace.
* Added `percentage` SASS helper function.
* Added `classes` and `routes` WebPack aliases.
* Removed redundant stuff from styleguide.

__3.8.0__:
* Added improved Edge targeting in `_fixes.scss`.
* Moved TurboLinks to entry file and added page load event.
* Add `.jsx` files to Gulp Watch.
* Fixed incorrect breakpoint variables in `_wordpress.scss`.
* Added `axios` package.
* Added clean up part of install script.
* Improved `preload` header calls.
* Added missing `1-8` CSS column.
* Component builder now opens file in Sublime Text.
* The SASS `color` function now returns a lime green colour if the requested color can not be found.
* Fixes and improvements.
* Webpack now doesn't break the Gulp pipe on error.
* Added atom to component creator.
* Added `.atom-build.yml` file for Atom Build plugin.
* Updated dependencies.
* Improved mobile menu.

__3.7.0__:
* Added `.aligncenter` WordPress class.
* Add bash script to create CSS components.
* Added new CSS components structure.
* Fixes and improvements.
* Moved bash scripts to `./commands`.
* Improved modals.
* Updated dates and file notes.
* Now calls `init` method when loading a route.
* Added yargs to set Nightwatch environment.
* Improved integration tests.
* Added `html` task for building HTML templates (not part of process yet).
* Added `u-font-*` for font sizing on the fly.
* Added `!important` to all utility classes.
* Added CSS & JavaScript minification by default if on the `master` or `production` branch.

__3.6.0__:
* Many fixes and improvements.

__3.5.0__:
* Many fixes and improvements.
* Now uses Babel for all JS files not just JSX.
* Added `release` Gulp task that runs Unit tests and compiles and minifies CSS and JS.
* Fixed percentage top margin on flex grids.
* Improved how mobile menu works.
* Replaced BX Slider with Slick Slider.
* Grids now use padding instead of margin and the magic number instead of percentages for gutters.
* Improved default markup.
* Changed JavaScript directory structure. Using ES6 classes.
* Reformatted jQuery Validation plugin to follow Standard JS.
* Added `images` Gulp task that optimises images on the fly. Watch will also look for images. Image structure has changed to accommodate this.
* Added Turbolinks.
* Updated to Webpack 2.
* Fixed issue with SocIcon fonts being referenced wrong.
* Improved default heading sizes.
* Fixed global access to `App` object.
* Can now use the modify grid mixin without specifying a column width.

__3.4.0__:
* Many fixes and improvements.

__3.3.6__:
* Tests now properly use Karma to get dependencies.
* Use Gulp to run tests.

__3.3.5__:
* Added missing `.coveralls.yml` file.

__3.3.4__:
* Fixed Travis file.

__3.3.3__:
* Re-added `gulp-coveralls` for reporting.

__3.3.2__:
* Bug fixes.

__3.3.1__:
* Fixed coverage reporting.

__3.3.0__:
* Complete overhaul to unit and integration testing.
* Rebuilt how the mobile menu works.
* Improved Travis integration.
* Added Karma and Jasmine.
* Improved Webpack bundling.
* Many CSS improvements and fixes.
* Changed CSS `display` utilitle classes to `u-display-<prop>`.
* Added new CSS `u-display-flex` utility class.
* Added starter HTML in the `index.html` file.

__3.2.0__:
* Updated SocIcon.
* Readded Gulp for CSS and JS compilation as NPM directly is too slow.
* Added WordPress specific styles to their own vendor stylesheet.
* Removed all references to `sect-`. These should be set as components as prefixed with `comp-` where applicable.
* Replaced Handlebars with Underscore as it also does templates and is more useful. Removed Function Bind.
* All Gulp and Webpack directory paths from `package.json`.
* Various CSS and JS fixes to validation.
* Added `Gulp Git` for automated Git commits after CSS and JS tasks.
* Added `livereload`.
* Added `Gulp Notify`.
* Added better grid columns.
* Added Webpack to Gulp task.
* Grids that are not modified to 100% width lose the top margin.
* Added current window size to `Breakpoint` methods.
* Added `browserSync` task especially for `xip.io`.
* Added `StandardJS` for JavaScript style guiding.
* All JavaScript change to comply with [Standard JS](http://standardjs.com/) rules.

__3.1.0__:
* Added the new `scale` mixin to allow responsive scaling of any property easily.
* Switched to using Webpack rather than Browserify.
* The index now loads `common.js` and `app.js` as two separate files rather that one bundled one.

__3.0.0__:
* Completely removed Gulp and now used `npm run` to process tasks. <-- [This was readded in 3.2.0]
* Much improved CSS slabs. Can now use a slab mixin to create a low maintenance responsive padded area.
* Formatting of SCSS files.
* Lots of fixes and improvements.
* BrowserSync task removed.
* PSI task removed.
* Release task removed.
* Default task removed.
* Moved Browsernizr and Autotrack to dependencies from devDependencies.
* Changed structure of the JS build files and directory.
* Updated documentation.
* Added global events system.
* Added 'u-noscroll' utility class.
* Completely changed how forms are styled. Uses flexbox by default.

__2.5.2__:
* Fixed preloader destroy.
* Added better error handling.
* Added a `minify` task. Removed minification by default from any profile.
* Lots of fixes and improvements.

__2.5.1__:
* Improved button components and added outline class.
* Really cleaned up how typeset it defined. Removed knife, not uses native PX and % values.
* Added `respond-to-range` mixin which specifically sets a style within a device range.
* The SASS var `$mobile_menu` is now synched with the JS window var.
* Added all JavaScript `window` vars in `config` namespace.
* Fixed issue with Safari and the SCSS / JS mobile breakpoint feature.
* Removed redundant `sensor` parameter from the Google Maps plugin.
* Lots of minor fixes and improvements to general CSS styles.

__2.5.0__:
* Added a 'text' namespace for adding color.
* Removed resetting margin on navigation as it's not needed anymore.
* Added a 'semibold' utility class.
* Fixed Sprite task missing dependency and added retina option.
* Added Google Autotrack.
* JavaScript now uses Browserify Global.
* Gulp JS task now sets the node environment based on the Gulp config arguments.

__2.4.2__:
* Added iphone6 apple touch icons.
* Running any task without a config argument now compiles in the `development` profile by default.

__2.4.1__:
* Added Function Bind to dependencies.
* Removed logging from Karma Config which seemed to fix Karma Start errors.
* Updated Travis config to install Karma CLI.
* Changed Functional tests to Integration.

__2.4.0__:
* Split all Gulp tasks into their own directories and introduced a global config.
* Added ES6 Shim to dependencies.
* Re-added missing gulp dependency.
* Fixed issue with missing css-globbing dependency.

__2.3.1__:
* CSS debug mode disabled by default.
* Fixed sub menus.
* Changed the `retina-image` mixin to just `retina` and improved output.
* Typeset margins and font-size improvements.
* Removed `collapse-margin` reserved class.
* Added missing Helpers from docs.
* Lots of fixes and improvements.

__2.3.0__:
* Changed the release task `version` parameter to `ver` to prevent clashes with Node Version check.
* Added more exclusions in the release task due to changes to the JS directory.
* Added undefined to list of isEmpty Helper values.
* Fixed Ajax helper calling Underscore isEmpty rather than internal helpers.
* Improved sample module.
* Fixed issue with tests not running automatically.
* Added Babelify to the JS task permanently.
* Updated React library and add React Test Utils.
* Added Function-Bind polyfill for tests.
* Improved the side mobile menu style and function.
* Improved form validation styling.
* Added better validation errors if using the placeholder error and the field is not empty but invalid.
* Updated some comments and the year to the 2016.
* Changed the name of the test tasks to `unit` and `functional` irrespective of the test suites used.
* Removed Wiselinks and Vertical Menu.
* Annotation fixes.
* Re-named `pagination` and `breadcrumb` blocks to use `sect-` namespace.

__2.2.1__:
* General fixes and improvements.
* Improved the `ajax` helper by parsing URL parameters automatically in the JSON body.

__2.2.0__:
* Fixed issue with `modify-grid` affecting nested grids when it shouldn't.
* Updated Equal Heights plugin to optionally add widths too.
* Changed the name of the App Controller to just App and made Global.
* Updated log Helper to better output objects/arrays.
* Improved testing structure by moving to root.
* Cleaned up testing dependencies.
* Replaced Dalek with Nightwatch and Selenium Driver.
* Fixes and formatting to Gulpfile tasks.

__2.1.4__:
* Fixed issue with duplicate dependencies.
* Separated sprites files into specific `png` directory.
* Added new text colours utility class based on global colours array. e.g. `u-text-color-blue`.
* The `release` task now allows a version argument to specify the version number on the directory.
* Fixed issue with `this` context.

__2.1.3__:
* General fixes and improvements.
* Added better styling for form errors.

__2.1.2__:
* Moved base media objects to root of base.
* Added media object.
* Added sample module file.
* Added missing React packages.
* Added EMFILE error troubleshooting issue.
* Added an `isEmpty` helper.
* Fixed issue with Modernizr by adding via Browzernizr.
* Fixed issue with duplicate call to `build.js`.
* Made `jQuery` & `$` vars global in all methods.

__2.1.1__:
* Changed direct icon classes to not use :after pseudo class.
* Made all line-heights outputted by Knife to be unitless.
* Added jQuery ToolTipster for Tooltips.
* Moved JS call to footer again. Removing async attribute. Causes issues with GA.

__2.1.0__:
* Added missing DalekJS test files.
* Added better formatting and task descriptions in `Gulpfile.js`.
* Added responsive test example for DalekJS.
* Added SCSS objects to base.
* Fixed form styles.

__2.0.6__:
* Bug fixes and improvements.
* Added Google Analytics virtual page example in the validation callback.
* Added sub-menu ability to mobile menus.
* Added a simple hide/reveal method.
* Removed margin on sprites.
* Changed viewport to prevent zooming on mobile devices.

__2.0.5__:
* Bug fixes and improvements.

__2.0.4__:
* Changed name of JS Common and JS App tasks.
* Added Underscore to common.
* Added React to common.
* Fixed CSS sourcemaps.

__2.0.3__:
* Lots of bug fixes and improvements.
* Install now asks for a Git repository URL.
* Removed globbing for site SCSS.
* Watch doesn't break stream on SASS error.

__2.0.2__:
* Fixed Modernizr library.
* Helpers.log now checks if message is an array or object and outputs accordingly.
* Upgraded deprecated `css-sprite` package to `spritey`.
* Added better separation in base files.
* Consolidated form partials into one.
* Improved font sizing and spacing.
* Added new slide in mobile menu. Updated layout help file to reflect.

__2.0.1__:
* Fixed duplicate variable issue with font-size and font-weight.
* Removed 'font_family_' prefix to font family variables.
* Normalised the line height on buttons.
* Now checks for WURFL before attempting to send dimensions.
* Required modules don't need to be manually initiated.

__2.0.0__:
* Bugfix: PSI task created a null file if URL didn't contain a protocol.
* Merged the Project Wrapper and Project Libraries into one 'Web Framework' repository. We are now starting from version 2.0.0!
* Improve output from Notifier. Now alerted to errors and end of tasks.
* Now easier to add additional Jasmine test files.
