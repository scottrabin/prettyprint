exports.TEST_NAME = "prettyprint.format[ object Array ] functions";
var pp = require( '../../prettyprint' );

exports.tests = [
    {
	name:     'Array (length 0)',
	expected: '[  ]',
	actual:   pp.format[ '[object Array]' ]( [] )
    },
    {
	name:     'Array (length 1)',
	expected: '[ 10 ]',
	actual:   pp.format[ '[object Array]' ]( [10] )
    },
    {
	name:     'Array (length 2, multiline)',
	expected: '[\n    5,\n    10\n]',
	actual:   pp.format[ '[object Array]' ]( [5,10] )
    },
    {
	name:     'Array (length 5, inline)',
	expected: '[ 1, 2, 3, 4, 5 ]',
	actual:   function(){
	    var old = pp.ARRAY_INLINE_THRESHOLD;
	    pp.ARRAY_INLINE_THRESHOLD = 10;
	    var r = pp.format[ '[object Array]' ]( [1,2,3,4,5] );
	    pp.ARRAY_INLINE_THRESHOLD = old;
	    return r;
	}
    }
];