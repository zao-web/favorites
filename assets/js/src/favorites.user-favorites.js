/**
* Gets the user favorites
*/
var Favorites = Favorites || {};

Favorites.UserFavorites = function()
{
	var plugin = this;
	var $ = jQuery;
	plugin.initialLoad = false;

	plugin.bindEvents = function()
	{
		$(window).on('load', function(){
			plugin.initialLoad = true;
			plugin.getFavorites();
		});
	}

	plugin.getFavoritesFromServer = function( maybeSkipUpdates ) {
		return $.get({
			url: Favorites.jsData.api_endpoints.user_favorites,
			datatype: 'json',
			beforeSend: function ( xhr ) {
				xhr.setRequestHeader( 'X-WP-Nonce', favorites_data.restNonce );
			},
			success: function(data){

				Favorites.store.setItem( 'userFavorites', data ).then( function( value ) {

					Favorites.userFavorites = value;

					if ( Favorites.jsData.dev_mode ) {
						//console.log('The current user favorites were successfully loaded.');
						console.log(value);
					}

					if ( maybeSkipUpdates ) {
						return;
					}

					$(document).trigger('favorites-user-favorites-loaded', [value, plugin.initialLoad]);
					$(document).trigger('favorites-update-all-buttons');

				} ).catch( function( error ) {

				} );

			},
			error: function(data){
				if ( !Favorites.jsData.dev_mode ) return;
				console.log('The was an error loading the user favorites.');
				console.log(data);
			}
		});
	}

	/**
	* Get the user favorites
	*/
	plugin.getFavorites = function( maybeSkipUpdates )
	{
		// We only need to get the user favorites, by default, on a short-coded page, or single post views that have the favorite action.
		if ( ! Favorites.jsData.maybeGetUserFavorites ) {
			return;
		}

		// First check localStorage for locally cached version of favorites
		return Favorites.store.getItem( 'userFavorites' ).then(function( favorites ) {
			if ( null !== favorites ) {

				Favorites.userFavorites = favorites;

				if ( maybeSkipUpdates ) {
					return favorites;
				}

				$(document).trigger('favorites-user-favorites-loaded', [Favorites.userFavorites, plugin.initialLoad]);
				$(document).trigger('favorites-update-all-buttons');

				return favorites;
			}

			return plugin.getFavoritesFromServer(maybeSkipUpdates);

		}).catch(function(err) {
			// This code runs if there were any errors
			console.log( err );
			return plugin.getFavoritesFromServer(maybeSkipUpdates);
		});

	}

	plugin.addFavorite = function( data ) {
		var fav = plugin.getFavorites();
		console.log(data);

		var post_id = data.post_id;

		plugin.loading( true, post_id );

		fav.then( function( favorites ) {

			//TODO Ensure we have fully populated getFavorites from server, with proper siteID, etc..
			if ( ! favorites[0].groups.length ) {
				favorites[0].groups[0] = {
					posts : []
				}
			}

			// Add to groups / TODO: Better way of identifying what goes where.
			if ( favorites[0].groups[0].posts.indexOf( post_id ) === -1 ) {
				favorites[0].groups[0].posts.push(post_id);
			}

			var args;

			if ( Favorites.removalCache.hasOwnProperty( post_id ) ) {
				args = Favorites.removalCache[data.post_id];
				delete Favorites.removalCache[data.post_id];
			} else {
				args = {
					button: '<button class="simplefavorite-button active" data-postid="' + post_id + '" data-siteid="' + data.site_id + '" data-groupid="1"><span class="fas fa-heart"></span> <span class="favorite-text">Recipe Saved</span></button>',
					excerpt: "",
					post_id: post_id,
					post_type: "post", // TODO: Get actual post type
					thumbnail: $( '.wprm-recipe-image' ).html(),
					link: window.location.href.replace( window.location.hash, '' ),
					quick_easy : $( '.category-quick-and-easy' ).length, // TODO: A good, filterable way to add additional data, a smart way to persist this data on the server as well
					title: $( 'h1.entry-title' ).text(),
					total: 1 // TODO Determine usage
				};
			}

			favorites[0].posts[ post_id ] = args;

			//favorites[0].posts = $.grep( favorites[0].posts,function(n){ return parseInt(n) > 0 });
			//favorites[0].posts = Object.keys( favorites[0].posts );
			//favorites[0]['groups'][0]['posts'] = $.grep( favorites[0]['groups'][0]['posts'],function(n){ return parseInt(n) > 0 });

			if ( $.isArray( favorites[0].posts ) ) {
				favorites[0].posts = favorites[0].posts.reduce(function(acc, cur, i) {
					acc[post_id] = cur;
					return acc;
				  }, {});
			}

			console.error( 'favorites added to data store' );
			console.error( favorites );

			Favorites.store.setItem( 'userFavorites', favorites ).then( function() {
				Favorites.userFavorites = favorites;
				$(document).trigger('favorites-updated-single', [favorites, post_id, data.site_id, data.status]);
				$(document).trigger('favorites-update-all-buttons');

				plugin.loading( false, post_id );

			} ).catch( function( err ) {
				console.log( 'could not save favorite' );
				console.log( err );
				console.log( favorites );
			} );

		} )
	}

	plugin.loading = function( loading, post_id ) {
		var allButtons = $('button[data-postid="' + post_id + '"]');

		$.each(allButtons, function(){
			$(this).attr('disabled', loading);
			$(this).toggleClass(Favorites.cssClasses.loading, loading);
			if ( loading ) {
				$(this).html(plugin.addLoadingIndication());
			}
		});

	}

	/*
	* Add loading indication to button
	*/
	plugin.addLoadingIndication = function(html)
	{
		if ( Favorites.jsData.indicate_loading !== '1' ) return html;
		if ( plugin.data.status === 'active' ) return Favorites.jsData.loading_text + Favorites.jsData.loading_image_active;
		return Favorites.jsData.loading_text + Favorites.jsData.loading_image;
	}

	// TODO Updating button state is failing. Confirm that we're actually removing/adding
	plugin.removeFavorite = function( data ) {
		plugin.loading( true, data.post_id );

		var fav = plugin.getFavorites();

		fav.then( function( favorites ) {
			if ( ! Favorites.removalCache.hasOwnProperty( data.post_id ) ) {
				Favorites.removalCache[data.post_id] = favorites[0].posts[ data.post_id ];
			}

			favorites[0].groups[0].posts = favorites[0].groups[0].posts.filter( function( id ) {
				return id !== data.post_id;
			} );

			delete favorites[0].posts[ data.post_id ];

			Favorites.store.setItem( 'userFavorites', favorites ).then( function() {
				Favorites.userFavorites = favorites;
				$(document).trigger('favorites-updated-single', [favorites, data.post_id, data.site_id, data.status]);
				$(document).trigger('favorites-update-all-buttons');
				plugin.loading( false, data.post_id );
			} ).catch( function( err ) {
				console.log( 'could not remove favorite' );
				console.log( err );
				console.log( favorites );
			} );
		} );

	}

	plugin.bindEvents();

	return plugin;
}