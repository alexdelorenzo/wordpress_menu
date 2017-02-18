# Dynamic Drop Down Menu for Wordpress
Theme agnostic drop down menu for Wordpress. Built on WP-REST API included in Wordpress 4.7+. Will adopt any theme's CSS styling and behavior for drop down menus.

Works on hosts that don't allow plugins or modification of Wordpress installs. Just embed in your Wordpress install's header.

## Dependencies 
   - compatible browser or babel (w/ es2015,stage-2 + polyfill) + fetch polyfill
   - jQuery
   
## Usage
  1) Embed this script in your page.

  2) Wrap name of a menu entry with:

      <div class="dd_menu" id="category_name">
          Your Menu Entry Name Goes Here
      </div>

  Where `category_name` is a category used to tag articles with

  3) A dynamic menu will now appear under your menu item. 
     It will adopt your Wordpress theme's appearance and behavior.


## Copyright
 Copyright Alex DeLorenzo 2017
 
## License
See `LICENSE`
