/**
* Primary Favorites Initialization
* @package Favorites
* @author Kyle Phillips - https://github.com/kylephillips/favorites
*
* Events:
* favorites-nonce-generated: The nonce has been generated
* favorites-updated-single: A user's favorite has been updated. Params: favorites, post_id, site_id, status
* favorites-cleared: The user's favorites have been cleared. Params: clear button
* favorites-user-favorites-loaded: The user's favorites have been loaded. Params: intialLoad (bool)
* favorites-require-authentication: An unauthenticated user has attempted to favorite a post (The Require Login & Show Modal setting is checked)
*/
jQuery(document).ready(function(){
	new Favorites.Factory;
});

var Favorites = Favorites || {};

/**
* DOM Selectors Used by the Plugin
*/
Favorites.selectors = {
	button : '.simplefavorite-button', // Favorite Buttons
	list : '.favorites-list', // Favorite Lists
	clear_button : '.simplefavorites-clear', // Clear Button
	total_favorites : '.simplefavorites-user-count', // Total Favorites (from the_user_favorites_count)
	modals : 'data-favorites-modal', // Modals
	consentModal : 'data-favorites-consent-modal', // Consent Modal
	close_modals : 'data-favorites-modal-close', // Link/Button to close the modals
	count : '.simplefavorite-button-count', // The count inside the favorites button
	post_favorite_count : 'data-favorites-post-count-id' // The total number of times a post has been favorited
}

/**
* CSS Classes Used by the Plugin
*/
Favorites.cssClasses = {
	loading : 'loading', // Loading State
	active : 'active', // Active State
}

Favorites.removalCache = {};

/**
* Localized JS Data Used by the Plugin
*/
Favorites.jsData = {
	ajaxurl : favorites_data.ajaxurl, // The WP AJAX URL
	restUrl : favorites_data.restUrl, // The WP REST URL
	maybeGetUserFavorites : favorites_data.maybeGetUserFavorites,
	favorite : favorites_data.favorite, // Active Button Text/HTML
	favorited : favorites_data.favorited, // Inactive Button Text
	include_count : favorites_data.includecount, // Whether to include the count in buttons
	indicate_loading : favorites_data.indicate_loading, // Whether to include loading indication in buttons
	loading_text : favorites_data.loading_text, // Loading indication text
	loading_image_active : favorites_data.loading_image_active, // Loading spinner url in active button
	loading_image : favorites_data.loading_image, // Loading spinner url in inactive button
	cache_enabled : favorites_data.cache_enabled, // Is cache enabled on the site
	authentication_modal_content : favorites_data.authentication_modal_content, // Content to display in authentication gate modal
	authentication_redirect : favorites_data.authentication_redirect, // Whether to redirect unauthenticated users to a page
	authentication_redirect_url : favorites_data.authentication_redirect_url, // URL to redirect to
	button_options : favorites_data.button_options, // Custom button options
	dev_mode : favorites_data.dev_mode, // Is Dev mode enabled
	logged_in : favorites_data.logged_in, // Is the user logged in
	user_id : favorites_data.user_id, // The current user ID (0 if logged out)
	api_endpoints : {
		nonce : favorites_data.restUrl + '/generate-nonce',
		user_favorites : favorites_data.restUrl + '/user-favorites',
		favorite_button : favorites_data.restUrl + '/favorite-button'
	}
};

/**
* The user's favorites
* @var object
*/
Favorites.userFavorites = null;

/**
* Is the user authenticated
* @var object
*/
Favorites.authenticated = true;

/**
 * Local Data Storage for User Favorites
 */
 Favorites.store = window.localforage;

/**
* WP Form Actions Used by the Plugin
*/
Favorites.formActions = {
	favoritesarray : 'favorites_array',
	favorite : 'favorites_favorite',
	clearall : 'favorites_clear',
	favoritelist : 'favorites_list',
	cookieConsent : 'favorites_cookie_consent'
}

Favorites.shouldLoad = function() {

	var admins = [ '10', '7', '1', '24', '103' ];
}

/**
* Primary factory class
*/
Favorites.Factory = function()
{
	var plugin = this;
	var $ = jQuery;

	plugin.build = function()
	{
		new Favorites.UserFavorites;
		new Favorites.Sync;
		new Favorites.Lists;
		new Favorites.Clear;
		new Favorites.Button;
		new Favorites.ButtonUpdater;
		new Favorites.TotalCount;
		new Favorites.PostFavoriteCount;
		new Favorites.RequireAuthentication;
		new Favorites.RequireConsent;
	}

	return plugin.build();
}