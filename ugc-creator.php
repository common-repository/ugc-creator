<?php
/*
 * Plugin Name: UGC Creator
 * Description: UGC Creator is a user-friendly WordPress plugin that streamlines frontend post submissions with Editor.js integration. Upon activation, a new page featuring the [ugc_plugin] shortcode is automatically generated.
 * Version: 1.0
 */

/*
This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

Copyright 2023 dmeovs@gmail.com
*/

if ( ! defined( 'ABSPATH' ) ) {
	die( 'No direct access allowed' );
}
if ( ! function_exists( 'wp_handle_upload' ) ) {
	require_once( ABSPATH . 'wp-admin/includes/file.php' );
}

const UGCPLUGIN_VERSION = '1.0';

register_activation_hook( __FILE__, 'ugcplugin_activation' );

register_deactivation_hook( __FILE__, 'ugcplugin_deactivation' );

add_shortcode( 'ugc_plugin', 'ugcplugin_shortcode' );


add_action( 'rest_api_init', function () {
	register_rest_route( 'ugcplugin/v1', '/imagebyfile/',
		array(
			'methods'  => 'POST',
			'callback' => 'ugcplugin_imagebyfile',
		) );
} );

add_action( 'rest_api_init', function () {
	register_rest_route( 'ugcplugin/v1', '/imagebyurl/',
		array(
			'methods'  => 'POST',
			'callback' => 'ugcplugin_imagebyurl',
		) );
} );

/**
 * Load image
 *
 * @return array
 */
function ugcplugin_imagebyfile() {
	if ( isset( $_FILES['image'] ) ) {
		$uploadedfile = $_FILES['image'];

		$overrides = [ 'test_form' => false ];

		$movefile = wp_handle_upload( $uploadedfile, $overrides );

		if ( $movefile && ! isset( $movefile['error'] )
		     && ! empty( $movefile['url'] )
		) {
			return array(
				'success' => 1,
				'file'    => array( 'url' => $movefile['url'] )
			);
		} else {
			return array( 'success' => 0, 'error' => $movefile['error'] );
		}
	}

	return array( 'success' => 0, 'file' => array( 'url' => '' ) );
}

/**
 * Load image by url
 *
 * @return array
 */
function ugcplugin_imagebyurl() {
	$dataReceived = file_get_contents( "php://input" );
	if ( $dataReceived ) {
		$dataReceived = stripslashes( $dataReceived );
		$_POST        = json_decode( $dataReceived, true );
		if ( isset( $_POST['url'] ) ) {
			$url = sanitize_text_field( $_POST['url'] );
			$res = ugcplugin_media_sideload_image( $url );

			if ( $res ) {
				return array(
					'success' => 1,
					'file'    => array( 'url' => $res )
				);
			}
		}
	}

	return array( 'success' => 0, 'file' => array( 'url' => '' ) );
}

/**
 * Sideload image
 *
 * @param string     $image_url Image url
 * @param (bool|int) $post_id   Parent post id
 *
 * @return mixed|string Image url on server
 */
function ugcplugin_media_sideload_image( $image_url = '', $post_id = false ) {
	$tmp = download_url( $image_url );
	if ( preg_match( '/[^\?]+\.(jpe?g|jpe|gif|png|gif|webp)\b/isu', $image_url,
		$matches )
	) {
		$file_array['name'] = basename( $matches[0] );
	} else {
		return '';
	}
	$file_array['tmp_name'] = $tmp;
	// If error storing temporarily, unlink
	if ( is_wp_error( $tmp ) ) {
		@ unlink( $file_array['tmp_name'] );

		return '';
	}
	$time = current_time( 'mysql' );
	$file = wp_handle_sideload( $file_array, array( 'test_form' => false ),
		$time );
	if ( isset( $file['error'] ) ) {
		return '';
	}
	$url = $file['url'];

	return $url;
}

/**
 * Save img in post table
 *
 * @param string $url     Image url
 * @param int    $post_id Parent post id
 *
 * @return int Post row id
 */
function ugcplugin_add_img_as_post( $url, $post_id ) {
	$path     = parse_url( $url, PHP_URL_PATH );
	$path     = preg_replace( '/^\//sui', '', $path );
	$img_path = ABSPATH . $path;

	$type = mime_content_type( $img_path );

	$title      = preg_replace( '/\.[^.]+$/', '', basename( $img_path ) );
	$parent     = (int) absint( $post_id ) > 0 ? absint( $post_id ) : 0;
	$attachment = array(
		'post_mime_type' => $type,
		'guid'           => $url,
		'post_parent'    => $parent,
		'post_title'     => $title,
		'post_content'   => '',
	);
	$id         = wp_insert_attachment( $attachment, $img_path, $parent );
	if ( ! is_wp_error( $id ) ) {
		require_once ABSPATH . 'wp-admin/includes/image.php';
		$data = wp_generate_attachment_metadata( $id, $img_path );
		wp_update_attachment_metadata( $id, $data );

		return $id;
	}

	return 0;
}

/**
 * Sanitizing json string from POST
 *
 * @param string $json_string JSON-string from POST
 *
 * @return array sanitized array
 */
