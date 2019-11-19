/**
* Sync favorites from local storage to server
*/
var Favorites = Favorites || {};

Favorites.Sync = function()
{
	var plugin = this;
	plugin.timeToSync = false;

	/**
	 * If time since last sync exceeds this for the favorites-debounced-sync event, sync.
	 * Defaults to 110 seconds
	 */
	// plugin.deltaCheckInterval = 110000; //Prod
	 plugin.deltaCheckInterval = 10000; //Prod

	/**
	 * Checks delta every 15 seconds for any changes.
	 */
	//plugin.timeoutInterval = 15000; //Prod
	plugin.timeoutInterval = 10000; //Prod
	var $ = jQuery;

	plugin.bindEvents = function()
	{
		if ( ! Favorites.jsData.logged_in.length ) {
			var favorites = Favorites.store.length();
			favorites.then( function( favorites ) {
				if ( favorites > 0 ) {
					Favorites.store.clear();
				}
			} );
			return;
		}

		$(window).on('load', function(){
			if ( $( 'div#wp-user-favorites' ).length > 0 ) { //TODO tied to theme - better check needed for if user dash
				plugin.loadPostsOnDashboard();
			}
		});

		//Anytime someone logs in syncFromServer
		$(document).on('favorites-login', function(){
			plugin.maybeSyncServer();
			plugin.setDelta();
		});

		plugin.checkIfLoggingIn();

		$( '.page-template-page_myrt .facetwp-checkbox' ).click( plugin.filterList ); // TODO Tied to theme - build a better way!

		// Check every 1:50 minutes for delta changes and sync if they exist.
		$(document).on('favorites-debounced-sync', function(){
			plugin.maybeSyncServer();
		});


		// Only set delta when favorites sync
		$(document).on('favorites-synced', function(){
			// console.log( 'setting delta after successful server sync' );
			plugin.setDelta();
		});

		// Check every 1:50 minutes for delta changes and sync if they exist.
		setInterval( function() {
			// console.log( 'setTimeout callback running' );
			$( document ).trigger( 'favorites-debounced-sync' );
		}, plugin.timeoutInterval );


		//Anytime someone logs out syncToServer, delete local cache
		$( 'a[href*="action=logout"]' ).click( function( e ) {
			e.preventDefault();
			var href = this.href;
			plugin.maybeSyncServer().then(function() {
				Favorites.store.clear().then( function() {
					window.location = href;
				} )
			});

			return false;
		} );


		/**
		// Anytime someone navigates away from user dashboard, sync to server if necessary. Check for shortcode/classname, onbeforeunload, check delta
		$(document).on('favorites-user-dashboard-exit', function(){
			plugin.maybeSyncServer();
		});

		window.addEventListener('beforeunload', function (e) {

			if ( $( 'div#wp-user-favorites' ).length > 0 ) {
				plugin.checkDelta.then( function( delta ) {
					if ( delta ) {
						$( document ).trigger( 'favorites-user-dashboard-exit' );
					}
				} )
			}

		  });

		 */

	}

	/**	As we cannot reliably depend on a wp_login hook, given the HTTP redirect, we simply check if we're on the dashboard page, and the delta has not been set */
	plugin.checkIfLoggingIn = function() {

		if ( $( '#wp-user-favorites' ).length < 1 ) {
			return;
		}

		plugin.getDelta().then( function( delta ) {
			if ( delta === null ) {
				$( document ).trigger( 'favorites-login' );
			}
		} );
	}

	/*
	* If there is a delta, sync to server
	*/
	plugin.maybeSyncServer = function() {

		// Maybe syncing to server
		console.log( 'Maybe sync up with the server' );

		return plugin.checkDelta().then( function( delta ) {
			if ( ! delta ) {
				console.log( 'Too SOON or no changes' );
				console.log( plugin.timeToSync );
				console.log( 'Too soon or no CHANGES' );
				console.log( plugin.hasChanges );
				return false;
			}

			var favorites = Favorites.UserFavorites().getFavorites( true );

			return favorites.then( function( favs ) {

				// User meta expects an array of IDs here, which are mapped/decorated in the response
				if ( typeof favs[0].posts === 'object' ) {
					//favs[0].posts = $.grep( favs[0].posts,function(n){ return parseInt(n) > 0 });
					//favs[0].posts = Object.keys( favs[0].posts );
				}

				return $.post({
					url: Favorites.jsData.api_endpoints.user_favorites,
					datatype: 'json',
					beforeSend: function ( xhr ) {
						xhr.setRequestHeader( 'X-WP-Nonce', favorites_data.restNonce );
					},
					data : {
						favorites : favs
					},
					success: function(data){
						$(document).trigger('favorites-synced');
					},
					error: function(data){
						if ( !Favorites.jsData.dev_mode ) return;
						console.log('The was an error loading the user favorites.');
						console.log(data);
					}
				});
			} );
		} );
	}

	/**
	 * Save posts from database as "database-delta" to compare against.
	 * Should be set anytime we retrieve data from the database.
	 */
	plugin.setDelta = function() {

		var favorites = Favorites.UserFavorites().getFavorites();

		favorites.then( function(favs) {
			var posts = Object.keys( favs[0].posts );

			console.log( 'setting the delta' );

			return Favorites.store.setItem( 'userFavoritesFromServer', posts ).then( function( posts ) {
				console.log( posts );

				var date = new Date();
				var timestamp = date.getTime();

				Favorites.store.setItem( 'userFavoritesLastSyncTime', timestamp );
				return posts;
			} );

		} );
	}

	/**
	 * Gets the delta.
	 */
	plugin.getDelta = function() {
		return Favorites.store.getItem( 'userFavoritesFromServer' ).then( function( delta ) {
			return delta;
		} );
	}

	plugin.arraysEqual = function( a, b ) {
		if (a === b) return true;
		if (a == null || b == null) return false;
		if (a.length != b.length) return false;

		// If you don't care about the order of the elements inside
		// the array, you should sort both arrays here.
		// Please note that calling sort on an array will modify that array.
		// you might want to clone your array first.

		for (var i = 0; i < a.length; ++i) {
			if (a[i] !== b[i]) return false;
		}
		return true;
	}

	/**
	 * Check if delta exists between server-side and client-side, and if enough time has passed
	 */
	plugin.checkDelta = function() {
		var serverData   = plugin.getDelta();
		var localData    = Favorites.UserFavorites().getFavorites();
		var lastSyncTime = Favorites.store.getItem( 'userFavoritesLastSyncTime', function( time ) {
			return time;
		}  );
		var currentDate = new Date();
		var currentTimestamp   = currentDate.getTime();

		console.log( 'checking the delta' );

		return localData.then( function( favs ) {
			return lastSyncTime.then( function( time ) {

				if ( currentTimestamp > time + plugin.deltaCheckInterval ) {
					plugin.timeToSync = true;
				}

				return serverData.then( function( delta ) {

					if ( null === delta ) {
						return true;
					}


					var differences = ! plugin.arraysEqual( Object.keys( favs[0].posts ), delta );
					plugin.hasChanges = differences;

					return plugin.hasChanges && plugin.timeToSync;
				} );

			} );
		} );
	}

	plugin.removeLocalData = function() {
		return Favorites.store.removeItem( 'userFavorites' ).then( function() {
			return Favorites.store.removeItem( 'userFavoritesFromServer', function() {
				return Favorites.store.removeItem( 'userFavoritesLastSyncTime', timestamp );
			} );
		} );
	}

	plugin.loadPostsOnDashboard = function() {
		var post_template = wp.template( 'favorites-post' );
		var siteContent = $( 'div#wp-user-favorites .list' ); //TODO Theme bound, bad.
		var favorites = Favorites.UserFavorites().getFavorites();

		//TODO Abstract messaging away into settings.
		favorites.then( function( favorites ) {
			console.log( favorites );
			if ( ! favorites[0].groups.length || ( favorites[0].groups.length && ! favorites[0].groups[0].posts.length ) ) {
				$( 'div#wp-user-favorites .list, div#wp-user-favorites .pagination' ).remove();
				$( 'div#wp-user-favorites' ).append( "<p>You don't have any saved recipes yet! Click the <strong>floating heart</strong> or <strong>Save Recipe</strong> buttons on a recipe post and it will appear right here.</p><p><a style='color:#f4796c' href='" + window.location.origin + "'>Go to the RecipeTin Eats home page.</a></p>" );
				return;
			}

			var favs = Object.values(favorites[0].posts);

			favs.forEach( function( favorite ) {
				if ( $( '.loading-favorite', siteContent ).length ) {
					$( '.loading-favorite', siteContent ).first().remove();
				}

				console.log( favorite );
				siteContent.append( post_template( favorite ) );
			} );

			$( '.loading-favorite', siteContent ).remove();

			plugin.favoriteList = new List('wp-user-favorites', {
				valueNames: ['entry-title-link', { data: ['quick-easy'] } ],
				page: 20,
				pagination: true
			});

			plugin.favoriteList.sort('entry-title-link', { order: "asc" });

			plugin.favoriteList.on( 'updated', function() {
				window.scrollTo( 0,0 );
			} )

		} );

	}

	plugin.filterList = function() {
		var quick_easy_checked = ! $( '.page-template-page_myrt .facetwp-checkbox' ).hasClass( 'checked' );

		console.log( quick_easy_checked );

		plugin.favoriteList.filter(function (item) {
			console.log( item );
			console.log( quick_easy_checked );

			if ( ! quick_easy_checked ) {
				return true;
			}

			console.log( item.values() );

			  return parseInt( item.values()['quick-easy'] ) > 0;
		  });

			plugin.favoriteList.update();
	}

	return plugin.bindEvents();
}