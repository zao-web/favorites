/**
* Updates Favorite Buttons as Needed
*/
var Favorites = Favorites || {};

Favorites.ButtonUpdater = function()
{
	var plugin = this;
	var $ = jQuery;

	plugin.utilities = new Favorites.Utilities;
	plugin.formatter = new Favorites.Formatter;
	plugin.buttonFormatter = new Favorites.ButtonOptionsFormatter;

	plugin.activeButton;
	plugin.data = {};

	plugin.bindEvents = function()
	{
		$(document).on('favorites-update-all-buttons', function(){
			plugin.updateAllButtons();
		});
		$(document).on('favorites-list-updated', function(event, list){
			plugin.updateAllButtons(list);
		});
	}

	/*
	* Update all favorites buttons to match the user favorites
	* @param list object (optionally updates button in list)
	*/
	plugin.updateAllButtons = function(list)
	{
		var favorites = Favorites.UserFavorites().getFavorites( true );
		var buttons = ( typeof list === undefined && list !== '' )
		? $(list).find(Favorites.selectors.button)
		: $(Favorites.selectors.button);

		favorites.then( function( favs ) {

			for ( var i = 0; i < $(buttons).length; i++ ){

				plugin.activeButton = $(buttons)[i];

				if ( Favorites.authenticated ) {
					plugin.setButtonData( favs );
				}

				if ( Favorites.authenticated && plugin.utilities.isFavorite( plugin.data.postid, plugin.data.site_favorites ) ){
					plugin.buttonFormatter.format($(plugin.activeButton), true);
					$(plugin.activeButton).addClass(Favorites.cssClasses.active);
					$(plugin.activeButton).removeClass(Favorites.cssClasses.loading);
					$(plugin.activeButton).find(Favorites.selectors.count).text(plugin.data.favorite_count);
					continue;
				}

				console.log( 'isFavorite' );
				console.log( plugin.utilities.isFavorite( plugin.data.postid, plugin.data.site_favorites ) );
				console.log( plugin.data.site_favorites );
				console.log( plugin.data.postid );

				plugin.buttonFormatter.format($(plugin.activeButton), false);
				$(plugin.activeButton).removeClass(Favorites.cssClasses.active);
				$(plugin.activeButton).removeClass(Favorites.cssClasses.loading);
				$(plugin.activeButton).find(Favorites.selectors.count).text(plugin.data.favorite_count);
			}
		} );

	}

	/**
	* Set the button data
	*/
	plugin.setButtonData = function( favs )
	{
		plugin.data.postid = $(plugin.activeButton).attr('data-postid');
		plugin.data.siteid = $(plugin.activeButton).attr('data-siteid');
		plugin.data.favorite_count = $(plugin.activeButton).attr('data-favoritecount');
		plugin.data.site_index     = plugin.utilities.siteIndex(plugin.data.siteid, favs);
		plugin.data.site_favorites = favs[0].posts; // TODO: get siteIndex working again
		if ( plugin.data.favorite_count <= 0 ) plugin.data.favorite_count = 0;
	}

	return plugin.bindEvents();
}