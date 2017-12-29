/**
 * External Dependencies
 */
import { compact, get, noop } from 'lodash';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';

/**
 *	Media Upload is used by image and gallery blocks to handle uploading an image
 *	when a file upload button is activated.
 *
 *	TODO: future enhancement to add an upload indicator.
 *
 * @param   {Object}   $0                   Parameters object passed to the function.
 * @param   {Array}    $0.filesList         List of files.
 * @param   {Function} $0.onImagesChange    Function called each time a file or a temporary representation of the file is available.
 * @param   {Function} $0.onError           Function called when an error happens.
 * @param   {Integer}  $0.maxUploadFileSize Maximum upload size in bytes allowed for the site.
 */
export function mediaUpload( {
	filesList,
	onImagesChange,
	onError = noop,
	maxUploadFileSize = get( window, '_wpMediaSettings.maxUploadSize', 0 ),
} ) {
	// Cast filesList to array
	const files = [ ...filesList ];

	const imagesSet = [];
	const setAndUpdateImages = ( idx, value ) => {
		imagesSet[ idx ] = value;
		onImagesChange( compact( imagesSet ) );
	};
	files.forEach( ( mediaFile, idx ) => {
		// Only allow image uploads, may need updating if used for video
		if ( ! /^image\//.test( mediaFile.type ) ) {
			return;
		}

		// verify if file is greater than the maximum file upload size allowed for the site.
		if ( maxUploadFileSize && mediaFile.size > maxUploadFileSize ) {
			onError(
				sprintf(
					__( '%s exceeds the maximum upload size for this site.' ),
					mediaFile.name
				)
			);
			return;
		}

		// Set temporary URL to create placeholder image, this is replaced
		// with final image from media gallery when upload is `done` below
		imagesSet.push( { url: window.URL.createObjectURL( mediaFile ) } );
		onImagesChange( imagesSet );

		return createMediaFromFile( mediaFile ).then(
			( savedMedia ) => {
				setAndUpdateImages( idx, { id: savedMedia.id, url: savedMedia.source_url } );
			},
			() => {
				setAndUpdateImages( idx, null );
				onError(
					sprintf(
						__( 'Error while uploading file %s to the media library.' ),
						mediaFile.name
					)
				);
			}
		);
	} );
}

/**
 * @param  {File}    file Media File to Save
 *
 * @returns {Promise} Media Object Promise.
 */
export function createMediaFromFile( file ) {
	// Create upload payload
	const data = new window.FormData();
	data.append( 'file', file, file.name || file.type.replace( '/', '.' ) );

	return new wp.api.models.Media().save( null, {
		data: data,
		contentType: false,
	} );
}
