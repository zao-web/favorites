<?php
namespace Favorites\API;

use Favorites\Entities\User\UserRepository;
use Favorites\Entities\Favorite\Favorite;

//
class Endpoints extends \WP_REST_Controller {

	private $user_repo = null;

	public function __construct() {
		$this->user_repo = new UserRepository;
	}

	/**
	 * Register the routes for the objects of the controller.
	 */
	public function register_routes() {

		$namespace = 'favorites/v1';

		// Get Nonce (TODO: Confirm if this is necessary)
		register_rest_route( $namespace, '/generate-nonce/', [
			'methods'  => 'GET',
			'callback' => [ $this, 'get_nonce' ]
		] );

		register_rest_route( $namespace, '/' . 'user-favorites/', [
			[
				//DELETE all user favorites
				//@TODO Support deletion by list, by post type.
				[
					'methods'             => \WP_REST_Server::DELETABLE,
					'callback'            => array( $this, 'remove_favorites' ),
					'permission_callback' => array( $this, 'remove_favorites_permissions_check' ),
				],
				// GET all user's favorites
				[
					'methods' => 'GET',
					'callback' => [ $this, 'get_favorites' ],
					'permission_callback' => array( $this, 'get_favorites_permissions_check' ),
				]
			]
		] );

		register_rest_route( $namespace, '/' . 'user-favorites/(?P<id>[\d]+)', [
			// GET status of user-liking object ID
			// TODO potential inclusion of list, object type
			[
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => [ $this, 'get_favorite_status' ],
				'permission_callback' => [ $this, 'get_favorite_permissions_check' ],
				'args'                => [],
			],
			// POST object ID to user favorites
			// Support siteid, user_consent_accepted
			[
				'methods'             => \WP_REST_Server::CREATABLE,
				'callback'            => [ $this, 'add_favorite' ],
				'permission_callback' => [ $this, 'add_favorite_permissions_check' ],
				'args'                => $this->get_endpoint_args_for_item_schema( true ),
			],
			// DELETE object ID from user favorites
			// Support siteid, user_consent_accepted
			[
				'methods'             => \WP_REST_Server::DELETABLE,
				'callback'            => [ $this, 'remove_favorite' ],
				'permission_callback' => [ $this, 'remove_favorite_permissions_check' ],
				'args'                => $this->get_endpoint_args_for_item_schema( true ),
			],
		 ] );
	}

	public function permissions_check( $request ) {
		return (int) $request['id'] === get_current_user_id();
	}

	public function remove_favorite_permissions_check( $request ) {
		return $this->permissions_check( $request );
	}

	public function remove_favorites_permissions_check( $request ) {
		return $this->permissions_check( $request );
	}

	public function add_favorite_permissions_check( $request ) {
		return $this->permissions_check( $request );
	}

	public function get_favorite_permissions_check( $request ) {
		return $this->permissions_check( $request );
	}
	public function get_favorites_permissions_check( $request ) {
		return $this->permissions_check( $request );
	}

	/**
	 * Get a collection of favorites
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|WP_REST_Response
	 */
	public function get_favorites( $request ) {
		return new \WP_REST_Response( $this->user_repo->formattedFavorites(), 200 );
	}

	/**
	 * Get one favorite from the collection of favorites
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|WP_REST_Response
	 */
	public function get_favorite_status( $request ) {
		$params = $request->get_params();
		$is_user_favorite = in_array( $params['id'], get_user_favorites() );

		return new \WP_REST_Response( $is_user_favorite, 200 );
	}

	/**
	 * Add one favorite to user favorites
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|WP_REST_Request
	 */
	public function add_favorite( $request ) {
		$id = $request->get_params()['id'];

		$favorite = new Favorite;

		// TODO: Support different site ID, group ID (whatever that is.)
		// TODO: Need actual return types here for the API response.

		$favorite->update( $id, 'active', get_current_blog_id() );

		return new \WP_REST_Response( [ 'success' ], 200 );

		// return new \WP_Error( 'cant-create', __( 'message', 'text-domain' ), array( 'status' => 500 ) );
	}

	/**
	 * Delete one item from the collection
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|WP_REST_Request
	 */
	public function remove_favorite( $request ) {
		$id = $request->get_params()['id'];

		$favorite = new Favorite;

		// TODO: Support different site ID, group ID (whatever that is.)
		// TODO: Need actual return types here for the API response.

		$favorite->update( $id, 'inactive', get_current_blog_id() );

		return new \WP_REST_Response( [ 'success' ], 200 );

		// return new \WP_Error( 'cant-create', __( 'message', 'text-domain' ), array( 'status' => 500 ) );
	}

	/**
	 * Delete all favorites from the collection
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|WP_REST_Request
	 */
	public function remove_favorites( $request ) {
		//TODO implement later.

		return new \WP_Error( 'cant-delete', __( 'Can not delete, feature not supported', 'text-domain' ), array( 'status' => 500 ) );
	}


	/**
	 * Get the query params for collections
	 *
	 * @return array
	 */
	public function get_collection_params() {
		return array(
		'page'     => array(
			'description'       => 'Current page of the collection.',
			'type'              => 'integer',
			'default'           => 1,
			'sanitize_callback' => 'absint',
		),
		'per_page' => array(
			'description'       => 'Maximum number of items to be returned in result set.',
			'type'              => 'integer',
			'default'           => 10,
			'sanitize_callback' => 'absint',
		),
		'search'   => array(
			'description'       => 'Limit results to those matching a string.',
			'type'              => 'string',
			'sanitize_callback' => 'sanitize_text_field',
		),
		);
	}
}