<?php
define('WP_CACHE', true); // Added by WP Rocket
 // Added by WP Rocket
 // Added by WP Rocket



/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //

define('DB_NAME', 'staging_db');
define('DB_USER', 'staging_db');

define('DB_PASSWORD', '=dPu7)Cyc9VS');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

define('DISALLOW_FILE_EDIT', true);
define('WP_POST_REVISIONS', 3);

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'pnh|(rcWXsAg|R vI?c#7Ze AP-<<_96XT_&_x42G|@b$iESI+22+|evvF`.MQ1f');
define('SECURE_AUTH_KEY',  'S/T:r*`QB?{?8q|IAYFW{r#B)TERT|@,9Y&Z.ygr-A|HL_sa}>/t=AMnMfoCr|F=');
define('LOGGED_IN_KEY',    't13pD$D0]w-YMP6-C^*THw?mjU[5t(wr!|*JJk^-Hy.BF?+.I;_},|y];E|:.C8T');
define('NONCE_KEY',        'uyE1??NvJ9:zgz~.Ilyeu_*|0S+O7U(E+)[G7}sO, /O3I!+cBc-r~L%1++QIx=8');
define('AUTH_SALT',        'gqtXMr9}!jihZHt@oPF?ekHY4Izf{8]lb. IZ<=+{Z-l{4~O~Rlr>pr18-RdqEif');
define('SECURE_AUTH_SALT', 'i]G2Q_)PQV]!8*kAP_%~45+tfq|)9w+0`y#-]*;VNTu1?@<fO>hL^w!1!-@mp-pE');
define('LOGGED_IN_SALT',   '3W2 ,k;>B|9iM<5OuyC4s9=[8.$Di( FY]6q`aO?>s%/6SFro!%TL-MJk1zW3g@H');
define('NONCE_SALT',       'BAqDnee}Nc*L_a#7L~|PGPdIZ+[3AI3O[bHt3#Im9#3{t/Q.;12,4mW3ZUPOOMHs');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_aakt_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', true);
define('WP_DEBUG_DISPLAY', true );
define('WP_DEBUG_LOG', true);
/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
