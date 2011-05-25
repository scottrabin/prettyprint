function retVal( obj, depth, indent ){
    return JSON.stringify(obj);
}

function retType( obj, depth, indent ){
    return Object.prototype.toString.call( obj );
}

/**
 * Formats a valid Javascript parameter into a human-readable form.
 * @param {*} obj The object to format.
 * @param {Number} [depth] The depth to truncate recursive calls to (to avoid circular JSON objects)
 * @param {Number} [indent] The indent level of this call to prettyprint. Inserts this number of
 *                 INDENT_VALUE strings after newlines.
 * @param {Array<String>} [blacklist] An optional blacklist of object properties to not print
 * @returns {String} the string representing the pretty printed version of the input {@code obj}.
 */
exports.prettyprint = function( obj, depth, indent, blacklist ){
    // handle depth & indent arguments
    depth = ( isNaN( parseInt( depth ) ) ? exports.DEFAULT_DEPTH : depth );
    indent = ( isNaN( parseInt( indent ) ) ? 0 : indent );
    blacklist = ( blacklist instanceof Array ? blacklist : [] );

    // get type
    var type = retType( obj );

    // dispatch on type
    var fn = ( depth < 0 ? exports.truncate : exports.format );
    return ( fn[ type ] || fn.default )( obj, depth, indent, blacklist );
};

/**
 * The default depth to truncate recursive calls to.
 */
exports.DEFAULT_DEPTH = 3;

/**
 * The indent value to use for indented lines.
 */
exports.INDENT_VALUE = '    ';

/**
 * Objects with {@code OBJECT_INLINE_THRESHOLD} or fewer properties will display on one line.
 */
exports.OBJECT_INLINE_THRESHOLD = 1;

/**
 * Arrays with {@code ARRAY_INLINE_THRESHOLD} or fewer members will display on one line.
 */
exports.ARRAY_INLINE_THRESHOLD = 1;

/**
 * Type-dispatch functions for formatting the input object. These functions are called when
 * {@code depth} >= 0. If a type is not explicitly defined, it uses the {@code default}
 * format function.
 */
exports.format = {
    '[object Array]' : function( obj, depth, indent, blacklist ){
	var r = [], contains_multiline = false, v, multiline = /[\r\n]/;
	for( var i = 0, l = obj.length ; i < l ; ++i ){
	    r[i] = exports.prettyprint( obj[i], depth - 1, indent + 1, blacklist );
	    if( multiline.test( r[i] ) ){
		contains_multiline = true;
	    }
	}

	if( !contains_multiline && r.length <= exports.ARRAY_INLINE_THRESHOLD ){
	    return "[ " + r.join( ', ' ) + " ]";
	} else {
	    var ind = new Array( indent + 1 ).join( exports.INDENT_VALUE );
	    return "[\n" + ind + exports.INDENT_VALUE + r.join( ",\n" + ind + exports.INDENT_VALUE ) + "\n" + ind + "]";
	}
    },
    '[object Object]': function( obj, depth, indent, blacklist ){
	var r = [], contains_multiline = false, v, multiline = /[\r\n]/;
	for( var prop in obj ){
	    if( obj.hasOwnProperty(prop) && ( blacklist.indexOf( prop ) === -1 ) ){
		r.push( prop + ": " + exports.prettyprint( obj[prop], depth - 1, indent + 1, blacklist ) );
		if( multiline.test( r[ r.length - 1 ] ) ){
		    contains_multiline = true;
		}
	    }
	}
	
	if( !contains_multiline && r.length <= exports.OBJECT_INLINE_THRESHOLD ){
	    return "{ " + r.join( ", " ) + " }";
	} else {
	    var ind = new Array( indent + 1 ).join( exports.INDENT_VALUE );
	    return "{\n" + ind + exports.INDENT_VALUE + r.join( ",\n" + ind + exports.INDENT_VALUE ) + "\n" + ind + "}";
	}
    },
    '[object Number]': retVal,
    '[object String]': retVal,
    '[object Boolean]': function( obj, depth, indent ){
	return ( obj ? 'true' : 'false' );
    },
    'default': retType
};

/**
 * Type-dispatch functions for formatting an input object when depth < 0. If a type is not
 * explicitly defined, it uses the 'default' truncate function.
 */
exports.truncate = {
    '[object Number]': retVal,
    '[object String]': retVal,
    '[object Boolean]': retVal,
    'default': retType
};