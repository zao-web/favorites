<?php
namespace Favorites\Activation;

use Favorites\Helpers;
use Favorites\Config\SettingsRepository;

/**
* Plugin Dependencies
*/
class Dependencies
{
	/**
	* Plugin Directory
	*/
	private $plugin_dir;

	/**
	* Plugin Version
	*/
	private $plugin_version;

	/**
	* Settings Repository
	*/
	private $settings_repo;

	public function __construct()
	{
		$this->settings_repo = new SettingsRepository;
		$this->setPluginVersion();
		$this->plugin_dir = Helpers::plugin_url();
		add_action( 'admin_enqueue_scripts', [$this, 'adminStyles']);
		add_action( 'admin_enqueue_scripts', [$this, 'adminScripts']);
		add_action( 'wp_enqueue_scripts', [$this, 'frontendStyles']);
		add_action( 'wp_enqueue_scripts', [$this, 'frontendScripts']);
		add_action( 'wp_footer', [ $this, 'userFavoriteLoadingTemplate' ] );
	}

	/**
	* Set the Plugin Version
	*/
	private function setPluginVersion()
	{
		global $favorites_version;
		$this->plugin_version = $favorites_version;
	}

	/**
	* Admin Styles
	*/
	public function adminStyles()
	{
		wp_enqueue_style('wp-color-picker');
		wp_enqueue_style(
			'simple-favorites-admin',
			$this->plugin_dir . '/assets/css/favorites-admin.css',
			[],
			$this->plugin_version
		);
	}

	/**
	* Admin Scripts
	*/
	public function adminScripts()
	{
		$screen = get_current_screen();
		$settings_page = ( strpos($screen->id, 'simple-favorites') ) ? true : false;
		if ( !$settings_page ) return;
		wp_enqueue_script(
			'simple-favorites-admin',
			$this->plugin_dir . '/assets/js/favorites-admin.min.js',
			['jquery', 'wp-color-picker'],
			$this->plugin_version
		);
	}

	/**
	* Front End Styles
	*/
	public function frontendStyles()
	{
		if ( !$this->settings_repo->outputDependency('css') ) return;
		wp_enqueue_style(
			'simple-favorites',
			$this->plugin_dir . '/assets/css/favorites.css',
			[],
			time()
		);
	}

	/**
	* Front End Scripts
	*/
	public function frontendScripts()
	{
		if ( ! $this->settings_repo->outputDependency('js') ) {
			return;
		}

		if ( has_shortcode( get_post()->post_content, 'user_favorites' ) ) {
			wp_enqueue_script( 'wp-util' );
			wp_enqueue_script( 'listjs', $this->plugin_dir . '/assets/js/src/lib/list.js' );
		}

		$file = ( $this->settings_repo->devMode() ) ? 'favorites.js' : 'favorites.min.js';
		wp_enqueue_script(
			'favorites',
			$this->plugin_dir . '/assets/js/' . $file,
			['jquery'],
			time()
		);

		$redirect_url = $this->settings_repo->redirectAnonymousId();

		$localized_data = [
			'ajaxurl' => admin_url( 'admin-ajax.php' ),
			'restUrl' => rest_url( 'favorites/v1' ),
			'restNonce' => wp_create_nonce( 'wp_rest' ),
			'maybeGetUserFavorites' => apply_filters( 'favorites/maybe_get_user_favorites', is_user_logged_in(), $this ),
			'nonce' => wp_create_nonce('simple_favorites_nonce'),
			'favorite' => apply_filters('favorites/button/html', $this->settings_repo->buttonText(), null, false, null),
			'favorited' => apply_filters('favorites/button/html', $this->settings_repo->buttonTextFavorited(), null, true, null),
			'includecount' => $this->settings_repo->includeCountInButton(),
			'indicate_loading' => $this->settings_repo->includeLoadingIndicator(),
			'loading_text' => $this->settings_repo->loadingText(),
			'loading_image' => $this->settings_repo->loadingImage(),
			'loading_image_active' => $this->settings_repo->loadingImage('active'),
			'loading_image_preload' => $this->settings_repo->includeLoadingIndicatorPreload(),
			'cache_enabled' => $this->settings_repo->cacheEnabled(),
			'button_options' => $this->settings_repo->formattedButtonOptions(),
			'authentication_modal_content' => $this->settings_repo->authenticationModalContent(),
			'authentication_redirect' => $this->settings_repo->redirectAnonymous(),
			'dev_mode' => $this->settings_repo->devMode(),
			'logged_in' => is_user_logged_in(),
			'user_id'                     => get_current_user_id(),
			'authentication_redirect_url' => ( $redirect_url ) ? get_the_permalink($redirect_url) : apply_filters( 'favorites/authentication_redirect_url', wp_login_url() )
		];

		wp_localize_script(
			'favorites',
			'favorites_data',
			apply_filters( 'favorites/data', $localized_data, $this )
		);
	}

	/**
	 * TODO Properly templatize for generic use.
	 *
	 * TODO: Loading on all, IN userFavorites, check if thumbnails, title, and permalink exists, if so load, if not, get, then load.
	 *
	 * @return void
	 */
	public function userFavoriteLoadingTemplate() {

		if ( ! has_shortcode( get_post()->post_content, 'user_favorites' ) ) {
			return;
		}
		?>
		<script type="text/html" id="tmpl-favorites-loading-posts">
			<article class="loading-favorite favorite--is-loading">
				<div class="favorite__loader">
					<div class="loader__bar--1"></div>
					<div class="loader__bar--2"></div>
					<div class="loader__bar--3"></div>
				</div>
			</article>
		</script>

		<script type="text/html" id="tmpl-favorites-post">
			<article class="post-{{ data.post_id }} post type-post status-publish format-standard has-post-thumbnail one-fourth myrt-favorites" data-quick-easy="{{data.quick_easy}}">
				<header class="entry-header">
					<button class="simplefavorite-button active" data-postid="{{ data.post_id }}" data-siteid="1" data-groupid="1" style="">
						<svg class="svg-inline--fa fa-heart fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""
							><path fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
						</svg>
						<span class="favorite-text">Recipe Saved</span>
					</button>
					<a class="entry-image-link" href="{{data.link}}" aria-hidden="true" tabindex="-1">
						{{{data.thumbnail}}}
					</a>
					<h2 class="entry-title"><a class="entry-title-link" rel="bookmark" href="{{data.link}}">{{data.title}}</a></h2>
				</header>
			</article>
		</script>
		<?php
	}
}