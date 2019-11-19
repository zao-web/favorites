/**
* Favorite Buttons
* Favorites/Unfavorites a specific post
*
* Events:
* favorites-updated-single: A user's favorite has been updated. Params: favorites, post_id, site_id, status
*/
var Favorites = Favorites || {};

Favorites.Button = function()
{
	var plugin = this;
	var $ = jQuery;

	plugin.activeButton; // The clicked button
	plugin.allButtons; // All favorite buttons for the current post
	plugin.authenticated = true;

	plugin.formatter = new Favorites.Formatter;
	plugin.data = {};

	plugin.bindEvents = function()
	{
		$(document).on('click', Favorites.selectors.button, function(e){
			e.preventDefault();
			plugin.activeButton = $(this);
			plugin.setAllButtons();
			plugin.submitFavorite();
		});
	}

	/**
	* Set all buttons
	*/
	plugin.setAllButtons = function()
	{
		var post_id = $(plugin.activeButton).attr('data-postid');
		plugin.allButtons = $('button[data-postid="' + post_id + '"]');
	}

	/**
	* Set the Post Data
	*/
	plugin.setData = function()
	{
		plugin.data.post_id = $(plugin.activeButton).attr('data-postid');
		plugin.data.site_id = $(plugin.activeButton).attr('data-siteid');
		plugin.data.status = ( $(plugin.activeButton).hasClass('active') ) ? 'inactive' : 'active';
		var consentProvided = $(plugin.activeButton).attr('data-user-consent-accepted');
		plugin.data.user_consent_accepted = ( typeof consentProvided !== 'undefined' && consentProvided !== '' ) ? true : false;
	}

	/**
	* Submit the button
	*/
	plugin.submitFavorite = function()
	{
		plugin.setData();

		var formData = {
			siteid : plugin.data.site_id,
			user_consent_accepted : plugin.data.user_consent_accepted
		}

		var is_active = 'active' === plugin.data.status;

		// If user isn't logged
		if ( '1' !== Favorites.jsData.logged_in ) {
			window.location = Favorites.jsData.authentication_redirect_url;
			return;
		}

		if ( is_active ) {
			return Favorites.UserFavorites().addFavorite( plugin.data )
		} else {
			return Favorites.UserFavorites().removeFavorite( plugin.data );
		}

		$.ajax({
			url: Favorites.jsData.api_endpoints.user_favorites + '/' + plugin.data.post_id,
			type: type,
			dataType: 'json',
			beforeSend: function ( xhr ) {
				xhr.setRequestHeader( 'X-WP-Nonce', favorites_data.restNonce );
			},
			data: formData,
			success: function(data){
				if ( Favorites.jsData.dev_mode ) {
					console.log('The favorite was successfully saved.');
					console.log(data);
				}
				if ( data.status === 'unauthenticated' ){
					Favorites.authenticated = false;
					plugin.loading(false);
					plugin.data.status = 'inactive';
					$(document).trigger('favorites-update-all-buttons');
					$(document).trigger('favorites-require-authentication', [plugin.data]);
					return;
				}
				if ( data.status === 'consent_required' ){
					plugin.loading(false);
					$(document).trigger('favorites-require-consent', [data, plugin.data, plugin.activeButton]);
					return;
				}
				Favorites.userFavorites = data.favorites;
				plugin.loading(false);
				plugin.resetButtons();
				$(document).trigger('favorites-updated-single', [data.favorites, plugin.data.post_id, plugin.data.site_id, plugin.data.status]);
				$(document).trigger('favorites-update-all-buttons');

				// Deprecated callback
				favorites_after_button_submit(data.favorites, plugin.data.post_id, plugin.data.site_id, plugin.data.status);
			},
			error: function(data){
				if ( !Favorites.jsData.dev_mode ) return;
				console.log('There was an error saving the favorite.');
				console.log(data);
			}
		});
	}

	/*
	* Set the output html
	*/
	plugin.resetButtons = function()
	{
		var favorite_count = parseInt($(plugin.activeButton).attr('data-favoritecount'));

		$.each(plugin.allButtons, function(){
			if ( plugin.data.status === 'inactive' ) {
				if ( favorite_count <= 0 ) favorite_count = 1;
				$(this).removeClass(Favorites.cssClasses.active);
				$(this).attr('data-favoritecount', favorite_count - 1);
				$(this).find(Favorites.selectors.count).text(favorite_count - 1);
				return;
			}
			$(this).addClass(Favorites.cssClasses.active);
			$(this).attr('data-favoritecount', favorite_count + 1);
			$(this).find(Favorites.selectors.count).text(favorite_count + 1);
		});
	}

	plugin.bindEvents();
	return plugin;
}