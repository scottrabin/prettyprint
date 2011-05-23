exports.TEST_NAME = "prettyprint.format[ object Number, String, Boolean ] functions";
var pp = require( '../../prettyprint' );

exports.tests = [
    {
	name:     'String',
	expected: 'the test string',
	actual:   pp.format[ '[object String]' ]( 'the test string' )
    },
    {
	name:     'Number',
	expected: '10',
	actual:   pp.format[ '[object Number]' ]( 10 )
    },
    {
	name:     'Boolean',
	expected: 'true',
	actual:   pp.format[ '[object Boolean]' ]( true )
    }
];