function ugcplugin_sanitize_json_post( $json_string ) {
	$new_post_array                  = json_decode( $json_string, true );
	$new_post_sanitized_schema_array = array(
		'blocks' => array(
			array(
				'type'  => 'string',
				'data'  => array(
					'files'        => array(
						array(
							'url' => 'string'
						)
					),
					'file'         => array(
						'url' => 'string',
					),
					'text'         => 'html',
					'level'        => 'string',
					'caption'      => 'html',
					'alignment'    => 'string',
					'items'        => array(
						'html'
					),
					'style'        => 'string',
					'content'      => array(
						array(
							'html'
						)
					),
					'withHeadings' => 'string',
					'code'         => 'htmlspecialchars',
					'service'      => 'string',
					'source'       => 'string',
					'embed'        => 'string',
				),
				'tunes' => array(
					'paragraphExcerptTune' => array(
						'as_excerpt'      => 'string',
						'as_excerpt_time' => 'string',
					),
					'imageFeaturedTune'    => array(
						'as_featured'      => 'string',
						'as_featured_time' => 'string',
					),
				),
			)
		)
	);
	$new_post_sanitized_array        = ugcplugin_filter_var( $new_post_array, $new_post_sanitized_schema_array );

	return $new_post_sanitized_array;
}

/**
 * Data sanitizing in accordance with the scheme
 *
 * @param array|string $value Input data
 * @param array|string $sanitized_schema Scheme
 *
 * @return array|string Sanitized data
 */
function ugcplugin_filter_var( $value, $sanitized_schema ) {
	if ( is_array( $value ) && is_array( $sanitized_schema ) ) {
		$value_sanitized = array();
		foreach ( $value as $key => $value2 ) {
			if ( isset( $sanitized_schema[ $key ] ) || ( is_int( $key ) && isset( $sanitized_schema[0] ) ) ) {
				if ( is_int( $key ) && isset( $sanitized_schema[0] ) ) {
					$value_sanitized[ $key ] = ugcplugin_filter_var( $value2, $sanitized_schema[0] );
				} else {
					$value_sanitized[ $key ] = ugcplugin_filter_var( $value2, $sanitized_schema[ $key ] );
				}
			}
		}
	} else {
		$value_sanitized = '';
		if ( $sanitized_schema == 'string' ) {
			$value_sanitized = sanitize_text_field( $value );
		} elseif ( $sanitized_schema == 'html' ) {
			$value_sanitized = wp_kses_post( $value );
		} elseif ( $sanitized_schema == 'htmlspecialchars' ) {
			$value_sanitized = htmlspecialchars( $value );
		}
	}

	return $value_sanitized;
}

/**
 * Add private post from user
 *
 * @return array Add res data
 */
