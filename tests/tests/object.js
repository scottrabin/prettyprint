exports.TEST_NAME = "prettyprint.format[ object Object ] functions";
var pp = require( '../../prettyprint' );

exports.tests = [
    {
	name:     'Object (no properties)',
	expected: '{  }',
	actual:   pp.format[ '[object Object]' ]( {} )
    },
    {
	name:     'Object (one property, inline)',
	expected: '{ a: 5 }',
	actual:   pp.format[ '[object Object]' ]( {a:5} )
    },
    {
	name:     'Object (2 properties, multiline)',
	expected: '{\n    a: 5\n    b: 10\n}',
	actual:   pp.format[ '[object Object]' ]( {a:5,b:10} )
    },
    {
	name:     'Object (5 properties, inline)',
	expected: '{ a: 1, b: 2, c: 3, d: 4, e: 5 }',
	actual:   function(){
	    var old = pp.OBJECT_INLINE_THRESHOLD;
	    pp.OBJECT_INLINE_THRESHOLD = 5;
	    var r = pp.format[ '[object Object]' ]( { a: 1, b: 2, c: 3, d: 4, e: 5 } );
	    pp.OBJECT_INLINE_THRESHOLD = old;
	    return r;
	}
    },
    {
	name:     'Object (5 levels deep)',
	expected: '{ a: { b: { c: { d: [object Object] } } } }',
	actual: pp.prettyprint( { a: { b: { c: { d: { e: 'oops' } } } } } )
    }
];