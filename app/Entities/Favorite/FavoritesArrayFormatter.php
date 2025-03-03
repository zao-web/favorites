<?php
namespace Favorites\Entities\Favorite;

use Favorites\Entities\Post\FavoriteCount;
use Favorites\Entities\Favorite\FavoriteButton;
use Favorites\Entities\FavoriteList\FavoriteList;

/**
* Format the user's favorite array to include additional post data
*/
class FavoritesArrayFormatter
{
	/**
	* Formatted favorites array
	*/
	private $formatted_favorites;

	/**
	* Total Favorites Counter
	*/
	private $counter;

	/**
	* Post ID to add to return array
	* For adding/removing session/cookie favorites for current request
	* @var int
	*/
	private $post_id;

	/**
	* Site ID for post to add to array
	* For adding/removing session/cookie favorites for current request
	* @var int
	*/
	private $site_id;

	/**
	* Site ID for post to add to array
	* For adding/removing session/cookie favorites for current request
	* @var string
	*/
	private $status;

	public function __construct()
	{
		$this->counter = new FavoriteCount;
	}

	public function format($favorites, $post_id = null, $site_id = null, $status = null)
	{
		$this->formatted_favorites = $favorites;
		$this->post_id = $post_id;
		$this->site_id = $site_id;
		$this->status = $status;
		$this->resetIndexes();
		$this->addPostData();
		return $this->formatted_favorites;
	}

	/**
	* Reset the favorite indexes
	*/
	private function resetIndexes()
	{
		foreach ( $this->formatted_favorites as $site => $site_favorites ) {

			// Make older posts compatible with new name
			if ( !isset($site_favorites['posts']) ) {
				$site_favorites['posts'] = isset( $site_favorites['site_favorites'] ) ? $site_favorites['site_favorites'] : [];
				unset($this->formatted_favorites[$site]['site_favorites']);
				if ( ! isset( $this->formatted_favorites[$site]['posts'] ) ) {
					$this->formatted_favorites[$site]['posts'] = [];
				}
			}

			foreach ( $site_favorites['posts'] as $key => $favorite ){
				unset($this->formatted_favorites[$site]['posts'][$key]);
				$this->formatted_favorites[$site]['posts'][$favorite]['post_id'] = $favorite;
			}
		}
	}

	/**
	* Add the post type to each favorite
	* TODO This should be filterable. With a site with dozens of thumbnails, generating this when only one is needed is expensive. That will also be a better way to add taxonomy filtering checks
	*/
	private function addPostData()
	{
		$this->checkCurrentPost();
		foreach ( $this->formatted_favorites as $site => $site_favorites ){

			if ( empty( $site_favorites['posts'] ) && ! empty( $this->formatted_favorites[$site]['groups'][$site]['posts'] ) ) {
				foreach ( $this->formatted_favorites[$site]['groups'][$site]['posts'] as $post_id ) {
					$site_favorites['posts'][ $post_id ] = $post_id;
				}
			}

			foreach ( $site_favorites['posts'] as $key => $favorite ){
				$site_id = isset( $this->formatted_favorites[$site]['site_id'] ) ? $this->formatted_favorites[$site]['site_id'] : get_current_blog_id();
				$this->formatted_favorites[$site]['posts'][$key]['post_type'] = get_post_type($key);
				$this->formatted_favorites[$site]['posts'][$key]['title'] = get_the_title($key);
				$this->formatted_favorites[$site]['posts'][$key]['permalink'] = get_the_permalink($key);
				$this->formatted_favorites[$site]['posts'][$key]['link'] = get_the_permalink($key);
				$this->formatted_favorites[$site]['posts'][$key]['post_id'] = $key;
				$this->formatted_favorites[$site]['posts'][$key]['total'] = $this->counter->getCount($key, $site_id);
				// $this->formatted_favorites[$site]['posts'][$key]['thumbnails'] = $this->getThumbnails($key);
				$this->formatted_favorites[$site]['posts'][$key]['thumbnail'] = get_the_post_thumbnail( $key, 'placement-recipe' ); // TODO Add setting for default thumbnail size, in block, in shortcodes
				$this->formatted_favorites[$site]['posts'][$key]['quick_easy'] = has_term( 'quick-and-easy', 'category', $key ) ? 1 : 0;
				$this->formatted_favorites[$site]['posts'][$key]['excerpt'] = apply_filters('the_excerpt', get_post_field('post_excerpt', $key));
				//$button = new FavoriteButton($key, $site_id);
				//$this->formatted_favorites[$site]['posts'][$key]['button'] = $button->display(false); //Not sure we need this.
			}
			$this->formatted_favorites[$site] = array_reverse($this->formatted_favorites[$site]);

			// TODO Validate assumption that group key == site key
			if ( empty( $this->formatted_favorites[$site]['groups'][$site]['posts'] ) )  {
				$this->formatted_favorites[$site]['groups'][$site]['posts']  = array_keys( $this->formatted_favorites[$site]['posts'] );
			}

			$this->formatted_favorites[$site]['groups'][$site]['posts'] = array_filter( $this->formatted_favorites[$site]['groups'][$site]['posts'] );

		}
	}

	/**
	* Make sure the current post is updated in the array
	* (for cookie/session favorites, so AJAX response returns array with correct posts without page refresh)
	*/
	private function checkCurrentPost()
	{
		if ( !isset($this->post_id) || !isset($this->site_id) ) return;
		if ( is_user_logged_in() ) return;
		foreach ( $this->formatted_favorites as $site => $site_favorites ){
			if ( $site_favorites['site_id'] == $this->site_id ) {
				if ( isset($site_favorites['posts'][$this->post_id]) && $this->status == 'inactive' ){
					unset($this->formatted_favorites[$site]['posts'][$this->post_id]);
				} else {
					$this->formatted_favorites[$site]['posts'][$this->post_id] = array('post_id' => $this->post_id);
				}
			}
		}
	}

	/**
	* Add thumbnail urls to the array
	*/
	private function getThumbnails($post_id)
	{
		if ( !has_post_thumbnail($post_id) ) return false;
		$sizes = get_intermediate_image_sizes();
		$thumbnails = [];
		foreach ( $sizes as $size ){
			$url = get_the_post_thumbnail_url($post_id, $size);
			$img = '<img src="' . $url . '" alt="' . get_the_title($post_id) . '" class="favorites-list-thumbnail" />';
			$thumbnails[$size] = apply_filters('favorites/list/thumbnail', $img, $post_id, $size);
		}
		return $thumbnails;
	}
}