function ugcplugin_adduserpost() {
	$res = array(
		'res'     => false,
		'msg'     => 'Unknown error',
		'post_id' => '',
	);
	if ( ! isset( $_POST['ugcplugin_editor_new_post'] ) ) {
		$res['msg'] = 'Unable to get data';

		return $res;
	}
	//Data sanitizing will be in function
	$new_post_array = ugcplugin_sanitize_json_post( wp_unslash( $_POST['ugcplugin_editor_new_post'] ) );
	//$new_post_json = wp_kses_post( $new_post_json ); - Removes double quotes from json
	if ( ! $new_post_array ) {
		$res['msg'] = 'Data is empty';

		return $res;
	}

	if ( empty( $new_post_array['blocks'] ) ) {
		$res['msg'] = 'No data to save';

		return $res;
	}

	$blocks = $new_post_array['blocks'];

	//title
	$title = 'New post from user';
	if ( ! empty( $_POST['ugcplugin_editor_new_post_title'] ) ) {
		$title = sanitize_text_field( $_POST['ugcplugin_editor_new_post_title'] );
	}

	$post_text = '';

	$post_id = 0;

	if ( ugcplugin_has_block_with_attach_for_post( $blocks ) ) {
		//Add post
		$post_author = get_current_user_id();
		if ( ! $post_author ) {
			$post_author = ugcplugin_admin_user_id();
		}

		//Data for post
		$post_data = array(
			'post_title'   => $title,
			'post_content' => $post_text,
			'post_status'  => 'private',
			'post_type'    => 'post',
			'post_author'  => $post_author,
		);

		//Insert post to db
		$post_id = wp_insert_post( $post_data );
		if ( ! $post_id ) {
			$res['msg'] = 'It is impossible to create a post';

			return $res;
		}
	}

	$as_excerpt_min  = 0;
	$as_excerpt_text = '';

	$as_featured_min     = 0;
	$as_featured_post_id = 0;

	foreach ( $blocks as $block ) {
		if ( empty( $block['type'] ) || empty( $block['data'] ) ) {
			continue;
		}
		$block_type = $block['type'];
		$block_data = $block['data'];
		//header
		if ( $block_type == 'header' && ! empty( $block_data['text'] )
		     && ! empty( $block_data['level'] )
		) {
			$header_level = (int) $block_data['level'];
			$header_text  = $block_data['text'];
			$header       = '<h' . $header_level . '>' . $header_text
			                . '</h' . $header_level . '>';
			$post_text    .= $header . "\r\n";
		}
		//paragraph
		if ( $block_type == 'paragraph' && ! empty( $block_data['text'] ) ) {
			$paragraph = $block_data['text'];

			if ( isset( $block['tunes']['paragraphExcerptTune'] ) ) {
				$paragraph_excerpt_tune
					= $block['tunes']['paragraphExcerptTune'];
				if ( isset( $paragraph_excerpt_tune['as_excerpt'] )
				     and isset( $paragraph_excerpt_tune['as_excerpt_time'] )
				) {
					if ( $paragraph_excerpt_tune['as_excerpt']
					     && $paragraph_excerpt_tune['as_excerpt_time']
					        > $as_excerpt_min
					) {
						$as_excerpt_text = $paragraph;
					}
				}
			}
			$post_text .= '<p>' . $paragraph . '</p>' . "\r\n";
		}
		//gallery
		if ( $block_type == 'gallery' && ! empty( $block_data['files'] ) ) {

			$post_text .= '<!-- wp:gallery {"linkTo":"none"} -->' . "\r\n";
			$post_text .= '<figure class="wp-block-gallery has-nested-images columns-default is-cropped">'
			              . "\r\n";

			$files = $block_data['files'];
			foreach ( $files as $file ) {
				if ( ! empty( $file['url'] ) ) {
					$gallery_file_url = $file['url'];
					$img_id
					                  = ugcplugin_add_img_as_post( $gallery_file_url,
						$post_id );
					if ( ! $img_id ) {
						$res['msg'] = 'It is impossible to save gallery image';

						return $res;
					}

					$post_text .= '<!-- wp:image {"id":' . $img_id
					              . ',"sizeSlug":"large","linkDestination":"none"} -->'
					              . "\r\n";
					$post_text .= '<figure class="wp-block-image size-large"><img src="'
					              . $gallery_file_url
					              . '" alt="" class="wp-image-' . $img_id
					              . '"/></figure>' . "\r\n";
					$post_text .= '<!-- /wp:image -->' . "\r\n";
				}
			}

			$post_text .= '</figure>' . "\r\n";
			$post_text .= '<!-- /wp:gallery -->' . "\r\n";
		}
		//image
		if ( $block_type == 'image' && ! empty( $block_data['file']['url'] ) ) {
			$image_caption = '';
			if ( ! empty( $block_data['caption'] ) ) {
				$image_caption = $block_data['caption'];
			}

			$image_file_url = $block_data['file']['url'];
			$img_id         = ugcplugin_add_img_as_post( $image_file_url,
				$post_id );
			if ( ! $img_id ) {
				$res['msg'] = 'It is impossible to save image';

				return $res;
			}
			$post_text .= '<!-- wp:image {"id":' . $img_id
			              . ',"sizeSlug":"full","linkDestination":"none"} -->'
			              . "\r\n";
			$post_text .= '<figure class="wp-block-image size-full"><img src="'
			              . $image_file_url . '" alt="" class="wp-image-'
			              . $img_id
			              . '"/>';
			if ( $image_caption ) {
				$post_text .= '<figcaption class="wp-element-caption">'
				              . $image_caption . '</figcaption>';
			}
			$post_text .= '</figure>' . "\r\n";
			$post_text .= '<!-- /wp:image -->' . "\r\n";

			if ( isset( $block['tunes']['imageFeaturedTune'] ) ) {
				$image_featured_tune = $block['tunes']['imageFeaturedTune'];
				if ( isset( $image_featured_tune['as_featured'] )
				     and isset( $image_featured_tune['as_featured_time'] )
				) {
					if ( $image_featured_tune['as_featured']
					     && $image_featured_tune['as_featured_time']
					        > $as_featured_min
					) {
						$as_featured_post_id = $img_id;
					}
				}
			}
		}
		//quote
		if ( $block_type == 'quote' && ! empty( $block_data['text'] ) ) {
			$quote_alignment = 'left';
			if ( ! empty( $block_data['alignment'] ) ) {
				$quote_alignment = $block_data['alignment'];
			}
			$quote_caption = '';
			if ( ! empty( $block_data['caption'] ) ) {
				$quote_caption = $block_data['caption'];
			}
			$quote_text     = $block_data['text'];
			$quote_text_arr = explode( '<div>', $quote_text );
			$quote_text_p   = '';
			foreach ( $quote_text_arr as $quote_text_item ) {
				$quote_text_item = trim( str_replace( '</div>', '',
					$quote_text_item ) );
				$quote_text_p    .= '<!-- wp:paragraph -->' . "\r\n";
				$quote_text_p    .= '<p>' . $quote_text_item . '</p>' . "\r\n";
				$quote_text_p    .= '<!-- /wp:paragraph -->' . "\r\n";
			}
			$post_text .= '<!-- wp:quote {"align":"' . $quote_alignment
			              . '"} -->' . "\r\n";
			$post_text .= '<blockquote class="wp-block-quote has-text-align-'
			              . $quote_alignment . '">' . "\r\n";
			$post_text .= $quote_text_p . "\r\n";
			if ( $quote_caption ) {
				$post_text .= '<cite>caption quote</cite>' . "\r\n";
			}
			$post_text .= '</blockquote>' . "\r\n";
			$post_text .= '<!-- /wp:quote -->' . "\r\n";
		}
		//list
		if ( $block_type == 'list' && ! empty( $block_data['items'] )
		     && is_array( $block_data['items'] )
		) {
			$list_items   = $block_data['items'];
			$list_style   = 'unordered';
			$list_tag     = 'ul';
			$list_wp_attr = '';
			if ( ! empty( $block_data['style'] ) ) {
				$list_style = $block_data['style'];
			}
			if ( $list_style == 'ordered' ) {
				$list_tag     = 'ol';
				$list_wp_attr = '{"ordered":true} ';
			}
			$post_text .= '<!-- wp:list ' . $list_wp_attr . '-->' . "\r\n";
			$post_text .= '<' . $list_tag . '>' . "\r\n";
			foreach ( $list_items as $list_item ) {
				$post_text .= '<!-- wp:list-item -->' . "\r\n";
				$post_text .= '<li>' . $list_item . '</li>' . "\r\n";
				$post_text .= '<!-- /wp:list-item -->' . "\r\n";
			}
			$post_text .= '</' . $list_tag . '>' . "\r\n";
			$post_text .= '<!-- /wp:list -->' . "\r\n";

		}
		//table
		if ( $block_type == 'table' && ! empty( $block_data['content'] )
		     && is_array( $block_data['content'] )
		) {
			$table_content_array = $block_data['content'];
			$table_with_headings = false;
			if ( isset( $block_data['withHeadings'] ) ) {
				$table_with_headings = $block_data['withHeadings'];
			}
			$i_row     = 0;
			$post_text .= '<!-- wp:table -->' . "\r\n";
			$post_text .= '<figure class="wp-block-table">' . "\r\n";
			$post_text .= '<table>' . "\r\n";
			$post_text .= '<tbody>' . "\r\n";
			foreach ( $table_content_array as $table_row_array ) {
				$post_text .= '<tr>' . "\r\n";
				foreach ( $table_row_array as $table_col_data ) {
					$col_tag = 'td';
					if ( $i_row == 0 && $table_with_headings ) {
						$col_tag = 'th';
					}
					$post_text      .= '<' . $col_tag . '>' . $table_col_data . '</'
					                   . $col_tag . '>' . "\r\n";
				}
				$post_text .= '</tr>' . "\r\n";
				$i_row ++;
			}
			$post_text .= '</tbody>' . "\r\n";
			$post_text .= '</table>' . "\r\n";
			$post_text .= '</figure>' . "\r\n";
			$post_text .= '<!-- /wp:table -->' . "\r\n";
		}
		//code
		if ( $block_type == 'code' && ! empty( $block_data['code'] ) ) {
//			$code_code = htmlspecialchars( $block_data['code'] );
			$code_code = $block_data['code'];

			$post_text .= '<!-- wp:code -->' . "\r\n";
			$post_text .= '<pre class="wp-block-code"><code>' . $code_code
			              . '</code></pre>' . "\r\n";
			$post_text .= '<!-- /wp:code -->' . "\r\n";
		}
		//embed
		if ( $block_type == 'embed' && ! empty( $block_data['service'] )
		     && ! empty( $block_data['source'] )
		) {
			$embed_service = $block_data['service'];
			$embed_source  = $block_data['source'];
			$embed_embed   = '';
			if ( ! empty( $block_data['embed'] ) ) {
				$embed_embed = $block_data['embed'];
			}
			$embed_caption = '';
			if ( ! empty( $block_data['caption'] ) ) {
				$embed_caption = $block_data['caption'];
			}
			if ( $embed_service == 'youtube' ) {
				$post_text .= '<!-- wp:embed {"url":"' . $embed_source
				              . '","type":"video","providerNameSlug":"'
				              . $embed_service
				              . '","responsive":true,"className":"wp-embed-aspect-16-9 wp-has-aspect-ratio"} -->'
				              . "\r\n";
				$post_text .= '<figure class="wp-block-embed is-type-video is-provider-'
				              . $embed_service . ' wp-block-embed-'
				              . $embed_service
				              . ' wp-embed-aspect-16-9 wp-has-aspect-ratio"><div class="wp-block-embed__wrapper">'
				              . "\r\n";
				$post_text .= $embed_source . "\r\n";
				$post_text .= '</div>' . "\r\n";
				if ( $embed_caption ) {
					$post_text .= '<figcaption class="wp-element-caption">'
					              . $embed_caption . '</figcaption>' . "\r\n";
				}
				$post_text .= '</figure>' . "\r\n";
				$post_text .= '<!-- /wp:embed -->' . "\r\n";
			} elseif ( $embed_service == 'twitter' ) {
				$post_text .= '<!-- wp:embed {"url":"' . $embed_source
				              . '","providerNameSlug":"' . $embed_service
				              . '","responsive":true} -->' . "\r\n";
				$post_text .= '<figure class="wp-block-embed is-provider-'
				              . $embed_service . ' wp-block-embed-'
				              . $embed_service
				              . '"><div class="wp-block-embed__wrapper">'
				              . "\r\n";
				$post_text .= $embed_source . "\r\n";
				$post_text .= '</div>' . "\r\n";
				if ( $embed_caption ) {
					$post_text .= '<figcaption class="wp-element-caption">'
					              . $embed_caption . '</figcaption>' . "\r\n";
				}
				$post_text .= '</figure>' . "\r\n";
				$post_text .= '<!-- /wp:embed -->' . "\r\n";
			} elseif ( $embed_service == 'vimeo' ) {
				$post_text .= '<!-- wp:embed {"url":"' . $embed_source
				              . '","type":"video","providerNameSlug":"'
				              . $embed_service
				              . '","responsive":true,"className":"wp-embed-aspect-16-9 wp-has-aspect-ratio"} -->'
				              . "\r\n";
				$post_text .= '<figure class="wp-block-embed is-type-video is-provider-'
				              . $embed_service . ' wp-block-embed-'
				              . $embed_service
				              . ' wp-embed-aspect-16-9 wp-has-aspect-ratio"><div class="wp-block-embed__wrapper">'
				              . "\r\n";
				$post_text .= $embed_source . "\r\n";
				$post_text .= '</div>' . "\r\n";
				if ( $embed_caption ) {
					$post_text .= '<figcaption class="wp-element-caption">'
					              . $embed_caption . '</figcaption>' . "\r\n";
				}
				$post_text .= '</figure>' . "\r\n";
				$post_text .= '<!-- /wp:embed -->' . "\r\n";
			} elseif ( $embed_service == 'imgur' ) {
				$post_text .= '<!-- wp:embed {"url":"' . $embed_source
				              . '","type":"rich","providerNameSlug":"'
				              . $embed_service . '","responsive":true} -->'
				              . "\r\n";
				$post_text .= '<figure class="wp-block-embed is-type-rich is-provider-'
				              . $embed_service . ' wp-block-embed-'
				              . $embed_service
				              . '"><div class="wp-block-embed__wrapper">'
				              . "\r\n";
				$post_text .= $embed_source . "\r\n";
				$post_text .= '</div>' . "\r\n";
				if ( $embed_caption ) {
					$post_text .= '<figcaption class="wp-element-caption">'
					              . $embed_caption . '</figcaption>' . "\r\n";
				}
				$post_text .= '</figure>' . "\r\n";
				$post_text .= '<!-- /wp:embed -->' . "\r\n";
			} elseif ( $embed_service == 'pinterest' ) {
				$post_text .= '<!-- wp:embed {"url":"' . $embed_source
				              . '","type":"rich","providerNameSlug":"'
				              . $embed_service . '"} -->' . "\r\n";
				$post_text .= '<figure class="wp-block-embed is-type-rich is-provider-'
				              . $embed_service . ' wp-block-embed-'
				              . $embed_service
				              . '"><div class="wp-block-embed__wrapper">'
				              . "\r\n";
				$post_text .= $embed_source . "\r\n";
				$post_text .= '</div>' . "\r\n";
				if ( $embed_caption ) {
					$post_text .= '<figcaption class="wp-element-caption">'
					              . $embed_caption . '</figcaption>' . "\r\n";
				}
				$post_text .= '</figure>' . "\r\n";
				$post_text .= '<!-- /wp:embed -->' . "\r\n";
			} elseif ( $embed_service == 'gfycat'
			           || $embed_service == 'codepen'
			) {
				$post_text .= '<!-- wp:embed {"url":"' . $embed_source
				              . '","type":"wp-embed","providerNameSlug":"'
				              . $embed_service . '"} -->' . "\r\n";
				$post_text .= '<figure class="wp-block-embed is-type-wp-embed is-provider-'
				              . $embed_service . ' wp-block-embed-'
				              . $embed_service
				              . '"><div class="wp-block-embed__wrapper">'
				              . "\r\n";
				$post_text .= $embed_source . "\r\n";
				$post_text .= '</div>' . "\r\n";
				if ( $embed_caption ) {
					$post_text .= '<figcaption class="wp-element-caption">'
					              . $embed_caption . '</figcaption>' . "\r\n";
				}
				$post_text .= '</figure>' . "\r\n";
				$post_text .= '<!-- /wp:embed -->' . "\r\n";
			} elseif ( $embed_service == 'facebook' && $embed_embed ) {
				$post_text .= "<iframe src='$embed_embed' scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true'"
				              . " style='width: 100%; min-height: 500px; max-height: 1000px;'></iframe>"
				              . "\r\n";
			} elseif ( $embed_service == 'instagram' && $embed_embed ) {
				$post_text .= '<iframe src="' . $embed_embed
				              . '" width="400" height="505" style="margin: 0 auto;" frameborder="0" scrolling="no" allowtransparency="true"></iframe>'
				              . "\r\n";
			} elseif ( $embed_service == 'yandex-music-album'
			           && $embed_embed
			) {
				$post_text .= '<iframe src="' . $embed_embed
				              . '" frameborder="0" style="border:none;width:540px;height:400px;" style="width:100%;" height="400"></iframe>'
				              . "\r\n";
			} elseif ( $embed_service == 'yandex-music-playlist'
			           && $embed_embed
			) {
				$post_text .= '<iframe src="' . $embed_embed
				              . '" frameborder="0" style="border:none;width:540px;height:400px;" width="540" height="400"></iframe>'
				              . "\r\n";
			} elseif ( $embed_service == 'aparat' && $embed_embed ) {
				$post_text .= '<iframe src="' . $embed_embed
				              . '" width="600" height="300" style="margin: 0 auto;" frameborder="0" scrolling="no" allowtransparency="true"></iframe>'
				              . "\r\n";
			} elseif ( $embed_service == 'miro' && $embed_embed ) {
				$post_text .= '<iframe src="' . $embed_embed
				              . '" width="700" height="500" style="margin: 0 auto;" allowFullScreen frameBorder="0" scrolling="no"></iframe>'
				              . "\r\n";
			} elseif ( $embed_service == 'coub' && $embed_embed ) {
				$post_text .= '<iframe src="' . $embed_embed
				              . '" style="width:100%;" height="320" frameborder="0" allowfullscreen></iframe>'
				              . "\r\n";
			}


		}
		$post_text .= "\r\n";
	}

	//Update text
	$post_data = array(
		'post_title'   => $title,
		'post_content' => $post_text,
		'post_status'  => 'private',
		'post_type'    => 'post',
		'post_author'  => $post_author,
		'post_excerpt' => $as_excerpt_text,
	);
	if ( $post_id ) {
		$post_data['ID'] = $post_id;
	}

	//Insert post to db
	$post_id = wp_insert_post( $post_data );
	if ( ! $post_id ) {
		$res['msg'] = 'It is impossible to create a post';

		return $res;
	}

	if ( $as_featured_post_id ) {
		set_post_thumbnail( $post_id, $as_featured_post_id );
	}

	$res['res']     = true;
	$res['msg']     = '';
	$res['post_id'] = $post_id;

	return $res;
}

/**
 * Check if it has block with attach for post
 *
 * @param array $blocks Editors blocks
 *
 * @return bool
 */
function ugcplugin_has_block_with_attach_for_post( $blocks ) {
	foreach ( $blocks as $block ) {
		if ( empty( $block['type'] ) || empty( $block['data'] ) ) {
			continue;
		}
		$block_type = $block['type'];
		$block_data = $block['data'];

		if ( $block_type == 'gallery' && ! empty( $block_data['files'] ) ) {
			return true;
		}
		if ( $block_type == 'image' && ! empty( $block_data['file']['url'] ) ) {
			return true;
		}
	}

	return false;
}

/**
 * Get admin user ID in the DB
 *
 * @return int Anmin ID
 */
function ugcplugin_admin_user_id() {
	//Grab wp DB
	global $wpdb;
	//Get all users in the DB
	$wp_user_search
		= $wpdb->get_results( "SELECT ID, display_name FROM $wpdb->users ORDER BY ID" );

	//Blank array
	$adminArray = array();
	//Loop through all users
	foreach ( $wp_user_search as $userid ) {
		//Current user ID we are looping through
		$curID = $userid->ID;
		//Grab the user info of current ID
		$curuser = get_userdata( $curID );
		//Current user level
		$user_level = $curuser->user_level;
		//Only look for admins
		if ( $user_level >= 8 ) {//levels 8, 9 and 10 are admin
			//Push user ID into array
			$adminArray[] = $curID;
		}
	}
	$admin_id = 0;
	if ( ! empty( $adminArray[0] ) ) {
		$admin_id = $adminArray[0];
	}

	return $admin_id;
}

/**
 * Generate link for admin
 *
 * @param $post_id
 *
 * @return string
 */
function ugcplugin_link_for_admin( $post_id ) {
	$url = admin_url() . 'post.php?post=' . $post_id . '&action=edit';

	return $url;
}

/**
 * Process shortcode
 *
 * @return string Page code
 */
function ugcplugin_shortcode() {

	if ( isset( $_POST['ugcplugin_editor_new_post'] ) ) {

		$res = ugcplugin_adduserpost();

		if ( ! $res['res'] ) {
			return $res['msg'];
		}
		$post_id = $res['post_id'];


		$to      = get_bloginfo( 'admin_email' );
		$subject = '[UGC Creator] New Post Submitted';
		$message = "
Dear Administrator,

A new post has been submitted to your website via UGC Creator.

You can view and edit this post by clicking on the following link: " . ugcplugin_link_for_admin( $post_id ) . "

Thank you for using UGC Creator to manage your user-generated content.
If you have any questions or concerns, please don't hesitate to contact us at dmeovs@gmail.com

Best regards, Dmitry";
		wp_mail( $to, $subject, $message );

		return 'Thank you for submitting your post! It has been successfully saved and will now be reviewed by our site administrator. We appreciate your contribution to our community and will do our best to ensure timely processing of your submission.';
	}

	wp_register_script( 'ugcplugin_header_editor.js',
		plugin_dir_url( __FILE__ ) . 'js/header/editor.js', array(),
		UGCPLUGIN_VERSION );
	wp_enqueue_script( 'ugcplugin_header_editor.js' );
	wp_register_script( 'ugcplugin_paragraph.js',
		plugin_dir_url( __FILE__ ) . 'js/paragraph/bundle.js', array(),
		UGCPLUGIN_VERSION );
	wp_enqueue_script( 'ugcplugin_paragraph.js' );
	wp_register_script( 'ugcplugin_simple_image.js',
		plugin_dir_url( __FILE__ ) . 'js/simple-image/bundle.js', array(),
		UGCPLUGIN_VERSION );
	wp_enqueue_script( 'ugcplugin_simple_image.js' );
	wp_register_script( 'ugcplugin_image.js',
		plugin_dir_url( __FILE__ ) . 'js/image/image.js', array(),
		UGCPLUGIN_VERSION );
	wp_enqueue_script( 'ugcplugin_gallery.js' );
	wp_register_script( 'ugcplugin_gallery.js',
		plugin_dir_url( __FILE__ ) . 'js/editorjs-gallery/bundle.js', array(),
		UGCPLUGIN_VERSION );
	wp_enqueue_script( 'ugcplugin_image.js' );
	wp_register_script( 'ugcplugin_code.js',
		plugin_dir_url( __FILE__ ) . 'js/code/bundle.js', array(),
		UGCPLUGIN_VERSION );
	wp_enqueue_script( 'ugcplugin_code.js' );
	wp_register_script( 'ugcplugin_embed.js',
		plugin_dir_url( __FILE__ ) . 'js/embed/bundle.js', array(),
		UGCPLUGIN_VERSION );
	wp_enqueue_script( 'ugcplugin_embed.js' );
	wp_register_script( 'ugcplugin_inline_code.js',
		plugin_dir_url( __FILE__ ) . 'js/inline-code/bundle.js', array(),
		UGCPLUGIN_VERSION );
	wp_enqueue_script( 'ugcplugin_inline_code.js' );
	wp_register_script( 'ugcplugin_list.js',
		plugin_dir_url( __FILE__ ) . 'js/list/bundle.js', array(),
		UGCPLUGIN_VERSION );
	wp_enqueue_script( 'ugcplugin_list.js' );
	wp_register_script( 'ugcplugin_quote.js',
		plugin_dir_url( __FILE__ ) . 'js/quote/bundle.js', array(),
		UGCPLUGIN_VERSION );
	wp_enqueue_script( 'ugcplugin_quote.js' );
	wp_register_script( 'ugcplugin_table.js',
		plugin_dir_url( __FILE__ ) . 'js/table/table.js', array(),
		UGCPLUGIN_VERSION );
	wp_enqueue_script( 'ugcplugin_table.js' );
	wp_register_script( 'ugcplugin_editor.js',
		plugin_dir_url( __FILE__ ) . 'js/editor.js', array(),
		UGCPLUGIN_VERSION );
	wp_enqueue_script( 'ugcplugin_editor.js' );

	wp_register_script( 'ugcplugin_paragraph_excerpt_tune.js',
		plugin_dir_url( __FILE__ ) . 'js/paragraphExcerptTune.js', array(),
		UGCPLUGIN_VERSION );
	wp_enqueue_script( 'ugcplugin_paragraph_excerpt_tune.js' );

	wp_register_script( 'ugcplugin_image_featured_tune.js',
		plugin_dir_url( __FILE__ ) . 'js/imageFeaturedTune.js', array(),
		UGCPLUGIN_VERSION );
	wp_enqueue_script( 'ugcplugin_image_featured_tune.js' );


	$code = "
<div>
<div class=\"\">
    <div class=\"\">
    	<div class=\"ce-block__content\">
	        <input placeholder=\"Add title\" maxlength=\"120\" id=\"ugcplugin_user_title\" 
	        style=\"height: 47px; overflow-y: hidden; display: block; width: 100%; margin: 0 0 9px; padding: 0; -webkit-box-sizing: border-box; box-sizing: border-box; resize: none; border: 0; outline: 0 !important; font-size: 36px; line-height: 1.3em; font-weight: 500;\" />
		</div>
		<div id=\"ugcplugin_editorjs\"></div>
		<div class=\"ce-block__content\">
		<div id=\"saveButton\">
		<button style=\"background-color: #4683d9; color: #fff; -webkit-box-shadow: 0 1px 2px rgb(70 131 217 / 48%), inset 0 -1px 0 rgb(0 0 0 / 12%); box-shadow: 0 1px 2px rgb(70 131 217 / 48%), inset 0 -1px 0 rgb(0 0 0 / 12%); --offset: 16px;    --min-width: 44px;  --height: 40px; --font-size: 16px; --icon-size: 24px; --border-radius: 8px; position: relative; outline: 0; margin: 0; padding: 0; border: 0; -ms-flex-pack: center; justify-content: center; font-size: var(--font-size); font-weight: 500; height: var(--height); border-radius: var(--border-radius); cursor: pointer; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; white-space: nowrap;\">
			<span style=\" white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding: 0 var(--offset); margin: 0 auto; -webkit-font-smoothing: antialiased;\">
        		Send to review
      		</span>
      	</button>
      	</div>
		</div>
    </div>
    <form method='post' name='ugcplugin_editor_form_data'>
	    <input type='hidden' name='ugcplugin_editor_new_post' value=''>
	    <input type='hidden' name='ugcplugin_editor_new_post_title' value=''>
	</form>
  </div>

</div>
      
<script>
document.addEventListener(\"DOMContentLoaded\", function(event) { 

	
	
    /**
     * To initialize the Editor, create a new instance with configuration object
     * @see docs/installation.md for mode details
     */
    var editor = new EditorJS({
      /**
       * Enable/Disable the read only mode
       */
      readOnly: false,

      /**
       * Wrapper of Editor
       */
      holder: 'ugcplugin_editorjs',
      
      autofocus: false,

      /**
       * Common Inline Toolbar settings
       * - if true (or not specified), the order from 'tool' property will be used
       * - if an array of tool names, this order will be used
       */
       inlineToolbar: ['bold', 'italic', 'link'],

      /**
       * Tools list
       */
      tools: {
      
		paragraph: {
			class: Paragraph,
			tunes: ['paragraphExcerptTune'],
		},
		paragraphExcerptTune: {
			class:paragraphExcerptTune,
		},
		imageFeaturedTune: {
			class:imageFeaturedTune,
		},
        header: {
          class: Header,
          inlineToolbar: ['link'],
          config: {
            placeholder: 'Header'
          }
        },

        image: {
	      class: ImageTool,
	      config: {
	        endpoints: {
	          byFile: '/wp-json/ugcplugin/v1/imagebyfile/',
	          byUrl: '/wp-json/ugcplugin/v1/imagebyurl/',
	        }
	      },
	      tunes: ['imageFeaturedTune'],
	    },
	    
	    gallery: {
	      class: ImageGallery,
	      config: {
	        endpoints: {
	          byFile: '/wp-json/ugcplugin/v1/imagebyfile/',
	        }
	      },
	    },

        quote: {
          class: Quote,
          inlineToolbar: true,
          config: {
            quotePlaceholder: 'Enter a quote',
            captionPlaceholder: 'Quote\'s author',
          },
        },
        
        list: {
          class: List,
          inlineToolbar: true,
        },

		table: {
          class: Table,
          inlineToolbar: true,
        },

        code: {
          class:  CodeTool,
        },

        inlineCode: {
          class: InlineCode,
        },

        embed: Embed,
      },

      /**
       * Initial Editor data
       */
      data: {
        blocks: [
		]
	},
	
	onReady: function(){
		document.querySelector(\".codex-editor__redactor\").style.paddingBottom = \"100px\";
		setTimeout(function (){
            document.getElementById(\"ugcplugin_user_title\").focus();
		}, 100);
	},
	
  	onChange: function(api, event) {}
    });

    /**
     * Saving button
     */
    const saveButton = document.getElementById('saveButton');

   
    /**
     * Saving example
     */
    saveButton.addEventListener('click', function (event) {
	    editor.save()
	    .then((savedData) => {
            var saved_data_string = JSON.stringify( savedData );
            var ugcplugin_user_title = document.querySelector(\"#ugcplugin_user_title\").value;
            
            document.querySelector(\"[name='ugcplugin_editor_new_post']\").value = saved_data_string;
            document.querySelector(\"[name='ugcplugin_editor_new_post_title']\").value = ugcplugin_user_title;
            document.querySelector(\"[name='ugcplugin_editor_form_data']\").submit();
            event.stopPropagation();
	    });
    });
});
  </script>";

	return $code;
}

/**
 * Create new page on plugin activation
 *
 * @return void
 */
function ugcplugin_activation() {
	//Create page with name 'new'
	$page_name = ugcplugin_getfreepagename();
	if ( ! $page_name ) {
		wp_die( 'It is impossible to find a free url to create a page',
			'Create page error' );
	}

	//Data for post
	$post_data = array(
		'post_title'   => 'Create a new post',
		'post_content' => '[ugc_plugin]',
		'post_status'  => 'publish',
		'post_name'    => $page_name,
		'post_type'    => 'page',
	);

	//Insert post to db
	$post_id = wp_insert_post( $post_data );
	if ( ! $post_id ) {
		wp_die( 'It is impossible to create a page',
			'Create page error' );
	}

	//Save post_id
	add_option( 'ugc_plugin_auto_created_post_id', $post_id );
}

/**
 * Generate free page name.
 *
 * @return string Page name
 */
function ugcplugin_getfreepagename() {
	$name         = 'new';
	$name_postfix = 0;
	//There are 10 attempts to create.
	for ( $i = 0; $i < 10; $i ++ ) {
		//Check post url is busy.
		$check_name = $name;
		if ( $name_postfix > 0 ) {
			$check_name .= $name_postfix;
		}
		$post = get_posts( array( 'name' => $check_name ) );
		if ( $post ) {
			//Post with this name already exists
			$name_postfix ++;
		} else {
			return $name;
		}
	}

	return '';
}

/**
 * Remove page on deactivation
 *
 * @return void
 */
function ugcplugin_deactivation() {
	$post_id = get_option( 'ugc_plugin_auto_created_post_id' );
	if ( $post_id ) {
		wp_delete_post( $post_id );
	}
	delete_option( 'ugc_plugin_auto_created_post_id' );
}